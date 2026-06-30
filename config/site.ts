import { clientEnv } from '@/lib/env';

/**
 * Single source of truth for site-level identity and metadata.
 * Pages, layouts, sitemap, and structured data read from here — never hardcode.
 */
export const siteConfig = {
  name: 'YourTravelGuide',
  shortName: 'YTG',
  description:
    'Trusted, source-verified answers for Indian travellers — before, during, and after every trip.',
  url: clientEnv.NEXT_PUBLIC_SITE_URL,
  locale: 'en_IN',
  defaultOgImage: '/og-default.png',
  creator: 'YourTravelGuide',
  links: {
    // Populated as channels go live.
  },
} as const;

export type SiteConfig = typeof siteConfig;
