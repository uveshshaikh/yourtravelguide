import { z } from 'zod';

/**
 * Validated environment access — the ONLY place `process.env` is read.
 *
 * Why this exists (Constitution: "Never guess", "Fail closed"):
 *  - A missing/misconfigured variable fails fast at boot, never silently at
 *    runtime in front of a user.
 *  - Server secrets are isolated from the client bundle. Reading a server-only
 *    var from a Client Component throws — secrets cannot leak by accident.
 *
 * Usage:
 *   import { env } from '@/lib/env';        // server: all vars
 *   import { clientEnv } from '@/lib/env';  // client-safe: NEXT_PUBLIC_* only
 */

const appEnvSchema = z.enum(['development', 'preview', 'production']);

/** Variables safe to expose to the browser. Must be statically referenced. */
const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_APP_ENV: appEnvSchema,
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional().default(''),
});

/** Server-only variables. Never bundled into client code. */
const serverSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url().optional(),
  SENTRY_DSN: z.string().optional().default(''),
});

/**
 * Next.js inlines `process.env.NEXT_PUBLIC_*` at build time only when referenced
 * literally — so we cannot iterate. List them explicitly.
 */
const clientRuntime = {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
};

function format(error: z.ZodError): string {
  return error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`).join('\n');
}

const parsedClient = clientSchema.safeParse(clientRuntime);
if (!parsedClient.success) {
  throw new Error(`❌ Invalid public environment variables:\n${format(parsedClient.error)}`);
}

/** Client-safe environment. Importable from anywhere (server or client). */
export const clientEnv = parsedClient.data;

/**
 * Server environment. Accessing this on the client throws — a guard against
 * leaking secrets into a Client Component bundle.
 */
export const env = (() => {
  if (typeof window !== 'undefined') {
    return new Proxy({} as z.infer<typeof serverSchema> & typeof clientEnv, {
      get(_t, prop) {
        throw new Error(
          `🚨 Attempted to read server env "${String(prop)}" on the client. ` +
            `Use clientEnv for NEXT_PUBLIC_* values.`,
        );
      },
    });
  }

  const parsedServer = serverSchema.safeParse(process.env);
  if (!parsedServer.success) {
    throw new Error(`❌ Invalid server environment variables:\n${format(parsedServer.error)}`);
  }
  return { ...parsedServer.data, ...parsedClient.data };
})();

export type ClientEnv = typeof clientEnv;
export const isProduction = clientEnv.NEXT_PUBLIC_APP_ENV === 'production';
export const isDevelopment = clientEnv.NEXT_PUBLIC_APP_ENV === 'development';
