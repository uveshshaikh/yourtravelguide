import { ArrowRight } from 'lucide-react';
import type { Verdict } from '@/lib/knowledge/types';
import { Badge } from '@/components/ui/badge';
import { verdictVisuals } from '@/components/decision/verdict-config';
import { cn } from '@/lib/utils';

/**
 * RuleCard — a single item rule in a list/hub (e.g. "Power bank"): title,
 * verdict, one-line summary, and optional key limits as chips.
 */
export function RuleCard({
  title,
  verdict,
  summary,
  meta,
  href,
  className,
}: {
  title: string;
  verdict: Verdict;
  summary?: string;
  meta?: string[];
  href?: string;
  className?: string;
}) {
  const v = verdictVisuals[verdict];
  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-medium">{title}</h3>
          {summary ? <p className="text-muted-foreground mt-1 text-sm">{summary}</p> : null}
        </div>
        <Badge variant={v.badge}>
          <v.Icon className="size-3.5" aria-hidden />
          {v.label}
        </Badge>
      </div>
      {meta?.length ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {meta.map((m) => (
            <span key={m} className="bg-muted rounded-md px-2 py-0.5 font-mono text-xs">
              {m}
            </span>
          ))}
        </div>
      ) : null}
    </>
  );
  const base = 'block rounded-xl border border-border bg-card p-4';
  return href ? (
    <a href={href} className={cn(base, 'hover:border-primary/40 transition-colors', className)}>
      {inner}
    </a>
  ) : (
    <div className={cn(base, className)}>{inner}</div>
  );
}

type Requirement = 'required' | 'recommended' | 'not_required';
const reqMeta: Record<Requirement, { label: string; variant: 'info' | 'conditional' | 'neutral' }> =
  {
    required: { label: 'Required', variant: 'info' },
    recommended: { label: 'Recommended', variant: 'conditional' },
    not_required: { label: 'Not required', variant: 'neutral' },
  };

/**
 * RequirementCard — a document/requirement (e.g. "Valid passport"): whether it's
 * required, recommended, or not, with detail.
 */
export function RequirementCard({
  title,
  requirement,
  detail,
  href,
  className,
}: {
  title: string;
  requirement: Requirement;
  detail?: string;
  href?: string;
  className?: string;
}) {
  const r = reqMeta[requirement];
  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{title}</h3>
          {href ? <ArrowRight className="text-muted-foreground size-4" aria-hidden /> : null}
        </div>
        <Badge variant={r.variant}>{r.label}</Badge>
      </div>
      {detail ? <p className="text-muted-foreground mt-1 text-sm">{detail}</p> : null}
    </>
  );
  const base = 'block rounded-xl border border-border bg-card p-4';
  return href ? (
    <a href={href} className={cn(base, 'hover:border-primary/40 transition-colors', className)}>
      {inner}
    </a>
  ) : (
    <div className={cn(base, className)}>{inner}</div>
  );
}
