/**
 * Read-only structural audit for the rule-page redesign (Phase B).
 *
 * Does NOT modify data/rules.ts or any other file. Computes, for every rule,
 * which sections exist and what order they render in -- before and after
 * the RuleDetail.tsx render-order fix -- and flags anything that needs a
 * human look (a table that can't use the compact threshold strip and would
 * previously have silently vanished; any section present in the data but
 * empty; possible content overlap between legacy checklist/howToComply
 * content and the newer dosDonts module).
 *
 * This script performs NO content migration. The existing data model
 * (richContent + optional rule.sections, both flowing through
 * getArticleSections()) already supports every section type RuleDetail.tsx
 * renders, so there is nothing to structurally convert -- the actual change
 * this phase is a render-ORDER fix in the shared component, which applies
 * identically on every build without touching rule content. This script
 * exists to prove that, per rule, with evidence.
 *
 * Usage:
 *   npx tsx scripts/audit-rule-structure.ts
 *   npx tsx scripts/audit-rule-structure.ts --out inventory.json
 */

import { writeFileSync } from 'fs';
import { rules } from '../data/rules';
import { getArticleSections } from '../lib/sections';
import { ArticleSection } from '../data/sections';

type SectionType = ArticleSection['type'];

const OLD_ORDER: SectionType[] = [
  'dosDonts',
  'airlineGuidance',
  'examples',
  // "Key highlights" (howToComply/checklist[0]) is not a typed section; noted separately.
  'overview',
  'checklist', // remaining checklists
  // table was unconditionally suppressed here in the pre-fix code -- see notes.
  'airportGuidance',
  'domesticInternationalGuidance',
  'waterSafety',
  'securityProcess',
  'faq',
  'tips',
  'internalLinks',
];

const NEW_ORDER: SectionType[] = [
  'dosDonts',
  'airlineGuidance',
  'airportGuidance',
  'domesticInternationalGuidance',
  'waterSafety',
  'securityProcess',
  'examples',
  'overview',
  'checklist',
  'table', // conservative fallback only -- see qualifiesForThresholdStrip
  'faq',
  'tips',
  'internalLinks',
];

const BAND_MARKERS = ['✅', '⚠️', '❌'];

function qualifiesForThresholdStrip(section: ArticleSection | undefined): boolean {
  if (!section || section.type !== 'table') return false;
  const rows = section.rows;
  if (!rows || rows.length === 0) return false;
  return rows.every((row) => BAND_MARKERS.some((m) => (row[1] ?? '').startsWith(m)));
}

interface RuleAudit {
  slug: string;
  status: string;
  sectionsPresent: SectionType[];
  oldRenderOrder: SectionType[];
  newRenderOrder: SectionType[];
  orderChanged: boolean;
  hasTable: boolean;
  tableQualifiesForStrip: boolean;
  tableWasSilentlyHiddenBeforeFix: boolean; // the P0 bug this phase fixes
  hasKeyHighlightsSource: boolean; // checklist[0] or howToComply non-empty
  emptySectionWarnings: string[]; // section present in data but renders nothing
  possibleOverlap: string[]; // informational only, not auto-fixed
}

function auditRule(rule: (typeof rules)[number]): RuleAudit {
  const sections = getArticleSections(rule);
  const present = sections.map((s) => s.type);
  const tableSection = sections.find((s): s is Extract<ArticleSection, { type: 'table' }> => s.type === 'table');
  const dosDontsSection = sections.find((s): s is Extract<ArticleSection, { type: 'dosDonts' }> => s.type === 'dosDonts');
  const checklistSections = sections.filter((s): s is Extract<ArticleSection, { type: 'checklist' }> => s.type === 'checklist');

  const tableQualifies = qualifiesForThresholdStrip(tableSection);
  const hasTable = Boolean(tableSection);

  // 'table' is only ever an actual rendered section in the new code when it
  // does NOT qualify for the compact strip (conservative fallback); when it
  // qualifies, the strip renders inside the verdict card instead and the
  // full table is intentionally suppressed to avoid restating the same bands
  // twice. Model that conditional here so the simulated order matches what
  // RuleDetail.tsx actually does, not just "is a table section present".
  const effectivePresent = present.filter((t) => t !== 'table');
  const newEffectivePresent = tableQualifies ? effectivePresent : present;

  const oldOrder = OLD_ORDER.filter((t) => present.includes(t)); // old code never rendered 'table' at all (the bug)
  const newOrder = NEW_ORDER.filter((t) => newEffectivePresent.includes(t));

  const emptyWarnings: string[] = [];
  if (dosDontsSection && dosDontsSection.dos.length === 0 && dosDontsSection.donts.length === 0) {
    emptyWarnings.push('dosDonts present but both dos[] and donts[] are empty');
  }
  if (tableSection && (tableSection.rows?.length ?? 0) === 0) {
    emptyWarnings.push('table present but rows[] is empty');
  }

  const overlap: string[] = [];
  const hasKeyHighlightsSource = checklistSections[0]?.items?.length > 0 || rule.howToComply.length > 0;
  if (hasKeyHighlightsSource && dosDontsSection && (dosDontsSection.dos.length > 0 || dosDontsSection.donts.length > 0)) {
    overlap.push('rule has both legacy howToComply/checklist content AND a dosDonts module -- may repeat the same guidance in two sections (content review, not fixed by this script)');
  }

  return {
    slug: rule.slug,
    status: rule.verdict.status,
    sectionsPresent: present,
    oldRenderOrder: oldOrder,
    newRenderOrder: newOrder,
    orderChanged: JSON.stringify(oldOrder) !== JSON.stringify(newOrder),
    hasTable,
    tableQualifiesForStrip: tableQualifies,
    tableWasSilentlyHiddenBeforeFix: hasTable && !tableQualifies, // true = this rule was affected by the bug
    hasKeyHighlightsSource,
    emptySectionWarnings: emptyWarnings,
    possibleOverlap: overlap,
  };
}

function main() {
  const audits = rules.map(auditRule);

  const summary = {
    totalRules: rules.length,
    rulesWithOrderChange: audits.filter((a) => a.orderChanged).length,
    rulesWithTable: audits.filter((a) => a.hasTable).length,
    rulesWhereTableWasSilentlyHiddenBeforeFix: audits.filter((a) => a.tableWasSilentlyHiddenBeforeFix).length,
    rulesWithEmptySectionWarnings: audits.filter((a) => a.emptySectionWarnings.length > 0).length,
    rulesWithPossibleOverlap: audits.filter((a) => a.possibleOverlap.length > 0).length,
  };

  console.log('=== STRUCTURAL AUDIT SUMMARY ===');
  console.log(JSON.stringify(summary, null, 2));

  if (summary.rulesWithEmptySectionWarnings > 0) {
    console.log('\n=== EMPTY SECTION WARNINGS (should be 0) ===');
    audits.filter((a) => a.emptySectionWarnings.length > 0).forEach((a) => {
      console.log(`  ${a.slug}: ${a.emptySectionWarnings.join('; ')}`);
    });
  }

  if (summary.rulesWhereTableWasSilentlyHiddenBeforeFix > 0) {
    console.log('\n=== RULES AFFECTED BY THE TABLE-HIDING BUG (now fixed) ===');
    audits.filter((a) => a.tableWasSilentlyHiddenBeforeFix).forEach((a) => {
      console.log(`  ${a.slug}`);
    });
  }

  if (summary.rulesWithPossibleOverlap > 0) {
    console.log('\n=== POSSIBLE CONTENT OVERLAP (informational -- not modified) ===');
    audits.filter((a) => a.possibleOverlap.length > 0).forEach((a) => {
      console.log(`  ${a.slug}`);
    });
  }

  const outArg = process.argv.find((a) => a.startsWith('--out='));
  const outPath = outArg ? outArg.split('=')[1] : 'scripts/output/rule-structure-inventory.json';
  writeFileSync(outPath, JSON.stringify({ summary, rules: audits }, null, 2));
  console.log(`\nFull inventory written to ${outPath}`);
}

main();
