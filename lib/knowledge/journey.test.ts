import { describe, expect, it } from 'vitest';
import { isForwardTransition } from '@/lib/knowledge/journey';

describe('isForwardTransition (decision-graph directionality)', () => {
  it('allows forward transitions', () => {
    expect(isForwardTransition('before', 'during')).toBe(true);
    expect(isForwardTransition('during', 'after')).toBe(true);
  });

  it('allows same-phase next decisions', () => {
    expect(isForwardTransition('during', 'during')).toBe(true);
  });

  it('rejects backward transitions', () => {
    expect(isForwardTransition('after', 'before')).toBe(false);
    expect(isForwardTransition('during', 'before')).toBe(false);
  });

  it('treats emergency as cross-cutting (always allowed)', () => {
    expect(isForwardTransition('emergency', 'before')).toBe(true);
    expect(isForwardTransition('after', 'emergency')).toBe(true);
  });
});
