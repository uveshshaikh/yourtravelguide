import { isFactualTier, rankOf } from '@/lib/knowledge/evidence';
import type { Confidence, EvidenceLevel } from '@/lib/knowledge/types';

/**
 * System-derived confidence (Constitution + Phase 1: ordinal, never hand-set).
 * Confidence is a function of evidence tier × verification recency:
 *
 *   Regulation/advisory/standard (tiers 1–3) + verified ≤90d  → confirmed
 *   Operator policy (tiers 4–5)  OR verified ≤180d            → likely
 *   Soft/advisory (tiers 6–7) OR overdue/never verified        → provisional
 *
 * Editors verify facts; the system assigns confidence.
 */
const DAY_MS = 86_400_000;
const CONFIRMED_MAX_DAYS = 90;
const LIKELY_MAX_DAYS = 180;
const REGULATION_MAX_RANK = 3;

export function deriveConfidence(
  evidenceLevel: EvidenceLevel,
  lastVerifiedAt: Date | null,
  now: Date = new Date(),
): Confidence {
  // Tiers 6–7 can never establish more than provisional confidence.
  if (!isFactualTier(evidenceLevel)) return 'provisional';

  const daysSince =
    lastVerifiedAt === null
      ? Number.POSITIVE_INFINITY
      : (now.getTime() - lastVerifiedAt.getTime()) / DAY_MS;

  const rank = rankOf(evidenceLevel);

  if (rank <= REGULATION_MAX_RANK && daysSince <= CONFIRMED_MAX_DAYS) {
    return 'confirmed';
  }
  if (daysSince <= LIKELY_MAX_DAYS) {
    return 'likely';
  }
  return 'provisional';
}
