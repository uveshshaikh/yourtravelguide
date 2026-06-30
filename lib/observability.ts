import { clientEnv } from '@/lib/env';
import { logger } from '@/lib/logger';
import { toError } from '@/lib/errors';

/**
 * Observability seam — error tracking + product analytics behind one interface.
 *
 * Default implementation is a safe no-op that routes to the logger, so the app
 * runs fully without any third-party account. When a provider (e.g. Sentry,
 * PostHog) is adopted, wire it HERE only. Call sites across the app stay stable.
 * This honours "avoid unnecessary dependencies" — we add the SDK when we use it,
 * not before, and the abstraction means adoption is non-breaking.
 */

const SENTRY_ENABLED = clientEnv.NEXT_PUBLIC_SENTRY_DSN.length > 0;

/** Report an unexpected error to the error-tracking backend. */
export function captureException(error: unknown, context?: Record<string, unknown>): void {
  const err = toError(error);
  logger.error(err.message, { ...context, stack: err.stack });
  if (SENTRY_ENABLED) {
    // TODO(observability): forward to Sentry once @sentry/nextjs is adopted.
  }
}

/** Record a product analytics event. Provider-agnostic by design. */
export function trackEvent(name: string, properties?: Record<string, unknown>): void {
  logger.debug(`event:${name}`, properties);
  if (SENTRY_ENABLED) {
    // TODO(observability): forward to analytics provider.
  }
}
