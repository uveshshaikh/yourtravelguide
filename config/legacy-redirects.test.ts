import { describe, expect, it } from 'vitest';
import { LEGACY_REDIRECTS } from '@/config/legacy-redirects';
import { TRAVEL_QUESTIONS } from '@/db/seed/content';
import nextConfig from '../next.config';

// Two questions are seeded outside the content registry (db/seed/power-bank.ts)
// but are real, live, verified slugs — the redirect map is allowed to target them.
const SEEDED_ELSEWHERE_SLUGS = [
  'can-i-carry-a-power-bank-on-a-flight',
  'can-i-carry-a-power-bank-in-checked-baggage',
];

const KNOWN_SLUGS = new Set([
  ...TRAVEL_QUESTIONS.map((q) => q.slug),
  ...SEEDED_ELSEWHERE_SLUGS,
]);

describe('legacy redirect map · migration safety', () => {
  it('has no duplicate source URLs', () => {
    const sources = LEGACY_REDIRECTS.map((r) => r.source);
    expect(new Set(sources).size).toBe(sources.length);
  });

  it('every source is a legacy path, never a /question/ path', () => {
    for (const { source } of LEGACY_REDIRECTS) {
      expect(source.startsWith('/question/')).toBe(false);
      expect(source.startsWith('/')).toBe(true);
    }
  });

  it('every destination points to a real, currently-verified question', () => {
    for (const { source, destination } of LEGACY_REDIRECTS) {
      expect(destination.startsWith('/question/')).toBe(true);
      const slug = destination.replace('/question/', '');
      expect(KNOWN_SLUGS.has(slug), `${source} -> ${destination}: slug not found`).toBe(true);
    }
  });

  it('produces no redirect chains — no destination is itself a redirect source', () => {
    const sources = new Set(LEGACY_REDIRECTS.map((r) => r.source));
    for (const { destination } of LEGACY_REDIRECTS) {
      expect(sources.has(destination)).toBe(false);
    }
  });

  it('never redirects a URL to itself', () => {
    for (const { source, destination } of LEGACY_REDIRECTS) {
      expect(source).not.toBe(destination);
    }
  });

  it("next.config's redirects() emits every mapping as a permanent (301) redirect", async () => {
    const configuredRedirects = await nextConfig.redirects?.();
    expect(configuredRedirects).toBeDefined();
    expect(configuredRedirects).toHaveLength(LEGACY_REDIRECTS.length);
    for (const r of configuredRedirects ?? []) {
      expect(r.permanent).toBe(true);
    }
    // Same source/destination pairs, order-independent.
    const asPairs = (configuredRedirects ?? [])
      .map((r) => `${r.source}=>${r.destination}`)
      .sort();
    const expectedPairs = LEGACY_REDIRECTS.map((r) => `${r.source}=>${r.destination}`).sort();
    expect(asPairs).toEqual(expectedPairs);
  });
});
