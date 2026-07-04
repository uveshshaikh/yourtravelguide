import type { AnswerKind, DecisionType } from '@/lib/knowledge/types';

/**
 * Deterministic presentation selection for the decision page's "details"
 * block. NOT inferred from question text at runtime — driven entirely by two
 * fields the Knowledge Core already stores and the resolver already populates
 * on every DecisionView: `decisionType` (structure) and `answerKind` (verdict
 * vocabulary). No new field, no schema change, no AI, no per-question
 * special-casing.
 *
 * `decisionType` picks the LAYOUT (numbers vs. steps vs. a plain list).
 * `answerKind` refines the HEADING for the plain-list case, since a
 * requirement, an acceptance and a plain carry question all want a different
 * label on an otherwise identical block.
 */

export type DetailsStyle = 'numbers' | 'steps' | 'list';

export interface Presentation {
  /** Which component renders the conditions. */
  style: DetailsStyle;
  /** The section heading — never a generic "Key details"/"Information". */
  heading: string;
}

const STYLE_BY_DECISION_TYPE: Record<DecisionType, DetailsStyle> = {
  threshold: 'numbers',
  procedure: 'steps',
  verdict: 'list',
  requirement: 'list',
  comparison: 'list', // no comparison data exists yet anywhere — degrades safely
  checklist: 'steps', // a checklist is a sequence too
  decision: 'list',
  emergency: 'list',
};

const HEADING_BY_ANSWER_KIND: Record<AnswerKind, string> = {
  carry: 'What you need',
  requirement: 'Requirements',
  validity: 'The numbers',
  acceptance: "What's accepted",
  recommendation: 'Recommendation',
  eligibility: 'Eligibility',
};

const HEADING_BY_DECISION_TYPE: Partial<Record<DecisionType, string>> = {
  threshold: 'The numbers',
  procedure: 'Step by step',
  checklist: 'Step by step',
};

export function choosePresentation(
  decisionType: DecisionType | undefined,
  answerKind: AnswerKind | undefined,
): Presentation {
  const style = decisionType ? STYLE_BY_DECISION_TYPE[decisionType] : 'list';
  const heading =
    (decisionType && HEADING_BY_DECISION_TYPE[decisionType]) ||
    HEADING_BY_ANSWER_KIND[answerKind ?? 'carry'];
  return { style, heading };
}
