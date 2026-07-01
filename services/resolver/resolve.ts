import 'server-only';
import { buildDecision } from '@/services/resolver/build-decision';
import { gatherDecisionInputs } from '@/services/resolver/gather';
import type { TravelContext } from '@/lib/knowledge/scope';
import type { DecisionResult } from '@/services/resolver/types';

/**
 * resolveDecision — the ONLY supported way to produce a DecisionView for
 * production rendering. Gathers from the Knowledge Core, then applies the pure
 * fail-closed contract. Returns Available | Incomplete | NotFound.
 */
export async function resolveDecision(
  slug: string,
  context: TravelContext = {},
): Promise<DecisionResult> {
  const inputs = await gatherDecisionInputs(slug, context);
  return buildDecision(inputs);
}
