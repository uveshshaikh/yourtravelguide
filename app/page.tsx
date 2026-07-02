import {
  ArrowRight,
  BadgeCheck,
  Compass,
  FileText,
  HeartPulse,
  Landmark,
  ListChecks,
  Luggage,
  Plane,
  ShieldCheck,
  Wallet,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Badge } from '@/components/ui/badge';
import { QuestionSearch } from '@/components/search/question-search';
import { LastVerifiedBadge } from '@/components/trust/trust-badges';
import { verdictVisuals } from '@/components/decision/verdict-config';
import { listVerifiedByCategory, listVerifiedQuestions } from '@/services/resolver/catalog';

export const dynamic = 'force-dynamic';

/** Icon per category (falls back to a compass for anything new). */
const categoryIcon: Record<string, LucideIcon> = {
  'Documents & visas': FileText,
  'Baggage & items': Luggage,
  'Security & screening': ShieldCheck,
  'Customs & duty-free': Landmark,
  'At the airport': Plane,
  'Money & currency': Wallet,
  'Health & vaccines': HeartPulse,
};

const benefits = [
  {
    icon: Zap,
    title: 'One clear answer',
    body: 'The verdict comes first — not after 500 words. Decide in seconds, not minutes.',
  },
  {
    icon: ShieldCheck,
    title: 'Backed by official sources',
    body: 'Every answer cites the authority behind it — DGCA, BCAS, CBIC, Passport Seva and more.',
  },
  {
    icon: Compass,
    title: 'Made for your trip',
    body: 'Answers say exactly who and where they apply to — your route and traveller type.',
  },
];

const trustPoints = [
  { icon: Landmark, label: 'Official sources' },
  { icon: BadgeCheck, label: 'Last-verified dates' },
  { icon: Compass, label: 'Applies-to clarity' },
  { icon: ListChecks, label: 'Plain language' },
];

export default async function HomePage() {
  // Data-driven: everything below grows automatically as verified questions land.
  const [catalog, groups] = await Promise.all([listVerifiedQuestions(), listVerifiedByCategory()]);
  const popular = catalog.slice(0, 6);
  const featured = catalog[0];

  return (
    <>
      {/* ── Hero + real search ───────────────────────────────────────────── */}
      <section className="border-border border-b">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="brand">Travel Decision Platform · India</Badge>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Travel answers you can trust — in seconds
            </h1>
            <p className="text-muted-foreground mt-5 text-lg text-pretty">
              Search a question and get one clear, source-verified answer — before, during, and
              after your trip.
            </p>

            <div className="mx-auto mt-8 max-w-xl">
              <QuestionSearch catalog={catalog} />
            </div>

            {popular.length > 0 ? (
              <div className="mt-6">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  Popular questions
                </p>
                <ul className="mt-3 flex flex-wrap justify-center gap-2">
                  {popular.map((q) => (
                    <li key={q.slug}>
                      <a
                        href={`/question/${q.slug}`}
                        className="border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground inline-flex rounded-full border px-3 py-1.5 text-sm transition-colors"
                      >
                        {q.question}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      {/* ── Trust strip ──────────────────────────────────────────────────── */}
      <section className="border-border bg-subtle border-b">
        <Container className="py-4">
          <ul className="text-muted-foreground flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
            {trustPoints.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-2">
                <Icon className="text-primary size-4" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── Featured verified answer (real, from the Knowledge Core) ──────── */}
      {featured ? (
        <section aria-labelledby="featured-heading">
          <Container className="py-14 sm:py-16">
            <p
              id="featured-heading"
              className="text-muted-foreground text-center text-xs font-semibold tracking-wide uppercase"
            >
              Featured verified answer
            </p>
            <a
              href={`/question/${featured.slug}`}
              className="border-border bg-card hover:border-primary/40 mx-auto mt-4 block max-w-3xl rounded-2xl border p-6 transition-colors sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-2">
                {(() => {
                  const v = verdictVisuals[featured.verdict];
                  return (
                    <Badge variant={v.badge}>
                      <v.Icon className="size-3.5" aria-hidden />
                      {v.label}
                    </Badge>
                  );
                })()}
                {featured.lastVerified ? <LastVerifiedBadge date={featured.lastVerified} /> : null}
                <span className="text-muted-foreground text-xs">{featured.appliesTo}</span>
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                {featured.question}
              </h2>
              <p className="text-muted-foreground mt-2 text-pretty">
                Backed by official sources and recently verified — the kind of answer you can act on
                with confidence.
              </p>
              <span className="text-primary mt-5 inline-flex items-center gap-1.5 text-sm font-medium">
                Read the full answer <ArrowRight className="size-4" aria-hidden />
              </span>
            </a>
          </Container>
        </section>
      ) : null}

      {/* ── Browse by category (real verified questions, grouped) ─────────── */}
      {groups.length > 0 ? (
        <section aria-labelledby="browse-heading" className="border-border bg-subtle border-t">
          <Container className="py-16 sm:py-20">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 id="browse-heading" className="text-2xl font-semibold tracking-tight">
                  Browse by category
                </h2>
                <p className="text-muted-foreground mt-1 text-sm">
                  {catalog.length} verified {catalog.length === 1 ? 'answer' : 'answers'} and
                  growing — every one backed by an official source.
                </p>
              </div>
              <a
                href="/search"
                className="text-primary inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
              >
                See all questions <ArrowRight className="size-4" aria-hidden />
              </a>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {groups.map(({ category, questions }) => {
                const Icon = categoryIcon[category] ?? Compass;
                return (
                  <div
                    key={category}
                    className="border-border bg-card flex flex-col rounded-2xl border p-5"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="bg-accent text-accent-foreground grid size-9 place-items-center rounded-lg">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <h3 className="font-semibold">{category}</h3>
                      <span className="text-muted-foreground ml-auto text-xs">
                        {questions.length}
                      </span>
                    </div>
                    <ul className="mt-4 space-y-1">
                      {questions.map((q) => {
                        const v = verdictVisuals[q.verdict];
                        return (
                          <li key={q.slug}>
                            <a
                              href={`/question/${q.slug}`}
                              className="group hover:bg-muted -mx-2 flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors"
                            >
                              <span
                                className={`size-1.5 shrink-0 rounded-full ${v.dot}`}
                                aria-hidden
                              />
                              <span className="min-w-0 flex-1 truncate text-sm">{q.question}</span>
                              <ArrowRight
                                className="text-muted-foreground size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                                aria-hidden
                              />
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      ) : null}

      {/* ── Why it helps ─────────────────────────────────────────────────── */}
      <section aria-labelledby="benefits-heading" className="border-border border-t">
        <Container className="py-16 sm:py-20">
          <h2 id="benefits-heading" className="sr-only">
            Why YourTravelGuide
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, body }) => (
              <div key={title} className="border-border bg-card rounded-xl border p-6">
                <span className="bg-accent text-accent-foreground grid size-10 place-items-center rounded-lg">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
