import { authorityRepository } from '@/repositories/authority.repo';
import { claimRepository } from '@/repositories/claim.repo';
import { topicRepository } from '@/repositories/topic.repo';
import { resolve, type Scope, type TravelContext } from '@/lib/knowledge/scope';
import type { ClaimInput, RawDecisionInputs, TopicInput } from '@/services/resolver/types';

/**
 * Gather step — the ONLY DB access in the resolver. Reads through repositories
 * (never the driver) and adapts rows into the pure input contract. All refusal
 * decisions happen later in `buildDecision`; gather just collects what exists.
 */

type ClaimRow = Awaited<ReturnType<typeof topicRepository.publishedClaims>>[number];

function scopeFromRow(row: ClaimRow): Scope {
  return {
    origin: row.scopeOrigin,
    destination: row.scopeDestination,
    transit: row.scopeTransit,
    travelType: row.scopeTravelType,
    carriage: row.scopeCarriage,
    airline: row.scopeAirlines,
    airport: row.scopeAirports,
    profile: row.scopeProfiles,
    validFrom: row.validFrom,
    validUntil: row.validUntil,
  };
}

function toClaimInput(row: ClaimRow): ClaimInput {
  return {
    id: row.id,
    subjectType: row.subjectType,
    subjectCode: row.subjectCode,
    question: row.question,
    verdict: row.verdict,
    resolverDimensions: row.resolverDimensions,
    validity: row.validity,
    summary: row.summary,
    conditions: row.conditions,
    scope: {
      origin: row.scopeOrigin,
      destination: row.scopeDestination,
      transit: row.scopeTransit,
      travelType: row.scopeTravelType,
      carriage: row.scopeCarriage,
      airlines: row.scopeAirlines,
      airports: row.scopeAirports,
      profiles: row.scopeProfiles,
    },
    evidenceLevel: row.evidenceLevel,
    confidence: row.confidence,
    currentVersion: row.currentVersion,
    lastVerifiedAt: row.lastVerifiedAt,
    reviewDue: row.reviewDue,
    state: row.state,
    deletedAt: row.deletedAt,
    riskLevel: row.riskLevel,
  };
}

const EMPTY: Omit<RawDecisionInputs, 'topic' | 'relatedQuestions' | 'relatedTopics'> = {
  claim: null,
  authority: null,
  evidence: [],
  exceptions: [],
  versions: [],
};

export async function gatherDecisionInputs(
  slug: string,
  context: TravelContext = {},
): Promise<RawDecisionInputs> {
  const topicRow = await topicRepository.getBySlug(slug);
  if (!topicRow) {
    return { topic: null, relatedQuestions: [], relatedTopics: [], ...EMPTY };
  }

  const topic: TopicInput = {
    slug: topicRow.slug,
    question: topicRow.question,
    intent: topicRow.intent,
    decisionType: topicRow.decisionType,
    riskLevel: topicRow.riskLevel,
  };

  const related = await topicRepository.relatedTargets(topicRow.id);
  const relatedQuestions = related
    .filter((r) => r.edgeType === 'next_decision' || r.edgeType === 'latent_question')
    .map((r) => ({ slug: r.slug, question: r.question }));
  const relatedTopics = related
    .filter((r) => r.edgeType === 'sibling')
    .map((r) => ({ slug: r.slug, question: r.question }));

  // Most-specific-wins over the published claims linked to this topic.
  const claimRows = await topicRepository.publishedClaims(topicRow.id);
  const best = resolve(
    claimRows.map((c) => ({ ...c, scope: scopeFromRow(c) })),
    context,
  )[0];

  if (!best) {
    return { topic, relatedQuestions, relatedTopics, ...EMPTY };
  }

  const [evRows, exRows, verRows, authorityRow] = await Promise.all([
    claimRepository.evidenceWithSource(best.id),
    claimRepository.exceptions(best.id),
    claimRepository.history(best.id),
    authorityRepository.getById(best.ownerAuthorityId),
  ]);

  return {
    topic,
    claim: toClaimInput(best),
    authority: authorityRow
      ? {
          name: authorityRow.name,
          jurisdiction: authorityRow.jurisdictionCountry,
          websiteUrl: authorityRow.websiteUrl,
          description: authorityRow.description,
        }
      : null,
    evidence: evRows.map((e) => ({
      id: e.evidenceId,
      evidenceLevel: e.evidenceLevel,
      source: {
        id: e.sourceId,
        authorityName: e.authorityName,
        authorityCode: e.authorityCode,
        title: e.sourceTitle,
        url: e.sourceUrl,
        evidenceLevel: e.evidenceLevel,
        publishedAt: e.publishedAt,
        archivedUrl: e.archivedUrl,
      },
    })),
    exceptions: exRows.map((x) => ({
      id: x.id,
      profileCode: x.profileCode,
      modifier: x.modifier,
      verdictOverride: x.verdictOverride,
    })),
    versions: verRows.map((v) => ({
      version: v.version,
      date: v.verifiedAt ?? v.createdAt,
      summary: v.summary,
      changeReason: v.changeReason,
    })),
    relatedQuestions,
    relatedTopics,
  };
}
