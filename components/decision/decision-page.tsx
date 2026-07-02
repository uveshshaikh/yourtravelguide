import { ArrowLeft, BadgeCheck, Info } from 'lucide-react';
import type { BreadcrumbItemView, DecisionView } from '@/lib/knowledge/view';
import { Container } from '@/components/layout/container';
import { VerdictBanner } from '@/components/decision/verdict-banner';
import { RelatedQuestions } from '@/components/content/related';
import { formatDate } from '@/lib/format';

/**
 * DecisionPage — one calm, scannable answer. Deliberately minimal: the verdict,
 * the few details that matter, any real exception, related questions, and a
 * single quiet "verified · source" line. No route/airline/traveller panels, no
 * trust dashboards — a rushed traveller sees only what they need to decide.
 */
export function DecisionPage({
  decision,
}: {
  decision: DecisionView;
  /** Accepted for route compatibility; the visible nav is the back link. */
  breadcrumb?: BreadcrumbItemView[];
}) {
  const d = decision;
  const source = d.sources[0];

  return (
    <Container className="max-w-2xl py-8 sm:py-10">
      <a
        href="/search"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
      >
        <ArrowLeft className="size-4" aria-hidden />
        All questions
      </a>

      <h1 className="mt-5 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
        {d.question}
      </h1>

      {/* The answer — front and centre. */}
      <div className="mt-5">
        <VerdictBanner verdict={d.verdict} answer={d.answer} validity={d.trust.validity} />
      </div>

      {/* The few details that matter. */}
      {d.conditions?.length ? (
        <section className="mt-8">
          <h2 className="text-sm font-semibold tracking-wide uppercase">Key details</h2>
          <dl className="border-border divide-border mt-3 divide-y rounded-xl border">
            {d.conditions.map((c) => (
              <div key={c.label} className="flex items-baseline justify-between gap-4 px-4 py-3">
                <dt className="text-muted-foreground text-sm">{c.label}</dt>
                <dd className="text-right text-sm font-medium">{c.value ?? '—'}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {/* Genuinely useful exceptions only (e.g. medical travellers). */}
      {d.exceptions?.length ? (
        <section className="mt-6 space-y-3">
          {d.exceptions.map((ex) => (
            <div
              key={ex.id}
              className="border-border bg-subtle flex gap-3 rounded-xl border p-4 text-sm"
            >
              <Info className="text-muted-foreground mt-0.5 size-4 shrink-0" aria-hidden />
              <p className="text-pretty">
                <span className="font-medium capitalize">{ex.appliesTo} travellers: </span>
                <span className="text-muted-foreground">{ex.detail}</span>
              </p>
            </div>
          ))}
        </section>
      ) : null}

      {/* Related questions — simple next steps. */}
      {d.relatedQuestions?.length ? (
        <RelatedQuestions items={d.relatedQuestions} className="mt-10" />
      ) : null}

      {/* One quiet trust line — verified date + official source. */}
      <footer className="border-border text-muted-foreground mt-10 flex flex-wrap items-center gap-x-2 gap-y-1 border-t pt-5 text-xs">
        <BadgeCheck className="text-primary size-4" aria-hidden />
        <span>Verified {formatDate(d.trust.lastVerified)}</span>
        {source ? (
          <>
            <span aria-hidden>·</span>
            <span>
              Source:{' '}
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground underline underline-offset-2"
              >
                {source.authority}
              </a>
            </span>
          </>
        ) : null}
      </footer>
    </Container>
  );
}
