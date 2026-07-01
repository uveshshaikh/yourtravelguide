import type { ExceptionView } from '@/lib/knowledge/view';
import { Badge } from '@/components/ui/badge';
import { verdictVisuals } from '@/components/decision/verdict-config';
import { cn } from '@/lib/utils';

/**
 * ExceptionsPanel — profile/route-specific deltas on the base answer (medical
 * travellers, minors, specific airlines). Surfacing these plainly is where trust
 * is won: the edge case that changes *your* answer is never buried.
 */
export function ExceptionsPanel({
  exceptions,
  className,
}: {
  exceptions: ExceptionView[];
  className?: string;
}) {
  if (exceptions.length === 0) return null;
  return (
    <section
      aria-labelledby="exceptions-heading"
      className={cn('border-border bg-card rounded-xl border p-5', className)}
    >
      <h2 id="exceptions-heading" className="text-sm font-semibold">
        Exceptions
      </h2>
      <ul className="mt-3 space-y-3">
        {exceptions.map((ex) => {
          const v = ex.verdictOverride ? verdictVisuals[ex.verdictOverride] : null;
          return (
            <li key={ex.id} className="border-border bg-subtle rounded-lg border p-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium">{ex.appliesTo}</span>
                {v ? (
                  <Badge variant={v.badge}>
                    <v.Icon className="size-3.5" aria-hidden />
                    {v.label}
                  </Badge>
                ) : null}
              </div>
              <p className="text-muted-foreground mt-1 text-sm">{ex.detail}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
