import type { Volatility } from '@/lib/knowledge/types';

/**
 * Volatility → review SLA (Phase 2 §8). A node inherits the tightest tier of
 * the facts it cites. Enforced by the review-date CI gate.
 */
export const REVIEW_SLA_DAYS: Record<Volatility, number> = {
  very_high: 30,
  high: 90,
  medium: 180,
  low: 365,
};

const DAY_MS = 86_400_000;

export function reviewSlaDays(volatility: Volatility): number {
  return REVIEW_SLA_DAYS[volatility];
}

/** When the next review is due, given the last verification and volatility. */
export function computeReviewDue(lastVerifiedAt: Date, volatility: Volatility): Date {
  return new Date(lastVerifiedAt.getTime() + REVIEW_SLA_DAYS[volatility] * DAY_MS);
}

export function isOverdue(reviewDue: Date | null, now: Date = new Date()): boolean {
  if (reviewDue === null) return true; // never scheduled = treat as overdue
  return now.getTime() > reviewDue.getTime();
}
