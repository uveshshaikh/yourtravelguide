import { ReactNode } from 'react';
import Link from 'next/link';
import {
  ArticleSection,
  QuickAnswerSection,
  OverviewSection,
  ChecklistSection,
  DosDontsSection,
  TableSection,
  ExamplesSection,
  FaqSection,
  TipsSection,
  InternalLinksSection,
  ReferenceSection,
  AirlineGuidanceSection,
  AirportGuidanceSection,
  DomesticInternationalGuidanceSection,
  WaterSafetySection,
  SecurityProcessSection,
} from '../data/sections';

/**
 * Renderer registry (Phase B3). Each implemented ArticleSection type owns
 * its own render function here -- RuleDetail.tsx no longer contains the
 * markup for any of them, only the orchestration decisions (which sections
 * exist for this rule, what order, and the two spots -- the Key Highlights
 * extraction and the checklist grid -- that are grouping/composition
 * concerns rather than a single section's own presentation).
 *
 * Adding a new module type (decisionTree, airlineGuidance, ...) means
 * adding one function + one registry entry here, not touching RuleDetail.
 */

export interface SectionRenderContext {
  /** Headings for the dos/donts columns; varies with rule.verdict.status. */
  dosDontsHeadings: { allowedHeading: string; notAllowedHeading: string };
  /** Resolves an internal-link target slug to a URL, or null if unresolvable
   *  (an unresolvable slug is a rule that's been removed/renamed -- the
   *  renderer omits that link entirely rather than pointing at a legacy or
   *  broken URL, see lib/relatedRules.ts's resolveRuleBySlug). */
  resolveInternalLink: (slug: string) => string | null;
  /** Same date formatting used for "Last updated" / "Verified on" elsewhere
   *  on the page, so a section's own dates (e.g. airlineGuidance's
   *  lastVerified) look consistent with the rest of the article. */
  formatDate: (dateString: string) => string;
}

export function renderQuickAnswer(section: QuickAnswerSection): ReactNode {
  return (
    <p className="mt-2 pt-2 border-t border-slate-200 text-slate-600 text-sm leading-relaxed">
      {section.text}
    </p>
  );
}

export function renderOverview(section: OverviewSection): ReactNode {
  if (section.paragraphs.length === 0) return null;
  return (
    <section className="mb-5 space-y-3">
      {section.paragraphs.map((paragraph, idx) => (
        <p key={idx} className="text-slate-700 leading-relaxed text-[15px]">
          {paragraph}
        </p>
      ))}
    </section>
  );
}

export function renderDosDonts(section: DosDontsSection, ctx: SectionRenderContext): ReactNode {
  if (section.dos.length === 0 && section.donts.length === 0) return null;
  return (
    <section className="mb-5">
      <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
        When allowed vs. when not
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {section.dos.length > 0 && (
          <div className="rounded-xl border border-green-200 bg-green-50 p-4">
            <p className="text-[11px] font-bold uppercase tracking-wide text-green-700 mb-3">
              ✅ {ctx.dosDontsHeadings.allowedHeading}
            </p>
            <ul className="space-y-2">
              {section.dos.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[13px] text-slate-700 leading-snug">
                  <span className="text-green-500 mt-0.5 flex-shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        {section.donts.length > 0 && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-[11px] font-bold uppercase tracking-wide text-red-700 mb-3">
              🚫 {ctx.dosDontsHeadings.notAllowedHeading}
            </p>
            <ul className="space-y-2">
              {section.donts.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[13px] text-slate-700 leading-snug">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * A single checklist card -- NOT the wrapping grid. Checklists render as a
 * group (the first is consumed by RuleDetail's Key Highlights, the rest
 * share one 2-column grid), so the grouping/wrapping decision stays in
 * RuleDetail (orchestration) while this owns one card's markup (rendering).
 */
export function renderChecklistCard(section: ChecklistSection, key: number): ReactNode {
  return (
    <div key={key} className="border border-slate-200 rounded-xl p-4 bg-slate-50">
      <h3 className="text-[11px] font-bold uppercase tracking-wide text-slate-500 mb-3">
        {section.title}
      </h3>
      <ul className="space-y-2">
        {section.items.map((item, itemIdx) => (
          <li key={itemIdx} className="flex items-start gap-2 text-[13px] text-slate-700">
            <span className="text-green-500 flex-shrink-0 mt-0.5">✔</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function renderTable(section: TableSection): ReactNode {
  return (
    <section className="mb-5">
      <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
        {section.caption}
      </h2>
      <div className="overflow-x-auto border border-slate-200 rounded-xl">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              {section.headers.map((header, idx) => (
                <th key={idx} className="px-4 py-3 text-left font-semibold text-slate-600 uppercase tracking-wide text-xs">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {section.rows.map((row, rowIdx) => (
              <tr key={rowIdx} className="even:bg-slate-50">
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="px-4 py-3 text-slate-700 text-sm">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function renderExamples(section: ExamplesSection): ReactNode {
  if (section.items.length === 0) return null;
  return (
    <section className="mb-5">
      <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
        Real-world examples
      </h2>
      <ul className="space-y-2">
        {section.items.map((example, idx) => (
          <li key={idx} className="bg-white border border-slate-200 rounded-xl p-4 text-[13px] text-slate-700 leading-relaxed">
            💡 {example}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function renderFaq(section: FaqSection): ReactNode {
  if (section.items.length === 0) return null;
  return (
    <section className="mb-5">
      <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
        Frequently asked questions
      </h2>
      <div className="border border-slate-200 rounded-xl divide-y divide-slate-200 overflow-hidden">
        {section.items.map((faq, idx) => (
          <details key={idx} className="group">
            <summary className="flex items-center justify-between gap-3 px-4 py-3.5 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-slate-50 transition-colors">
              <span className="font-semibold text-slate-800 text-sm pr-2">{faq.question}</span>
              <span className="text-slate-400 text-xl leading-none transition-transform duration-200 group-open:rotate-45 flex-shrink-0 select-none">
                +
              </span>
            </summary>
            <div className="px-4 pb-4 pt-1 bg-slate-50 text-[13px] text-slate-700 leading-relaxed">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export function renderTips(section: TipsSection): ReactNode {
  if (section.items.length === 0) return null;
  return (
    <section className="mb-5 bg-blue-50 border border-blue-100 rounded-2xl p-5">
      <h2 className="text-[11px] font-bold uppercase tracking-widest text-blue-600 mb-3">
        Travel tips
      </h2>
      <ul className="space-y-2">
        {section.items.map((tip, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-[13px] text-slate-700 leading-snug">
            <span className="flex-shrink-0 mt-0.5">✈️</span>
            {tip}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function renderInternalLinks(section: InternalLinksSection, ctx: SectionRenderContext): ReactNode {
  const resolved = section.links
    .map((link) => ({ label: link.label, href: ctx.resolveInternalLink(link.slug) }))
    .filter((link): link is { label: string; href: string } => link.href !== null);
  if (resolved.length === 0) return null;
  return (
    <section className="mb-5">
      <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
        Related guides
      </h2>
      <div className="flex flex-wrap gap-2">
        {resolved.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            className="inline-flex items-center px-3 py-1.5 rounded-full border border-slate-200 bg-white text-[13px] font-medium text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

export function renderReference(section: ReferenceSection): ReactNode {
  return (
    <div>
      <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
        Official references
      </h3>
      <ul className="space-y-1">
        {section.sources.map((source, index) => (
          <li key={index}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm inline-flex items-center gap-1"
            >
              {source.label}
              <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Airline Guidance (Phase C1) -- one card per airline, grouped under a
 * single "Airline-specific guidance" heading, styled to match the existing
 * checklist card (border/rounded/bg-slate-50) and the Official references
 * link (external-link icon, same blue). Every entry must trace to a real
 * sourceUrl -- see data/rules.ts's water-bottle-airport for the only rule
 * currently using this (Air India + IndiGo official baggage pages).
 */
export function renderAirlineGuidance(section: AirlineGuidanceSection, ctx: SectionRenderContext): ReactNode {
  if (section.airlines.length === 0) return null;
  return (
    <section className="mb-5">
      <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
        Airline-specific guidance
      </h2>
      <div className="space-y-3">
        {section.airlines.map((entry, idx) => (
          <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-slate-50">
            <p className="text-[13px] font-bold text-slate-800 mb-1">{entry.airline}</p>
            <p className="text-[13px] text-slate-700 leading-relaxed">{entry.guidance}</p>
            {entry.notes && entry.notes.length > 0 && (
              <ul className="mt-2 space-y-1.5">
                {entry.notes.map((note, noteIdx) => (
                  <li key={noteIdx} className="flex items-start gap-2 text-[13px] text-slate-600 leading-snug">
                    <span className="text-slate-400 mt-0.5 flex-shrink-0">•</span>
                    {note}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-3 pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
              <a
                href={entry.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-xs inline-flex items-center gap-1"
              >
                Official {entry.airline} guidance
                <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              {entry.lastVerified && (
                <span className="text-xs text-slate-400">
                  Verified: {ctx.formatDate(entry.lastVerified)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Airport Guidance (Phase C2) -- one card per airport, same card styling as
 * Airline Guidance (border/rounded/bg-slate-50, same footer-link/date row)
 * for visual consistency. Every entry must trace to a real sourceUrl -- see
 * data/rules.ts's water-bottle-airport for the only rule currently using
 * this (Delhi and Mumbai airport-operator official statements).
 */
export function renderAirportGuidance(section: AirportGuidanceSection, ctx: SectionRenderContext): ReactNode {
  if (section.airports.length === 0) return null;
  return (
    <section className="mb-5">
      <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
        Airport-specific guidance
      </h2>
      <div className="space-y-3">
        {section.airports.map((entry, idx) => (
          <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-slate-50">
            <p className="text-[13px] font-bold text-slate-800 mb-1">{entry.airport}</p>
            <p className="text-[13px] text-slate-700 leading-relaxed">{entry.guidance}</p>
            {entry.facilityInfo && (
              <p className="mt-2 text-[13px] text-slate-600 leading-relaxed">{entry.facilityInfo}</p>
            )}
            <div className="mt-3 pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
              <a
                href={entry.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-xs inline-flex items-center gap-1"
              >
                Official {entry.airport} guidance
                <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              {entry.lastVerified && (
                <span className="text-xs text-slate-400">
                  Verified: {ctx.formatDate(entry.lastVerified)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Domestic vs. International Guidance (Phase C3). Two side-by-side panels
 * (neutral slate, not the green/red dos/donts palette -- this isn't an
 * allowed/not-allowed distinction), optional connecting/transit notes below,
 * then the same footer link(s)/date row as Airline and Airport Guidance.
 *
 * `domestic` and `international` are always rendered even when they say
 * the rule doesn't actually differ -- see data/rules.ts's
 * water-bottle-airport, where research found no official carve-out beyond
 * the uniform 100ml/empty-bottle rule, and that finding is the content of
 * these two fields rather than an invented distinction.
 */
export function renderDomesticInternationalGuidance(
  section: DomesticInternationalGuidanceSection,
  ctx: SectionRenderContext,
): ReactNode {
  return (
    <section className="mb-5">
      <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
        Domestic vs. international
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 mb-2">
            Domestic flights
          </p>
          <p className="text-[13px] text-slate-700 leading-relaxed">{section.domestic}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 mb-2">
            International flights
          </p>
          <p className="text-[13px] text-slate-700 leading-relaxed">{section.international}</p>
        </div>
      </div>
      {(section.connecting || section.transit) && (
        <div className="mt-3 space-y-2">
          {section.connecting && (
            <p className="text-[13px] text-slate-600 leading-relaxed">
              <span className="font-semibold text-slate-700">Connecting flights: </span>
              {section.connecting}
            </p>
          )}
          {section.transit && (
            <p className="text-[13px] text-slate-600 leading-relaxed">
              <span className="font-semibold text-slate-700">Transit passengers: </span>
              {section.transit}
            </p>
          )}
        </div>
      )}
      <div className="mt-3 pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {section.sourceUrls.map((url, idx) => (
            <a
              key={idx}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-xs inline-flex items-center gap-1"
            >
              Official source{section.sourceUrls.length > 1 ? ` ${idx + 1}` : ''}
              <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ))}
        </div>
        <span className="text-xs text-slate-400">
          Verified: {ctx.formatDate(section.lastVerified)}
        </span>
      </div>
    </section>
  );
}

/**
 * Water Safety Guidance (Phase C4). Same neutral card treatment as Domestic
 * vs. International (not a warning/danger style -- this reports what could
 * and couldn't be verified, not a confirmed hazard). `guidance` always
 * renders, including when it says no official statement was found; that
 * absence is real content, not an empty state.
 */
export function renderWaterSafety(section: WaterSafetySection, ctx: SectionRenderContext): ReactNode {
  return (
    <section className="mb-5">
      <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
        Water safety
      </h2>
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-[13px] text-slate-700 leading-relaxed">{section.guidance}</p>
        {section.safetyNotes.length > 0 && (
          <ul className="mt-2 space-y-1.5">
            {section.safetyNotes.map((note, idx) => (
              <li key={idx} className="flex items-start gap-2 text-[13px] text-slate-600 leading-snug">
                <span className="text-slate-400 mt-0.5 flex-shrink-0">•</span>
                {note}
              </li>
            ))}
          </ul>
        )}
        {section.exceptions && section.exceptions.length > 0 && (
          <ul className="mt-2 space-y-1.5">
            {section.exceptions.map((exception, idx) => (
              <li key={idx} className="flex items-start gap-2 text-[13px] text-slate-600 leading-snug">
                <span className="text-slate-400 mt-0.5 flex-shrink-0">•</span>
                {exception}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-3 pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {section.sourceUrls.map((url, idx) => (
              <a
                key={idx}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-xs inline-flex items-center gap-1"
              >
                Official source{section.sourceUrls.length > 1 ? ` ${idx + 1}` : ''}
                <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
          <span className="text-xs text-slate-400">
            Verified: {ctx.formatDate(section.lastVerified)}
          </span>
        </div>
      </div>
    </section>
  );
}

/**
 * Security Process (Phase C5). Numbered steps (this is a sequence, unlike
 * the bulleted notes elsewhere) inside the same neutral card, same footer
 * link(s)/date row as every other module. `steps` should include a step
 * disclosing where official sourcing stops, if it does -- see
 * data/rules.ts's water-bottle-airport.
 */
export function renderSecurityProcess(section: SecurityProcessSection, ctx: SectionRenderContext): ReactNode {
  if (section.steps.length === 0) return null;
  return (
    <section className="mb-5">
      <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
        Security process
      </h2>
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <ol className="space-y-2">
          {section.steps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-[13px] text-slate-700 leading-relaxed">
              <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-[11px] font-bold flex items-center justify-center">
                {idx + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
        <div className="mt-3 pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {section.sourceUrls.map((url, idx) => (
              <a
                key={idx}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-xs inline-flex items-center gap-1"
              >
                Official source{section.sourceUrls.length > 1 ? ` ${idx + 1}` : ''}
                <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
          <span className="text-xs text-slate-400">
            Verified: {ctx.formatDate(section.lastVerified)}
          </span>
        </div>
      </div>
    </section>
  );
}

/**
 * Registry mapping each implemented section type to its renderer. Keyed by
 * ArticleSection['type'] so a typo in a key is a compile error. Future
 * module types (decisionTree, scenario, exception, securityProcess,
 * callout) are deliberately absent -- see lib/sections.ts's
 * isImplementedSection() for the compile-time guardrail that keeps this
 * registry and that check in sync.
 *
 * `checklist` is intentionally not in this registry -- see
 * renderChecklistCard's doc comment for why it's a grouped exception.
 */
type SectionRendererMap = {
  [K in ArticleSection['type']]?: (
    section: Extract<ArticleSection, { type: K }>,
    ctx: SectionRenderContext,
  ) => ReactNode;
};

export const SECTION_RENDERERS: SectionRendererMap = {
  quickAnswer: renderQuickAnswer,
  overview: renderOverview,
  dosDonts: renderDosDonts,
  table: renderTable,
  examples: renderExamples,
  faq: renderFaq,
  tips: renderTips,
  internalLinks: renderInternalLinks,
  reference: renderReference,
  airlineGuidance: renderAirlineGuidance,
  airportGuidance: renderAirportGuidance,
  domesticInternationalGuidance: renderDomesticInternationalGuidance,
  waterSafety: renderWaterSafety,
  securityProcess: renderSecurityProcess,
};
