import type { EvidenceLevel } from '@/lib/knowledge/types';

/**
 * The 7-tier evidence hierarchy. Rank 1 = highest authority. Tiers 1–5 may
 * establish a factual claim; tiers 6–7 (expert/traveller) may only supplement
 * (Blueprint Part E). Higher tier wins on conflict.
 */
export const EVIDENCE_RANK: Record<EvidenceLevel, number> = {
  government_regulation: 1,
  government_advisory: 2,
  international_standard: 3,
  airport_policy: 4,
  airline_policy: 5,
  expert_recommendation: 6,
  traveller_experience: 7,
};

/** The highest tier (rank 5 and above) that may *establish* a factual claim. */
const FACTUAL_TIER_MAX_RANK = 5;

export function rankOf(level: EvidenceLevel): number {
  return EVIDENCE_RANK[level];
}

/** Tiers 1–5 may establish facts; 6–7 may only supplement. */
export function isFactualTier(level: EvidenceLevel): boolean {
  return EVIDENCE_RANK[level] <= FACTUAL_TIER_MAX_RANK;
}

/** Returns the stronger of two evidence levels (lower rank). */
export function strongerEvidence(a: EvidenceLevel, b: EvidenceLevel): EvidenceLevel {
  return EVIDENCE_RANK[a] <= EVIDENCE_RANK[b] ? a : b;
}

/** Highest evidence tier among a set (used to denormalise onto a Fact/Claim). */
export function highestEvidence(levels: readonly EvidenceLevel[]): EvidenceLevel | null {
  return levels.reduce<EvidenceLevel | null>(
    (best, lvl) => (best === null ? lvl : strongerEvidence(best, lvl)),
    null,
  );
}
