/**
 * Resolver — the single supported path from Knowledge Core to ViewModels.
 * Routes import from here; they never touch repositories or the DB directly.
 */
export { resolveDecision } from '@/services/resolver/resolve';
export {
  resolveEntityPage,
  type EntityPageResult,
  type EntityPageView,
  type EntityQuestionView,
} from '@/services/resolver/entity-resolve';
export type {
  DecisionResult,
  DecisionAvailable,
  InsufficientKnowledge,
  DecisionNotFound,
} from '@/services/resolver/types';
