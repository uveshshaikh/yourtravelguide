import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

/**
 * Edge proxy — runs on every matched request.
 * (Next.js 16 renamed the `middleware` file convention to `proxy`.)
 *
 * Responsibilities (security foundation):
 *  1. Refresh the Supabase auth session (keeps SSR + client in sync).
 *  2. Emit a strict, per-request nonce-based Content-Security-Policy.
 *
 * Authorization (who-can-do-what) is NOT done here — it lives at the data layer
 * (Supabase RLS) and in route handlers, so a missed matcher can never become a
 * privilege escalation. This is defence-in-depth, not the gate.
 */
export default async function proxy(request: NextRequest) {
  const response = await updateSession(request);

  // Per-request nonce for inline scripts/styles.
  const nonce = crypto.randomUUID().replace(/-/g, '');
  const isDev = process.env.NODE_ENV === 'development';

  /*
   * Production is strict (nonce + strict-dynamic, NO unsafe-eval). Development
   * must relax script-src: React dev mode + HMR require eval() and inline
   * scripts, and the dev server uses same-origin WebSockets. `upgrade-insecure-
   * requests` is dropped in dev so http://localhost assets aren't force-upgraded.
   */
  const csp = [
    `default-src 'self'`,
    isDev
      ? `script-src 'self' 'unsafe-eval' 'unsafe-inline' https:`
      : `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https:`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' blob: data: https:`,
    `font-src 'self' data:`,
    `connect-src 'self'${isDev ? ' ws:' : ''} https://*.supabase.co https://vitals.vercel-insights.com`,
    `frame-ancestors 'self'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `object-src 'none'`,
    ...(isDev ? [] : [`upgrade-insecure-requests`]),
  ].join('; ');

  response.headers.set('x-nonce', nonce);
  response.headers.set('Content-Security-Policy', csp);
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths except static assets and image optimisation, which need
     * neither session refresh nor CSP and benefit from skipping the proxy.
     */
    {
      source:
        '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
