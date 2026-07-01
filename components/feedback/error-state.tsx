import { type ReactNode } from 'react';
import { TriangleAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * ErrorState — a calm, non-technical failure surface. Never leaks internals
 * (Constitution); offers a way forward.
 */
export function ErrorState({
  title = 'Something went wrong',
  description = 'We couldn’t load this right now. Please try again.',
  action,
  className,
}: {
  title?: string;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        'border-border flex flex-col items-center justify-center rounded-xl border px-6 py-12 text-center',
        className,
      )}
    >
      <span className="bg-denied-subtle text-denied-subtle-foreground mb-3 grid size-11 place-items-center rounded-full">
        <TriangleAlert className="size-5" aria-hidden />
      </span>
      <p className="font-medium">{title}</p>
      <p className="text-muted-foreground mt-1 max-w-sm text-sm">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
