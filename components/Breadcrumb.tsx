import Head from 'next/head';
import Link from 'next/link';
import { labelFor } from '../lib/labels';
import { buildCategoryUrl, buildSubcategoryUrl } from '../lib/urls';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]; // ordered list, last item is the current page
  baseUrl?: string;        // full origin for JSON-LD, e.g. "https://yourtravelguide.in"
}

/**
 * Renders:
 *  1. Visible breadcrumb trail with accessible markup.
 *  2. BreadcrumbList JSON-LD injected into <head> via Next.js Head.
 *
 * Import and mount anywhere — it self-serialises the schema.
 */
export default function Breadcrumb({ items, baseUrl = 'https://yourtravelguide.in' }: BreadcrumbProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      item: `${baseUrl}${item.href}`,
    })),
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          key={`breadcrumb-${items.map((i) => i.href).join('-')}`}
        />
      </Head>

      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex flex-wrap items-center gap-x-1 text-sm text-slate-500">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-x-1">
                {idx > 0 && (
                  <svg
                    className="w-3.5 h-3.5 flex-shrink-0 text-slate-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
                {isLast ? (
                  <span className="font-medium text-slate-700 truncate max-w-[180px] sm:max-w-none" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-blue-600 hover:underline transition-colors truncate max-w-[120px] sm:max-w-none"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

// ─── Helper ───────────────────────────────────────────────────────────────────

/**
 * Builds the breadcrumb items array from a new-arch rule URL.
 *
 * @example
 * buildRuleBreadcrumbs('airport-rules', 'cabin-baggage', 'Power Bank in Flight')
 * // → [Home, Airport Rules, Cabin Baggage, Power Bank in Flight]
 */
export function buildRuleBreadcrumbs(
  category: string,
  subcategory: string,
  articleTitle: string,
  articleHref: string,
): BreadcrumbItem[] {
  return [
    { label: 'Home',                      href: '/' },
    { label: labelFor(category),          href: buildCategoryUrl(category) },
    { label: labelFor(subcategory),       href: buildSubcategoryUrl(category, subcategory) },
    { label: articleTitle,                href: articleHref },
  ];
}
