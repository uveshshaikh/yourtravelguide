import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

/**
 * Dynamic robots.txt (replaces the old static public/robots.txt so the
 * sitemap reference and host always match `siteConfig`, the single source of
 * truth). Disallows query-driven search pages (noindexed anyway — see their
 * page-level metadata), demo/preview routes, and the health-check API —
 * nothing here is meant to be crawled or indexed.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/search', '/demo', '/demo/*', '/api/*'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
