/**
 * Shared, cross-cutting types. Domain types (Claim, Fact, Entity, …) live with
 * their feature/schema in later sprints — this file is for primitives only.
 */

/** Discriminated result type for operations that can fail without throwing. */
export type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

export function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

/** Make every property optional and nullable — for partial drafts. */
export type Nullable<T> = { [K in keyof T]: T[K] | null };

/** ISO-8601 date string brand for clarity at type level. */
export type IsoDateString = string & { readonly __brand: 'IsoDateString' };
