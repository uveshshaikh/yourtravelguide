'use client';
import { Printer } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * PrintButton — triggers the browser print dialog. Paired with the global
 * `@media print` rules (in globals.css) that strip chrome (`[data-no-print]`,
 * header, footer) so a traveller can print or save a clean PDF of the answer to
 * carry offline.
 */
export function PrintButton({
  className,
  label = 'Print',
}: {
  className?: string;
  label?: string;
}) {
  return (
    <button
      type="button"
      data-no-print
      onClick={() => window.print()}
      className={cn(
        'border-border hover:bg-muted inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors',
        className,
      )}
    >
      <Printer className="size-4" aria-hidden />
      {label}
    </button>
  );
}
