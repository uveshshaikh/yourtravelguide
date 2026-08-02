import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { rules } from '../../../data/rules';
import { Rule } from '../../../data/types';
import Layout from '../../../components/Layout';
import Breadcrumb, { BreadcrumbItem } from '../../../components/Breadcrumb';
import { isNewArchRule, NEW_ARCH_CATEGORIES, buildCategoryUrl, buildSubcategoryUrl } from '../../../lib/urls';
import { labelFor } from '../../../lib/labels';
import { generateSubcategoryMeta } from '../../../lib/seoMeta';

type SlimRule = Pick<Rule, 'slug' | 'shortTitle' | 'verdict'>;

interface PageProps {
  category: string;
  subcategory: string;
  categoryLabel: string;
  subcategoryLabel: string;
  rules: SlimRule[];
  breadcrumbs: BreadcrumbItem[];
}

export default function SubcategoryIndexPage({
  category,
  subcategory,
  categoryLabel,
  subcategoryLabel,
  rules: pageRules,
  breadcrumbs,
}: PageProps) {
  const getStatusColor = (status: Rule['verdict']['status']) => {
    switch (status) {
      case 'allowed':     return 'text-green-700 bg-green-50 border-green-200';
      case 'not_allowed': return 'text-red-700 bg-red-50 border-red-200';
      case 'limited':     return 'text-amber-700 bg-amber-50 border-amber-200';
      default:            return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };
  const getStatusLabel = (status: Rule['verdict']['status']) => {
    switch (status) {
      case 'allowed':     return 'Allowed';
      case 'not_allowed': return 'Not Allowed';
      case 'limited':     return 'Limited';
      default:            return status;
    }
  };

  return (
    <Layout
      {...generateSubcategoryMeta({ subcategoryLabel, categoryLabel, ruleCount: pageRules.length })}
      canonicalPath={buildSubcategoryUrl(category, subcategory)}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbs} />

        <h1 className="text-3xl font-bold text-slate-900 mb-2">{subcategoryLabel}</h1>
        <p className="text-slate-500 mb-8">
          {pageRules.length} rule{pageRules.length !== 1 ? 's' : ''} under{' '}
          <Link href={buildCategoryUrl(category)} className="text-blue-600 hover:underline">
            {categoryLabel}
          </Link>
        </p>

        <ul className="grid gap-3 sm:grid-cols-2">
          {pageRules.map((rule) => (
            <li key={rule.slug}>
              <Link
                href={`${buildSubcategoryUrl(category, subcategory)}/${rule.slug}`}
                className="flex items-start justify-between gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm transition group"
              >
                <span className="text-sm font-medium text-slate-800 group-hover:text-blue-600 leading-snug">
                  {rule.shortTitle}
                </span>
                <span className={`flex-shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full border ${getStatusColor(rule.verdict.status)}`}>
                  {getStatusLabel(rule.verdict.status)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const seen = new Set<string>();
  const paths: { params: { category: string; subcategory: string } }[] = [];

  for (const rule of rules) {
    if (!isNewArchRule(rule)) continue;
    const key = `${rule.category}/${rule.subcategory}`;
    if (seen.has(key)) continue;
    seen.add(key);
    paths.push({ params: { category: rule.category, subcategory: rule.subcategory } });
  }

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const category = params?.category as string;
  const subcategory = params?.subcategory as string;

  if (!(NEW_ARCH_CATEGORIES as readonly string[]).includes(category)) {
    return { notFound: true };
  }

  const pageRules = rules
    .filter((r) => isNewArchRule(r) && r.category === category && r.subcategory === subcategory)
    .map((r) => ({ slug: r.slug, shortTitle: r.shortTitle, verdict: r.verdict } satisfies SlimRule));

  if (!pageRules.length) return { notFound: true };

  const categoryLabel = labelFor(category);
  const subcategoryLabel = labelFor(subcategory);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home',             href: '/' },
    { label: categoryLabel,      href: buildCategoryUrl(category) },
    { label: subcategoryLabel,   href: buildSubcategoryUrl(category, subcategory) },
  ];

  return {
    props: {
      category,
      subcategory,
      categoryLabel,
      subcategoryLabel,
      rules: pageRules,
      breadcrumbs,
    },
  };
};
