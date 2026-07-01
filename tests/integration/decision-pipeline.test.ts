// @vitest-environment node
/**
 * End-to-end pipeline test: seeds the REAL production topic through the
 * repositories into an in-process Postgres (pglite), then resolves it through
 * the actual gather + buildDecision pipeline. Proves the Knowledge Core → view
 * path renders verified data and refuses everything else — no mocks, no fixtures.
 */
import { readFileSync } from 'node:fs';
import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import * as schema from '@/db/schema';

const harness = vi.hoisted(() => ({ db: undefined as unknown }));
vi.mock('@/db', () => ({
  get db() {
    return harness.db;
  },
}));

import { POWER_BANK_SLUG, seedPowerBank } from '@/db/seed/power-bank';
import { topicRepository } from '@/repositories/topic.repo';
import { gatherDecisionInputs } from '@/services/resolver/gather';
import { buildDecision } from '@/services/resolver/build-decision';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let client: any;

async function resolve(slug: string) {
  return buildDecision(await gatherDecisionInputs(slug));
}

beforeAll(async () => {
  client = new PGlite();
  harness.db = drizzle(client, { schema });
  const migration = readFileSync('drizzle/0000_yielding_storm.sql', 'utf8')
    .split('--> statement-breakpoint')
    .join('\n');
  await client.exec(migration);

  await seedPowerBank();
  // A topic with no published claim → must resolve to "incomplete".
  await topicRepository.create({
    slug: 'topic-without-answer',
    question: 'A pending question?',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
  });
}, 60_000);

afterAll(async () => {
  if (client) await client.close();
});

describe('decision pipeline · real Postgres', () => {
  it('renders a published, verified answer entirely from the Knowledge Core', async () => {
    const result = await resolve(POWER_BANK_SLUG);
    expect(result.state).toBe('available');
    if (result.state !== 'available') return;
    const v = result.view;

    expect(v.question).toBe('Can I carry a power bank on a flight?');
    expect(v.verdict).toBe('allowed_with_conditions');
    expect(v.answer).toMatch(/cabin/i);

    // Official sources — evidence-backed, real authority.
    expect(v.sources.length).toBeGreaterThan(0);
    expect(v.sources[0]?.authority).toContain('Directorate General');
    expect(v.sources[0]?.evidenceLevel).toBe('government_regulation');

    // Trust indicators — derived from repository data, not hand-set.
    expect(v.trust.evidenceLevel).toBe('government_regulation');
    expect(['confirmed', 'likely', 'provisional']).toContain(v.trust.confidence);
    expect(v.trust.lastVerified).toBeTruthy();
    expect(v.trust.reviewState).toBeTruthy();
    expect(v.trust.version).toBeGreaterThanOrEqual(1);

    // Applicability, conditions, exceptions, versions, related — all real.
    expect(v.conditions?.length).toBeGreaterThan(0);
    expect(v.appliesTo.dependsOn).toContain('carriage');
    expect(v.exceptions?.some((e) => e.appliesTo === 'medical')).toBe(true);
    expect(v.versions?.length).toBeGreaterThan(0);
    expect(v.relatedQuestions?.length).toBeGreaterThan(0);
    expect(v.relatedTopics?.length).toBeGreaterThan(0);

    // NO fabricated fields (not present in the Knowledge Core schema).
    expect(v.overview).toBeUndefined();
    expect(v.warnings).toBeUndefined();
    expect(v.examples).toBeUndefined();
    expect(v.faqs).toBeUndefined();
  });

  it('refuses (incomplete) when a topic has no published claim', async () => {
    expect(await resolve('topic-without-answer')).toMatchObject({ state: 'incomplete' });
  });

  it('returns not_found for an unknown topic', async () => {
    expect((await resolve('this-topic-does-not-exist')).state).toBe('not_found');
  });
});
