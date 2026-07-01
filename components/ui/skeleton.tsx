import { type ComponentProps } from 'react';
import { cn } from '@/lib/utils';

/**
 * Loading skeleton. Use to hold space for content that is still resolving,
 * preventing layout shift. Respects reduced-motion via the global rule.
 */
export function Skeleton({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn('bg-muted animate-pulse rounded-md', className)}
      {...props}
    />
  );
}
