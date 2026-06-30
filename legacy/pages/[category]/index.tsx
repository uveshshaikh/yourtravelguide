import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { rules } from '../../data/rules';
import { Rule } from '../../data/types';
import Layout from '../../components/Layout';
import Breadcrumb, { BreadcrumbItem } from '../../components/Breadcrumb';
import { isNewArchRule, NEW_ARCH_CATEGORIES } from '../../lib/urls';
import { labelFor, SUBCATEGORY_LABELS } from '../../lib/labels';
import { HUB_CONTENT, HubContent } from '../../lib/hubContent';
import { generateCategoryMeta } from '../../lib/seoMeta';

interface SubcategoryGroup {
  subcategory: string;
  label: string;
  totalRules: number;
  topRules: Pick<Rule, 'slug' | 'shortTitle' | 'verdict'>[];
}

interface PageProps {
  category: string;
  categoryLabel: string;
  totalRules: number;
  groups: SubcategoryGroup[];
  breadcrumbs: BreadcrumbItem[];
  hub: HubContent;
}

const STATUS_DOT: Record<Rule['verdict']['status'], string> = {
  allowed:     'bg-green-500',
  not_allowed: 'bg-red-500',
  limited:     'bg-amber-400',
};

const STATUS_BADGE: Record<Rule['verdict']['status'], string> = {
  allowed:     'text-green-700 bg-green-50 border-green-200',
  not_allowed: 'text-red-700 bg-red-50 border-red-200',
  limited:     'text-amber-700 bg-amber-50 border-amber-200',
};

const STATUS_LABEL: Record<Rule['verdict']['status'], string> = {
  allowed:     'Allowed',
  not_allowed: 'Not Allowed',
  limited:     'Conditional',
};

export default function CategoryIndexPage({
  category,
  categoryLabel,
  totalRules,
  groups,
  breadcrumbs,
  hub,
}: PageProps) {

  // JSON-LD: FAQPage schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: hub.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <Layout
      {...generateCategoryMeta({ categoryLabel, tagline: hub.tagline, totalRules })}
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbs} />

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug mb-2">
            {categoryLabel}
          </h1>
          <p className="text-base text-slate-500 font-medium mb-4">{hub.tagline}</p>
          <p className="text-[15px] text-slate-700 leading-relaxed">{hub.intro}</p>

          {/* Stats row */}
          <div className="mt-4 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 rounded-full px-3 py-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              {totalRules} rules covered
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-green-50 text-green-700 border border-green-100 rounded-full px-3 py-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              DGCA compliant
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-slate-50 text-slate-600 border border-slate-200 rounded-full px-3 py-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              Regularly updated
            </span>
          </div>
        </header>

        {/* ── Why it matters callout ──────────────────────────────────── */}
        <div className="mb-8 border-l-4 border-amber-400 bg-amber-50 rounded-r-xl px-4 py-3">
          <p className="text-[13px] font-bold uppercase tracking-wider text-amber-700 mb-1">Why this matters</p>
          <p className="text-[13px] text-slate-700 leading-relaxed">{hub.whyItMatters}</p>
        </div>

        {/* ── Subcategory grid ────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4">
            Browse by topic
          </h2>
          <div className="space-y-6">
            {groups.map((group) => (
              <div key={group.subcategory} className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
                {/* Subcategory header */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-800">{group.label}</h3>
                    <span className="text-xs text-slate-400">{group.totalRules} rule{group.totalRules !== 1 ? 's' : ''}</span>
                  </div>
                  <Link
                    href={`/${category}/${group.subcategory}`}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    View all →
                  </Link>
                </div>

                {/* Top rules */}
                <ul className="divide-y divide-slate-100">
                  {group.topRules.map((rule) => (
                    <li key={rule.slug}>
                      <Link
                        href={`/${category}/${group.subcategory}/${rule.slug}`}
                        className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-slate-50 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${STATUS_DOT[rule.verdict.status]}`} />
                          <span className="text-[13px] font-medium text-slate-700 group-hover:text-blue-600 leading-snug truncate">
                            {rule.shortTitle}
                          </span>
                        </div>
                        <span className={`flex-shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${STATUS_BADGE[rule.verdict.status]}`}>
                          {STATUS_LABEL[rule.verdict.status]}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* "See X more" link if truncated */}
                {group.totalRules > group.topRules.length && (
                  <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50">
                    <Link
                      href={`/${category}/${group.subcategory}`}
                      className="text-xs text-slate-500 hover:text-blue-600 hover:underline"
                    >
                      + {group.totalRules - group.topRules.length} more rules in {group.label}
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── SEO body sections ───────────────────────────────────────── */}
        <div className="mb-10 space-y-8">
          {hub.sections.map((section, idx) => (
            <section key={idx}>
              <h2 className="text-lg font-bold text-slate-900 mb-3">{section.heading}</h2>
              <div className="space-y-3">
                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-[14px] text-slate-700 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* ── Internal linking block ──────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4">
            Explore subcategories
          </h2>
          <div className="flex flex-wrap gap-2">
            {groups.map((group) => (
              <Link
                key={group.subcategory}
                href={`/${category}/${group.subcategory}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-[13px] font-medium text-slate-700 hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50 transition-colors"
              >
                {group.label}
                <span className="text-slate-400 text-xs">{group.totalRules}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── FAQ accordion ───────────────────────────────────────────── */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            Frequently asked questions — {categoryLabel}
          </h2>
          <div className="border border-slate-200 rounded-2xl divide-y divide-slate-200 overflow-hidden">
            {hub.faqs.map((faq, idx) => (
              <details key={idx} className="group">
                <summary className="flex items-center justify-between gap-3 px-4 py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-slate-50 transition-colors">
                  <span className="font-semibold text-slate-800 text-[14px] pr-2">{faq.question}</span>
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

        {/* ── Disclaimer ──────────────────────────────────────────────── */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1">
            Disclaimer
          </p>
          <p className="text-xs text-slate-500 leading-relaxed">
            Rules are compiled from DGCA, BCAS, and CBIC official sources and updated regularly. Aviation and customs regulations change without notice — always verify with your airline, the official airport help desk, or the relevant government authority before you travel.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = NEW_ARCH_CATEGORIES.map((category) => ({
    params: { category },
  }));
  return { paths, fallback: false };
};

const TOP_RULES_PER_SUBCATEGORY = 4;

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const category = params?.category as string;

  if (!(NEW_ARCH_CATEGORIES as readonly string[]).includes(category)) {
    return { notFound: true };
  }

  const hub = HUB_CONTENT[category];
  if (!hub) return { notFound: true };

  const categoryRules = rules.filter(
    (r) => isNewArchRule(r) && r.category === category,
  ) as (Rule & { category: string; subcategory: string })[];

  // Group by subcategory, preserve insertion order
  const groupMap = new Map<string, SubcategoryGroup>();
  for (const rule of categoryRules) {
    if (!groupMap.has(rule.subcategory)) {
      groupMap.set(rule.subcategory, {
        subcategory: rule.subcategory,
        label: SUBCATEGORY_LABELS[rule.subcategory] ?? labelFor(rule.subcategory),
        totalRules: 0,
        topRules: [],
      });
    }
    const g = groupMap.get(rule.subcategory)!;
    g.totalRules += 1;
    if (g.topRules.length < TOP_RULES_PER_SUBCATEGORY) {
      g.topRules.push({ slug: rule.slug, shortTitle: rule.shortTitle, verdict: rule.verdict });
    }
  }

  const categoryLabel = labelFor(category);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home',        href: '/' },
    { label: categoryLabel, href: `/${category}` },
  ];

  return {
    props: {
      category,
      categoryLabel,
      totalRules: categoryRules.length,
      groups: Array.from(groupMap.values()),
      breadcrumbs,
      hub,
    },
  };
};
