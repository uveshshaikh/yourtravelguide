import { ArrowLeft, BadgeCheck, Info } from 'lucide-react';
import type { BreadcrumbItemView, DecisionView } from '@/lib/knowledge/view';
import { Container } from '@/components/layout/container';
import { VerdictBanner } from '@/components/decision/verdict-banner';
import { NumberCards } from '@/components/decision/number-cards';
import { StepList } from '@/components/decision/step-list';
import { DetailsList } from '@/components/decision/details-list';
import { ComparisonNotice } from '@/components/decision/comparison-notice';
import { RelatedQuestions } from '@/components/content/related';
import { choosePresentation, isCaveatCondition } from '@/lib/knowledge/presentation';
import { classifyLevel, type PageLevel } from '@/lib/knowledge/level';
import { formatDate } from '@/lib/format';

/**
 * DecisionPage — one calm, scannable answer that ADAPTS to the question, not
 * the other way round. The verdict banner and surrounding shell are the same
 * for every page (that consistency is what makes the platform feel coherent),
 * but the "details" block is chosen deterministically from decisionType +
 * answerKind — fields the resolver already populates on every DecisionView,
 * never inferred from the question text at runtime:
 *   threshold  (e.g. "How much…")  → one grouped number container
 *   procedure  (e.g. "How do I…")  → a numbered step sequence
 *   comparison (e.g. "Which airline…") → an honest "not yet verified" notice —
 *                                    the schema has no per-entity row shape,
 *                                    so no fabricated table is shown
 *   everything else               → a labelled list, headed by answerKind
 * Only ever renders real Knowledge Core conditions — no fabricated rows.
 *
 * `classifyLevel` additionally scales spacing density (quick decision vs.
 * guide) — see lib/knowledge/level.ts. It does not add or hide sections;
 * every section below is already conditionally rendered on real data.
 */
const SPACING: Record<PageLevel, { details: string; exceptions: string; related: string }> = {
  1: { details: 'mt-6', exceptions: 'mt-4', related: 'mt-8' },
  2: { details: 'mt-8', exceptions: 'mt-6', related: 'mt-10' },
  3: { details: 'mt-10', exceptions: 'mt-8', related: 'mt-12' },
};

export function DecisionPage({
  decision,
  breadcrumb,
}: {
  decision: DecisionView;
  /** Rendered as a real breadcrumb nav when provided (real internal links,
   *  not just structured-data theater) — falls back to a plain back-link. */
  breadcrumb?: BreadcrumbItemView[];
}) {
  const d = decision;
  const source = d.sources[0];
  const presentation = choosePresentation(d.decisionType, d.answerKind);
  const level = classifyLevel({
    decisionType: d.decisionType,
    conditionsCount: (d.conditions ?? []).filter((c) => !isCaveatCondition(c.label)).length,
    hasExceptions: (d.exceptions?.length ?? 0) > 0,
  });
  const spacing = SPACING[level];

  return (
    <Container className="max-w-2xl py-8 sm:py-10">
      {breadcrumb?.length ? (
        <nav aria-label="Breadcrumb" className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm">
          {breadcrumb.map((item, i) => (
            <span key={item.label} className="flex items-center gap-1.5">
              {i > 0 ? <span aria-hidden>/</span> : null}
              {item.href ? (
                <a href={item.href} className="hover:text-foreground transition-colors">
                  {item.label}
                </a>
              ) : (
                <span className="text-foreground">{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      ) : (
        <a
          href="/search"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
        >
          <ArrowLeft className="size-4" aria-hidden />
          All questions
        </a>
      )}

      <h1 className="mt-5 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
        {d.question}
      </h1>

      {/* The answer — front and centre, worded for its decision type. */}
      <div className="mt-5">
        <VerdictBanner
          verdict={d.verdict}
          answerKind={d.answerKind}
          answer={d.answer}
          validity={d.trust.validity}
        />
      </div>

      {/* The details that matter — presentation adapts to the question type. */}
      {d.conditions?.length || presentation.style === 'comparison' ? (
        <section className={spacing.details}>
          <h2 className="text-sm font-semibold tracking-wide uppercase">{presentation.heading}</h2>
          <div className="mt-3">
            {presentation.style === 'numbers' ? (
              <NumberCards conditions={d.conditions ?? []} />
            ) : presentation.style === 'steps' ? (
              <StepList conditions={d.conditions ?? []} />
            ) : presentation.style === 'comparison' ? (
              <ComparisonNotice />
            ) : (
              <DetailsList conditions={d.conditions ?? []} />
            )}
          </div>
        </section>
      ) : null}

      {/* Genuinely useful exceptions only (e.g. medical travellers). */}
      {d.exceptions?.length ? (
        <section className={spacing.exceptions}>
          <h2 className="text-sm font-semibold tracking-wide uppercase">Exceptions</h2>
          <div className="mt-3 space-y-3">
            {d.exceptions.map((ex) => (
              <div key={ex.id} className="border-border flex gap-2.5 border-l-2 pl-3 text-sm">
                <Info className="text-muted-foreground mt-0.5 size-4 shrink-0" aria-hidden />
                <p className="text-pretty">
                  <span className="font-medium capitalize">{ex.appliesTo} travellers: </span>
                  <span className="text-muted-foreground">{ex.detail}</span>
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Related questions — simple next steps. */}
      {d.relatedQuestions?.length ? (
        <RelatedQuestions items={d.relatedQuestions} className={spacing.related} />
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
        <span aria-hidden>·</span>
        <a href="/trust" className="hover:text-foreground underline underline-offset-2">
          How we verify
        </a>
      </footer>
      <p className="text-muted-foreground mt-2 text-xs text-pretty">
        Correct as of the verified date above — for anything time-critical, please double-check
        directly with your airline or the relevant authority before you travel.
      </p>
    </Container>
  );
}
