import { type ComponentProps } from 'react';
import { cn } from '@/lib/utils';

/** Keyboard-key hint, e.g. the "/" shortcut on the search field. */
export function Kbd({ className, ...props }: ComponentProps<'kbd'>) {
  return (
    <kbd
      className={cn(
        'border-border bg-muted text-muted-foreground inline-flex h-5 min-w-5 items-center justify-center rounded border px-1.5 font-mono text-[0.7rem] font-medium',
        className,
      )}
      {...props}
    />
  );
}
