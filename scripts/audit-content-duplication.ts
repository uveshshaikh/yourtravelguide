/**
 * Content-quality-pass BEFORE inventory (read-only, Phase: content quality pass).
 *
 * Does NOT modify data/rules.ts. Produces objective, mechanical evidence of
 * cross-section duplication and repeated factual figures for all 52 rules,
 * so editing decisions are backed by measurable overlap rather than
 * subjective rewriting -- the brief's "if you cannot confidently determine
 * whether content is redundant, leave it unchanged and flag it" applied as
 * code, not judgment calls made silently in an editor's head.
 *
 * What it detects, per rule:
 *   1. Near-duplicate sentences across different section types (overview,
 *      dos, donts, tips, checklist items, howToComply, extraNotes, FAQ
 *      answers) -- token-overlap similarity, not exact-string-only, so
 *      lightly reworded restatements are still caught.
 *   2. Specific factual figures (Wh, mAh, kg, ml, cm, currency, %, time)
 *      that appear in 3+ separate explanatory sections -- a strong signal
 *      of the same threshold being restated rather than referenced once.
 *   3. Fact-check-domain flags, derived from each rule's own
 *      category/subcategory/tags (not invented) -- airline-specific,
 *      customs/currency, dangerous-goods/battery, medical-equipment,
 *      visa/immigration, security-screening -- so claims in those domains
 *      are flagged for human verification rather than silently touched.
 *
 * Usage:
 *   npx tsx scripts/audit-content-duplication.ts
 */

import { writeFileSync } from 'fs';
import { rules } from '../data/rules';
import { Rule } from '../data/types';

// ─── Text utilities ────────────────────────────────────────────────────────

const STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'from',
  'has', 'have', 'if', 'in', 'into', 'is', 'it', 'its', 'may', 'must',
  'not', 'of', 'on', 'or', 'over', 'per', 'should', 'than', 'that', 'the',
  'this', 'to', 'up', 'when', 'where', 'while', 'with', 'you', 'your',
]);

function tokenize(text: string): Set<string> {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
  return new Set(words);
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let intersection = 0;
  for (const x of a) if (b.has(x)) intersection += 1;
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// ─── Section text extraction ───────────────────────────────────────────────

interface Fragment {
  section: string; // e.g. "overview[0]", "dos[2]", "faq[1].answer"
  text: string;
}

function extractFragments(rule: Rule): Fragment[] {
  const frags: Fragment[] = [];
  const rc = rule.richContent;

  rule.howToComply.forEach((t, i) => frags.push({ section: `howToComply[${i}]`, text: t }));
  rule.extraNotes.forEach((t, i) => frags.push({ section: `extraNotes[${i}]`, text: t }));
  if (rule.whyRuleExists) frags.push({ section: 'whyRuleExists', text: rule.whyRuleExists });

  if (rc) {
    if (rc.quickAnswer) frags.push({ section: 'quickAnswer', text: rc.quickAnswer });
    rc.overview.forEach((t, i) => frags.push({ section: `overview[${i}]`, text: t }));
    rc.dos.forEach((t, i) => frags.push({ section: `dos[${i}]`, text: t }));
    rc.donts.forEach((t, i) => frags.push({ section: `donts[${i}]`, text: t }));
    (rc.tips ?? []).forEach((t, i) => frags.push({ section: `tips[${i}]`, text: t }));
    (rc.examples ?? []).forEach((t, i) => frags.push({ section: `examples[${i}]`, text: t }));
    rc.checklists.forEach((cl, ci) =>
      cl.items.forEach((t, i) => frags.push({ section: `checklists[${ci}].items[${i}]`, text: t })),
    );
    rc.faqs.forEach((f, i) => frags.push({ section: `faqs[${i}].answer`, text: f.answer }));
  }

  return frags.filter((f) => wordCount(f.text) >= 4); // skip trivially short fragments (noisy)
}

function sectionFamily(sectionPath: string): string {
  // Group indexed fragments (e.g. "dos[2]") into their parent section family
  // ("dos") so we report "overview vs dos", not "overview[1] vs dos[2]".
  return sectionPath.split('[')[0].split('.')[0];
}

// ─── Duplicate detection ────────────────────────────────────────────────────

interface DuplicatePair {
  sectionA: string;
  sectionB: string;
  similarity: number;
  textA: string;
  textB: string;
}

const SIMILARITY_THRESHOLD = 0.55; // conservative: catches real restatements, not just shared topic words

function findDuplicates(fragments: Fragment[]): DuplicatePair[] {
  const pairs: DuplicatePair[] = [];
  for (let i = 0; i < fragments.length; i += 1) {
    for (let j = i + 1; j < fragments.length; j += 1) {
      const famA = sectionFamily(fragments[i].section);
      const famB = sectionFamily(fragments[j].section);
      if (famA === famB) continue; // only cross-section-type duplication is in scope
      const sim = jaccard(tokenize(fragments[i].text), tokenize(fragments[j].text));
      if (sim >= SIMILARITY_THRESHOLD) {
        pairs.push({
          sectionA: fragments[i].section,
          sectionB: fragments[j].section,
          similarity: Math.round(sim * 100) / 100,
          textA: fragments[i].text,
          textB: fragments[j].text,
        });
      }
    }
  }
  return pairs.sort((a, b) => b.similarity - a.similarity);
}

// ─── Repeated-figure detection ─────────────────────────────────────────────

const FIGURE_RE = /\b\d+(?:\.\d+)?\s?(Wh|mAh|kg|g|ml|l|cm|mm|hours?|hrs?|days?|%|USD|INR|₹|\$)\b/gi;

function findRepeatedFigures(fragments: Fragment[]): Record<string, string[]> {
  const figureToSections = new Map<string, Set<string>>();
  for (const f of fragments) {
    const matches = f.text.match(FIGURE_RE) ?? [];
    for (const m of matches) {
      const norm = m.toLowerCase().replace(/\s+/g, '');
      const fam = sectionFamily(f.section);
      if (!figureToSections.has(norm)) figureToSections.set(norm, new Set());
      figureToSections.get(norm)!.add(fam);
    }
  }
  const repeated: Record<string, string[]> = {};
  for (const [figure, sections] of figureToSections) {
    if (sections.size >= 3) repeated[figure] = Array.from(sections);
  }
  return repeated;
}

// ─── Fact-check domain flags (derived from existing category/subcategory/tags only) ──

const DOMAIN_RULES: Array<{ domain: string; test: (r: Rule) => boolean }> = [
  { domain: 'airline-specific', test: (r) => 'sections' in r && Array.isArray((r as { sections?: unknown[] }).sections) && (r as { sections: { type: string }[] }).sections.some((s) => s.type === 'airlineGuidance') },
  { domain: 'airport-specific', test: (r) => 'sections' in r && Array.isArray((r as { sections?: unknown[] }).sections) && (r as { sections: { type: string }[] }).sections.some((s) => s.type === 'airportGuidance') },
  { domain: 'dangerous-goods/battery', test: (r) => r.tags.some((t) => /batter|lithium|power bank|watt/i.test(t)) },
  { domain: 'medical-equipment', test: (r) => r.tags.some((t) => /medic|cpap|insulin|inhaler|syringe/i.test(t)) },
  { domain: 'customs/currency', test: (r) => r.category === 'customs' || r.tags.some((t) => /customs|duty|cash|currency|gold/i.test(t)) },
  { domain: 'visa/immigration', test: (r) => r.tags.some((t) => /visa|immigration|passport/i.test(t)) },
  { domain: 'security-screening', test: (r) => r.subcategory === 'security-screening' || r.tags.some((t) => /security|screening|cisf/i.test(t)) },
  { domain: 'baggage-limits', test: (r) => r.tags.some((t) => /weight|dimensions|baggage/i.test(t)) && r.category === 'airport-rules' },
];

function factCheckDomains(rule: Rule): string[] {
  return DOMAIN_RULES.filter((d) => d.test(rule)).map((d) => d.domain);
}

// ─── Main ───────────────────────────────────────────────────────────────────

interface RuleContentAudit {
  slug: string;
  wordCount: number;
  sectionsPresent: string[];
  duplicatePairs: DuplicatePair[];
  repeatedFigures: Record<string, string[]>;
  factCheckDomains: string[];
  editRecommendation: 'safe-mechanical-dedup' | 'needs-human-review' | 'no-action-needed';
}

function auditRule(rule: Rule): RuleContentAudit {
  const fragments = extractFragments(rule);
  const totalWords = fragments.reduce((sum, f) => sum + wordCount(f.text), 0);
  const duplicates = findDuplicates(fragments);
  const repeatedFigures = findRepeatedFigures(fragments);
  const domains = factCheckDomains(rule);

  const sectionsPresent = Array.from(new Set(fragments.map((f) => sectionFamily(f.section))));
  if (rule.richContent?.table) sectionsPresent.push('table');

  // Conservative classification: only call something "safe" when duplication is
  // both found AND high-confidence (>=0.7 similarity, i.e. near-identical
  // wording, not just shared topic). Anything with a repeated figure across
  // 3+ sections but no high-similarity sentence pair needs a human to look at
  // it (removing the "wrong" copy requires judgment this script can't make).
  const hasHighConfidenceDuplicate = duplicates.some((d) => d.similarity >= 0.7);
  const hasAnySignal = duplicates.length > 0 || Object.keys(repeatedFigures).length > 0;

  let editRecommendation: RuleContentAudit['editRecommendation'] = 'no-action-needed';
  if (hasHighConfidenceDuplicate) editRecommendation = 'safe-mechanical-dedup';
  else if (hasAnySignal) editRecommendation = 'needs-human-review';

  return {
    slug: rule.slug,
    wordCount: totalWords,
    sectionsPresent,
    duplicatePairs: duplicates,
    repeatedFigures,
    factCheckDomains: domains,
    editRecommendation,
  };
}

function main() {
  const audits = rules.map(auditRule);

  const summary = {
    totalRules: rules.length,
    totalWordCount: audits.reduce((s, a) => s + a.wordCount, 0),
    safeMechanicalDedup: audits.filter((a) => a.editRecommendation === 'safe-mechanical-dedup').length,
    needsHumanReview: audits.filter((a) => a.editRecommendation === 'needs-human-review').length,
    noActionNeeded: audits.filter((a) => a.editRecommendation === 'no-action-needed').length,
    rulesWithRepeatedFigures: audits.filter((a) => Object.keys(a.repeatedFigures).length > 0).length,
    rulesByFactCheckDomain: DOMAIN_RULES.reduce((acc, d) => {
      acc[d.domain] = audits.filter((a) => a.factCheckDomains.includes(d.domain)).length;
      return acc;
    }, {} as Record<string, number>),
  };

  console.log('=== CONTENT DUPLICATION AUDIT SUMMARY ===');
  console.log(JSON.stringify(summary, null, 2));

  console.log('\n=== SAFE-MECHANICAL-DEDUP CANDIDATES (high-confidence duplicate sentences found) ===');
  audits.filter((a) => a.editRecommendation === 'safe-mechanical-dedup').forEach((a) => {
    console.log(`\n  ${a.slug} (${a.wordCount} words)`);
    a.duplicatePairs.filter((d) => d.similarity >= 0.7).forEach((d) => {
      console.log(`    [${d.similarity}] ${d.sectionA} <-> ${d.sectionB}`);
      console.log(`      A: "${d.textA}"`);
      console.log(`      B: "${d.textB}"`);
    });
  });

  writeFileSync('scripts/output/content-duplication-inventory.json', JSON.stringify({ summary, rules: audits }, null, 2));
  console.log('\nFull inventory written to scripts/output/content-duplication-inventory.json');
}

main();
