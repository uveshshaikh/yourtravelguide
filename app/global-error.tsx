'use client';
import { useEffect } from 'react';
import { captureException } from '@/lib/observability';

/**
 * Last-resort boundary for errors thrown in the root layout itself.
 * Must render its own <html>/<body> because it replaces the root layout.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    captureException(error, { digest: error.digest, boundary: 'global' });
  }, [error]);

  return (
    <html lang="en-IN">
      <body
        style={{
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center',
          padding: '1.5rem',
        }}
      >
        <h1>Something went wrong</h1>
        <p>Please refresh the page. If the problem persists, try again later.</p>
        <button onClick={reset}>Try again</button>
      </body>
    </html>
  );
}
