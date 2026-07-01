import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Inline loading spinner. Pair with visible or sr-only label text. */
export function Spinner({ className, label = 'Loading' }: { className?: string; label?: string }) {
  return (
    <span role="status" className="inline-flex items-center">
      <Loader2 className={cn('text-muted-foreground size-4 animate-spin', className)} aria-hidden />
      <span className="sr-only">{label}</span>
    </span>
  );
}
