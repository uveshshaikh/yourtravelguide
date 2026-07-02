import { describe, expect, it } from 'vitest';
import { answerKindForSlug, TRAVEL_QUESTIONS } from '@/db/seed/content';
import { verdictDisplay } from '@/components/decision/verdict-config';
import { summaryContradictsVerdict } from '@/lib/knowledge/decision-validation';

/** The displayed verdict label for a registry question. */
function labelOf(slug: string): string {
  const q = TRAVEL_QUESTIONS.find((x) => x.slug === slug)!;
  return verdictDisplay(answerKindForSlug(slug), q.verdict).label;
}

describe('content registry · decision-type audit (no page exempt)', () => {
  it('every question has a decision type and a non-empty summary', () => {
    for (const q of TRAVEL_QUESTIONS) {
      expect(answerKindForSlug(q.slug)).toBeTruthy();
      expect(q.summary.trim().length).toBeGreaterThan(0);
    }
  });

  it('no question’s explanation contradicts its verdict', () => {
    const contradictions = TRAVEL_QUESTIONS.filter((q) =>
      summaryContradictsVerdict(q.verdict, q.summary),
    ).map((q) => q.slug);
    expect(contradictions).toEqual([]);
  });

  it('renders the correct verdict vocabulary per decision type', () => {
    // Carry
    expect(labelOf('can-i-carry-a-lighter-on-a-flight')).toBe('Not allowed');
    expect(labelOf('can-i-carry-a-power-bank-on-a-flight')).toBe('Allowed with conditions');
    expect(labelOf('can-i-carry-a-laptop-in-hand-baggage')).toBe('Allowed');
    expect(labelOf('can-i-carry-an-e-cigarette-or-vape-on-a-flight')).toBe('Not allowed');
    // Requirement — never "Allowed"/"Not allowed"
    expect(labelOf('do-children-need-a-passport-to-fly-internationally')).toBe('Required');
    expect(labelOf('what-id-do-i-need-for-a-domestic-flight-in-india')).toBe('Required');
    expect(labelOf('do-i-need-a-visa-to-travel-abroad')).toBe('Depends');
    expect(labelOf('is-web-check-in-mandatory-for-flights')).toBe('Not required');
    // Validity
    expect(labelOf('how-much-passport-validity-do-i-need-to-travel-abroad')).toBe(
      'Minimum required',
    );
    // Acceptance
    expect(labelOf('can-i-use-digital-aadhaar-as-id-for-a-domestic-flight')).toBe(
      'Accepted with conditions',
    );
    // Eligibility
    expect(labelOf('can-i-use-digiyatra-for-domestic-flights')).toBe('Eligible with conditions');
    // Recommendation
    expect(labelOf('how-early-should-i-reach-the-airport')).toBe('Recommended');
  });

  it('the children-passport page reads "Required" with an affirmative explanation', () => {
    const q = TRAVEL_QUESTIONS.find(
      (x) => x.slug === 'do-children-need-a-passport-to-fly-internationally',
    )!;
    expect(labelOf(q.slug)).toBe('Required');
    expect(q.summary.toLowerCase()).toMatch(/^yes/);
    expect(summaryContradictsVerdict(q.verdict, q.summary)).toBe(false);
  });
});
