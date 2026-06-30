import { clientEnv } from '@/lib/env';

/**
 * Feature flags — static, environment-driven for now.
 *
 * Sprint 1 keeps flags as typed constants resolved from the app environment.
 * This is intentionally the simplest thing that works (Constitution: "Simple
 * beats clever"). When runtime/remote flags are genuinely needed, this module's
 * shape (a typed `flags` object) stays the same; only the resolution changes.
 */
const isProd = clientEnv.NEXT_PUBLIC_APP_ENV === 'production';

export const flags = {
  /** Master switch for any not-yet-public surface. */
  comingSoonMode: false,
  /** Verbose client diagnostics — never in production. */
  debugPanels: !isProd,
} as const;

export type Flags = typeof flags;

export function isEnabled(flag: keyof Flags): boolean {
  return flags[flag] === true;
}
