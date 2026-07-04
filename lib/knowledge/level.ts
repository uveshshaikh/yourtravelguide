import type { DecisionType } from '@/lib/knowledge/types';

/**
 * Presentation density level (1 quick decision, 2 decision + conditions, 3
 * guide) — NOT a new Knowledge Core field. Derived entirely from
 * `decisionType` plus how much real content a question actually has (its real,
 * non-caveat condition count, and whether it carries any exception) — signals
 * the resolver already exposes on every DecisionView. No new schema, no
 * runtime text inference, no per-question special-casing.
 *
 * Levels do not add or remove sections: every section a level "needs" (verdict,
 * conditions, exceptions, related questions, source) is already conditionally
 * rendered on real data today. What a level actually changes is density —
 * how much room the same building blocks get — since a five-second permission
 * check and a many-condition topic use identical components, just with a
 * different amount of real content behind them.
 */
export type PageLevel = 1 | 2 | 3;

export function classifyLevel(input: {
  decisionType: DecisionType | undefined;
  /** Real (non-caveat) condition rows — i.e. excluding "Note"/"Check" rows. */
  conditionsCount: number;
  hasExceptions: boolean;
}): PageLevel {
  const { decisionType, conditionsCount, hasExceptions } = input;

  // A process or a genuine comparison is inherently a guide, regardless of
  // its condition count — walking through steps, or comparing options, is
  // guide-shaped by definition.
  if (decisionType === 'procedure' || decisionType === 'comparison' || decisionType === 'checklist') {
    return 3;
  }

  // A plain permission verdict is a binary decision by definition — it never
  // needs guide-level depth, no matter how many conditions it accumulates.
  if (decisionType === 'verdict') {
    return conditionsCount <= 2 && !hasExceptions ? 1 : 2;
  }

  // requirement / threshold / decision / emergency: scale with real content.
  if (conditionsCount >= 4) return 3;
  if (conditionsCount <= 1) return 1;
  return 2;
}
