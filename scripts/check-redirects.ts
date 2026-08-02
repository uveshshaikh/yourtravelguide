/**
 * Redirect smoke-test script.
 *
 * Verifies every migrated rule issues exactly one 301 with the correct
 * Location header, and that the destination URL returns 200.
 * No redirect chains are tolerated.
 *
 * Usage (dev server must be running):
 *   npx tsx scripts/check-redirects.ts
 *   npx tsx scripts/check-redirects.ts --base https://yourtravelguide.in
 */

import { rules } from '../data/rules';
import { buildRuleUrl, isNewArchRule } from '../lib/urls';

// ─── Config ──────────────────────────────────────────────────────────────────

const argBase = process.argv.find((a) => a.startsWith('--base='));
const BASE_URL = argBase ? argBase.split('=')[1] : 'http://localhost:3000';

// ─── Helpers ─────────────────────────────────────────────────────────────────

interface CheckResult {
  source: string;
  expected: string;
  status: number;
  location: string | null;
  destinationStatus: number | null;
  pass: boolean;
  error?: string;
}

async function fetchNoFollow(url: string): Promise<{ status: number; location: string | null }> {
  const res = await fetch(url, { redirect: 'manual' });
  const location = res.headers.get('location');
  return { status: res.status, location };
}

async function checkRule(slug: string, expectedPath: string): Promise<CheckResult> {
  const source = `${BASE_URL}/rules/${slug}`;
  const expected = expectedPath;

  try {
    const { status, location } = await fetchNoFollow(source);

    if (status !== 301 && status !== 308) {
      return { source, expected, status, location, destinationStatus: null, pass: false, error: `Expected 301 or 308, got ${status}` };
    }

    if (!location) {
      return { source, expected, status, location, destinationStatus: null, pass: false, error: 'No Location header' };
    }

    // Normalise: strip origin if the server returns an absolute URL
    const normalised = location.startsWith('http') ? new URL(location).pathname : location;

    if (normalised !== expected) {
      return { source, expected, status, location: normalised, destinationStatus: null, pass: false, error: `Location mismatch — got ${normalised}` };
    }

    // Verify destination returns 200 (no further redirect — chain check)
    const dest = await fetchNoFollow(`${BASE_URL}${expected}`);

    if (dest.status !== 200) {
      return {
        source, expected, status, location: normalised, destinationStatus: dest.status, pass: false,
        error: dest.status === 301 || dest.status === 308 || dest.status === 307
          ? `REDIRECT CHAIN detected — destination also redirects (${dest.status})`
          : `Destination returned ${dest.status}`,
      };
    }

    return { source, expected, status, location: normalised, destinationStatus: 200, pass: true };
  } catch (err) {
    return { source, expected, status: 0, location: null, destinationStatus: null, pass: false, error: String(err) };
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const migrated = rules.filter(isNewArchRule);

  if (migrated.length === 0) {
    console.log('No migrated rules found — nothing to test. Migrate a rule by setting category to "airport-rules", "travel-documents", or "customs".');
    process.exit(0);
  }

  console.log(`\nChecking ${migrated.length} redirect(s) against ${BASE_URL}\n`);
  console.log('─'.repeat(72));

  const results = await Promise.all(
    migrated.map((rule) => checkRule(rule.slug, buildRuleUrl(rule)))
  );

  let passed = 0;
  let failed = 0;

  for (const r of results) {
    if (r.pass) {
      console.log(`  ✅  ${r.source.replace(BASE_URL, '')}  →  ${r.expected}`);
      passed++;
    } else {
      console.log(`  ❌  ${r.source.replace(BASE_URL, '')}`);
      console.log(`       Expected: ${r.expected}`);
      console.log(`       Got:      HTTP ${r.status}${r.location ? ` → ${r.location}` : ''}`);
      if (r.error) console.log(`       Error:    ${r.error}`);
      failed++;
    }
  }

  console.log('─'.repeat(72));
  console.log(`\n${passed} passed, ${failed} failed\n`);
  process.exit(failed > 0 ? 1 : 0);
}

main();
