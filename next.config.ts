import type { NextConfig } from "next";
import { rules } from "./data/rules";
import { buildRuleUrl, isNewArchRule } from "./lib/urls";
import { validateRules } from "./lib/validateContent";

// Runs on every `next dev` / `next build` / `next start` boot, before the app
// serves anything. Throws (failing the build) on duplicate slugs or dangling
// internalLinks references -- see lib/validateContent.ts.
validateRules(rules);

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /**
   * Server-level 308 redirects — auto-generated from rules data.
   * No manual maintenance: update category in data/rules.ts and it propagates.
   */
  async redirects() {
    const ruleRedirects = rules
      .filter(isNewArchRule)
      .map((rule) => ({
        source: `/rules/${rule.slug}`,
        destination: buildRuleUrl(rule),
        permanent: true,
      }));

    return ruleRedirects;
  },

  /**
   * Security + performance HTTP headers applied to every response.
   */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevent MIME-type sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Block clickjacking
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Force HTTPS on repeat visits (1 year)
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          // Restrict referrer leakage
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Basic permissions policy
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
        ],
      },
      {
        // Cache static assets aggressively (Next.js _next/static is content-hashed)
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Cache OG images for 1 hour (they're dynamic but stable per title)
        source: '/api/og',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },
    ];
  },
};

export default nextConfig;
