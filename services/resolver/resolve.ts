import 'server-only';
import { buildDecision } from '@/services/resolver/build-decision';
import { gatherDecisionInputs } from '@/services/resolver/gather';
import { answerKindForSlug } from '@/db/seed/content';
import { summaryContradictsVerdict } from '@/lib/knowledge/decision-validation';
import type { TravelContext } from '@/lib/knowledge/scope';
import type { DecisionResult } from '@/services/resolver/types';

/**
 * resolveDecision — the ONLY supported way to produce a DecisionView for
 * production rendering. Gathers from the Knowledge Core, then applies the pure
 * fail-closed contract. Returns Available | Incomplete | NotFound.
 *
 * The decision type (AnswerKind) that governs the verdict VOCABULARY is attached
 * here from the content registry, so the page renders the right words.
 */
export async function resolveDecision(
  slug: string,
  context: TravelContext = {},
): Promise<DecisionResult> {
  const inputs = await gatherDecisionInputs(slug, context);
  const result = buildDecision(inputs);
  if (result.state === 'available') {
    result.view.answerKind = answerKindForSlug(slug);
    // MANDATORY validation: the verdict and its explanation must agree. If they
    // contradict, refuse to render (fail closed) rather than mislead.
    if (summaryContradictsVerdict(result.view.verdict, result.view.answer)) {
      return {
        state: 'incomplete',
        topicSlug: slug,
        question: result.view.question,
        reason: 'verdict_incoherent',
      };
    }
  }
  return result;
}
