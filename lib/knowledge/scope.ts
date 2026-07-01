import { rankOf } from '@/lib/knowledge/evidence';
import type { Carriage, EvidenceLevel, TravelType } from '@/lib/knowledge/types';

/**
 * Scope-based resolution primitive (Blueprint Part B / Part 4).
 *
 * A claim is true within a Scope. NULL/empty dimension = ANY. Resolution is
 * most-specific-wins, with highest-evidence as the tie-break. This is the shared
 * brain every surface (web/search/AI/tools/API) calls. Kept deliberately simple
 * — exact-match + ANY-fallback + highest-evidence (no clever inference).
 */

/** A claim's applicability. NULL/empty array on a dimension = ANY. */
export interface Scope {
  origin?: string[] | null;
  destination?: string[] | null;
  transit?: string[] | null;
  travelType?: TravelType[] | null;
  carriage?: Carriage[] | null;
  airline?: string[] | null;
  airport?: string[] | null;
  profile?: string[] | null;
  validFrom?: Date | null;
  validUntil?: Date | null;
}

/** A concrete traveller context — the query resolved against scopes. */
export interface TravelContext {
  origin?: string;
  destination?: string;
  transit?: string;
  travelType?: TravelType;
  carriage?: Carriage;
  airline?: string;
  airport?: string;
  profile?: string;
  date?: Date;
}

function dimensionMatches<T extends string>(
  allowed: readonly T[] | null | undefined,
  value: T | undefined,
): boolean {
  if (!allowed || allowed.length === 0) return true; // ANY
  if (value === undefined) return false; // scope restricts, context unspecified
  return allowed.includes(value);
}

/** True if a claim with `scope` applies to `context`. */
export function matchesScope(scope: Scope, context: TravelContext): boolean {
  const at = context.date ?? new Date();
  if (scope.validFrom && at.getTime() < scope.validFrom.getTime()) return false;
  if (scope.validUntil && at.getTime() > scope.validUntil.getTime()) return false;

  return (
    dimensionMatches(scope.origin, context.origin) &&
    dimensionMatches(scope.destination, context.destination) &&
    dimensionMatches(scope.transit, context.transit) &&
    dimensionMatches(scope.travelType, context.travelType) &&
    dimensionMatches(scope.carriage, context.carriage) &&
    dimensionMatches(scope.airline, context.airline) &&
    dimensionMatches(scope.airport, context.airport) &&
    dimensionMatches(scope.profile, context.profile)
  );
}

/** Count of restricted dimensions — higher = more specific. */
export function scopeSpecificity(scope: Scope): number {
  const dims = [
    scope.origin,
    scope.destination,
    scope.transit,
    scope.travelType,
    scope.carriage,
    scope.airline,
    scope.airport,
    scope.profile,
  ];
  let count = dims.reduce<number>((n, d) => (d && d.length > 0 ? n + 1 : n), 0);
  if (scope.validFrom || scope.validUntil) count += 1;
  return count;
}

export interface Resolvable {
  scope: Scope;
  evidenceLevel: EvidenceLevel;
}

/**
 * Resolve applicable items for a context, ordered best-first:
 *   1. most specific scope wins
 *   2. then highest evidence (lowest rank)
 * The first result is the answer; the remainder are the basis for a
 * "depends on…" presentation when they disagree.
 */
export function resolve<T extends Resolvable>(items: readonly T[], context: TravelContext): T[] {
  return items
    .filter((item) => matchesScope(item.scope, context))
    .sort((a, b) => {
      const spec = scopeSpecificity(b.scope) - scopeSpecificity(a.scope);
      if (spec !== 0) return spec;
      return rankOf(a.evidenceLevel) - rankOf(b.evidenceLevel);
    });
}
