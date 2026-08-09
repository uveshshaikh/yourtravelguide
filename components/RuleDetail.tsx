import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from './Layout';
import BackButton from './BackButton';
import TagChip from './TagChip';
import Breadcrumb, { buildRuleBreadcrumbs } from './Breadcrumb';
import FaqSchema from './FaqSchema';
import { rules } from '../data/rules';
import { Rule } from '../data/types';
import {
  QuickAnswerSection,
  OverviewSection,
  DosDontsSection,
  TableSection,
  ExamplesSection,
  FaqSection,
  TipsSection,
  InternalLinksSection,
  ReferenceSection,
  ChecklistSection,
  AirlineGuidanceSection,
  AirportGuidanceSection,
  DomesticInternationalGuidanceSection,
  WaterSafetySection,
  SecurityProcessSection,
} from '../data/sections';
import { buildRuleUrl, isNewArchRule } from '../lib/urls';
import { generateRuleMeta } from '../lib/seoMeta';
import { getRelatedRules, resolveRuleBySlug } from '../lib/relatedRules';
import { getArticleSections } from '../lib/sections';
import { SECTION_RENDERERS, renderChecklistCard, SectionRenderContext } from '../lib/sectionRenderers';

interface RuleDetailProps {
  rule: Rule;
}

const STATUS_CONFIG = {
  allowed: {
    border: 'border-green-300',
    bg: 'bg-green-50',
    badgeBg: 'bg-green-600',
    label: 'Yes — Allowed',
    icon: '✓',
    iconColor: 'text-green-700',
    dot: 'bg-green-500',
    // For an allowed rule these two lists hold actions, not conditions --
    // verified across the allowed rules' `dos` content -- so "Do"/"Don't" is
    // the honest label. `limited` and `not_allowed` keep their condition-shaped
    // headings until their content is reviewed the same way.
    allowedHeading: 'Do',
    notAllowedHeading: 'Don\'t',
    dosDontsTitle: 'What to do',
  },
  not_allowed: {
    border: 'border-red-300',
    bg: 'bg-red-50',
    badgeBg: 'bg-red-600',
    label: 'No — Not Allowed',
    icon: '✗',
    iconColor: 'text-red-700',
    dot: 'bg-red-500',
    allowedHeading: 'Limited exceptions',
    notAllowedHeading: 'Why it\'s not allowed',
    dosDontsTitle: 'When allowed vs. when not',
  },
  limited: {
    border: 'border-amber-300',
    bg: 'bg-amber-50',
    badgeBg: 'bg-amber-500',
    label: 'Conditional — Depends',
    icon: '!',
    iconColor: 'text-amber-700',
    dot: 'bg-amber-500',
    allowedHeading: 'When it\'s allowed',
    notAllowedHeading: 'When it\'s NOT allowed',
    dosDontsTitle: 'When allowed vs. when not',
  },
} as const;

/**
 * Full page renderer for a single rule. Used by both the legacy
 * /rules/[slug] route and the new /[category]/[subcategory]/[slug] route.
 */
export default function RuleDetail({ rule }: RuleDetailProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const richContent = rule.richContent;
  // Branch selector only (which JSX branch to render below) -- deliberately
  // NOT derived from the sections[] array, so it can't change behaviour
  // based on what a future rule.sections happens to contain. Section
  // *content* below is sourced from getArticleSections(), not richContent.
  const hasRichContent = Boolean(richContent);

  // Phase B2: RuleDetail renders from getArticleSections(rule), which
  // returns rule.sections as-is if authored directly, or derives the
  // equivalent sections from richContent otherwise (lib/sections.ts). No
  // rule currently sets `sections`, so every page below reads the same
  // values it did before -- just through one typed interface instead of
  // reading richContent's fields directly.
  const sections = getArticleSections(rule);

  const quickAnswerSection = sections.find((s): s is QuickAnswerSection => s.type === 'quickAnswer');
  const overviewSection = sections.find((s): s is OverviewSection => s.type === 'overview');
  const dosDontsSection = sections.find((s): s is DosDontsSection => s.type === 'dosDonts');
  const tableSection = sections.find((s): s is TableSection => s.type === 'table');
  const examplesSection = sections.find((s): s is ExamplesSection => s.type === 'examples');
  const faqSection = sections.find((s): s is FaqSection => s.type === 'faq');
  const tipsSection = sections.find((s): s is TipsSection => s.type === 'tips');
  const internalLinksSection = sections.find((s): s is InternalLinksSection => s.type === 'internalLinks');
  const referenceSection = sections.find((s): s is ReferenceSection => s.type === 'reference');
  const airlineGuidanceSection = sections.find((s): s is AirlineGuidanceSection => s.type === 'airlineGuidance');
  const airportGuidanceSection = sections.find((s): s is AirportGuidanceSection => s.type === 'airportGuidance');
  const domesticInternationalSection = sections.find(
    (s): s is DomesticInternationalGuidanceSection => s.type === 'domesticInternationalGuidance',
  );
  const waterSafetySection = sections.find((s): s is WaterSafetySection => s.type === 'waterSafety');
  const securityProcessSection = sections.find((s): s is SecurityProcessSection => s.type === 'securityProcess');
  const checklistSections = sections.filter((s): s is ChecklistSection => s.type === 'checklist');

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const breadcrumbItems = isNewArchRule(rule)
    ? buildRuleBreadcrumbs(rule.category, rule.subcategory, rule.shortTitle, buildRuleUrl(rule))
    : null;

  // Returns null (never a legacy /rules/ URL) when the referenced slug
  // doesn't resolve to a current rule — callers must skip rendering the link
  // rather than pointing it at a broken or legacy URL.
  const getRuleUrl = (slug: string): string | null => {
    const target = resolveRuleBySlug(slug, rules);
    return target ? buildRuleUrl(target) : null;
  };

  // "Related rules" cards — derived from subcategory/tags (see
  // lib/relatedRules.ts), not a hardcoded per-rule list. Every rule gets
  // meaningfully relevant related links even where none have been manually
  // curated (rule.internalLinks is honoured first when it exists).
  // When a rule curates its own related-rules list (top-level internalLinks,
  // Tier 0 in getRelatedRules), cap the result to exactly that list rather
  // than padding it with auto-derived matches up to the default of 6. A
  // no-op for every rule that doesn't set internalLinks (none currently do),
  // since the fallback is the existing default.
  const relatedRules: Rule[] = getRelatedRules(rule, rules, rule.internalLinks?.length || 6);

  const sc = STATUS_CONFIG[rule.verdict.status];

  // Shared context handed to every registry renderer (lib/sectionRenderers.tsx)
  // -- the per-rule inputs a renderer can't derive from its own section alone.
  const renderCtx: SectionRenderContext = {
    dosDontsHeadings: { allowedHeading: sc.allowedHeading, notAllowedHeading: sc.notAllowedHeading },
    dosDontsTitle: sc.dosDontsTitle,
    resolveInternalLink: getRuleUrl,
    formatDate,
  };

  /**
   * Threshold bands pulled from the rule's own comparison table -- no new data
   * and no second source of truth. A table qualifies only when every row's
   * second cell carries one of the three status markers already used in the
   * data, which is what makes it a decision ladder ("which band am I in?")
   * rather than an arbitrary comparison; anything else falls through to the
   * existing quick-answer text.
   */
  const BAND_STYLES: Record<string, { dot: string; textClass: string }> = {
    '✅': { dot: 'bg-green-500', textClass: 'text-green-700' },
    '⚠️': { dot: 'bg-amber-500', textClass: 'text-amber-700' },
    '❌': { dot: 'bg-red-500', textClass: 'text-red-700' },
  };

  const thresholdBands = (() => {
    const rows = tableSection?.rows ?? [];
    if (rows.length === 0) return [];
    const bands = rows.map(row => {
      const marker = Object.keys(BAND_STYLES).find(m => (row[1] ?? '').startsWith(m));
      if (!marker) return null;
      const style = BAND_STYLES[marker];
      return {
        range: row[0],
        status: (row[1] ?? '').slice(marker.length).trim(),
        dot: style.dot,
        textClass: style.textClass,
      };
    });
    return bands.every(Boolean) ? (bands as NonNullable<(typeof bands)[number]>[]) : [];
  })();

  // Key highlights: first checklist or first 4 howToComply items
  const highlights =
    checklistSections[0]?.items?.slice(0, 4) ??
    rule.howToComply.slice(0, 4);

  // Remaining checklists (first is used for highlights)
  const remainingChecklists = checklistSections.slice(1);

  const { title: metaTitle, description: metaDescription } = generateRuleMeta(rule);
  const canonicalPath = buildRuleUrl(rule);
  const ogImage = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourtravelguide.in'}/api/og?${new URLSearchParams({
    title: rule.shortTitle,
    sub: rule.verdict.summary,
    status: rule.verdict.status,
    type: 'rule',
  }).toString()}`;

  return (
    <Layout title={metaTitle} description={metaDescription} canonicalPath={canonicalPath} ogImage={ogImage}>
      {faqSection && faqSection.items.length > 0 && (
        <FaqSchema faqs={faqSection.items} />
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {breadcrumbItems && <Breadcrumb items={breadcrumbItems} />}
        <BackButton label="Back to all rules" className="mb-6" />

        <article>

          {/* ── H1 ──────────────────────────────────────────────────────── */}
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-5 leading-snug">
            {rule.title}
          </h1>

          {/* ── Short Answer Box ─────────────────────────────────────────── */}
          <div className={`rounded-2xl border-2 ${sc.border} ${sc.bg} p-5 mb-5`}>
            <div className="flex items-center gap-3 mb-3">
              <span className={`inline-flex items-center justify-center w-9 h-9 rounded-full ${sc.badgeBg} text-white text-base font-bold select-none flex-shrink-0`}>
                {sc.icon}
              </span>
              <span className={`text-xl font-extrabold tracking-tight ${sc.iconColor}`}>
                {rule.verdictHeadline ?? sc.label}
              </span>
            </div>
            <p className="text-slate-800 text-[15px] leading-relaxed font-semibold">
              {rule.verdict.summary}
            </p>

            {/* Threshold bands, colour-coded, inside the answer box. For a
                rule that hinges on a limit, "which band am I in?" IS the
                answer. This replaces the prose restatement rather than adding
                to it, so it costs no vertical space -- promoting the full
                table here instead measured ~380px and pushed every actionable
                instruction off the first screen on all four phone sizes. */}
            {thresholdBands.length > 0 ? (
              <ul className="mt-3 pt-3 border-t border-slate-900/10 space-y-1.5">
                {thresholdBands.map((band, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[13px] leading-snug">
                    <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${band.dot}`} aria-hidden="true" />
                    <span className="text-slate-800">
                      <strong className="font-semibold">{band.range}</strong>
                      <span className={`ml-1.5 font-semibold ${band.textClass}`}>{band.status}</span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              quickAnswerSection && SECTION_RENDERERS.quickAnswer?.(quickAnswerSection, renderCtx)
            )}
          </div>

          {/* ── Do / Don't ───────────────────────────────────────────────────
              Promoted to sit directly under the verdict: "what do I actually
              do about it?" is the question a traveller has the instant they
              read the answer. It previously rendered fourth, below three
              explanatory paragraphs, so the single most consequential
              instruction on a page (e.g. never check a power bank) was not
              visible until well past the fold. */}
          {dosDontsSection && SECTION_RENDERERS.dosDonts?.(dosDontsSection, renderCtx)}

          {/* ── Topic-specific guidance ────────────────────────────────────────
              All five guidance types promoted together, above the generic
              supporting content: when a rule's answer varies by airline,
              airport, route type, water source or security process, that
              difference is decision-relevant, not background reading. Grouped
              here (rather than airlineGuidance alone) so every rule gets the
              same promotion regardless of which guidance type it happens to
              use -- previously only airlineGuidance was promoted, so a rule
              using e.g. airportGuidance instead didn't get this treatment. */}
          {airlineGuidanceSection && SECTION_RENDERERS.airlineGuidance?.(airlineGuidanceSection, renderCtx)}
          {airportGuidanceSection && SECTION_RENDERERS.airportGuidance?.(airportGuidanceSection, renderCtx)}
          {domesticInternationalSection &&
            SECTION_RENDERERS.domesticInternationalGuidance?.(domesticInternationalSection, renderCtx)}
          {waterSafetySection && SECTION_RENDERERS.waterSafety?.(waterSafetySection, renderCtx)}
          {securityProcessSection && SECTION_RENDERERS.securityProcess?.(securityProcessSection, renderCtx)}

          {/* ── Worked examples ──────────────────────────────────────────────
              A concrete "is mine under the limit?" calculation is far more use
              than the formula alone, so it sits with the practical guidance
              rather than down in the prose. */}
          {examplesSection && SECTION_RENDERERS.examples?.(examplesSection, renderCtx)}

          {/* ── Key Highlights ───────────────────────────────────────────── */}
          {highlights.length > 0 && (
            <section className="mb-5 bg-white border border-slate-200 rounded-2xl p-5">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                Key highlights
              </h2>
              <ul className="space-y-2">
                {highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-slate-700 text-sm leading-snug">
                    <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${sc.dot}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ── Rich content ─────────────────────────────────────────────── */}
          {/* Each block below delegates to lib/sectionRenderers.tsx -- this
              component only decides which sections exist and in what order,
              not how any individual section is drawn. Checklists are the one
              grouped exception (see renderChecklistCard's doc comment). */}
          {hasRichContent ? (
            <>
              {/* Do/Don't now renders above, immediately under the verdict. */}
              {overviewSection && SECTION_RENDERERS.overview?.(overviewSection, renderCtx)}

              {/* Remaining checklists (first was used for Key Highlights above) */}
              {remainingChecklists.length > 0 && (
                <section className="mb-5 grid gap-4 sm:grid-cols-2">
                  {remainingChecklists.map((list, idx) => renderChecklistCard(list, idx))}
                </section>
              )}

              {/* Examples and all topic-guidance types now render above, with
                  the practical guidance (see the promoted block near the top).
                  The full table renders here ONLY as a conservative fallback:
                  when its rows qualify for the compact threshold strip in the
                  verdict box (thresholdBands, above), showing the full table
                  too would restate the same bands twice, so it's suppressed.
                  When a table's rows DON'T match that shape -- any table that
                  isn't a simple 3-marker capacity ladder -- it still renders
                  in full here. Before this fix it was unconditionally
                  suppressed for every rule, which silently deleted table
                  content on any rule whose table didn't happen to match
                  Power Bank's specific shape. */}
              {tableSection && thresholdBands.length === 0 &&
                SECTION_RENDERERS.table?.(tableSection, renderCtx)}

              {faqSection && SECTION_RENDERERS.faq?.(faqSection, renderCtx)}

              {tipsSection && SECTION_RENDERERS.tips?.(tipsSection, renderCtx)}

              {internalLinksSection && SECTION_RENDERERS.internalLinks?.(internalLinksSection, renderCtx)}
            </>
          ) : (
            <>
              {/* How to Comply (legacy) */}
              <section className="mb-5">
                <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                  How to comply
                </h2>
                <ul className="border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden">
                  {rule.howToComply.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 px-4 py-3 bg-white text-[13px] text-slate-700">
                      <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Why Rule Exists */}
              <section className="mb-5">
                <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                  Why this rule exists
                </h2>
                <p className="text-[13px] text-slate-700 leading-relaxed bg-slate-50 px-4 py-3 rounded-xl border border-slate-200">
                  {rule.whyRuleExists}
                </p>
              </section>

              {/* Extra Notes */}
              {rule.extraNotes.length > 0 && (
                <section className="mb-5">
                  <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                    Things to keep in mind
                  </h2>
                  <ul className="space-y-2">
                    {rule.extraNotes.map((note, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-[13px] text-slate-700">
                        <span className="text-amber-500 flex-shrink-0 mt-0.5">⚠</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </>
          )}

          {/* ── Related Rules cards ──────────────────────────────────────── */}
          {relatedRules.length > 0 && (
            <section className="mb-5">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                Related rules
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {relatedRules.map((related) => {
                  const rsc = STATUS_CONFIG[related.verdict.status];
                  return (
                    <Link
                      key={related.slug}
                      href={buildRuleUrl(related)}
                      className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-300 hover:shadow-sm transition-all group"
                    >
                      <span className={`mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0 ${rsc.dot}`} />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 leading-snug">
                          {related.shortTitle}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                          {related.verdict.summary}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* ── Sources & Meta ───────────────────────────────────────────── */}
          <hr className="border-slate-200 my-6" />

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
            {SECTION_RENDERERS.reference?.(referenceSection ?? { type: 'reference', sources: rule.sources }, renderCtx)}
            <div className="text-xs text-slate-400 shrink-0">
              Last updated: {formatDate(rule.lastUpdated)}
            </div>
          </div>

          {/* power-bank-in-flight opts out: this box's "DGCA guidelines" label
              doesn't tie to any specific DGCA citation for the content on this
              page -- its sourcing is now Air India/IndiGo/IATA (see Official
              references), and DGCA-as-heading here would read as a trust badge
              rather than an actual source. Scoped to this one rule rather than
              changed for every richContent rule, which use it legitimately. */}
          {hasRichContent && rule.slug !== 'power-bank-in-flight' && (
            <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                DGCA guidelines — simplified
              </p>
              <p className="text-xs text-slate-600">
                Verified on: {richContent ? formatDate(richContent.verifiedOn) : formatDate(rule.lastUpdated)}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Disclaimer: Aviation and security rules change frequently. Always confirm with your airline, airport help desk, or CISF officers before you travel.
              </p>
            </div>
          )}

          <div className="mt-5 pt-5 border-t border-slate-100">
            <div className="flex flex-wrap gap-1.5">
              {rule.tags.map((tag) => (
                <TagChip key={tag} label={tag} />
              ))}
            </div>
          </div>

        </article>
      </div>
    </Layout>
  );
}
