import { authorityRepository } from '@/repositories/authority.repo';
import { claimRepository } from '@/repositories/claim.repo';
import { entityRepository } from '@/repositories/entity.repo';
import { evidenceRepository } from '@/repositories/evidence.repo';
import { sourceRepository } from '@/repositories/source.repo';
import { topicRepository } from '@/repositories/topic.repo';
import type { CreateClaimInput } from '@/lib/knowledge/validation';
import {
  AUTHORITIES,
  TRAVEL_QUESTIONS,
  type AuthorityCode,
  type SeedQuestion,
} from '@/db/seed/content';

/**
 * Generic, fully IDEMPOTENT seeder for the verified-question catalog. Runs the
 * SAME repository logic against pglite (tests) and Supabase (production), driven
 * entirely by the content registry in db/seed/content.ts. Re-running only adds
 * what's missing.
 *
 * Category is stored on the Topic's `journeyStage` field so the homepage/search
 * grouping is data-driven from the database (grows as content grows).
 */
export async function seedContent(): Promise<{ seeded: string[]; total: number }> {
  const now = new Date();
  const seeded: string[] = [];

  // 1) Authorities (cached by code).
  const authorityId = new Map<AuthorityCode, string>();
  for (const code of Object.keys(AUTHORITIES) as AuthorityCode[]) {
    const meta = AUTHORITIES[code];
    const existing = await authorityRepository.getByCode(code);
    const row =
      existing ??
      (await authorityRepository.create({
        code,
        name: meta.name,
        jurisdictionCountry: 'IN',
        websiteUrl: meta.websiteUrl,
        defaultEvidenceLevel: meta.defaultEvidenceLevel,
        description: meta.description,
      }));
    authorityId.set(code, row.id);
  }

  // 2) Topics + claims. Collect topic ids for the link pass.
  const topicId = new Map<string, string>();
  for (const q of TRAVEL_QUESTIONS) {
    const ownerAuthorityId = authorityId.get(q.authority)!;

    await ensureEntity(q);

    // Topic (category lives in journeyStage — data-driven grouping).
    const topic =
      (await topicRepository.getBySlug(q.slug)) ??
      (await topicRepository.create({
        slug: q.slug,
        question: q.question,
        journeyStage: q.category,
        timePhase: q.timePhase,
        intent: q.intent,
        decisionType: q.decisionType,
        riskLevel: q.riskLevel,
        volatility: q.volatility ?? 'medium',
      }));
    topicId.set(q.slug, topic.id);

    // Power-bank pages are seeded by power-bank.ts — don't duplicate their claims.
    if (q.seededElsewhere) continue;

    const evidenceId = await ensureEvidence(q, ownerAuthorityId);

    // NB: travelType is DESCRIPTIVE (which trip the answer is about), not a
    // conditional restriction — so it is NOT put in the claim scope. Scoping by
    // it would make the resolver hide the page from anyone without a matching
    // travel context. The domestic/international label is surfaced in the UI from
    // the content registry instead (see content.ts `appliesToLabel`).
    const created = await ensureAnswer(topic.id, {
      subjectType: q.subject.type,
      subjectCode: q.subject.code,
      question: q.question,
      verdict: q.verdict,
      resolverDimensions: q.verdict === 'unresolved' ? ['destination'] : undefined,
      summary: q.summary,
      conditions: q.conditions,
      ownerAuthorityId,
      evidenceIds: [evidenceId],
      volatility: q.volatility ?? 'medium',
      riskLevel: q.riskLevel,
      lastVerifiedAt: now,
    });
    if (created) seeded.push(q.slug);
  }

  // 3) Related links (bidirectional "you should also know"), idempotent.
  for (const q of TRAVEL_QUESTIONS) {
    const from = topicId.get(q.slug);
    if (!from || !q.related) continue;
    for (const toSlug of q.related) {
      const to = topicId.get(toSlug) ?? (await topicRepository.getBySlug(toSlug))?.id;
      if (!to) continue;
      await ensureLink(from, to);
      await ensureLink(to, from);
    }
  }

  return { seeded, total: TRAVEL_QUESTIONS.length };
}

async function ensureEntity(q: SeedQuestion) {
  const { type, code, name } = q.subject;
  if (await entityRepository.exists(type, code)) return;
  if (type === 'travel_item') {
    await entityRepository.createTravelItem({ code, name, category: q.subject.itemCategory });
  } else if (type === 'document') {
    await entityRepository.createDocument({ code, name, category: q.subject.itemCategory });
  } else {
    await entityRepository.createTravellerProfile({
      code,
      name,
      description: q.subject.description,
    });
  }
}

async function ensureEvidence(q: SeedQuestion, ownerAuthorityId: string): Promise<string> {
  const sourcesForAuthority = await sourceRepository.listByAuthority(ownerAuthorityId);
  const source =
    sourcesForAuthority.find((s) => s.title === q.source.title) ??
    (await sourceRepository.create({
      authorityId: ownerAuthorityId,
      title: q.source.title,
      url: q.source.url,
      sourceType: 'regulation',
      publishedAt: q.source.publishedAt ? new Date(q.source.publishedAt) : undefined,
    }));
  const existingEvidence = await evidenceRepository.listBySource(source.id);
  const evidence =
    existingEvidence.find((e) => e.assertion === q.assertion) ??
    (await evidenceRepository.create({
      sourceId: source.id,
      assertion: q.assertion,
      evidenceLevel: q.evidenceLevel,
    }));
  return evidence.id;
}

/** Publish a claim for a topic if it has none yet. Returns true if created. */
async function ensureAnswer(topicIdValue: string, input: CreateClaimInput): Promise<boolean> {
  const existing = await topicRepository.publishedClaims(topicIdValue);
  if (existing.length > 0) return false;
  const claim = await claimRepository.record(input);
  await claimRepository.publish(claim.id);
  await topicRepository.answerWith(topicIdValue, claim.id);
  return true;
}

async function ensureLink(fromId: string, toId: string) {
  const edges = await topicRepository.edges(fromId, 'latent_question');
  if (edges.some((e) => e.toTopicId === toId)) return;
  await topicRepository.link(fromId, toId, 'latent_question');
}
