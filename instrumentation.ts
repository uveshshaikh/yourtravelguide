/**
 * Next.js instrumentation hook — runs once when the server process starts.
 * The single place to initialise process-level observability (error tracker,
 * tracing) before any request is served. Kept minimal in Sprint 1.
 */
export async function register(): Promise<void> {
  // Provider initialisation (Sentry, OpenTelemetry) is wired here when adopted.
}

/** Captures errors thrown in React Server Components / route handlers. */
export async function onRequestError(
  error: unknown,
  request: { path: string; method: string },
): Promise<void> {
  const { captureException } = await import('@/lib/observability');
  captureException(error, { path: request.path, method: request.method });
}
