import {
  ArrowRight,
  BadgeCheck,
  Compass,
  FileSearch,
  Landmark,
  ListChecks,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { Container } from '@/components/layout/container';
import { SearchTrigger } from '@/components/layout/search-trigger';
import { Badge } from '@/components/ui/badge';

/** Real Search-Console queries — shown as example questions, not fabricated answers. */
const popularQuestions = [
  'Can I carry a power bank?',
  'Is my passport valid for travel?',
  'DigiLocker for flights',
  'Cabin baggage size & weight',
  'Liquids in hand luggage',
  'ID accepted for domestic flights',
];

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
    body: 'Answers say exactly who and where they apply to — your airline, route, and traveller type.',
  },
];

const trustPoints = [
  { icon: Landmark, label: 'Official sources' },
  { icon: BadgeCheck, label: 'Last-verified dates' },
  { icon: Compass, label: 'Applies-to clarity' },
  { icon: ListChecks, label: 'Plain language' },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="border-border border-b">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="brand">Travel Decision Platform · India</Badge>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Travel answers you can trust — in seconds
            </h1>
            <p className="text-muted-foreground mt-5 text-lg text-pretty">
              Can I carry a power bank? Is my passport still valid? Get one clear, source-verified
              answer for every travel question — before, during, and after your trip.
            </p>

            <div className="mx-auto mt-8 max-w-xl">
              <SearchTrigger size="hero" />
            </div>

            {/* Popular questions placeholder (real queries; search wired in a later sprint) */}
            <div className="mt-6">
              <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                Popular questions
              </p>
              <ul className="mt-3 flex flex-wrap justify-center gap-2">
                {popularQuestions.map((q) => (
                  <li
                    key={q}
                    className="border-border bg-card text-muted-foreground rounded-full border px-3 py-1.5 text-sm"
                  >
                    {q}
                  </li>
                ))}
              </ul>
            </div>
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

      {/* ── Benefits ─────────────────────────────────────────────────────── */}
      <section aria-labelledby="benefits-heading">
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

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section aria-labelledby="how-heading" className="border-border bg-subtle border-t">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="how-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
              How it helps you decide
            </h2>
            <p className="text-muted-foreground mt-3 text-pretty">
              Ask in your own words, get the verdict up front, and see exactly where it comes from.
            </p>
          </div>

          <ol className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3">
            <li className="border-border bg-card rounded-xl border p-6">
              <span className="text-muted-foreground font-mono text-sm">01</span>
              <span className="bg-muted mt-3 flex size-10 items-center justify-center rounded-lg">
                <FileSearch className="text-foreground size-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-semibold">Ask your question</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Type it the way you&apos;d say it — “Can I carry a razor?”, not keywords.
              </p>
            </li>

            <li className="border-border bg-card rounded-xl border p-6">
              <span className="text-muted-foreground font-mono text-sm">02</span>
              <span className="bg-muted mt-3 flex size-10 items-center justify-center rounded-lg">
                <BadgeCheck className="text-foreground size-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-semibold">Get a clear verdict</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                A colour-coded answer, up front — with the conditions that apply.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Badge variant="allowed">Allowed</Badge>
                <Badge variant="conditional">With conditions</Badge>
                <Badge variant="denied">Not allowed</Badge>
              </div>
            </li>

            <li className="border-border bg-card rounded-xl border p-6">
              <span className="text-muted-foreground font-mono text-sm">03</span>
              <span className="bg-muted mt-3 flex size-10 items-center justify-center rounded-lg">
                <ShieldCheck className="text-foreground size-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-semibold">See the source &amp; date</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Who says so, and when we last verified it — so you can trust and check it.
              </p>
            </li>
          </ol>
        </Container>
      </section>

      {/* ── Closing note ─────────────────────────────────────────────────── */}
      <section>
        <Container className="py-16 text-center sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Built to be the answer you don&apos;t second-guess
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-xl text-pretty">
            More travel questions, tools, and step-by-step guides are on the way. Search goes live
            as we roll out verified answers.
          </p>
          <p className="text-primary mt-8 inline-flex items-center gap-1.5 text-sm font-medium">
            Coming soon <ArrowRight className="size-4" aria-hidden />
          </p>
        </Container>
      </section>
    </>
  );
}
