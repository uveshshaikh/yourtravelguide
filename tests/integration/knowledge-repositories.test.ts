// @vitest-environment node
/**
 * Repository integration tests — run against a real Postgres (pglite, in-process
 * WASM). This is what makes the DoD's "everything must be tested" true for the
 * repository layer: the repos actually execute (transactions, derivation,
 * resolution, constraints), not just typecheck.
 *
 * `@/db` is mocked to a pglite-backed Drizzle instance so every repository —
 * which imports the singleton `db` — transparently talks to the test database.
 */
import { readFileSync } from 'node:fs';
import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import * as schema from '@/db/schema';

const harness = vi.hoisted(() => ({ db: undefined as unknown }));
vi.mock('@/db', () => ({
  get db() {
    return harness.db;
  },
}));

import {
  authorityRepository,
  claimRepository,
  entityRepository,
  evidenceRepository,
  factRepository,
  journeyRepository,
  reviewRepository,
  sourceRepository,
  topicRepository,
} from '@/repositories';

let authorityId: string;
let evidenceId: string;
let weakEvidenceId: string;

beforeAll(async () => {
  const client = new PGlite();
  harness.db = drizzle(client, { schema });

  // Apply the generated migration to build the schema in the test DB.
  const migration = readFileSync('drizzle/0000_yielding_storm.sql', 'utf8')
    .split('--> statement-breakpoint')
    .join('\n');
  await client.exec(migration);

  // Provenance + reference entities reused across tests.
  const authority = await authorityRepository.create({
    code: 'dgca',
    name: 'DGCA',
    jurisdictionCountry: 'IN',
    defaultEvidenceLevel: 'government_regulation',
  });
  authorityId = authority.id;

  const source = await sourceRepository.create({
    authorityId,
    title: 'DGCA circular on lithium batteries',
    url: 'https://www.dgca.gov.in/example',
  });
  const strong = await evidenceRepository.create({
    sourceId: source.id,
    assertion: 'Power banks up to 100Wh permitted in cabin baggage.',
    evidenceLevel: 'government_regulation',
  });
  evidenceId = strong.id;
  const weak = await evidenceRepository.create({
    sourceId: source.id,
    assertion: 'A traveller reported no issues.',
    evidenceLevel: 'traveller_experience',
  });
  weakEvidenceId = weak.id;

  await entityRepository.createAirline({ code: '6E', name: 'IndiGo' });
  await entityRepository.createTravelItem({ code: 'power-bank', name: 'Power bank' });
  await entityRepository.createTravellerProfile({ code: 'medical', name: 'Medical traveller' });
}, 60_000);

describe('factRepository.record', () => {
  it('derives evidence tier, confidence, review-due, and writes an immutable v1', async () => {
    const fact = await factRepository.record({
      subjectType: 'airline',
      subjectCode: '6E',
      key: 'cabin_baggage_weight_kg',
      label: 'Cabin baggage weight',
      valueType: 'number',
      value: 7,
      ownerAuthorityId: authorityId,
      evidenceIds: [evidenceId],
      volatility: 'high',
      lastVerifiedAt: new Date(),
    });

    expect(fact.evidenceLevel).toBe('government_regulation'); // derived, not supplied
    expect(fact.confidence).toBe('confirmed'); // regulation + fresh
    expect(fact.reviewDue).not.toBeNull(); // scheduled from volatility SLA
    expect(fact.state).toBe('draft');

    const history = await factRepository.history(fact.id);
    expect(history).toHaveLength(1);
    expect(history[0]?.version).toBe(1);
  });

  it('enforces single-home uniqueness for (subject, key)', async () => {
    const input = {
      subjectType: 'airline' as const,
      subjectCode: '6E',
      key: 'checked_baggage_weight_kg',
      label: 'Checked baggage weight',
      valueType: 'number' as const,
      value: 15,
      ownerAuthorityId: authorityId,
      evidenceIds: [evidenceId],
    };
    await factRepository.record(input);
    await expect(factRepository.record(input)).rejects.toThrow();
  });

  it('rejects a fact backed only by non-factual (tier 6–7) evidence', async () => {
    await expect(
      factRepository.record({
        subjectType: 'airline',
        subjectCode: '6E',
        key: 'lounge_access',
        label: 'Lounge',
        valueType: 'boolean',
        value: true,
        ownerAuthorityId: authorityId,
        evidenceIds: [weakEvidenceId],
      }),
    ).rejects.toThrow(/established by/i);
  });

  it('rejects a fact about an unknown subject entity', async () => {
    await expect(
      factRepository.record({
        subjectType: 'airline',
        subjectCode: 'ZZ',
        key: 'anything',
        label: 'x',
        valueType: 'string',
        value: 'x',
        ownerAuthorityId: authorityId,
        evidenceIds: [evidenceId],
      }),
    ).rejects.toThrow(/unknown/i);
  });

  it('soft-deletes on retire (single-home lookup then misses)', async () => {
    const fact = await factRepository.record({
      subjectType: 'airline',
      subjectCode: '6E',
      key: 'seat_pitch_inches',
      label: 'Seat pitch',
      valueType: 'number',
      value: 28,
      ownerAuthorityId: authorityId,
      evidenceIds: [evidenceId],
    });
    await factRepository.retire(fact.id);
    const found = await factRepository.getBySubjectKey('airline', '6E', 'seat_pitch_inches');
    expect(found).toBeUndefined();
  });
});

describe('claimRepository.resolveForContext', () => {
  it('resolves most-specific-first and excludes drafts', async () => {
    const general = await claimRepository.record({
      subjectType: 'travel_item',
      subjectCode: 'power-bank',
      question: 'Can I carry a power bank?',
      verdict: 'allowed_with_conditions',
      summary: 'Up to 100Wh in cabin.',
      ownerAuthorityId: authorityId,
      evidenceIds: [evidenceId],
    });
    const specific = await claimRepository.record({
      subjectType: 'travel_item',
      subjectCode: 'power-bank',
      question: 'Can I carry a power bank on IndiGo?',
      verdict: 'allowed_with_conditions',
      summary: 'IndiGo: up to 100Wh, no approval.',
      ownerAuthorityId: authorityId,
      evidenceIds: [evidenceId],
      scope: { airline: ['6E'] },
    });
    // A draft claim that must never appear in resolution.
    await claimRepository.record({
      subjectType: 'travel_item',
      subjectCode: 'power-bank',
      question: 'Draft',
      verdict: 'unresolved',
      summary: 'draft',
      ownerAuthorityId: authorityId,
      evidenceIds: [evidenceId],
    });

    await claimRepository.publish(general.id);
    await claimRepository.publish(specific.id);

    const forIndigo = await claimRepository.resolveForContext('travel_item', 'power-bank', {
      airline: '6E',
    });
    expect(forIndigo.map((c) => c.id)).toEqual([specific.id, general.id]);

    const forOther = await claimRepository.resolveForContext('travel_item', 'power-bank', {
      airline: 'AI',
    });
    expect(forOther.map((c) => c.id)).toEqual([general.id]); // specific excluded, draft excluded
  });

  it('records a profile exception on a claim', async () => {
    const claim = await claimRepository.record({
      subjectType: 'travel_item',
      subjectCode: 'power-bank',
      question: 'Medical device batteries?',
      verdict: 'allowed_with_conditions',
      summary: 'Extra allowance with documentation.',
      ownerAuthorityId: authorityId,
      evidenceIds: [evidenceId],
    });
    const exception = await claimRepository.addException({
      claimId: claim.id,
      profileCode: 'medical',
      modifier: 'Higher Wh permitted with a medical certificate.',
    });
    expect(exception.claimId).toBe(claim.id);
  });
});

describe('topicRepository decision graph', () => {
  it('allows forward next_decision edges and rejects backward ones', async () => {
    const before = await topicRepository.create({
      slug: 'pack-power-bank',
      question: 'How do I pack a power bank?',
      timePhase: 'before',
      intent: 'procedure',
      decisionType: 'procedure',
    });
    const after = await topicRepository.create({
      slug: 'lost-baggage-claim',
      question: 'How do I claim for lost baggage?',
      timePhase: 'after',
      intent: 'emergency',
      decisionType: 'emergency',
    });

    await expect(topicRepository.link(before.id, after.id, 'next_decision')).resolves.toBeDefined();
    await expect(topicRepository.link(after.id, before.id, 'next_decision')).rejects.toThrow(
      /backward/i,
    );
    // A sibling edge has no directionality constraint.
    await expect(topicRepository.link(after.id, before.id, 'sibling')).resolves.toBeDefined();
  });
});

describe('journeyRepository', () => {
  it('creates a journey with ordered stages and topics', async () => {
    const journey = await journeyRepository.create({
      slug: 'first-international-trip',
      title: 'Your first international trip',
    });
    await journeyRepository.addStage({
      journeyId: journey.id,
      stageKey: 'documents',
      title: 'Documents',
      position: 1,
    });
    await journeyRepository.addStage({
      journeyId: journey.id,
      stageKey: 'plan',
      title: 'Plan',
      position: 0,
    });

    const stages = await journeyRepository.stages(journey.id);
    expect(stages.map((s) => s.stageKey)).toEqual(['plan', 'documents']);
  });
});

describe('reviewRepository', () => {
  it('schedules a review and lists it as due', async () => {
    const fact = await factRepository.record({
      subjectType: 'airline',
      subjectCode: '6E',
      key: 'web_checkin_hours',
      label: 'Web check-in window',
      valueType: 'number',
      value: 48,
      ownerAuthorityId: authorityId,
      evidenceIds: [evidenceId],
    });
    await reviewRepository.schedule({
      targetType: 'fact',
      targetId: fact.id,
      riskLevel: 'high',
      scheduledFor: new Date('2020-01-01T00:00:00Z'),
    });
    const due = await reviewRepository.listDue(new Date('2020-02-01T00:00:00Z'));
    expect(due.some((r) => r.targetId === fact.id)).toBe(true);
  });
});
