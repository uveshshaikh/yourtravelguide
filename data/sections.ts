import type { RuleFAQ, RuleInternalLink } from './types';

// ─── Modular content-section architecture (Phase B1) ──────────────────────────
//
// A discriminated union — one interface per section `type` — instead of a
// single object with many optional fields. This is what lets a rule declare
// only the sections that genuinely apply to it, and lets new module types be
// added later without touching every existing section or widening a shared
// interface. See lib/sections.ts for the RuleRichContent compatibility
// adapter; see RuleDetail.tsx for the (unchanged, for now) legacy renderer.

export interface QuickAnswerSection {
  type: 'quickAnswer';
  text: string;
}

export interface OverviewSection {
  type: 'overview';
  paragraphs: string[];
}

export interface ChecklistSection {
  type: 'checklist';
  title: string;
  items: string[];
}

export interface DosDontsSection {
  type: 'dosDonts';
  dos: string[];
  donts: string[];
}

export interface TableSection {
  type: 'table';
  caption: string;
  headers: string[];
  rows: string[][];
}

export interface ExamplesSection {
  type: 'examples';
  items: string[];
}

export interface FaqSection {
  type: 'faq';
  items: RuleFAQ[];
}

export interface TipsSection {
  type: 'tips';
  items: string[];
}

export interface InternalLinksSection {
  type: 'internalLinks';
  links: RuleInternalLink[];
}

export interface ReferenceSection {
  type: 'reference';
  sources: { label: string; url: string }[];
}

// ─── New module types (Phase B proposal) ───────────────────────────────────
// Typed now for forward compatibility. Not populated on any rule yet — see
// lib/sections.ts's getArticleSections(), which never emits these until real,
// sourced content exists for them.

export interface DecisionTreeSection {
  type: 'decisionTree';
  question: string;
  branches: {
    condition: string;
    result: string;
  }[];
}

export interface AirlineGuidanceSection {
  type: 'airlineGuidance';
  airline: string;
  notes: string[];
}

export interface AirportGuidanceSection {
  type: 'airportGuidance';
  airport: string;
  notes: string[];
}

export interface ScenarioSection {
  type: 'scenario';
  scenario: string;
  guidance: string[];
}

export interface ExceptionSection {
  type: 'exception';
  condition: string;
  explanation: string;
}

export interface SecurityProcessSection {
  type: 'securityProcess';
  steps: string[];
}

/**
 * Generic highlighted-box section. Deliberately not one-off types like
 * "AirlineWarningSection" / "MedicalNoticeSection" -- style covers the
 * recurring visual treatments (⚠️/💡/❗/⚖️/🩺-equivalent), title/body cover
 * the content, so a new callout use case never needs a new section type.
 */
export interface CalloutSection {
  type: 'callout';
  style: 'warning' | 'tip' | 'important' | 'legal' | 'medical';
  title?: string;
  body: string;
}

export type ArticleSection =
  | QuickAnswerSection
  | OverviewSection
  | ChecklistSection
  | DosDontsSection
  | TableSection
  | ExamplesSection
  | FaqSection
  | TipsSection
  | InternalLinksSection
  | ReferenceSection
  | DecisionTreeSection
  | AirlineGuidanceSection
  | AirportGuidanceSection
  | ScenarioSection
  | ExceptionSection
  | SecurityProcessSection
  | CalloutSection;
