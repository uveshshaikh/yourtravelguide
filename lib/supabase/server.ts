import 'server-only';
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { clientEnv } from '@/lib/env';

type CookieToSet = { name: string; value: string; options: CookieOptions };

/**
 * Supabase client for Server Components, Route Handlers, and Server Actions.
 * Reads/writes the auth session via Next's cookie store so SSR stays in sync.
 *
 * Always create a fresh client per request (cookies are request-scoped) — never
 * hoist this to a module singleton.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    clientEnv.NEXT_PUBLIC_SUPABASE_URL,
    clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // `setAll` from a Server Component is a no-op (read-only cookies).
            // Session refresh is handled in middleware; safe to ignore here.
          }
        },
      },
    },
  );
}
