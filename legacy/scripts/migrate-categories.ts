/**
 * One-shot category migration script.
 *
 * Maps every existing rule slug to its new category + subcategory and rewrites
 * data/rules.ts in place. Run once, then delete this file.
 *
 * Usage:
 *   npx tsx scripts/migrate-categories.ts
 *
 * What it does:
 *   1. Reads data/rules.ts as text.
 *   2. For each slug in SLUG_MAP, replaces the old `category: "..."` line with
 *      `category: "...", subcategory: "...",` using a slug-anchored regex —
 *      so it never accidentally touches unrelated lines.
 *   3. Verifies every slug in the map was actually patched.
 *   4. Writes the result back.
 *
 * Safe to re-run: already-migrated rules are detected and skipped.
 */

import fs from 'fs';
import path from 'path';

// ─── Migration map ─────────────────────────────────────────────────────────────
// slug → [new category, new subcategory]

const SLUG_MAP: Record<string, [string, string]> = {
  // ── airport-rules / cabin-baggage ──────────────────────────────────────────
  'power-bank-in-flight':       ['airport-rules', 'cabin-baggage'],
  'laptops-electronics':        ['airport-rules', 'cabin-baggage'],
  'mobile-phone-in-check-in':   ['airport-rules', 'cabin-baggage'],
  'camera-dslr-in-flight':      ['airport-rules', 'cabin-baggage'],
  'dry-cells-spare-batteries':  ['airport-rules', 'cabin-baggage'],
  'smart-luggage':              ['airport-rules', 'cabin-baggage'],
  'bluetooth-headphones-flight':['airport-rules', 'cabin-baggage'],
  'medicines-in-flight':        ['airport-rules', 'cabin-baggage'],
  'insulin-syringes-flight':    ['airport-rules', 'cabin-baggage'],
  'asthma-inhaler-flight':      ['airport-rules', 'cabin-baggage'],
  'cpap-medical-devices':       ['airport-rules', 'cabin-baggage'],
  'wheelchairs-walking-sticks': ['airport-rules', 'cabin-baggage'],
  'baby-food-formula-flight':   ['airport-rules', 'cabin-baggage'],
  'food-and-snacks-in-flight':  ['airport-rules', 'cabin-baggage'],
  'tea-coffee-powder':          ['airport-rules', 'cabin-baggage'],
  'chocolates-on-flight':       ['airport-rules', 'cabin-baggage'],

  // ── airport-rules / liquids-aerosols-gels ──────────────────────────────────
  'perfume-in-flight':          ['airport-rules', 'liquids-aerosols-gels'],
  'sanitizer-in-flight':        ['airport-rules', 'liquids-aerosols-gels'],
  'shampoo-and-lotions':        ['airport-rules', 'liquids-aerosols-gels'],
  'makeup-in-cabin':            ['airport-rules', 'liquids-aerosols-gels'],
  'nail-polish-remover':        ['airport-rules', 'liquids-aerosols-gels'],
  'liquids-over-100ml':         ['airport-rules', 'liquids-aerosols-gels'],
  'hair-oil-ghee-flight':       ['airport-rules', 'liquids-aerosols-gels'],
  'water-bottle-airport':       ['airport-rules', 'liquids-aerosols-gels'],
  'aerosol-cans':               ['airport-rules', 'liquids-aerosols-gels'],
  'empty-bottles-vs-liquid':    ['airport-rules', 'liquids-aerosols-gels'],
  'duty-free-liquids-return':   ['airport-rules', 'liquids-aerosols-gels'],

  // ── airport-rules / restricted-items ───────────────────────────────────────
  'razor-cartridge-vs-blade':   ['airport-rules', 'restricted-items'],
  'sharp-objects-in-flight':    ['airport-rules', 'restricted-items'],
  'knife-zero-tolerance':       ['airport-rules', 'restricted-items'],
  'hand-tools-flight':          ['airport-rules', 'restricted-items'],
  'matches-lighters':           ['airport-rules', 'restricted-items'],

  // ── airport-rules / security-screening ─────────────────────────────────────
  'electronics-security-tray':       ['airport-rules', 'security-screening'],
  'airport-security-behavior-tips':  ['airport-rules', 'security-screening'],
  'digital-boarding-pass':           ['airport-rules', 'security-screening'],
  'printed-ticket-needed':           ['airport-rules', 'security-screening'],

  // ── airport-rules / checked-baggage ────────────────────────────────────────
  'baggage-weight-size-limits':  ['airport-rules', 'checked-baggage'],
  'fragile-items-packing':       ['airport-rules', 'checked-baggage'],
  'gift-items-wrapping':         ['airport-rules', 'checked-baggage'],
  'pets-in-flight':              ['airport-rules', 'checked-baggage'],

  // ── airport-rules / hand-baggage-size-weight ───────────────────────────────
  'cabin-bag-count-dimensions':  ['airport-rules', 'hand-baggage-size-weight'],

  // ── travel-documents / domestic-flight-id ──────────────────────────────────
  'domestic-id-requirements':    ['travel-documents', 'domestic-flight-id'],
  'aadhaar-digital-id':          ['travel-documents', 'domestic-flight-id'],
  'name-mismatch-flight-ticket': ['travel-documents', 'domestic-flight-id'],

  // ── travel-documents / passport ────────────────────────────────────────────
  'passport-photocopy-valid':    ['travel-documents', 'passport'],
  'passport-expiry-validity':    ['travel-documents', 'passport'],

  // ── travel-documents / minor-travelling-alone ──────────────────────────────
  'kids-id-requirement':         ['travel-documents', 'minor-travelling-alone'],

  // ── customs / duty-free-allowance ──────────────────────────────────────────
  'duty-free-alcohol-allowance': ['customs', 'duty-free-allowance'],
  'cigarettes-tobacco-restrictions': ['customs', 'duty-free-allowance'],

  // ── customs / prohibited-items ─────────────────────────────────────────────
  'prohibited-items-customs':    ['customs', 'prohibited-items'],

  // ── customs / foreign-currency ─────────────────────────────────────────────
  'carrying-cash-flight':        ['customs', 'foreign-currency'],

  // ── customs / gold-jewellery ───────────────────────────────────────────────
  'gold-jewellery-limit':        ['customs', 'gold-jewellery'],
};

// ─── Main ──────────────────────────────────────────────────────────────────────

const RULES_FILE = path.resolve(__dirname, '../data/rules.ts');

let src = fs.readFileSync(RULES_FILE, 'utf8');

const patched: string[] = [];
const skipped: string[] = [];
const missing: string[] = [];

for (const [slug, [newCat, newSub]] of Object.entries(SLUG_MAP)) {
  // Find the block that starts with this slug and contains a category line.
  // The regex anchors on the slug literal so it never touches other rules.
  //
  // Matches text like:
  //   slug: "power-bank-in-flight",
  //   title: "...",                    ← 0–3 arbitrary lines
  //   shortTitle: "...",
  //   category: "flight",
  //
  // and replaces the category line, inserting subcategory after it.
  //
  // Flags: s (dotAll) so . matches newlines inside the slug block.

  // First check if already migrated (subcategory already present after this slug)
  const alreadyMigrated = new RegExp(
    `slug:\\s*"${slug}",[\\s\\S]{0,300}?subcategory:\\s*"${newSub}"`,
  ).test(src);

  if (alreadyMigrated) {
    skipped.push(slug);
    continue;
  }

  // Replace only within the tuple: locate category line in the ~200 chars
  // after the slug declaration, then patch it.
  const slugPattern = new RegExp(
    `(slug:\\s*"${slug}",[\\s\\S]{0,300}?)(category:\\s*"[^"]+")`,
  );

  if (!slugPattern.test(src)) {
    missing.push(slug);
    continue;
  }

  src = src.replace(slugPattern, (_, before, _catLine) => {
    return `${before}category: "${newCat}",\n    subcategory: "${newSub}"`;
  });

  patched.push(slug);
}

// Write only if something changed
if (patched.length > 0) {
  fs.writeFileSync(RULES_FILE, src, 'utf8');
}

// ─── Report ────────────────────────────────────────────────────────────────────

console.log('\n── Migration report ──────────────────────────────────────────────\n');

if (patched.length) {
  console.log(`✅  Patched (${patched.length}):`);
  patched.forEach((s) => console.log(`    ${s}`));
}

if (skipped.length) {
  console.log(`\n⏭   Already migrated (${skipped.length}):`);
  skipped.forEach((s) => console.log(`    ${s}`));
}

if (missing.length) {
  console.log(`\n❌  Not found in file (${missing.length}):`);
  missing.forEach((s) => console.log(`    ${s}`));
}

console.log('\n──────────────────────────────────────────────────────────────────\n');

if (missing.length > 0) {
  process.exit(1);
}
