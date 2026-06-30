import { NextResponse } from 'next/server';
import { clientEnv } from '@/lib/env';

/**
 * Health check — infrastructure endpoint (not a travel feature).
 * Used by uptime monitors and CI smoke tests to confirm the app boots and its
 * environment validated successfully.
 */
export const dynamic = 'force-dynamic';

export function GET() {
  return NextResponse.json({
    status: 'ok',
    env: clientEnv.NEXT_PUBLIC_APP_ENV,
    timestamp: new Date().toISOString(),
  });
}
