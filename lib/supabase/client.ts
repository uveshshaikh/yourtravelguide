'use client';
import { createBrowserClient } from '@supabase/ssr';
import { clientEnv } from '@/lib/env';

/**
 * Supabase client for Client Components (browser).
 * Uses only the public anon key; row-level security protects all data.
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    clientEnv.NEXT_PUBLIC_SUPABASE_URL,
    clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
