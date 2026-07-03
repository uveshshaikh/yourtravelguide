import { ArrowRight, BadgeCheck, Lock, Plane, Search, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { QuestionSearch } from '@/components/search/question-search';
import { QuestionCard } from '@/components/home/question-card';
import {
  listByIntentGroup,
  listVerifiedQuestions,
  popularQuestions,
} from '@/services/resolver/catalog';
import { authoritiesCovered } from '@/db/seed/content';

export const dynamic = 'force-dynamic';

const trustPoints = [
  { icon: ShieldCheck, label: 'Official sources only' },
  { icon: BadgeCheck, label: 'Last-verified dates' },
  { icon: Lock, label: 'Nothing unverified' },
];

const steps = [
  {
    icon: Search,
    title: 'Search',
    body: 'Type your question in plain words — instant and verified-only.',
  },
  {
    icon: BadgeCheck,
    title: 'Read the decision',
    body: 'One clear verdict with only the details that matter.',
  },
  {
    icon: Plane,
    title: 'Travel with confidence',
    body: 'Backed by an official source and dated, so you can act on it.',
  },
];

export default async function HomePage() {
  const [catalog, popular, intentGroups] = await Promise.all([
    listVerifiedQuestions(),
    popularQuestions(6),
    listByIntentGroup(),
  ]);
  const authorities = authoritiesCovered();
  const journeys = intentGroups.map((g) => g.group);

  return (
    <>
      {/* ── Hero — search is the hero ────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden">
        <div
          className="bg-primary/10 pointer-events-none absolute top-[-18%] left-1/2 -z-10 h-[420px] w-[820px] max-w-[130vw] -translate-x-1/2 rounded-full blur-3xl"
          aria-hidden
        />
        <Container className="pt-20 pb-14 sm:pt-28 sm:pb-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="border-border bg-card text-muted-foreground mx-auto inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium shadow-sm">
              <ShieldCheck className="text-primary size-3.5" aria-hidden />
              Verified travel answers for India
            </span>

            <h1 className="mt-6 text-[2.75rem] leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl">
              Clear answers to <span className="text-primary">every travel question</span>
            </h1>
            <p className="text-muted-foreground mx-auto mt-5 max-w-xl text-lg text-pretty">
              Can I carry it? Do I need it? Get one plain answer — backed by an official source and
              dated so you know it’s current.
            </p>

            <div className="mx-auto mt-9 max-w-2xl text-left">
              <QuestionSearch catalog={catalog} />
            </div>

            {popular.length > 0 ? (
              <ul className="mt-5 flex flex-wrap justify-center gap-2">
                {popular.slice(0, 5).map((qn) => (
                  <li key={qn.slug}>
                    <a
                      href={`/question/${qn.slug}`}
                      className="border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground inline-flex rounded-full border px-3.5 py-1.5 text-sm shadow-sm transition-colors"
                    >
                      {qn.question}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}

            <p className="text-muted-foreground mt-8 text-xs">
              Sources include{' '}
              <span className="text-foreground font-medium">
                {authorities
                  .slice(0, 5)
                  .map((a) => a.code)
                  .join(' · ')}
              </span>
            </p>
          </div>
        </Container>
      </section>

      {/* ── Popular answers — the fast path & proof of value ─────────────── */}
      {popular.length > 0 ? (
        <section aria-labelledby="popular-heading">
          <Container className="pb-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 id="popular-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
                Popular questions
              </h2>
              <a
                href="/search"
                className="text-primary inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
              >
                Browse all <ArrowRight className="size-4" aria-hidden />
              </a>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {popular.map((qn) => (
                <QuestionCard key={qn.slug} item={qn} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* ── Explore by journey — lightweight discovery ───────────────────── */}
      {journeys.length > 0 ? (
        <section aria-labelledby="journeys-heading">
          <Container className="py-14 sm:py-16">
            <div className="border-border bg-subtle rounded-3xl border p-6 sm:p-8">
              <h2 id="journeys-heading" className="text-base font-semibold">
                Explore by where you are in your journey
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                From packing to arrival — find the questions that matter at each step.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {journeys.map((j) => (
                  <a
                    key={j}
                    href="/search"
                    className="border-border bg-card hover:border-primary/40 hover:text-primary inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-medium shadow-sm transition-colors"
                  >
                    {j}
                  </a>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* ── Trust + authorities (one calm band) ──────────────────────────── */}
      <section aria-labelledby="trust-heading" className="border-border bg-subtle border-y">
        <Container className="py-14 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="trust-heading" className="text-xl font-semibold tracking-tight sm:text-2xl">
              Every answer is backed by an official source
            </h2>
            <p className="text-muted-foreground mx-auto mt-2 max-w-lg text-sm text-pretty">
              No anonymous advice. Each answer traces to a named Indian authority and shows when it
              was last verified.
            </p>

            <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
              {trustPoints.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="text-muted-foreground inline-flex items-center gap-2 text-sm"
                >
                  <Icon className="text-primary size-4" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap justify-center gap-2">
              {authorities.map((a) => (
                <span
                  key={a.code}
                  title={a.name}
                  className="border-border bg-card text-foreground rounded-lg border px-3 py-1.5 font-mono text-xs font-semibold shadow-sm"
                >
                  {a.code}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── How it works (three steps) ───────────────────────────────────── */}
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
                <span className="bg-accent text-primary ring-accent/50 grid size-14 place-items-center rounded-2xl ring-8">
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
