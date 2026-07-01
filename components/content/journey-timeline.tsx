import { Check } from 'lucide-react';
import type { JourneyStepView } from '@/lib/knowledge/view';
import { timePhaseLabel } from '@/lib/knowledge/labels';
import { cn } from '@/lib/utils';

/**
 * JourneyTimeline — the trip as an ordered, time-forward path (Plan → Airport →
 * After). Turns isolated answers into a guided journey; the current step is
 * emphasised so travellers know where they are.
 */
export function JourneyTimeline({
  steps,
  className,
}: {
  steps: JourneyStepView[];
  className?: string;
}) {
  if (steps.length === 0) return null;
  return (
    <ol className={cn('space-y-0', className)}>
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        const status = step.status ?? 'upcoming';
        return (
          <li key={step.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  'grid size-7 shrink-0 place-items-center rounded-full border text-xs font-medium',
                  status === 'done' && 'border-primary bg-primary text-primary-foreground',
                  status === 'current' && 'border-primary text-primary ring-primary/20 ring-2',
                  status === 'upcoming' && 'border-border bg-muted text-muted-foreground',
                )}
                aria-hidden
              >
                {status === 'done' ? <Check className="size-4" /> : i + 1}
              </span>
              {!isLast ? <span className="bg-border w-px flex-1" aria-hidden /> : null}
            </div>
            <div className={cn('pb-6', isLast && 'pb-0')}>
              <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                {timePhaseLabel[step.phase]}
              </p>
              {step.href ? (
                <a href={step.href} className="hover:text-primary font-medium hover:underline">
                  {step.title}
                </a>
              ) : (
                <p className="font-medium">{step.title}</p>
              )}
              {step.description ? (
                <p className="text-muted-foreground mt-0.5 text-sm">{step.description}</p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
