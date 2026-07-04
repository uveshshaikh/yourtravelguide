import { describe, expect, it } from 'vitest';
import { classifyLevel } from '@/lib/knowledge/level';

describe('classifyLevel · deterministic, no per-question special-casing', () => {
  it('caps a plain verdict at Level 1 when it has ≤2 conditions and no exceptions', () => {
    // real example: can-i-carry-a-smartwatch-on-a-flight (2 conditions, no exceptions)
    expect(classifyLevel({ decisionType: 'verdict', conditionsCount: 2, hasExceptions: false })).toBe(
      1,
    );
  });

  it('caps a verdict at Level 2, never 3, however many conditions it has', () => {
    // real example: can-i-carry-a-power-bank-on-a-flight (4 conditions, 1 exception) —
    // a permission yes/no is never a "guide", even when content-rich.
    expect(classifyLevel({ decisionType: 'verdict', conditionsCount: 4, hasExceptions: true })).toBe(
      2,
    );
    expect(classifyLevel({ decisionType: 'verdict', conditionsCount: 3, hasExceptions: false })).toBe(
      2,
    );
  });

  it('an exception alone is enough to lift a verdict question out of Level 1', () => {
    expect(classifyLevel({ decisionType: 'verdict', conditionsCount: 1, hasExceptions: true })).toBe(
      2,
    );
  });

  it('a procedure or comparison is always Level 3, regardless of condition count', () => {
    expect(
      classifyLevel({ decisionType: 'procedure', conditionsCount: 1, hasExceptions: false }),
    ).toBe(3);
    expect(
      classifyLevel({ decisionType: 'comparison', conditionsCount: 0, hasExceptions: false }),
    ).toBe(3);
    expect(
      classifyLevel({ decisionType: 'checklist', conditionsCount: 2, hasExceptions: false }),
    ).toBe(3);
  });

  it('requirement/threshold questions scale with real condition count', () => {
    // real example: do-i-need-a-visa-to-travel-abroad (2 conditions)
    expect(
      classifyLevel({ decisionType: 'requirement', conditionsCount: 2, hasExceptions: false }),
    ).toBe(2);
    // real example: how-much-liquid-can-i-carry-in-hand-baggage (3 conditions)
    expect(
      classifyLevel({ decisionType: 'threshold', conditionsCount: 3, hasExceptions: false }),
    ).toBe(2);
    // real example: how-much-gold-can-i-bring-into-india-from-abroad (4 conditions)
    expect(
      classifyLevel({ decisionType: 'threshold', conditionsCount: 4, hasExceptions: false }),
    ).toBe(3);
    // no real question has 0 conditions today, but the rule must degrade safely
    expect(
      classifyLevel({ decisionType: 'requirement', conditionsCount: 0, hasExceptions: false }),
    ).toBe(1);
  });

  it('falls back sensibly when decisionType is undefined', () => {
    expect(classifyLevel({ decisionType: undefined, conditionsCount: 1, hasExceptions: false })).toBe(
      1,
    );
    expect(classifyLevel({ decisionType: undefined, conditionsCount: 4, hasExceptions: false })).toBe(
      3,
    );
  });
});
