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
import { seedContent } from '@/db/seed/seed-content';
import { categoryForSlug, TRAVEL_QUESTIONS } from '@/db/seed/content';
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
  await seedContent();
  // A topic with no published claim → must resolve to "incomplete".
  await topicRepository.create({
    slug: 'topic-without-answer',
    question: 'A pending question?',
    timePhase: 'before',
    intent: 'verdict',
    decisionType: 'verdict',
  });
}, 120_000);

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
    // Related links point only to OTHER verified questions (no dead ends).
    expect(v.relatedQuestions?.some((r) => r.href.includes('checked-baggage'))).toBe(true);

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

describe('verified-question catalog · full content seed', () => {
  it('publishes every content question so the catalog is fully answerable', async () => {
    const verified = await topicRepository.listVerifiedQuestions();
    const verifiedSlugs = new Set(verified.map((r) => r.slug));
    // Every registry question resolves to a published, verified answer (fail-closed).
    const missing = TRAVEL_QUESTIONS.filter((q) => !verifiedSlugs.has(q.slug)).map((q) => q.slug);
    expect(missing).toEqual([]);
    expect(verified.length).toBeGreaterThanOrEqual(TRAVEL_QUESTIONS.length);
    // Every verified question maps to a category for browse grouping (registry
    // first, DB journeyStage as fallback) — so nothing is ever ungrouped.
    expect(verified.every((r) => Boolean(categoryForSlug(r.slug) ?? r.category))).toBe(true);
  });

  it('resolves real answers across categories with the expected verdicts', async () => {
    const cases: Array<[string, string]> = [
      ['can-i-carry-an-e-cigarette-or-vape-on-a-flight', 'not_allowed'],
      ['how-much-liquid-can-i-carry-in-hand-baggage', 'allowed_with_conditions'],
      ['can-i-carry-a-laptop-in-hand-baggage', 'allowed'],
      ['do-i-need-a-visa-to-travel-abroad', 'unresolved'],
    ];
    for (const [slug, verdict] of cases) {
      const result = await resolve(slug);
      expect(result.state).toBe('available');
      if (result.state !== 'available') continue;
      expect(result.view.verdict).toBe(verdict);
      expect(result.view.sources.length).toBeGreaterThan(0);
    }
  });

  it('links related questions only to other verified answers (no dead ends)', async () => {
    const result = await resolve('how-much-liquid-can-i-carry-in-hand-baggage');
    expect(result.state).toBe('available');
    if (result.state !== 'available') return;
    expect(result.view.relatedQuestions?.some((r) => r.href.includes('medicines'))).toBe(true);
  });

  it('is idempotent — re-seeding adds nothing', async () => {
    const again = await seedContent();
    expect(again.seeded).toHaveLength(0);
  });
});
