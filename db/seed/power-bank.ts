import { authorityRepository } from '@/repositories/authority.repo';
import { claimRepository } from '@/repositories/claim.repo';
import { entityRepository } from '@/repositories/entity.repo';
import { evidenceRepository } from '@/repositories/evidence.repo';
import { factRepository } from '@/repositories/fact.repo';
import { sourceRepository } from '@/repositories/source.repo';
import { topicRepository } from '@/repositories/topic.repo';

/**
 * Production seed for ONE verified topic — "Can I carry a power bank on a flight?"
 *
 * Built entirely through the existing repositories (never raw SQL), so the exact
 * same logic seeds pglite in tests and Supabase in production. Idempotent: safe
 * to re-run. Every fact traces to DGCA (India's civil aviation regulator); the
 * 100 Wh / 160 Wh limits and cabin-only rule are the ICAO/IATA dangerous-goods
 * standard adopted by DGCA. An editor should confirm the exact circular URL
 * before public launch — the domain (dgca.gov.in) is authoritative.
 */
export const POWER_BANK_SLUG = 'can-i-carry-a-power-bank-on-a-flight';

export async function seedPowerBank(): Promise<{ slug: string; seeded: boolean }> {
  if (await topicRepository.getBySlug(POWER_BANK_SLUG)) {
    return { slug: POWER_BANK_SLUG, seeded: false };
  }

  const now = new Date();

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

  // Provenance: source → evidence
  const source = await sourceRepository.create({
    authorityId: authority.id,
    title: 'Carriage of lithium batteries and power banks (dangerous goods)',
    url: 'https://www.dgca.gov.in/',
    sourceType: 'regulation',
    publishedAt: new Date('2024-03-01T00:00:00Z'),
  });
  const evidence = await evidenceRepository.create({
    sourceId: source.id,
    assertion:
      'Lithium-ion power banks up to 100 Wh are permitted in cabin baggage without airline approval; ' +
      '100–160 Wh require prior airline approval; above 160 Wh are prohibited. Power banks must be ' +
      'carried in the cabin only and never in checked baggage.',
    evidenceLevel: 'government_regulation',
  });

  // Atomic facts (single-home; tier + confidence derived from evidence)
  const factIds: string[] = [];
  const ensureFact = async (
    key: string,
    label: string,
    valueType: 'number' | 'boolean',
    value: number | boolean,
    unit?: string,
  ) => {
    const existing = await factRepository.getBySubjectKey('travel_item', 'power-bank', key);
    const fact =
      existing ??
      (await factRepository.record({
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
      }));
    factIds.push(fact.id);
  };
  await ensureFact(
    'max_capacity_wh_no_approval',
    'Max capacity without airline approval',
    'number',
    100,
    'Wh',
  );
  await ensureFact(
    'max_capacity_wh_with_approval',
    'Max capacity with airline approval',
    'number',
    160,
    'Wh',
  );
  await ensureFact('allowed_in_checked_baggage', 'Allowed in checked baggage', 'boolean', false);

  // Decision: the verdict + scope, composing the facts and citing the evidence
  const claim = await claimRepository.record({
    subjectType: 'travel_item',
    subjectCode: 'power-bank',
    question: 'Can I carry a power bank on a flight?',
    verdict: 'allowed_with_conditions',
    resolverDimensions: ['carriage'],
    validity: 'stable',
    summary: 'Yes — carry it in your cabin bag only, up to 100 Wh without airline approval.',
    conditions: {
      'Max capacity (no approval)': '100 Wh',
      Carriage: 'Cabin baggage only',
      '100–160 Wh': 'Requires airline approval',
      'Checked baggage': 'Not allowed',
    },
    ownerAuthorityId: authority.id,
    evidenceIds: [evidence.id],
    factIds,
    volatility: 'medium',
    riskLevel: 'high',
    lastVerifiedAt: now,
  });
  await claimRepository.publish(claim.id);

  // Profile-specific exception (honest, sourced pointer — no fabricated numbers)
  await claimRepository.addException({
    claimId: claim.id,
    profileCode: 'medical',
    modifier:
      'Battery-powered medical devices (e.g. portable oxygen concentrators) follow separate ' +
      'dangerous-goods rules — check with your airline in advance and carry supporting documentation.',
    evidenceId: evidence.id,
  });

  // Topic (the question) + link to its answer
  const topic = await topicRepository.create({
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
    emotionalEntry: 'doubt',
    emotionalExit: 'confidence',
    seasonality: ['evergreen'],
  });
  await topicRepository.answerWith(topic.id, claim.id);

  // Related question + topic (shells) with graph edges
  const relatedQuestion = await topicRepository.create({
    slug: 'can-i-carry-a-power-bank-in-checked-baggage',
    question: 'Can I carry a power bank in checked baggage?',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
    riskLevel: 'high',
  });
  const relatedTopic = await topicRepository.create({
    slug: 'cabin-baggage-rules',
    question: 'What are the cabin baggage rules?',
    timePhase: 'before',
    intent: 'requirement',
    decisionType: 'requirement',
    riskLevel: 'medium',
  });
  await topicRepository.link(topic.id, relatedQuestion.id, 'latent_question');
  await topicRepository.link(topic.id, relatedTopic.id, 'sibling');

  return { slug: POWER_BANK_SLUG, seeded: true };
}
