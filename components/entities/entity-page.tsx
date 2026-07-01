import { Container } from '@/components/layout/container';
import { StatusNote } from '@/components/feedback/status-note';
import { VerdictCard } from '@/components/decision/verdict-card';
import type { EntityPageView } from '@/services/resolver/entity-resolve';

/**
 * EntityPage — renders an entity (airline/airport/country/…) and its published,
 * verified questions. Consumes a typed ViewModel only; no business logic here.
 * When there are no published claims, it says so honestly rather than inventing.
 */
export function EntityPage({ view, kindLabel }: { view: EntityPageView; kindLabel: string }) {
  return (
    <Container className="py-10">
      <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
        {kindLabel}
      </p>
      <h1 className="mt-2 flex flex-wrap items-center gap-3 text-3xl font-semibold tracking-tight">
        {view.name}
        <span className="bg-muted text-muted-foreground rounded-md px-2 py-0.5 font-mono text-sm">
          {view.code}
        </span>
      </h1>

      {view.questions.length > 0 ? (
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {view.questions.map((q) => (
            <VerdictCard key={q.id} question={q.question} verdict={q.verdict} answer={q.summary} />
          ))}
        </div>
      ) : (
        <div className="mt-8 max-w-xl">
          <StatusNote tone="info" title="Verified answers are in progress">
            <p>
              We don’t have published guidance for {view.name} yet. We only publish answers backed
              by official sources.
            </p>
          </StatusNote>
        </div>
      )}
    </Container>
  );
}
