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
    allowedHeading: 'When it\'s allowed',
    notAllowedHeading: 'Exceptions / conditions',
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
  const relatedRules: Rule[] = getRelatedRules(rule, rules);

  const sc = STATUS_CONFIG[rule.verdict.status];

  // Shared context handed to every registry renderer (lib/sectionRenderers.tsx)
  // -- the per-rule inputs a renderer can't derive from its own section alone.
  const renderCtx: SectionRenderContext = {
    dosDontsHeadings: { allowedHeading: sc.allowedHeading, notAllowedHeading: sc.notAllowedHeading },
    resolveInternalLink: getRuleUrl,
    formatDate,
  };

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
                {sc.label}
              </span>
            </div>
            <p className="text-slate-800 text-[15px] leading-relaxed font-semibold">
              {rule.verdict.summary}
            </p>
            {quickAnswerSection && SECTION_RENDERERS.quickAnswer?.(quickAnswerSection, renderCtx)}
          </div>

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
              {overviewSection && SECTION_RENDERERS.overview?.(overviewSection, renderCtx)}

              {dosDontsSection && SECTION_RENDERERS.dosDonts?.(dosDontsSection, renderCtx)}

              {/* Remaining checklists (first was used for Key Highlights above) */}
              {remainingChecklists.length > 0 && (
                <section className="mb-5 grid gap-4 sm:grid-cols-2">
                  {remainingChecklists.map((list, idx) => renderChecklistCard(list, idx))}
                </section>
              )}

              {tableSection && SECTION_RENDERERS.table?.(tableSection, renderCtx)}

              {examplesSection && SECTION_RENDERERS.examples?.(examplesSection, renderCtx)}

              {airlineGuidanceSection && SECTION_RENDERERS.airlineGuidance?.(airlineGuidanceSection, renderCtx)}

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

          {hasRichContent && (
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
