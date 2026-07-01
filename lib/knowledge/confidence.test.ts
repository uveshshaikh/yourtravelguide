import { describe, expect, it } from 'vitest';
import { deriveConfidence } from '@/lib/knowledge/confidence';

const now = new Date('2026-06-30T00:00:00Z');
const daysAgo = (n: number) => new Date(now.getTime() - n * 86_400_000);

describe('deriveConfidence', () => {
  it('is confirmed for regulation verified within 90 days', () => {
    expect(deriveConfidence('government_regulation', daysAgo(10), now)).toBe('confirmed');
  });

  it('drops to likely for regulation verified 90–180 days ago', () => {
    expect(deriveConfidence('government_regulation', daysAgo(120), now)).toBe('likely');
  });

  it('drops to provisional for regulation overdue past 180 days', () => {
    expect(deriveConfidence('government_regulation', daysAgo(200), now)).toBe('provisional');
  });

  it('caps operator policy at likely even when freshly verified', () => {
    expect(deriveConfidence('airline_policy', daysAgo(5), now)).toBe('likely');
  });

  it('is always provisional for non-factual tiers (6–7)', () => {
    expect(deriveConfidence('expert_recommendation', daysAgo(1), now)).toBe('provisional');
    expect(deriveConfidence('traveller_experience', daysAgo(1), now)).toBe('provisional');
  });

  it('is provisional when never verified', () => {
    expect(deriveConfidence('government_regulation', null, now)).toBe('provisional');
  });
});
