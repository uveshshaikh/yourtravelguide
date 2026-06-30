import 'server-only';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '@/lib/env';
import * as schema from '@/db/schema';

/**
 * Database client (server-only).
 *
 * The single connection point to Postgres. Repositories import `db` from here;
 * nothing else talks to the driver directly. Using a module-level singleton
 * avoids exhausting the connection pool under serverless concurrency — the
 * `postgres` client is reused across invocations within a warm instance.
 */

declare global {
  var __ytg_pg__: ReturnType<typeof postgres> | undefined;
}

const client =
  globalThis.__ytg_pg__ ??
  postgres(env.DATABASE_URL, {
    max: 1, // serverless: keep per-instance pool tiny; Supabase pooler fans out.
    prepare: false, // required for transaction-mode poolers (PgBouncer).
  });

if (env.NEXT_PUBLIC_APP_ENV !== 'production') {
  globalThis.__ytg_pg__ = client;
}

export const db = drizzle(client, { schema });
export type Database = typeof db;
