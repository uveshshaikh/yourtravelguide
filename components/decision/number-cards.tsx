import type { ConditionView } from '@/lib/knowledge/view';
import { isCaveatCondition } from '@/lib/knowledge/presentation';

/**
 * A short figure ("7 kg") reads as a headline number. A measurement string
 * ("55 × 35 × 25 cm (~115 cm total)") is still a number, just a longer one —
 * it earns bold weight but not display size, or it wraps into an oversized
 * block. A full phrase ("Usually one small bag allowed") is a sentence, not
 * a number, and must read as plain body text. Length is a blunt but reliable
 * signal for telling these apart in real threshold content.
 */
function valueSizeClass(value: string): string {
  if (value.length <= 16) return 'text-2xl font-semibold tracking-tight';
  if (value.length <= 36) return 'text-lg font-semibold tracking-tight';
  return 'text-base font-medium leading-snug';
}

/**
 * NumberCards — for threshold ("How much…") questions. Short figures get
 * headline treatment; longer values read as normal text — the size adapts to
 * the content instead of forcing every value to the same display size. No
 * bordered/background container: a box around the figures would compete with
 * them instead of getting out of the way. Caveat rows ("Note"/"Check") sit
 * below as small muted text, separated by a hairline only when both groups
 * are present. Renders only real condition rows from the Knowledge Core —
 * never a fabricated or estimated value.
 */
export function NumberCards({ conditions }: { conditions: ConditionView[] }) {
  const stats = conditions.filter((c) => !isCaveatCondition(c.label));
  const caveats = conditions.filter((c) => isCaveatCondition(c.label));

  return (
    <div>
      <div className="flex flex-wrap gap-x-10 gap-y-4">
        {stats.map((c) => (
          <div key={c.label}>
            <dd className={`text-foreground text-balance ${valueSizeClass(c.value ?? '')}`}>
              {c.value ?? '—'}
            </dd>
            <dt className="text-muted-foreground mt-1 text-xs font-medium tracking-wide uppercase">
              {c.label}
            </dt>
          </div>
        ))}
      </div>
      {caveats.length > 0 ? (
        <div className={stats.length > 0 ? 'border-border mt-5 space-y-1 border-t pt-4' : ''}>
          {caveats.map((c) => (
            <p key={c.label} className="text-muted-foreground text-sm">
              {c.value}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}
