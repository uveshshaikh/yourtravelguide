import { describe, expect, it } from 'vitest';
import { verdictDisplay } from '@/components/decision/verdict-config';
import type { AnswerKind, Verdict } from '@/lib/knowledge/types';

/**
 * The verdict VOCABULARY must match the decision type. These tests lock the rule
 * that "Not allowed" (and "Allowed") only ever appear on carry questions.
 */
describe('verdictDisplay · decision-type-aware vocabulary', () => {
  it('carry uses the allow/deny vocabulary', () => {
    expect(verdictDisplay('carry', 'allowed').label).toBe('Allowed');
    expect(verdictDisplay('carry', 'allowed_with_conditions').label).toBe(
      'Allowed with conditions',
    );
    expect(verdictDisplay('carry', 'not_allowed').label).toBe('Not allowed');
  });

  it('requirement says Required / Not required / Depends — never Not allowed', () => {
    expect(verdictDisplay('requirement', 'allowed').label).toBe('Required');
    expect(verdictDisplay('requirement', 'allowed_with_conditions').label).toBe('Depends');
    expect(verdictDisplay('requirement', 'not_allowed').label).toBe('Not required');
    // "Not required" is reassuring, so it reads as a positive tone.
    expect(verdictDisplay('requirement', 'not_allowed').tone).toBe('positive');
  });

  it('validity, acceptance, recommendation and eligibility use their own words', () => {
    expect(verdictDisplay('validity', 'allowed_with_conditions').label).toBe('Minimum required');
    expect(verdictDisplay('acceptance', 'not_allowed').label).toBe('Not accepted');
    expect(verdictDisplay('recommendation', 'allowed').label).toBe('Recommended');
    expect(verdictDisplay('recommendation', 'allowed_with_conditions').label).toBe('Optional');
    expect(verdictDisplay('eligibility', 'allowed_with_conditions').label).toBe(
      'Eligible with conditions',
    );
  });

  it('never shows "Allowed"/"Not allowed" outside carry questions', () => {
    const nonCarry: AnswerKind[] = [
      'requirement',
      'validity',
      'acceptance',
      'recommendation',
      'eligibility',
    ];
    const verdicts: Verdict[] = ['allowed', 'allowed_with_conditions', 'not_allowed', 'unresolved'];
    for (const kind of nonCarry) {
      for (const verdict of verdicts) {
        const label = verdictDisplay(kind, verdict).label.toLowerCase();
        expect(label).not.toContain('allowed');
      }
    }
  });

  it('defaults to carry when no decision type is given', () => {
    expect(verdictDisplay(undefined, 'not_allowed').label).toBe('Not allowed');
  });
});
