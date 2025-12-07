export type RuleCategory = "flight" | "train" | "bus" | "general-travel" | "documents";

export interface RuleFAQ {
  question: string;
  answer: string;
}

export interface RuleInternalLink {
  label: string;
  slug: string;
}

export interface RuleRichContent {
  quickAnswer: string;            // conversational 1–2 sentence answer
  overview: string[];             // paragraphs that build context
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
  internalLinks: RuleInternalLink[];
  verifiedOn: string;             // ISO date string for "Verified on" footer
}

export interface Rule {
  slug: string;            // "power-bank-in-flight"
  title: string;           // "Power Bank in Flight — Allowed or Not (India)?"
  shortTitle: string;      // "Power bank in flight"
  category: RuleCategory;  // for now, mostly "flight"
  tags: string[];          // ["power bank", "battery", "cabin baggage"]
  verdict: {
    status: "allowed" | "not_allowed" | "limited";  // used for color coding
    summary: string;  // "Allowed in cabin if within standard limits. Not allowed in checked baggage."
  };
  howToComply: string[];   // legacy bullet list – practical, official-compliant tips
  whyRuleExists: string;   // short explanation (safety/regulation)
  extraNotes: string[];    // more clarifications (India context)
  sources: {
    label: string;         // "DGCA guidelines on lithium batteries"
    url: string;           // official or credible public link
  }[];
  lastUpdated: string;     // ISO date string, e.g. "2025-12-04"
  richContent?: RuleRichContent; // enhanced article-style content
}
