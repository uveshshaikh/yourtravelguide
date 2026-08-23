import type { Rule } from '../data/types';

export interface MetaTags {
  title: string;
  description: string;
}

const SITE = 'YourTravelGuide';

// Always reflects the current build year — e.g. 2026
const YEAR = new Date().getFullYear();

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Hard-truncate at maxLen, appending "…" if trimmed. */
function trunc(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 1).trimEnd() + '…';
}

/**
 * Merge segments into a description ≤ maxLen chars.
 * Appends segments in order until the limit is hit.
 */
function buildDescription(segments: string[], maxLen = 155): string {
  let result = '';
  for (const seg of segments) {
    const candidate = result ? `${result} ${seg}` : seg;
    if (candidate.length <= maxLen) {
      result = candidate;
    } else {
      // Try to fit a truncated version of this segment
      const remaining = maxLen - result.length - 1;
      if (remaining > 20) {
        result = `${result} ${trunc(seg, remaining)}`;
      }
      break;
    }
  }
  return result.trim();
}

// ─────────────────────────────────────────────────────────────────────────────
// Rule detail page  →  /[category]/[subcategory]/[slug]  or  /rules/[slug]
// ─────────────────────────────────────────────────────────────────────────────

const VERDICT_TITLE_PHRASE: Record<Rule['verdict']['status'], string> = {
  allowed:     `Allowed in India ${YEAR}`,
  not_allowed: `Not Allowed in India ${YEAR}`,
  limited:     `Rules & Limits India ${YEAR}`,
};

const VERDICT_DESC_OPENER: Record<Rule['verdict']['status'], string> = {
  allowed:     'Yes, allowed.',
  not_allowed: 'Not allowed.',
  limited:     'Conditions apply.',
};

/**
 * Search-intent overrides for the P0 CTR opportunities identified in Search
 * Console. Keeping these here separates the SERP title/description from the
 * on-page H1 while leaving the shared fallback intact for every other rule.
 */
const PRIORITY_RULE_META: Record<string, MetaTags> = {
  'chocolates-on-flight': {
    title: `Is Chocolate Allowed in Flight? Baggage Rules India (${YEAR})`,
    description:
      'Yes, chocolate is generally allowed in cabin and checked baggage. Check solid versus liquid chocolate rules, domestic flights and customs guidance.',
  },
  'asthma-inhaler-flight': {
    title: 'Is an Asthma Inhaler Allowed in Flight? Cabin Baggage Rules India',
    description:
      'Yes, asthma inhalers are generally allowed in cabin baggage. See accessibility, security, documentation, checked-bag and international considerations.',
  },
  'camera-dslr-in-flight': {
    title: 'Is DSLR Camera Allowed in Flight? Cabin Baggage Rules India',
    description:
      'Yes, cameras and DSLR gear are generally allowed. Check cabin and checked baggage guidance for bodies, lenses, spare batteries, chargers and tripods.',
  },
  'printed-ticket-needed': {
    title: 'Is a Printed Flight Ticket Required at Indian Airports?',
    description:
      'A printed flight ticket is generally optional at Indian airports. Learn what to show on your phone, which ID to carry and when a paper copy is useful.',
  },
  'bluetooth-headphones-flight': {
    title: 'Are Bluetooth Headphones Allowed on Flights in India?',
    description:
      'Bluetooth headphones are generally allowed subject to crew instructions. Check flight-mode use, safety announcements, batteries and airline differences.',
  },
  'food-and-snacks-in-flight': {
    title: 'Can You Carry Food and Snacks on a Flight in India?',
    description:
      'Check which foods and snacks can go in cabin baggage, how liquid or gravy items are screened, and when destination customs rules may apply.',
  },
  'mobile-phone-in-check-in': {
    title: 'Can You Put a Mobile Phone in Checked Baggage?',
    description:
      'Check current guidance for carrying mobile phones in cabin or checked baggage, including power-off, lithium battery and airline considerations.',
  },
  'makeup-in-cabin': {
    title: 'Is Makeup Allowed in Cabin Baggage? India Flight Rules',
    description:
      'See which makeup items are allowed in cabin baggage and how liquid, gel, powder, pencil and sharp cosmetic tools are handled at security.',
  },
  'insulin-syringes-flight': {
    title: 'Can You Carry Insulin and Syringes on a Flight?',
    description:
      'Check cabin baggage guidance for insulin, syringes and diabetes supplies, including documentation, screening, packing and airline considerations.',
  },
  'wheelchairs-walking-sticks': {
    title: 'Are Wheelchairs and Walking Sticks Allowed on Flights?',
    description:
      'See flight guidance for wheelchairs, walking sticks and mobility aids, including security screening, airline assistance and battery considerations.',
  },
};

/**
 * Generates SEO-optimised title + description for a single rule page.
 *
 * Title pattern: [shortTitle] — [Verdict phrase] | YourTravelGuide
 * Description:   [verdict opener] [verdict summary]. [quickAnswer or tag context]. DGCA guide.
 */
export function generateRuleMeta(rule: Rule): MetaTags {
  const priorityMeta = PRIORITY_RULE_META[rule.slug];
  if (priorityMeta) return priorityMeta;

  const verdictPhrase = VERDICT_TITLE_PHRASE[rule.verdict.status];

  // Core title segment — aim for the shortTitle to be ≤ 38 chars so total stays ≤ 65
  const core = `${rule.shortTitle} — ${verdictPhrase}`;
  const title = `${trunc(core, 62)} | ${SITE}`;

  // Description: opener + verdict summary + quickAnswer (if short enough) + CTA
  const opener    = VERDICT_DESC_OPENER[rule.verdict.status];
  const summary   = rule.verdict.summary;
  const quick     = rule.richContent?.quickAnswer ?? '';
  const tagCtx    = rule.tags.slice(0, 3).join(', ');
  const cta       = `DGCA-verified guide for Indian travellers.`;

  const description = buildDescription([opener, summary, quick || tagCtx, cta]);

  return { title, description };
}

// ─────────────────────────────────────────────────────────────────────────────
// Subcategory listing page  →  /[category]/[subcategory]
// ─────────────────────────────────────────────────────────────────────────────

interface SubcategoryMetaParams {
  subcategoryLabel: string;  // e.g. "Cabin Baggage"
  categoryLabel: string;     // e.g. "Airport Rules"
  ruleCount: number;
}

/**
 * Title:       [Subcategory] Rules India [YEAR] — What's Allowed | YourTravelGuide
 * Description: [N] DGCA-verified [subcategory] rules for Indian air travel ([YEAR]).
 *              Know limits, exceptions & what to pack before you fly.
 */
export function generateSubcategoryMeta({
  subcategoryLabel,
  categoryLabel,
  ruleCount,
}: SubcategoryMetaParams): MetaTags {
  const core  = `${subcategoryLabel} Rules India ${YEAR} — What's Allowed`;
  const title = `${trunc(core, 62)} | ${SITE}`;

  const description = buildDescription([
    `${ruleCount} DGCA-verified ${subcategoryLabel.toLowerCase()} rules for Indian air travel (${YEAR}).`,
    `Know limits, exceptions & what's allowed under ${categoryLabel.toLowerCase()}.`,
    `Updated for ${YEAR}.`,
  ]);

  return { title, description };
}

// ─────────────────────────────────────────────────────────────────────────────
// Category hub page  →  /[category]
// ─────────────────────────────────────────────────────────────────────────────

interface CategoryMetaParams {
  categoryLabel: string;  // e.g. "Airport Rules"
  tagline: string;        // one-liner from hubContent
  totalRules: number;
}

/**
 * Title:       [Category] India [YEAR] — Complete DGCA Guide | YourTravelGuide
 * Description: [tagline]. [totalRules] rules covering [category] for Indian
 *              air travellers. Verified against DGCA & BCAS regulations, [YEAR].
 */
export function generateCategoryMeta({
  categoryLabel,
  tagline,
  totalRules,
}: CategoryMetaParams): MetaTags {
  const core  = `${categoryLabel} India ${YEAR} — Complete DGCA Guide`;
  const title = `${trunc(core, 62)} | ${SITE}`;

  const description = buildDescription([
    trunc(tagline, 90) + '.',
    `${totalRules} rules verified against DGCA & BCAS regulations (${YEAR}).`,
  ]);

  return { title, description };
}
