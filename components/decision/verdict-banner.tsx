import type { Verdict } from '@/lib/knowledge/types';
import type { Validity } from '@/lib/knowledge/types';
import { validityLabel } from '@/lib/knowledge/labels';
import { verdictVisuals } from '@/components/decision/verdict-config';
import { cn } from '@/lib/utils';

/**
 * VerdictBanner — the answer, front and centre. The single most important
 * element on any decision page: colour-coded verdict + the one-sentence answer,
 * readable in a glance on a phone in a security queue.
 */
export function VerdictBanner({
  verdict,
  answer,
  validity,
  className,
}: {
  verdict: Verdict;
  answer: string;
  validity?: Validity;
  className?: string;
}) {
  const v = verdictVisuals[verdict];
  const showValidity = validity && validity !== 'stable';
  return (
    <div
      className={cn('rounded-xl border p-5 sm:p-6', v.banner, className)}
      role="status"
      aria-label={`Verdict: ${v.label}`}
    >
      <div className="flex items-start gap-3">
        <v.Icon className="mt-0.5 size-6 shrink-0" aria-hidden />
        <div className="min-w-0">
          <p className="text-sm font-semibold tracking-wide uppercase">{v.label}</p>
          <p className="mt-1 text-lg font-medium text-balance sm:text-xl">{answer}</p>
          {showValidity ? (
            <p className="mt-2 inline-flex items-center rounded-full border border-current/25 px-2 py-0.5 text-xs font-medium">
              {validityLabel[validity]}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
