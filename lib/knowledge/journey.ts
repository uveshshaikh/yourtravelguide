import type { TimePhase } from '@/lib/knowledge/types';

/**
 * Journey-phase ordering. The decision graph flows forward in time
 * (Before → During → After); a `next_decision` edge may never point backward
 * (Blueprint Part 10). Emergency is cross-cutting — reachable from/to any phase.
 */
export const TIME_PHASE_ORDER: Record<TimePhase, number> = {
  before: 0,
  during: 1,
  after: 2,
  emergency: 3,
};

/** True if a `next_decision` edge from → to respects forward directionality. */
export function isForwardTransition(from: TimePhase, to: TimePhase): boolean {
  if (from === 'emergency' || to === 'emergency') return true;
  return TIME_PHASE_ORDER[from] <= TIME_PHASE_ORDER[to];
}
