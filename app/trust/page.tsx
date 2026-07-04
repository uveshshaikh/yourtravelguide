import type { Metadata } from 'next';
import { BadgeCheck, Landmark, Mail, RefreshCw, ShieldCheck, SquarePen, Undo2 } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { siteConfig } from '@/config/site';
import { authoritiesWithLiveCounts } from '@/services/resolver/catalog';
import { REVIEW_SLA_DAYS } from '@/lib/knowledge/volatility';

export const dynamic = 'force-dynamic';

const TRUST_DESCRIPTION =
  'How YourTravelGuide sources, verifies, reviews and corrects every travel answer — and who to contact if something looks wrong.';

export const metadata: Metadata = {
  title: 'Trust & Editorial Center',
  description: TRUST_DESCRIPTION,
  alternates: { canonical: '/trust' },
  openGraph: {
    type: 'website',
    url: '/trust',
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    title: 'Trust & Editorial Center',
    description: TRUST_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trust & Editorial Center',
    description: TRUST_DESCRIPTION,
  },
};

const sections = [
  { id: 'editorial-policy', label: 'Editorial policy' },
  { id: 'how-we-verify', label: 'How we verify' },
  { id: 'sources', label: 'Sources & authorities' },
  { id: 'corrections', label: 'Corrections policy' },
  { id: 'review-process', label: 'Review process' },
  { id: 'freshness', label: 'Content freshness' },
  { id: 'contact', label: 'Report an error' },
];

/**
 * /trust — the Trust & Editorial Center. One comprehensive, well-organised page
 * rather than seven thin ones (each section alone wouldn't carry enough real
 * substance to stand as its own page). Every claim on this page describes a
 * mechanism that genuinely exists in the codebase today — the fail-closed
 * resolver, evidence tiers, volatility-based review SLAs, versioned corrections
 * — nothing here is aspirational or invented.
 */
export default async function TrustPage() {
  const authorities = await authoritiesWithLiveCounts();

  return (
    <Container className="max-w-3xl py-10 sm:py-14">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Trust &amp; Editorial Center
        </h1>
        <p className="text-muted-foreground mt-4 text-lg text-pretty">
          Every answer on {siteConfig.name} is built the same way: sourced from a named official
          authority, checked against factual evidence, and dated so you know it’s current. This page
          explains exactly how that works.
        </p>
      </header>

      <nav aria-label="Trust Center sections" className="border-border mt-8 border-y py-4">
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-primary hover:underline">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 space-y-14">
        {/* 1. Editorial policy */}
        <section id="editorial-policy" className="scroll-mt-20">
          <SectionHeading icon={ShieldCheck} title="Editorial policy" />
          <div className="text-muted-foreground mt-4 space-y-3 text-pretty">
            <p>
              We do not publish opinions, guesses, or aggregated forum advice. Every verdict
              (Allowed, Required, Accepted, Eligible, Recommended — worded to match the actual
              question, not a generic yes/no) is built from a factual source: a government
              regulation, an official advisory, or a documented airline/airport policy.
            </p>
            <p>
              If the evidence isn’t strong enough to support a confident answer, the page is
              <strong className="text-foreground"> not published</strong> — a traveller sees a plain
              “verification in progress” notice instead of a guess. We would rather show nothing
              than something wrong.
            </p>
          </div>
        </section>

        {/* 2. How we verify */}
        <section id="how-we-verify" className="scroll-mt-20">
          <SectionHeading icon={BadgeCheck} title="How we verify" />
          <div className="text-muted-foreground mt-4 space-y-3 text-pretty">
            <p>
              Every answer traces back through the same pipeline: a real regulation or policy
              document (the <em>evidence</em>) → attributed to the authority that issued it → used
              to build the answer traveller sees. Nothing is rendered unless that chain is complete
              — question, evidence, and a named authority all present.
            </p>
            <p>
              The wording of the verdict itself is chosen by the type of question being asked. A
              carry question (“Can I bring X?”) answers Allowed / Not allowed. A requirement
              question (“Do I need X?”) answers Required / Not required. We never force a
              requirement or eligibility question into carry-question language — that mismatch is
              exactly how misleading answers happen on other sites.
            </p>
          </div>
        </section>

        {/* 3. Sources & authorities */}
        <section id="sources" className="scroll-mt-20">
          <SectionHeading icon={Landmark} title="Sources & authorities" />
          <p className="text-muted-foreground mt-4 text-pretty">
            Every published answer cites one of these official Indian authorities. Counts below are
            live — they reflect what’s actually verified and published right now.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {authorities.map((a) => (
              <a
                key={a.code}
                href={a.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-border bg-card hover:border-primary/40 rounded-2xl border p-4 transition-colors"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-primary font-mono text-xs font-semibold tracking-wide">
                    {a.code}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {a.verifiedCount} verified {a.verifiedCount === 1 ? 'answer' : 'answers'}
                  </span>
                </div>
                <p className="mt-1 text-sm font-semibold">{a.name}</p>
                <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                  {a.description}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* 4. Corrections policy */}
        <section id="corrections" className="scroll-mt-20">
          <SectionHeading icon={SquarePen} title="Corrections policy" />
          <div className="text-muted-foreground mt-4 space-y-3 text-pretty">
            <p>
              If a rule changes or we get something wrong, the page is corrected in place — we don’t
              quietly edit history. Every revision is checked against the original source again, and
              the page’s “last verified” date updates to reflect the correction.
            </p>
            <p>
              Every question you see today is one we’re confident in as of its verified date. If you
              believe an answer is out of date or incorrect, please tell us (see “Report an error”
              below) — corrections are how we keep this trustworthy, not an admission we’d rather
              avoid.
            </p>
          </div>
        </section>

        {/* 5. Review process */}
        <section id="review-process" className="scroll-mt-20">
          <SectionHeading icon={RefreshCw} title="Review process" />
          <div className="text-muted-foreground mt-4 space-y-3 text-pretty">
            <p>
              Rules don’t all change at the same pace, so we don’t review them all on the same
              schedule. Every answer is assigned a review cycle based on how likely the underlying
              rule is to change:
            </p>
            <dl className="border-border divide-border mt-2 divide-y rounded-xl border">
              {(
                [
                  ['very_high', 'Frequently-changing rules (e.g. currency limits)'],
                  ['high', 'Rules that change periodically (e.g. compensation figures)'],
                  ['medium', 'Stable regulatory rules (most carry/requirement answers)'],
                  ['low', 'Long-standing, rarely-changed rules'],
                ] as const
              ).map(([tier, desc]) => (
                <div key={tier} className="flex items-baseline justify-between gap-4 px-4 py-3">
                  <dt className="text-sm">{desc}</dt>
                  <dd className="text-foreground shrink-0 text-sm font-medium">
                    Every {REVIEW_SLA_DAYS[tier]} days
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 6. Content freshness policy */}
        <section id="freshness" className="scroll-mt-20">
          <SectionHeading icon={Undo2} title="Content freshness policy" />
          <div className="text-muted-foreground mt-4 space-y-3 text-pretty">
            <p>
              Every answer shows a “Verified” date — the date it was last checked against its
              official source, not just the date the page was written. That date only moves forward
              when we’ve actually re-confirmed the answer is still correct.
            </p>
            <p>
              Rules can change faster than our review cycle in rare cases (e.g. a sudden policy
              update). Always treat the verified date as “correct as of this date, please
              double-check anything time-critical directly with your airline or the relevant
              authority” — exactly as our footer disclaimer says on every page.
            </p>
          </div>
        </section>

        {/* 7. Contact / report an error */}
        <section id="contact" className="scroll-mt-20">
          <SectionHeading icon={Mail} title="Report an error" />
          <div className="text-muted-foreground mt-4 space-y-3 text-pretty">
            <p>
              Spotted something wrong, outdated, or unclear? Tell us which question it is and what
              you think is incorrect — we check every report against the original source before
              making a change.
            </p>
            <a
              href={`mailto:${siteConfig.supportEmail}?subject=${encodeURIComponent('Correction report')}`}
              className="border-primary bg-primary text-primary-foreground hover:bg-primary-hover mt-2 inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors"
            >
              <Mail className="size-4" aria-hidden />
              {siteConfig.supportEmail}
            </a>
          </div>
        </section>
      </div>
    </Container>
  );
}

function SectionHeading({ icon: Icon, title }: { icon: typeof ShieldCheck; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="bg-accent text-primary grid size-10 shrink-0 place-items-center rounded-xl">
        <Icon className="size-5" aria-hidden />
      </span>
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
}
