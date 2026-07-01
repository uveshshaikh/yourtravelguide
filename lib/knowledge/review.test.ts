import { describe, expect, it } from 'vitest';
import { reviewStateOf } from '@/lib/knowledge/review';

const now = new Date('2026-07-01T00:00:00Z');
const daysFromNow = (n: number) => new Date(now.getTime() + n * 86_400_000);

describe('reviewStateOf', () => {
  it('is overdue when review date is null (never scheduled)', () => {
    expect(reviewStateOf(null, now)).toBe('overdue');
  });

  it('is overdue when the due date has passed', () => {
    expect(reviewStateOf(daysFromNow(-1), now)).toBe('overdue');
  });

  it('is due_soon within the 30-day window', () => {
    expect(reviewStateOf(daysFromNow(10), now)).toBe('due_soon');
    expect(reviewStateOf(daysFromNow(30), now)).toBe('due_soon');
  });

  it('is current comfortably before the due date', () => {
    expect(reviewStateOf(daysFromNow(31), now)).toBe('current');
    expect(reviewStateOf(daysFromNow(200), now)).toBe('current');
  });
});
