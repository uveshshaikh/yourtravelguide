import type { Verdict } from '@/lib/knowledge/types';

/**
 * Decision coherence — the MANDATORY validation gate. The verdict is generated
 * from (decision type + verified knowledge); the explanation must AGREE with it.
 * We never infer the verdict from the prose, but we DO refuse to render a page
 * whose prose contradicts its stored verdict (e.g. an affirmative "Required"
 * verdict whose summary starts with "No, …"). Fail closed: show nothing rather
 * than a self-contradicting answer.
 *
 * Pure + dependency-free so it runs at build-time (content audit test) and at
 * request-time (resolver guard) alike.
 */

function leadsNegative(summary: string): boolean {
  return /^\s*(no\b|no,|no—|not\b|never\b|prohibit|banned|you can[’']?t|you cannot)/i.test(summary);
}

function leadsAffirmative(summary: string): boolean {
  return /^\s*(yes\b|yes,|yes—|required\b|valid\b|accepted\b|eligible\b|recommended\b|allowed\b|you (can|need|must))/i.test(
    summary,
  );
}

/**
 * True when the explanation clearly contradicts the stored verdict polarity.
 * Conservative on purpose (only flags a leading yes/no that opposes the verdict)
 * so a valid page is never hidden by an over-eager check.
 */
export function summaryContradictsVerdict(verdict: Verdict, summary: string): boolean {
  const s = summary.trim();
  if (s.length === 0) return true; // an answer with no explanation can't be trusted
  // Affirmative verdicts must not open with a negative claim.
  if (verdict === 'allowed' && leadsNegative(s)) return true;
  // Negative verdicts must not open with an affirmative claim.
  if (verdict === 'not_allowed' && leadsAffirmative(s)) return true;
  return false;
}
