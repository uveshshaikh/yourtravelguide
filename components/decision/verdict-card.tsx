import { ArrowRight } from 'lucide-react';
import type { AnswerKind, Verdict } from '@/lib/knowledge/types';
import { Badge } from '@/components/ui/badge';
import { verdictDisplay } from '@/components/decision/verdict-config';
import { answerKindForSlug } from '@/db/seed/content';
import { cn } from '@/lib/utils';

/**
 * VerdictCard — a compact question + verdict, for lists, related questions and
 * search results. Optionally a link (whole card is the target). The verdict is
 * worded for its decision type; when `answerKind` isn't passed it's inferred
 * from the linked question's slug.
 */
export function VerdictCard({
  question,
  verdict,
  answerKind,
  answer,
  href,
  className,
}: {
  question: string;
  verdict: Verdict;
  answerKind?: AnswerKind;
  answer?: string;
  href?: string;
  className?: string;
}) {
  const slug = href?.split('/question/')[1];
  const v = verdictDisplay(answerKind ?? (slug ? answerKindForSlug(slug) : undefined), verdict);
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <p className="font-medium text-pretty">{question}</p>
        {href ? (
          <ArrowRight
            className="text-muted-foreground mt-1 size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        ) : null}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <Badge variant={v.badge}>
          <v.Icon className="size-3.5" aria-hidden />
          {v.label}
        </Badge>
        {answer ? <span className="text-muted-foreground truncate text-sm">{answer}</span> : null}
      </div>
    </>
  );

  const base = 'block rounded-xl border border-border bg-card p-4 text-left';
  if (href) {
    return (
      <a
        href={href}
        className={cn(base, 'group hover:border-primary/40 transition-colors', className)}
      >
        {body}
      </a>
    );
  }
  return <div className={cn(base, className)}>{body}</div>;
}
