import { AppError } from '@/lib/errors';

/** Actor performing a write — stamped into audit columns. */
export type Actor = string | undefined;

/**
 * Drizzle `.returning()` yields an array; for single-row writes we expect
 * exactly one. Fail loudly rather than silently returning undefined.
 */
export function firstOrThrow<T>(rows: T[], what = 'record'): T {
  const row = rows[0];
  if (row === undefined) {
    throw AppError.internal(`Expected to write one ${what}, got none`);
  }
  return row;
}

export function first<T>(rows: T[]): T | null {
  return rows[0] ?? null;
}
