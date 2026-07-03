import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { QuestionSearch } from '@/components/search/question-search';
import { VerifiedQuestionResult } from '@/components/search/verified-question-result';
import { SearchNoResults } from '@/components/search/search-states';
import {
  listByIntentGroup,
  listVerifiedQuestions,
  travellerCollections,
} from '@/services/resolver/catalog';
import { searchQuestions } from '@/lib/search';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = { title: 'Search' };

/**
 * /search — results come ONLY from the verified-question catalog (published,
 * evidence-backed). No unpublished content is ever exposed.
 *  • ?q=…           → search results
 *  • ?intent=…      → browse ONE journey stage (what the traveller clicked)
 *  • ?collection=…  → browse ONE traveller-type collection (persona cards)
 *  • (none)         → browse every stage
 */
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; intent?: string; collection?: string }>;
}) {
  const { q, intent, collection } = await searchParams;
  const query = (q ?? '').trim();
  const [catalog, groups, collections] = await Promise.all([
    listVerifiedQuestions(),
    listByIntentGroup(),
    travellerCollections(),
  ]);

  // Resolve the requested stage to its canonical name (case-insensitive).
  const active = intent
    ? (groups.find((g) => g.group.toLowerCase() === intent.trim().toLowerCase())?.group ?? null)
    : null;
  const activeCollection = collection
    ? (collections.find((c) => c.id === collection.trim()) ?? null)
    : null;

  const heading = query
    ? `Results for “${query}”`
    : activeCollection
      ? activeCollection.label
      : active
        ? active
        : 'Browse verified questions';

  return (
    <Container className="py-10">
      <h1 className="text-2xl font-semibold tracking-tight">{heading}</h1>

      <div className="mt-5 max-w-2xl">
        <QuestionSearch catalog={catalog} size="bar" />
      </div>

      {query ? (
        <SearchResults catalog={catalog} query={query} />
      ) : activeCollection ? (
        <CollectionResults collection={activeCollection} />
      ) : (
        <>
          <IntentFilterBar groups={groups} active={active} />
          <BrowseGroups groups={active ? groups.filter((g) => g.group === active) : groups} />
        </>
      )}
    </Container>
  );
}

function CollectionResults({
  collection,
}: {
  collection: Awaited<ReturnType<typeof travellerCollections>>[number];
}) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between gap-3">
        <p className="text-muted-foreground text-sm">{collection.description}</p>
        <a href="/search" className="text-primary shrink-0 text-sm font-medium hover:underline">
          All questions
        </a>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {collection.questions.map((q) => (
          <VerifiedQuestionResult key={q.slug} item={q} />
        ))}
      </div>
    </div>
  );
}

function SearchResults({
  catalog,
  query,
}: {
  catalog: Awaited<ReturnType<typeof listVerifiedQuestions>>;
  query: string;
}) {
  const results = searchQuestions(catalog, query, 50);
  if (results.length === 0) {
    return (
      <div className="mt-8">
        <SearchNoResults query={query} />
      </div>
    );
  }
  return (
    <div className="mt-8">
      <p className="text-muted-foreground mb-3 text-sm">
        {results.length} verified {results.length === 1 ? 'answer' : 'answers'}
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {results.map((r) => (
          <VerifiedQuestionResult key={r.slug} item={r} />
        ))}
      </div>
    </div>
  );
}

/** A chip row to switch journey stages — the clicked stage is highlighted. */
function IntentFilterBar({
  groups,
  active,
}: {
  groups: Awaited<ReturnType<typeof listByIntentGroup>>;
  active: string | null;
}) {
  if (groups.length === 0) return null;
  const chip = 'inline-flex items-center rounded-full border px-3 py-1.5 text-sm transition-colors';
  return (
    <div
      className="mt-6 flex flex-wrap gap-2"
      role="navigation"
      aria-label="Filter by journey stage"
    >
      <a
        href="/search"
        aria-current={active === null ? 'page' : undefined}
        className={cn(
          chip,
          active === null
            ? 'border-primary bg-primary text-primary-foreground'
            : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground',
        )}
      >
        All
      </a>
      {groups.map(({ group, questions }) => {
        const isActive = group === active;
        return (
          <a
            key={group}
            href={`/search?intent=${encodeURIComponent(group)}`}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              chip,
              isActive
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground',
            )}
          >
            {group}
            <span className={cn('ml-1.5 text-xs', isActive ? 'opacity-80' : 'opacity-60')}>
              {questions.length}
            </span>
          </a>
        );
      })}
    </div>
  );
}

function BrowseGroups({ groups }: { groups: Awaited<ReturnType<typeof listByIntentGroup>> }) {
  if (groups.length === 0) {
    return (
      <div className="mt-8">
        <SearchNoResults />
      </div>
    );
  }
  return (
    <div className="mt-8 space-y-10">
      {groups.map(({ group, description, questions, subgroups }) => (
        <section key={group} aria-label={group}>
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-sm font-semibold">
              {group}{' '}
              <span className="text-muted-foreground font-normal">· {questions.length}</span>
            </h2>
            <p className="text-muted-foreground hidden text-xs sm:block">{description}</p>
          </div>

          {/* Category → Subcategory → Question: only shown when there's more than
              one real subcategory, so small groups stay a simple flat list. */}
          {subgroups.length > 1 ? (
            <div className="mt-4 space-y-6">
              {subgroups.map((sg) => (
                <div key={sg.subcategory}>
                  <h3 className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                    {sg.subcategory} <span className="font-normal">· {sg.questions.length}</span>
                  </h3>
                  <div className="mt-2 grid gap-3 sm:grid-cols-2">
                    {sg.questions.map((q) => (
                      <VerifiedQuestionResult key={q.slug} item={q} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {questions.map((q) => (
                <VerifiedQuestionResult key={q.slug} item={q} />
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
