import { describe, expect, it } from 'vitest';
import { choosePresentation } from '@/lib/knowledge/presentation';
import type { DecisionType } from '@/lib/knowledge/types';

describe('choosePresentation · deterministic, no text inference', () => {
  it('picks numbers for threshold questions (the 11 real limit questions today)', () => {
    expect(choosePresentation('threshold', 'carry').style).toBe('numbers');
    expect(choosePresentation('threshold', 'carry').heading).toBe('The numbers');
  });

  it('picks steps for procedure questions (the 8 real process questions today)', () => {
    expect(choosePresentation('procedure', 'requirement').style).toBe('steps');
    expect(choosePresentation('procedure', 'requirement').heading).toBe('Step by step');
  });

  it('picks a plain list for verdict/requirement, headed by answerKind', () => {
    expect(choosePresentation('verdict', 'carry')).toEqual({
      style: 'list',
      heading: 'What you need',
    });
    expect(choosePresentation('requirement', 'requirement')).toEqual({
      style: 'list',
      heading: 'Requirements',
    });
    expect(choosePresentation('requirement', 'acceptance')).toEqual({
      style: 'list',
      heading: "What's accepted",
    });
    expect(choosePresentation('requirement', 'eligibility')).toEqual({
      style: 'list',
      heading: 'Eligibility',
    });
  });

  it('degrades safely for decision types with no real content yet', () => {
    // comparison/decision/emergency have zero questions today — must never crash,
    // must never show a blank/broken layout.
    const noData: DecisionType[] = ['comparison', 'decision', 'emergency'];
    for (const dt of noData) {
      const p = choosePresentation(dt, 'carry');
      expect(p.style).toBe('list');
      expect(p.heading.length).toBeGreaterThan(0);
    }
  });

  it('falls back to answerKind-driven heading when decisionType is undefined', () => {
    expect(choosePresentation(undefined, 'validity').heading).toBe('The numbers');
    expect(choosePresentation(undefined, 'carry').style).toBe('list');
  });
});
