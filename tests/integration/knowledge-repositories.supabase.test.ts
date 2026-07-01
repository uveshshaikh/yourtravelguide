// @vitest-environment node
/**
 * Repository integration tests against the REAL Supabase Postgres.
 *
 * Gated: runs ONLY when RUN_SUPABASE_IT=1 (so default CI stays on the fast,
 * offline pglite suite). Assumes the Sprint-2 migration is already applied to
 * the target database. Truncates all public tables before and after so the dev
 * database is left clean — it never touches the `drizzle` migration journal.
 *
 * This is the infrastructure-validation proof: the repositories execute the same
 * create / read / update / soft-delete / version / resolution / scheduling paths
 * on the exact Postgres platform production will use.
 */
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import * as schema from '@/db/schema';

const RUN = process.env.RUN_SUPABASE_IT === '1';
const suite = RUN ? describe : describe.skip;

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let client: any;

async function truncateAllPublicTables() {
  const rows = await client`select tablename from pg_tables where schemaname = 'public'`;
  const names = rows.map((r: { tablename: string }) => `"${r.tablename}"`).join(', ');
  if (names) await client.unsafe(`TRUNCATE ${names} RESTART IDENTITY CASCADE`);
}

let authorityId: string;
let evidenceId: string;
let weakEvidenceId: string;

suite('knowledge repositories · real Supabase', () => {
  beforeAll(async () => {
    const { config } = await import('dotenv');
    config({ path: '.env.local' });
    const postgres = (await import('postgres')).default;
    const { drizzle } = await import('drizzle-orm/postgres-js');
    client = postgres(process.env.DATABASE_URL as string, {
      max: 1,
      prepare: false,
      connect_timeout: 20,
    });
    harness.db = drizzle(client, { schema });

    await truncateAllPublicTables(); // clean start

    const authority = await authorityRepository.create({
      code: 'dgca',
      name: 'DGCA',
      jurisdictionCountry: 'IN',
      defaultEvidenceLevel: 'government_regulation',
    });
    authorityId = authority.id;
    const source = await sourceRepository.create({
      authorityId,
      title: 'DGCA circular',
      url: 'https://www.dgca.gov.in/example',
    });
    evidenceId = (
      await evidenceRepository.create({
        sourceId: source.id,
        assertion: 'Power banks up to 100Wh permitted in cabin.',
        evidenceLevel: 'government_regulation',
      })
    ).id;
    weakEvidenceId = (
      await evidenceRepository.create({
        sourceId: source.id,
        assertion: 'Anecdotal.',
        evidenceLevel: 'traveller_experience',
      })
    ).id;
    await entityRepository.createAirline({ code: '6E', name: 'IndiGo' });
    await entityRepository.createTravelItem({ code: 'power-bank', name: 'Power bank' });
    await entityRepository.createTravellerProfile({ code: 'medical', name: 'Medical' });
  }, 60_000);

  afterAll(async () => {
    if (client) {
      await truncateAllPublicTables(); // leave the dev DB clean
      await client.end({ timeout: 5 });
    }
  });

  it('CREATE + READ + VERSION: records a fact with derived trust and v1 history', async () => {
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
    expect(fact.evidenceLevel).toBe('government_regulation');
    expect(fact.confidence).toBe('confirmed');
    expect(fact.reviewDue).not.toBeNull();

    const read = await factRepository.getBySubjectKey('airline', '6E', 'cabin_baggage_weight_kg');
    expect(read?.id).toBe(fact.id);
    const history = await factRepository.history(fact.id);
    expect(history).toHaveLength(1);
  });

  it('TRANSACTION + CONSTRAINT: single-home uniqueness is enforced', async () => {
    const input = {
      subjectType: 'airline' as const,
      subjectCode: '6E',
      key: 'checked_baggage_weight_kg',
      label: 'Checked baggage',
      valueType: 'number' as const,
      value: 15,
      ownerAuthorityId: authorityId,
      evidenceIds: [evidenceId],
    };
    await factRepository.record(input);
    await expect(factRepository.record(input)).rejects.toThrow();
  });

  it('CONTRACT: rejects a fact backed only by non-factual evidence', async () => {
    await expect(
      factRepository.record({
        subjectType: 'airline',
        subjectCode: '6E',
        key: 'lounge',
        label: 'Lounge',
        valueType: 'boolean',
        value: true,
        ownerAuthorityId: authorityId,
        evidenceIds: [weakEvidenceId],
      }),
    ).rejects.toThrow(/established by/i);
  });

  it('SCOPE + CLAIM + EVIDENCE RESOLUTION: most-specific-first, drafts excluded', async () => {
    const general = await claimRepository.record({
      subjectType: 'travel_item',
      subjectCode: 'power-bank',
      question: 'Power bank?',
      verdict: 'allowed_with_conditions',
      summary: 'Up to 100Wh.',
      ownerAuthorityId: authorityId,
      evidenceIds: [evidenceId],
    });
    const specific = await claimRepository.record({
      subjectType: 'travel_item',
      subjectCode: 'power-bank',
      question: 'Power bank on IndiGo?',
      verdict: 'allowed_with_conditions',
      summary: 'IndiGo 100Wh.',
      ownerAuthorityId: authorityId,
      evidenceIds: [evidenceId],
      scope: { airline: ['6E'] },
    });
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

    const indigo = await claimRepository.resolveForContext('travel_item', 'power-bank', {
      airline: '6E',
    });
    expect(indigo.map((c) => c.id)).toEqual([specific.id, general.id]);
    const other = await claimRepository.resolveForContext('travel_item', 'power-bank', {
      airline: 'AI',
    });
    expect(other.map((c) => c.id)).toEqual([general.id]);
  });

  it('DECISION GRAPH: forward edge allowed, backward rejected', async () => {
    const before = await topicRepository.create({
      slug: 'pack-power-bank',
      question: 'How to pack a power bank?',
      timePhase: 'before',
      intent: 'procedure',
      decisionType: 'procedure',
    });
    const after = await topicRepository.create({
      slug: 'lost-baggage',
      question: 'Lost baggage claim?',
      timePhase: 'after',
      intent: 'emergency',
      decisionType: 'emergency',
    });
    await expect(topicRepository.link(before.id, after.id, 'next_decision')).resolves.toBeDefined();
    await expect(topicRepository.link(after.id, before.id, 'next_decision')).rejects.toThrow(
      /backward/i,
    );
  });

  it('REVIEW SCHEDULING + SOFT DELETE', async () => {
    const journey = await journeyRepository.create({
      slug: 'first-intl-trip',
      title: 'First international trip',
    });
    await journeyRepository.addStage({
      journeyId: journey.id,
      stageKey: 'plan',
      title: 'Plan',
      position: 0,
    });
    const stages = await journeyRepository.stages(journey.id);
    expect(stages).toHaveLength(1);

    const fact = await factRepository.record({
      subjectType: 'airline',
      subjectCode: '6E',
      key: 'web_checkin_hours',
      label: 'Web check-in',
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

    await factRepository.retire(fact.id);
    expect(
      await factRepository.getBySubjectKey('airline', '6E', 'web_checkin_hours'),
    ).toBeUndefined();
  });
});
