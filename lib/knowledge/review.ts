import type { ReviewState } from '@/lib/knowledge/labels';

/**
 * Shared review-status helper. The UI review state is DERIVED from `reviewDue`
 * vs now — never stored, never faked. One function so every surface agrees.
 *
 *   overdue   — past due, or never scheduled (a fact with no review date is
 *               treated as needing review, not as "current").
 *   due_soon  — due within the window.
 *   current   — comfortably in date.
 */
const DAY_MS = 86_400_000;
const DUE_SOON_WINDOW_DAYS = 30;

export function reviewStateOf(reviewDue: Date | null, now: Date = new Date()): ReviewState {
  if (reviewDue === null) return 'overdue';
  const daysUntilDue = (reviewDue.getTime() - now.getTime()) / DAY_MS;
  if (daysUntilDue < 0) return 'overdue';
  if (daysUntilDue <= DUE_SOON_WINDOW_DAYS) return 'due_soon';
  return 'current';
}
