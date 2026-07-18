import type { NextConfig } from 'next';
import { LEGACY_REDIRECTS } from '@/config/legacy-redirects';

/**
 * Next.js configuration — App Router.
 *
 * Security headers live here (edge-applied to every response). The Content
 * Security Policy is intentionally generated per-request in `middleware.ts`
 * with a nonce; the static headers below are the defence-in-depth baseline
 * that applies even on routes the middleware does not run.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Fail the production build on type errors. We never ship red.
  // (Next 16 removed the built-in `eslint` config key / `next lint`; linting
  // runs via the ESLint CLI in `pnpm lint` and CI instead.)
  typescript: { ignoreBuildErrors: false },

  // Typed routes — compile-time safety for internal links (stable in Next 16).
  typedRoutes: true,

  // Permanent redirects from the live production site's legacy URL scheme
  // (/airport-rules/..., /travel-documents/..., /customs/...) to the
  // canonical /question/[slug] this codebase actually serves. See
  // config/legacy-redirects.ts for how each mapping was verified — this is
  // NOT a catch-all; legacy URLs with no real equivalent are deliberately
  // absent here and 404 rather than redirect to something unrelated.
  async redirects() {
    return LEGACY_REDIRECTS.map(({ source, destination }) => ({
      source,
      destination,
      permanent: true,
    }));
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      // Note: Next.js already serves `/_next/static` as immutable, content-hashed
      // assets — no custom Cache-Control needed (and setting one warns in dev).
    ];
  },
};

export default nextConfig;
