// ─── Subcategory literals per main category ──────────────────────────────────

export type AirportRulesSubcategory =
  | "cabin-baggage"
  | "checked-baggage"
  | "restricted-items"
  | "security-screening"
  | "liquids-aerosols-gels"
  | "hand-baggage-size-weight"
  | "airport-hub";

export type TravelDocumentsSubcategory =
  | "domestic-flight-id"
  | "passport"
  | "visa-on-arrival"
  | "oci-card"
  | "minor-travelling-alone"
  | "international-departure"
  | "emergency-certificate";

export type CustomsSubcategory =
  | "duty-free-allowance"
  | "prohibited-items"
  | "gold-jewellery"
  | "foreign-currency"
  | "green-red-channel"
  | "food-items"
  | "electronics";

// ─── Category types ───────────────────────────────────────────────────────────

/** Legacy categories retained for backward compatibility */
export type LegacyRuleCategory = "flight" | "train" | "bus" | "general-travel" | "documents";

/** All supported top-level categories */
export type RuleCategory =
  | "airport-rules"
  | "travel-documents"
  | "customs"
  | LegacyRuleCategory;

// ─── Type-safe category + subcategory pairing ─────────────────────────────────

/**
 * Discriminated union that enforces subcategory values are always valid
 * for their parent category. Mismatched pairs are a compile-time error.
 */
export type CategorySubcategoryPair =
  | { category: "airport-rules";    subcategory: AirportRulesSubcategory }
  | { category: "travel-documents"; subcategory: TravelDocumentsSubcategory }
  | { category: "customs";          subcategory: CustomsSubcategory }
  | { category: LegacyRuleCategory; subcategory?: never };

/**
 * Resolves the valid subcategory union for a given category string.
 * @example SubcategoryOf<"customs"> // → CustomsSubcategory
 */
export type SubcategoryOf<C extends RuleCategory> =
  C extends "airport-rules"    ? AirportRulesSubcategory :
  C extends "travel-documents" ? TravelDocumentsSubcategory :
  C extends "customs"          ? CustomsSubcategory :
  never;

/**
 * Builds the canonical URL path for a new-architecture rule.
 * @example RuleUrlPath<"customs", "gold-jewellery", "gold-import-limit"> → "/customs/gold-jewellery/gold-import-limit"
 */
export type RuleUrlPath<
  C extends "airport-rules" | "travel-documents" | "customs",
  S extends SubcategoryOf<C>,
  Slug extends string,
> = `/${C}/${S}/${Slug}`;

// ─── Content interfaces ───────────────────────────────────────────────────────

export interface RuleFAQ {
  question: string;
  answer: string;
}

export interface RuleInternalLink {
  label: string;  // anchor text shown in the article
  slug: string;   // relative slug of the target rule, e.g. "power-bank-in-flight"
}

export interface RuleRichContent {
  quickAnswer: string;   // conversational 1–2 sentence answer
  overview: string[];    // paragraphs that build context
  checklists: {
    title: string;
    items: string[];
  }[];
  table?: {
    caption: string;
    headers: string[];
    rows: string[][];
  };
  dos: string[];
  donts: string[];
  examples?: string[];
  faqs: RuleFAQ[];
  tips: string[];
  internalLinks: RuleInternalLink[];  // display-layer links with labels, used in article body
  verifiedOn: string;                 // ISO date string for "Verified on" footer
}

// ─── Rule ─────────────────────────────────────────────────────────────────────

interface RuleBase {
  slug: string;       // "power-bank-in-flight"
  title: string;      // "Power Bank in Flight — Allowed or Not (India)?"
  shortTitle: string; // "Power bank in flight"
  tags: string[];     // ["power bank", "battery", "cabin baggage"]
  verdict: {
    status: "allowed" | "not_allowed" | "limited"; // used for colour coding
    summary: string;
  };
  /**
   * Sibling rule slugs for the SEO internal-link graph.
   * Plain slugs only — no display label. Use RuleRichContent.internalLinks
   * when you need labelled links rendered inside article body.
   * Optional for legacy rules; should be populated for new-arch rules.
   */
  internalLinks?: string[];
  howToComply: string[];  // practical, official-compliant tips
  whyRuleExists: string;  // short explanation (safety / regulation)
  extraNotes: string[];   // further clarifications (India context)
  sources: {
    label: string; // "DGCA guidelines on lithium batteries"
    url: string;   // official or credible public link
  }[];
  lastUpdated: string;       // ISO date string, e.g. "2025-12-04"
  richContent?: RuleRichContent;
}

/**
 * A Rule is the intersection of its base fields and a type-safe
 * CategorySubcategoryPair. TypeScript rejects any subcategory value
 * that does not belong to the declared category.
 *
 * @example
 * const rule: Rule = {
 *   category: "customs",
 *   subcategory: "gold-jewellery", // ✅ valid
 *   slug: "gold-import-limit",
 *   ...
 * };
 */
export type Rule = RuleBase & CategorySubcategoryPair;
