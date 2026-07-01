import { describe, expect, it } from 'vitest';
import { computeReviewDue, isOverdue, reviewSlaDays } from '@/lib/knowledge/volatility';

describe('volatility → review scheduling', () => {
  it('maps tiers to SLA days', () => {
    expect(reviewSlaDays('very_high')).toBe(30);
    expect(reviewSlaDays('low')).toBe(365);
  });

  it('computes review-due from last verification + SLA', () => {
    const verified = new Date('2026-01-01T00:00:00Z');
    const due = computeReviewDue(verified, 'high'); // +90 days
    expect(due.toISOString()).toBe('2026-04-01T00:00:00.000Z');
  });

  it('treats a null review-due as overdue', () => {
    expect(isOverdue(null)).toBe(true);
  });

  it('detects overdue vs current', () => {
    const now = new Date('2026-06-30T00:00:00Z');
    expect(isOverdue(new Date('2026-06-29T00:00:00Z'), now)).toBe(true);
    expect(isOverdue(new Date('2026-07-01T00:00:00Z'), now)).toBe(false);
  });
});
