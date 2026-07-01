'use client';
import { useState } from 'react';
import { Flag, ThumbsDown, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * FeedbackWidget — "Was this helpful?" plus an always-available "Report an
 * error" link (the human-in-the-loop correction path from the Constitution).
 * Local UI state only; wiring to a backend is a later sprint.
 */
export function FeedbackWidget({
  reportHref = '#',
  className,
}: {
  reportHref?: string;
  className?: string;
}) {
  const [voted, setVoted] = useState<'up' | 'down' | null>(null);

  const btn =
    'inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted';

  return (
    <div
      data-no-print
      className={cn(
        'border-border bg-card flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4',
        className,
      )}
    >
      {voted ? (
        <p className="text-muted-foreground text-sm" role="status">
          Thanks — your feedback helps us keep answers accurate.
        </p>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Was this helpful?</span>
          <button type="button" onClick={() => setVoted('up')} className={btn}>
            <ThumbsUp className="size-4" aria-hidden />
            Yes
          </button>
          <button type="button" onClick={() => setVoted('down')} className={btn}>
            <ThumbsDown className="size-4" aria-hidden />
            No
          </button>
        </div>
      )}
      <a
        href={reportHref}
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm hover:underline"
      >
        <Flag className="size-3.5" aria-hidden />
        Report an error
      </a>
    </div>
  );
}
