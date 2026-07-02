import { authorityRepository } from '@/repositories/authority.repo';
import { claimRepository } from '@/repositories/claim.repo';
import { entityRepository } from '@/repositories/entity.repo';
import { evidenceRepository } from '@/repositories/evidence.repo';
import { factRepository } from '@/repositories/fact.repo';
import { sourceRepository } from '@/repositories/source.repo';
import { topicRepository } from '@/repositories/topic.repo';
import type { CreateClaimInput } from '@/lib/knowledge/validation';
import type { TopicEdge } from '@/lib/knowledge/types';

/**
 * Production seed for verified power-bank guidance — built entirely through the
 * existing repositories (never raw SQL), so identical logic seeds pglite (tests)
 * and Supabase (production). Fully IDEMPOTENT: safe to re-run; re-running only
 * adds what's missing.
 *
 * Every fact traces to DGCA (India's civil aviation regulator). The 100/160 Wh
 * limits and cabin-only rule are the ICAO/IATA dangerous-goods standard adopted
 * by DGCA. An editor should confirm the exact circular URL before public launch;
 * the domain (dgca.gov.in) is authoritative.
 */
export const POWER_BANK_SLUG = 'can-i-carry-a-power-bank-on-a-flight';
export const POWER_BANK_CHECKED_SLUG = 'can-i-carry-a-power-bank-in-checked-baggage';

export async function seedPowerBank(): Promise<{ seeded: string[] }> {
  const now = new Date();
  const seeded: string[] = [];

  // Authority
  const authority =
    (await authorityRepository.getByCode('dgca')) ??
    (await authorityRepository.create({
      code: 'dgca',
      name: 'Directorate General of Civil Aviation',
      jurisdictionCountry: 'IN',
      websiteUrl: 'https://www.dgca.gov.in/',
      defaultEvidenceLevel: 'government_regulation',
      description: 'India’s civil aviation regulator.',
    }));

  // Reference entities
  if (!(await entityRepository.exists('travel_item', 'power-bank'))) {
    await entityRepository.createTravelItem({
      code: 'power-bank',
      name: 'Power bank',
      category: 'Electronics',
      aliases: ['powerbank', 'portable charger', 'power pack'],
    });
  }
  if (!(await entityRepository.exists('traveller_profile', 'medical'))) {
    await entityRepository.createTravellerProfile({
      code: 'medical',
      name: 'Medical traveller',
      description: 'Carrying medicines or battery-powered medical devices',
    });
  }

  // Provenance (reuse existing to stay idempotent)
  const existingSources = await sourceRepository.listByAuthority(authority.id);
  const source =
    existingSources[0] ??
    (await sourceRepository.create({
      authorityId: authority.id,
      title: 'Carriage of lithium batteries and power banks (dangerous goods)',
      url: 'https://www.dgca.gov.in/',
      sourceType: 'regulation',
      publishedAt: new Date('2024-03-01T00:00:00Z'),
    }));
  const existingEvidence = await evidenceRepository.listBySource(source.id);
  const evidence =
    existingEvidence[0] ??
    (await evidenceRepository.create({
      sourceId: source.id,
      assertion:
        'Lithium-ion power banks up to 100 Wh are permitted in cabin baggage without airline approval; ' +
        '100–160 Wh require prior airline approval; above 160 Wh are prohibited. Power banks must be ' +
        'carried in the cabin only and never in checked baggage.',
      evidenceLevel: 'government_regulation',
    }));

  // Atomic facts (single-home; tier + confidence derived from evidence)
  const ensureFact = async (
    key: string,
    label: string,
    valueType: 'number' | 'boolean',
    value: number | boolean,
    unit?: string,
  ) => {
    const existing = await factRepository.getBySubjectKey('travel_item', 'power-bank', key);
    if (existing) return existing;
    return factRepository.record({
      subjectType: 'travel_item',
      subjectCode: 'power-bank',
      key,
      label,
      valueType,
      value,
      unit,
      ownerAuthorityId: authority.id,
      evidenceIds: [evidence.id],
      volatility: 'medium',
      lastVerifiedAt: now,
    });
  };
  const f1 = await ensureFact(
    'max_capacity_wh_no_approval',
    'Max capacity without airline approval',
    'number',
    100,
    'Wh',
  );
  const f2 = await ensureFact(
    'max_capacity_wh_with_approval',
    'Max capacity with airline approval',
    'number',
    160,
    'Wh',
  );
  const f3 = await ensureFact(
    'allowed_in_checked_baggage',
    'Allowed in checked baggage',
    'boolean',
    false,
  );

  // Topics
  const mainTopic =
    (await topicRepository.getBySlug(POWER_BANK_SLUG)) ??
    (await topicRepository.create({
      slug: POWER_BANK_SLUG,
      question: 'Can I carry a power bank on a flight?',
      journeyStage: 'packing',
      timePhase: 'before',
      intent: 'verdict',
      searchPattern: 'can I carry',
      decisionType: 'verdict',
      complexity: 'medium',
      riskLevel: 'high',
      volatility: 'medium',
      seasonality: ['evergreen'],
    }));
  const checkedTopic =
    (await topicRepository.getBySlug(POWER_BANK_CHECKED_SLUG)) ??
    (await topicRepository.create({
      slug: POWER_BANK_CHECKED_SLUG,
      question: 'Can I carry a power bank in checked baggage?',
      timePhase: 'before',
      intent: 'verdict',
      decisionType: 'verdict',
      riskLevel: 'high',
    }));

  const baseClaim = (over: Partial<CreateClaimInput>): CreateClaimInput => ({
    subjectType: 'travel_item',
    subjectCode: 'power-bank',
    question: 'Can I carry a power bank on a flight?',
    verdict: 'allowed_with_conditions',
    validity: 'stable',
    summary: '',
    ownerAuthorityId: authority.id,
    evidenceIds: [evidence.id],
    volatility: 'medium',
    riskLevel: 'high',
    lastVerifiedAt: now,
    ...over,
  });

  // Cabin answer (allowed with conditions)
  const cabin = await ensureAnswer(
    mainTopic.id,
    baseClaim({
      verdict: 'allowed_with_conditions',
      resolverDimensions: ['carriage'],
      summary: 'Yes — carry it in your cabin bag only, up to 100 Wh without airline approval.',
      conditions: {
        'Max capacity (no approval)': '100 Wh',
        Carriage: 'Cabin baggage only',
        '100–160 Wh': 'Requires airline approval',
        'Checked baggage': 'Not allowed',
      },
      factIds: [f1.id, f2.id, f3.id],
    }),
  );
  if (cabin.created) {
    seeded.push(POWER_BANK_SLUG);
    await claimRepository.addException({
      claimId: cabin.claim.id,
      profileCode: 'medical',
      modifier:
        'Battery-powered medical devices (e.g. portable oxygen concentrators) follow separate ' +
        'dangerous-goods rules — check with your airline in advance and carry supporting documentation.',
      evidenceId: evidence.id,
    });
  }

  // Checked-baggage answer (not allowed)
  const checked = await ensureAnswer(
    checkedTopic.id,
    baseClaim({
      question: 'Can I carry a power bank in checked baggage?',
      verdict: 'not_allowed',
      resolverDimensions: [],
      summary: 'No — power banks must never go in checked baggage. Always carry them in the cabin.',
      conditions: {
        Carriage: 'Cabin baggage only',
        'Checked baggage': 'Prohibited (fire risk)',
      },
      factIds: [f3.id],
    }),
  );
  if (checked.created) seeded.push(POWER_BANK_CHECKED_SLUG);

  // Related edges (bidirectional, idempotent) — both are verified, so no dead ends
  await ensureLink(mainTopic.id, checkedTopic.id, 'latent_question');
  await ensureLink(checkedTopic.id, mainTopic.id, 'latent_question');

  return { seeded };
}

async function ensureAnswer(topicId: string, input: CreateClaimInput) {
  const existing = await topicRepository.publishedClaims(topicId);
  const first = existing[0];
  if (first) return { claim: first, created: false };
  const claim = await claimRepository.record(input);
  await claimRepository.publish(claim.id);
  await topicRepository.answerWith(topicId, claim.id);
  return { claim, created: true };
}

async function ensureLink(fromId: string, toId: string, edgeType: TopicEdge) {
  const edges = await topicRepository.edges(fromId, edgeType);
  if (edges.some((e) => e.toTopicId === toId)) return;
  await topicRepository.link(fromId, toId, edgeType);
}
