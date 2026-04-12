import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from './Layout';
import BackButton from './BackButton';
import TagChip from './TagChip';
import Breadcrumb, { buildRuleBreadcrumbs } from './Breadcrumb';
import FaqSchema from './FaqSchema';
import { rules } from '../data/rules';
import { Rule } from '../data/types';
import { buildRuleUrl, isNewArchRule } from '../lib/urls';
import { generateRuleMeta } from '../lib/seoMeta';

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
  const hasRichContent = Boolean(richContent);
  const richExamples = richContent?.examples ?? [];

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const breadcrumbItems = isNewArchRule(rule)
    ? buildRuleBreadcrumbs(rule.category, rule.subcategory, rule.shortTitle, buildRuleUrl(rule))
    : null;

  const getRuleUrl = (slug: string): string => {
    const target = rules.find((r) => r.slug === slug);
    return target ? buildRuleUrl(target) : `/rules/${slug}`;
  };

  // Resolve sibling rules for "Related rules" cards
  const relatedRules: Rule[] = (rule.internalLinks ?? [])
    .map((slug) => rules.find((r) => r.slug === slug))
    .filter((r): r is Rule => r !== undefined)
    .slice(0, 6);

  const sc = STATUS_CONFIG[rule.verdict.status];

  // Key highlights: first checklist or first 4 howToComply items
  const highlights =
    richContent?.checklists?.[0]?.items?.slice(0, 4) ??
    rule.howToComply.slice(0, 4);

  // Remaining checklists (first is used for highlights)
  const remainingChecklists = richContent?.checklists?.slice(1) ?? [];

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
      {richContent && richContent.faqs.length > 0 && (
        <FaqSchema faqs={richContent.faqs} />
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
            {richContent?.quickAnswer && (
              <p className="mt-2 pt-2 border-t border-slate-200 text-slate-600 text-sm leading-relaxed">
                {richContent.quickAnswer}
              </p>
            )}
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
          {hasRichContent ? (
            <>
              {/* Overview */}
              {richContent!.overview.length > 0 && (
                <section className="mb-5 space-y-3">
                  {richContent!.overview.map((paragraph, idx) => (
                    <p key={idx} className="text-slate-700 leading-relaxed text-[15px]">
                      {paragraph}
                    </p>
                  ))}
                </section>
              )}

              {/* When allowed / When not allowed */}
              {(richContent!.dos.length > 0 || richContent!.donts.length > 0) && (
                <section className="mb-5">
                  <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                    When allowed vs. when not
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {richContent!.dos.length > 0 && (
                      <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                        <p className="text-[11px] font-bold uppercase tracking-wide text-green-700 mb-3">
                          ✅ {sc.allowedHeading}
                        </p>
                        <ul className="space-y-2">
                          {richContent!.dos.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-[13px] text-slate-700 leading-snug">
                              <span className="text-green-500 mt-0.5 flex-shrink-0">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {richContent!.donts.length > 0 && (
                      <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                        <p className="text-[11px] font-bold uppercase tracking-wide text-red-700 mb-3">
                          🚫 {sc.notAllowedHeading}
                        </p>
                        <ul className="space-y-2">
                          {richContent!.donts.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-[13px] text-slate-700 leading-snug">
                              <span className="text-red-400 mt-0.5 flex-shrink-0">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Remaining checklists (first was used for highlights) */}
              {remainingChecklists.length > 0 && (
                <section className="mb-5 grid gap-4 sm:grid-cols-2">
                  {remainingChecklists.map((list, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                      <h3 className="text-[11px] font-bold uppercase tracking-wide text-slate-500 mb-3">
                        {list.title}
                      </h3>
                      <ul className="space-y-2">
                        {list.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2 text-[13px] text-slate-700">
                            <span className="text-green-500 flex-shrink-0 mt-0.5">✔</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
              )}

              {/* Optional Table */}
              {richContent!.table && (
                <section className="mb-5">
                  <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                    {richContent!.table.caption}
                  </h2>
                  <div className="overflow-x-auto border border-slate-200 rounded-xl">
                    <table className="min-w-full divide-y divide-slate-200 text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          {richContent!.table.headers.map((header, idx) => (
                            <th key={idx} className="px-4 py-3 text-left font-semibold text-slate-600 uppercase tracking-wide text-xs">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {richContent!.table.rows.map((row, rowIdx) => (
                          <tr key={rowIdx} className="even:bg-slate-50">
                            {row.map((cell, cellIdx) => (
                              <td key={cellIdx} className="px-4 py-3 text-slate-700 text-sm">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* Real-world examples */}
              {richExamples.length > 0 && (
                <section className="mb-5">
                  <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                    Real-world examples
                  </h2>
                  <ul className="space-y-2">
                    {richExamples.map((example, idx) => (
                      <li key={idx} className="bg-white border border-slate-200 rounded-xl p-4 text-[13px] text-slate-700 leading-relaxed">
                        💡 {example}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* FAQ — accordion */}
              {richContent!.faqs.length > 0 && (
                <section className="mb-5">
                  <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                    Frequently asked questions
                  </h2>
                  <div className="border border-slate-200 rounded-xl divide-y divide-slate-200 overflow-hidden">
                    {richContent!.faqs.map((faq, idx) => (
                      <details key={idx} className="group">
                        <summary className="flex items-center justify-between gap-3 px-4 py-3.5 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-slate-50 transition-colors">
                          <span className="font-semibold text-slate-800 text-sm pr-2">{faq.question}</span>
                          <span className="text-slate-400 text-xl leading-none transition-transform duration-200 group-open:rotate-45 flex-shrink-0 select-none">
                            +
                          </span>
                        </summary>
                        <div className="px-4 pb-4 pt-1 bg-slate-50 text-[13px] text-slate-700 leading-relaxed">
                          {faq.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* Travel tips */}
              {richContent!.tips.length > 0 && (
                <section className="mb-5 bg-blue-50 border border-blue-100 rounded-2xl p-5">
                  <h2 className="text-[11px] font-bold uppercase tracking-widest text-blue-600 mb-3">
                    Travel tips
                  </h2>
                  <ul className="space-y-2">
                    {richContent!.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-[13px] text-slate-700 leading-snug">
                        <span className="flex-shrink-0 mt-0.5">✈️</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* In-article links (labelled, from richContent) */}
              {richContent!.internalLinks.length > 0 && (
                <section className="mb-5">
                  <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                    Related guides
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {richContent!.internalLinks.map((link, idx) => (
                      <Link
                        key={idx}
                        href={getRuleUrl(link.slug)}
                        className="inline-flex items-center px-3 py-1.5 rounded-full border border-slate-200 bg-white text-[13px] font-medium text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </section>
              )}
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
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                Official references
              </h3>
              <ul className="space-y-1">
                {rule.sources.map((source, index) => (
                  <li key={index}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm inline-flex items-center gap-1"
                    >
                      {source.label}
                      <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
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
