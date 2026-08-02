import { GetServerSideProps } from 'next';
import { rules } from '../data/rules';
import {
  buildRuleUrl,
  buildCategoryUrl,
  buildSubcategoryUrl,
  isNewArchRule,
  NEW_ARCH_CATEGORIES,
} from '../lib/urls';

const SITE = 'https://yourtravelguide.in';

function url(path: string, lastmod: string, priority: string): string {
  return `  <url>\n    <loc>${SITE}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
}

function generateSitemap(): string {
  const today = new Date().toISOString().split('T')[0];

  // ── Static pages ───────────────────────────────────────────────────────────
  const staticPages = [
    url('/',               today,        '1.0'),
    url('/first-flight',   today,        '0.9'),
    url('/about',          today,        '0.6'),
    url('/contact',        today,        '0.6'),
    url('/disclaimer',     today,        '0.5'),
    url('/privacy-policy', today,        '0.5'),
    url('/terms',          today,        '0.5'),
  ];

  // ── Category + subcategory lastmod, derived from real child-rule dates ─────
  // (ISO "YYYY-MM-DD" strings sort correctly lexicographically, so a plain
  // string comparison finds the most recent date without parsing.)
  const categoryLastmod = new Map<string, string>();
  const subcategoryLastmod = new Map<string, string>(); // key: "category/subcategory"

  for (const r of rules) {
    if (!isNewArchRule(r)) continue;
    const rLastmod = r.lastUpdated ?? today;

    const prevCat = categoryLastmod.get(r.category);
    if (!prevCat || rLastmod > prevCat) categoryLastmod.set(r.category, rLastmod);

    const subKey = `${r.category}/${r.subcategory}`;
    const prevSub = subcategoryLastmod.get(subKey);
    if (!prevSub || rLastmod > prevSub) subcategoryLastmod.set(subKey, rLastmod);
  }

  // ── Category hub pages (/airport-rules, /travel-documents, /customs) ───────
  const categoryPages = NEW_ARCH_CATEGORIES.map((cat) =>
    url(buildCategoryUrl(cat), categoryLastmod.get(cat) ?? today, '0.9'),
  );

  // ── Subcategory listing pages (unique combos, derived from rules) ──────────
  const subcategoryPages = Array.from(subcategoryLastmod.entries()).map(([key, lastmod]) => {
    const [category, subcategory] = key.split('/');
    return url(buildSubcategoryUrl(category, subcategory), lastmod, '0.8');
  });

  // ── Rule detail pages ──────────────────────────────────────────────────────
  const rulePages = rules.map((r) => {
    const canonicalPath = buildRuleUrl(r as Parameters<typeof buildRuleUrl>[0]);
    const lastmod = r.lastUpdated ?? today;
    const priority = isNewArchRule(r) ? '0.8' : '0.6';
    return url(canonicalPath, lastmod, priority);
  });

  const entries = [
    ...staticPages,
    ...categoryPages,
    ...subcategoryPages,
    ...rulePages,
  ].join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`;
}

// This page renders nothing — it only serves the XML response.
export default function SitemapPage() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const xml = generateSitemap();
  res.setHeader('Content-Type', 'text/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(xml);
  res.end();
  return { props: {} };
};
