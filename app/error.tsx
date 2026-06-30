'use client';
import { useEffect } from 'react';
import { captureException } from '@/lib/observability';

/**
 * Route-segment error boundary. Catches render/runtime errors in this segment
 * and reports them. Never shows the raw error to the user (Constitution: never
 * leak internals); offers a recovery action.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    captureException(error, { digest: error.digest });
  }, [error]);

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Something went wrong</h1>
      <p className="text-muted-foreground">
        We hit an unexpected problem. The team has been notified.
      </p>
      <button
        onClick={reset}
        className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium"
      >
        Try again
      </button>
    </main>
  );
}
