import type { BreadcrumbItemView, DecisionView, TocItemView } from '@/lib/knowledge/view';
import { decisionTypeLabel, riskLabel } from '@/lib/knowledge/labels';
import { Container } from '@/components/layout/container';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb } from '@/components/content/breadcrumb';
import { TableOfContents } from '@/components/content/table-of-contents';
import { FeedbackWidget } from '@/components/content/feedback-widget';
import { PrintButton } from '@/components/content/print-button';
import { FaqAccordion } from '@/components/content/faq-accordion';
import { RelatedQuestions, RelatedTopics } from '@/components/content/related';
import { DecisionAnswerBox } from '@/components/decision/decision-answer-box';
import { AppliesToPanel } from '@/components/decision/applies-to-panel';
import { ExceptionsPanel } from '@/components/decision/exceptions-panel';
import { WarningList } from '@/components/decision/important-warning';
import { TrustPanel } from '@/components/trust/trust-panel';
import { EvidencePanel } from '@/components/trust/evidence-panel';
import { OfficialSourcesList } from '@/components/trust/official-sources-list';
import { VersionHistory } from '@/components/trust/version-history';

/**
 * DecisionPage — the definitive, reusable template for every travel question.
 *
 * Hierarchy (answer-first). We merge the brief's "one-sentence answer",
 * "verdict banner", "last verified" and "confidence" into a single answer block
 * so trust travels *with* the answer, above the fold. Critical warnings are
 * raised directly under the answer (highest stakes first) rather than below
 * "applies to". Everything is driven by the typed `DecisionView`.
 */
export function DecisionPage({
  decision,
  breadcrumb = [],
}: {
  decision: DecisionView;
  breadcrumb?: BreadcrumbItemView[];
}) {
  const d = decision;

  // Build the table of contents from the sections that actually exist.
  const toc: TocItemView[] = [
    { id: 'answer', label: 'Answer' },
    { id: 'applies-to', label: 'Applies to' },
    ...(d.exceptions?.length ? [{ id: 'exceptions', label: 'Exceptions' }] : []),
    { id: 'trust', label: 'Why trust this' },
    ...(d.sources.length ? [{ id: 'sources', label: 'Official sources' }] : []),
    ...(d.overview?.length ? [{ id: 'details', label: 'Details' }] : []),
    ...(d.faqs?.length ? [{ id: 'faq', label: 'FAQ' }] : []),
    ...(d.relatedQuestions?.length ? [{ id: 'related', label: 'Related' }] : []),
    ...(d.versions?.length ? [{ id: 'history', label: 'History' }] : []),
  ];

  const showRisk = d.riskLevel === 'high' || d.riskLevel === 'critical';

  return (
    <Container className="py-8">
      {breadcrumb.length ? <Breadcrumb items={breadcrumb} className="mb-6" /> : null}

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-12">
        <article className="min-w-0 space-y-10">
          {/* 1–3, 9–10: Question + answer-first block */}
          <section id="answer" className="scroll-mt-24">
            <div className="flex flex-wrap items-center gap-2">
              {d.decisionType ? (
                <Badge variant="neutral">{decisionTypeLabel[d.decisionType]}</Badge>
              ) : null}
              {showRisk && d.riskLevel ? (
                <Badge variant="conditional">{riskLabel[d.riskLevel]}</Badge>
              ) : null}
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {d.question}
            </h1>
            <div className="mt-5">
              <DecisionAnswerBox
                verdict={d.verdict}
                answer={d.answer}
                validity={d.trust.validity}
                conditions={d.conditions}
                trust={d.trust}
              />
            </div>
          </section>

          {/* 6: Critical warnings — raised to just under the answer */}
          {d.warnings?.length ? <WarningList warnings={d.warnings} /> : null}

          {/* 4: Applies to */}
          <section id="applies-to" className="scroll-mt-24">
            <AppliesToPanel appliesTo={d.appliesTo} />
          </section>

          {/* 5: Exceptions */}
          {d.exceptions?.length ? (
            <section id="exceptions" className="scroll-mt-24">
              <ExceptionsPanel exceptions={d.exceptions} />
            </section>
          ) : null}

          {/* 7: Why trust this answer */}
          <section id="trust" className="scroll-mt-24 space-y-4">
            <TrustPanel trust={d.trust} sourceCount={d.sources.length} />
            <EvidencePanel evidenceLevel={d.trust.evidenceLevel} />
          </section>

          {/* 8: Official sources */}
          {d.sources.length ? (
            <section id="sources" className="scroll-mt-24">
              <OfficialSourcesList sources={d.sources} />
            </section>
          ) : null}

          {/* 11–12: Detailed explanation + examples */}
          {d.overview?.length ? (
            <section id="details" className="scroll-mt-24">
              <h2 className="text-lg font-semibold">Details</h2>
              <div className="text-muted-foreground mt-3 max-w-prose space-y-3 text-pretty">
                {d.overview.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {d.examples?.length ? (
                <div className="border-border bg-subtle mt-4 rounded-xl border p-4">
                  <h3 className="text-sm font-semibold">Examples</h3>
                  <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-1 text-sm">
                    {d.examples.map((ex, i) => (
                      <li key={i}>{ex}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </section>
          ) : null}

          {/* 13: FAQ */}
          {d.faqs?.length ? (
            <section id="faq" className="scroll-mt-24">
              <FaqAccordion faqs={d.faqs} />
            </section>
          ) : null}

          {/* 14–15: Related */}
          {d.relatedQuestions?.length || d.relatedTopics?.length ? (
            <section id="related" className="scroll-mt-24 space-y-6">
              {d.relatedQuestions?.length ? <RelatedQuestions items={d.relatedQuestions} /> : null}
              {d.relatedTopics?.length ? <RelatedTopics items={d.relatedTopics} /> : null}
            </section>
          ) : null}

          {/* 16: Version history */}
          {d.versions?.length ? (
            <section id="history" className="scroll-mt-24">
              <VersionHistory versions={d.versions} />
            </section>
          ) : null}

          <FeedbackWidget />
        </article>

        {/* Sticky sidebar: navigation + print (desktop only) */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-6">
            <TableOfContents items={toc} />
            <PrintButton className="w-full justify-center" />
          </div>
        </aside>
      </div>
    </Container>
  );
}
