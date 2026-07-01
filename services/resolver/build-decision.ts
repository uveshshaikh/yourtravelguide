import { isFactualTier } from '@/lib/knowledge/evidence';
import { toDecisionView, toSourceViews } from '@/services/resolver/mappers';
import type {
  DecisionResult,
  IncompleteReason,
  InsufficientKnowledge,
  RawDecisionInputs,
} from '@/services/resolver/types';

/**
 * buildDecision — the fail-closed core. Pure and DB-free, so every refusal path
 * is unit-tested. Returns exactly one of three states; NEVER a partial or
 * fabricated DecisionView.
 *
 *   not_found   — no topic (STATE 3, Unknown Topic)
 *   incomplete  — topic known, but not enough VERIFIED knowledge (STATE 2)
 *   available   — a fully verified, publishable answer (STATE 1)
 */
export function buildDecision(inputs: RawDecisionInputs, now: Date = new Date()): DecisionResult {
  const { topic, claim } = inputs;

  // STATE 3 — no supported knowledge for this slug.
  if (!topic) return { state: 'not_found' };

  const incomplete = (reason: IncompleteReason): InsufficientKnowledge => ({
    state: 'incomplete',
    topicSlug: topic.slug,
    question: topic.question,
    reason,
  });

  // Must have a published, live claim. (Repositories already filter drafts/
  // deleted; this is defence-in-depth so the resolver itself proves refusal.)
  if (!claim || claim.state !== 'published' || claim.deletedAt !== null) {
    return incomplete('no_published_claim');
  }

  // Must be backed by factual-tier (1–5) evidence — opinion never publishes.
  const hasFactualEvidence = inputs.evidence.some((e) => isFactualTier(e.evidenceLevel));
  if (!hasFactualEvidence) return incomplete('no_evidence');

  // Trust envelope must be complete — we never show a verified date we lack.
  const verifiedAt = claim.lastVerifiedAt;
  if (verifiedAt === null) return incomplete('missing_trust_fields');
  const sources = toSourceViews(inputs.evidence);
  if (sources.length === 0) return incomplete('missing_trust_fields');

  // STATE 1 — build the verified DecisionView. `unresolved` verdict is an
  // honest, allowed answer ("depends on your trip"); it is never a guess.
  const view = toDecisionView(
    topic,
    claim,
    {
      evidence: inputs.evidence,
      exceptions: inputs.exceptions,
      versions: inputs.versions,
      relatedQuestions: inputs.relatedQuestions,
      relatedTopics: inputs.relatedTopics,
    },
    verifiedAt,
    now,
  );
  return { state: 'available', view };
}
