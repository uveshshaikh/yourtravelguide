import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { listVerifiedQuestions, listByIntentGroup } from '@/services/resolver/catalog';
import { intentGroupSlug, type IntentGroup } from '@/db/seed/content';

/**
 * Dynamic XML sitemap — generated from the SAME fail-closed data source every
 * other surface uses (`listVerifiedQuestions()`), so it is structurally
 * impossible to list an unpublished or incomplete question: if it isn't
 * verified and live, it was never in the array to begin with.
 *
 * Deliberately excludes: /search (query-driven, noindexed), demo routes,
 * incomplete-knowledge pages (they don't exist as separate URLs — a slug is
 * either verified, in which case it's here, or it renders "in progress" at the
 * same URL and is excluded by simply not being in this list).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [questions, groups] = await Promise.all([listVerifiedQuestions(), listByIntentGroup()]);

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/trust`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${siteConfig.url}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${siteConfig.url}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ];

  const questionEntries: MetadataRoute.Sitemap = questions.map((q) => ({
    url: `${siteConfig.url}/question/${q.slug}`,
    lastModified: q.lastVerified ? new Date(q.lastVerified) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Only groups with real live content exist (listByIntentGroup already omits
  // empty ones), so this can never list a hub page that would 404.
  const categoryEntries: MetadataRoute.Sitemap = groups.map((g) => ({
    url: `${siteConfig.url}/category/${intentGroupSlug(g.group as IntentGroup)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticEntries, ...categoryEntries, ...questionEntries];
}
