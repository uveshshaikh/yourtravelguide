import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

/**
 * DecisionSkeleton — loading placeholder shaped like the decision page, so the
 * answer's position is reserved and there's no layout shift when it resolves.
 */
export function DecisionSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-6', className)} aria-hidden>
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-9 w-3/4" />
      <Skeleton className="h-28 w-full rounded-xl" />
      <div className="grid gap-3 sm:grid-cols-2">
        <Skeleton className="h-10 rounded-lg" />
        <Skeleton className="h-10 rounded-lg" />
      </div>
      <Skeleton className="h-40 w-full rounded-xl" />
      <Skeleton className="h-24 w-full rounded-xl" />
    </div>
  );
}
