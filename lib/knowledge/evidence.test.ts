import { describe, expect, it } from 'vitest';
import { highestEvidence, isFactualTier, rankOf, strongerEvidence } from '@/lib/knowledge/evidence';

describe('evidence hierarchy', () => {
  it('ranks government regulation highest (lowest number)', () => {
    expect(rankOf('government_regulation')).toBe(1);
    expect(rankOf('traveller_experience')).toBe(7);
  });

  it('treats tiers 1–5 as factual, 6–7 as supplementary', () => {
    expect(isFactualTier('airline_policy')).toBe(true);
    expect(isFactualTier('expert_recommendation')).toBe(false);
    expect(isFactualTier('traveller_experience')).toBe(false);
  });

  it('picks the stronger evidence (lower rank)', () => {
    expect(strongerEvidence('airline_policy', 'government_regulation')).toBe(
      'government_regulation',
    );
  });

  it('finds the highest tier among a set', () => {
    expect(
      highestEvidence(['airline_policy', 'international_standard', 'expert_recommendation']),
    ).toBe('international_standard');
    expect(highestEvidence([])).toBeNull();
  });
});
