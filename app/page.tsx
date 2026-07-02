import {
  ArrowRight,
  BadgeCheck,
  Compass,
  Landmark,
  Lock,
  Plane,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Badge } from '@/components/ui/badge';
import { QuestionSearch } from '@/components/search/question-search';
import { QuestionCard } from '@/components/home/question-card';
import { CategoryCard } from '@/components/home/category-card';
import { verdictDisplay } from '@/components/decision/verdict-config';
import {
  listVerifiedByCategory,
  listVerifiedQuestions,
  popularQuestions,
  recentlyVerified,
} from '@/services/resolver/catalog';
import { authoritiesCovered, CATEGORY_META, type Category } from '@/db/seed/content';
import { formatDate } from '@/lib/format';

export const dynamic = 'force-dynamic';

const trustPoints = [
  {
    icon: ShieldCheck,
    title: 'Official sources only',
    body: 'Every answer is built from a named authority — DGCA, BCAS, CBIC, Passport Seva, RBI.',
  },
  {
    icon: BadgeCheck,
    title: 'Verified & dated',
    body: 'Each answer shows when it was last checked, so you know it’s current.',
  },
  {
    icon: Compass,
    title: 'Made for your trip',
    body: 'Answers say who and where they apply to — domestic or international.',
  },
  {
    icon: Lock,
    title: 'Nothing unverified',
    body: 'If we can’t confirm it against an official source, we don’t publish it.',
  },
];

const steps = [
  {
    icon: Search,
    title: 'Search',
    body: 'Type your question in plain words. Instant, typo-tolerant, and verified-only.',
  },
  {
    icon: BadgeCheck,
    title: 'Read the decision',
    body: 'One clear verdict — Allowed, Required, Accepted — with just the details that matter.',
  },
  {
    icon: Plane,
    title: 'Travel with confidence',
    body: 'Every answer is backed by an official source and dated, so you can act on it.',
  },
];

/** Consistent section heading with an optional "see all" action. */
function SectionHeading({
  title,
  description,
  href,
  linkLabel = 'See all',
}: {
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div className="max-w-xl">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
        {description ? <p className="text-muted-foreground mt-1.5 text-sm">{description}</p> : null}
      </div>
      {href ? (
        <a
          href={href}
          className="text-primary inline-flex shrink-0 items-center gap-1.5 text-sm font-medium hover:underline"
        >
          {linkLabel} <ArrowRight className="size-4" aria-hidden />
        </a>
      ) : null}
    </div>
  );
}

export default async function HomePage() {
  // Everything below is real Knowledge Core data — grows as content grows.
  const [catalog, groups, popular, recent] = await Promise.all([
    listVerifiedQuestions(),
    listVerifiedByCategory(),
    popularQuestions(6),
    recentlyVerified(9),
  ]);
  const authorities = authoritiesCovered();

  const popularSlugs = new Set(popular.map((p) => p.slug));
  const latest = recent.filter((r) => !popularSlugs.has(r.slug)).slice(0, 5);
  const answerCount = catalog.length;

  return (
    <>
      {/* ── 1 & 2 & 3 · Who we are · why trust · search ──────────────────── */}
      <section className="relative overflow-hidden">
        <div
          className="from-accent/60 pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b to-transparent"
          aria-hidden
        />
        <Container className="pt-16 pb-14 sm:pt-24 sm:pb-20">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="brand" className="mb-5">
              <ShieldCheck className="size-3.5" aria-hidden />
              Travel Decision Platform · India
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-[3.25rem] sm:leading-[1.05]">
              Travel answers you can trust — in seconds
            </h1>
            <p className="text-muted-foreground mx-auto mt-5 max-w-xl text-lg text-pretty">
              Ask a question, get one clear answer — backed by an official source and dated so you
              know it’s current. Before, during, and after your trip.
            </p>

            <div className="mx-auto mt-8 max-w-xl text-left">
              <QuestionSearch catalog={catalog} />
            </div>

            {/* Quick actions — real popular questions. */}
            {popular.length > 0 ? (
              <ul className="mt-5 flex flex-wrap justify-center gap-2">
                {popular.slice(0, 4).map((qn) => (
                  <li key={qn.slug}>
                    <a
                      href={`/question/${qn.slug}`}
                      className="border-border bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-foreground inline-flex rounded-full border px-3 py-1.5 text-sm transition-colors"
                    >
                      {qn.question}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}

            {/* Trust line — real authorities. */}
            <p className="text-muted-foreground/80 mt-6 text-xs">
              Sources include{' '}
              <span className="text-foreground/70 font-medium">
                {authorities
                  .slice(0, 5)
                  .map((a) => a.code)
                  .join(' · ')}
              </span>
            </p>
          </div>
        </Container>
      </section>

      {/* ── 2 · Why trust us ─────────────────────────────────────────────── */}
      <section aria-labelledby="trust-heading" className="border-border bg-subtle border-y">
        <Container className="py-12 sm:py-14">
          <h2 id="trust-heading" className="sr-only">
            Why you can trust these answers
          </h2>
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-3">
                <span className="bg-accent text-accent-foreground grid size-9 shrink-0 place-items-center rounded-lg">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{title}</h3>
                  <p className="text-muted-foreground mt-0.5 text-sm text-pretty">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 4 · Popular questions ────────────────────────────────────────── */}
      {popular.length > 0 ? (
        <section aria-labelledby="popular-heading">
          <Container className="py-16 sm:py-20">
            <SectionHeading
              title="Popular questions"
              description="The things travellers ask most, answered with a clear verdict."
              href="/search"
            />
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {popular.map((qn) => (
                <QuestionCard key={qn.slug} item={qn} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* ── 5 · Popular categories ───────────────────────────────────────── */}
      {groups.length > 0 ? (
        <section aria-labelledby="categories-heading" className="border-border bg-subtle border-y">
          <Container className="py-16 sm:py-20">
            <SectionHeading
              title="Browse by category"
              description={`${answerCount} verified answers across ${groups.length} areas of your journey.`}
              href="/search"
              linkLabel="All questions"
            />
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {groups.map((g) => (
                <CategoryCard
                  key={g.category}
                  category={g.category}
                  description={CATEGORY_META[g.category as Category] ?? ''}
                  count={g.questions.length}
                />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* ── 6 · Recently verified ────────────────────────────────────────── */}
      {latest.length > 0 ? (
        <section aria-labelledby="recent-heading">
          <Container className="py-16 sm:py-20">
            <SectionHeading
              title="Recently verified"
              description="The latest answers we’ve checked against official sources."
            />
            <ul className="border-border divide-border mt-7 divide-y overflow-hidden rounded-2xl border">
              {latest.map((r) => {
                const v = verdictDisplay(r.answerKind, r.verdict);
                return (
                  <li key={r.slug}>
                    <a
                      href={`/question/${r.slug}`}
                      className="group hover:bg-muted/50 flex items-center gap-4 px-5 py-3.5 transition-colors"
                    >
                      <span className={`size-2 shrink-0 rounded-full ${v.dot}`} aria-hidden />
                      <span className="min-w-0 flex-1 truncate text-sm font-medium">
                        {r.question}
                      </span>
                      <Badge variant={v.badge} className="hidden sm:inline-flex">
                        {v.label}
                      </Badge>
                      {r.lastVerified ? (
                        <span className="text-muted-foreground hidden shrink-0 text-xs md:inline">
                          {formatDate(r.lastVerified)}
                        </span>
                      ) : null}
                      <ArrowRight
                        className="text-muted-foreground/50 group-hover:text-primary size-4 shrink-0 transition-all group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </Container>
        </section>
      ) : null}

      {/* ── 7 · Official authorities covered ─────────────────────────────── */}
      {authorities.length > 0 ? (
        <section aria-labelledby="authorities-heading" className="border-border bg-subtle border-y">
          <Container className="py-16 sm:py-20">
            <SectionHeading
              title="Official authorities we cite"
              description="Every answer traces back to one of these regulators — no anonymous advice."
            />
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {authorities.map((a) => (
                <div
                  key={a.code}
                  className="border-border bg-card flex items-start gap-3 rounded-2xl border p-5"
                >
                  <span className="bg-info-subtle text-info-subtle-foreground grid size-10 shrink-0 place-items-center rounded-xl">
                    <Landmark className="size-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-sm font-semibold">{a.code}</p>
                    <p className="mt-0.5 text-sm font-medium">{a.name}</p>
                    <p className="text-muted-foreground mt-1 text-xs text-pretty">
                      {a.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* ── 8 · How YourTravelGuide works (three steps) ──────────────────── */}
      <section aria-labelledby="how-heading">
        <Container className="py-16 sm:py-20">
          <h2
            id="how-heading"
            className="text-center text-xl font-semibold tracking-tight sm:text-2xl"
          >
            How YourTravelGuide works
          </h2>
          <ol className="mx-auto mt-10 grid max-w-4xl items-start gap-8 md:grid-cols-3 md:gap-4">
            {steps.map(({ icon: Icon, title, body }, i) => (
              <li key={title} className="relative flex flex-col items-center text-center">
                <span className="bg-accent text-accent-foreground ring-accent/40 grid size-14 place-items-center rounded-2xl ring-8">
                  <Icon className="size-6" aria-hidden />
                </span>
                <h3 className="mt-5 font-semibold">
                  <span className="text-muted-foreground mr-1.5 text-sm font-normal tabular-nums">
                    {i + 1}
                  </span>
                  {title}
                </h3>
                <p className="text-muted-foreground mt-1.5 max-w-[26ch] text-sm text-pretty">
                  {body}
                </p>
                {i < steps.length - 1 ? (
                  <ArrowRight
                    className="text-border absolute top-6 -right-2 hidden size-5 md:block"
                    aria-hidden
                  />
                ) : null}
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
