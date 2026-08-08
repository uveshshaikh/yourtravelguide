import React, { useCallback } from 'react';
import Link from 'next/link';
import { Rule } from '../data/types';
import { buildRuleUrl } from '../lib/urls';

type RuleSummary = Pick<Rule, 'slug' | 'shortTitle' | 'category' | 'verdict' | 'lastUpdated'> & {
  subcategory?: string;
};

interface RuleCardProps {
  rule: RuleSummary;
}

// Text label + dot, never color alone -- status is legible even without color.
const STATUS_LABEL: Record<Rule['verdict']['status'], string> = {
  allowed: 'Allowed',
  not_allowed: 'Not allowed',
  limited: 'Limited',
};

const STATUS_DOT: Record<Rule['verdict']['status'], string> = {
  allowed: 'bg-green-500',
  not_allowed: 'bg-red-500',
  limited: 'bg-amber-500',
};

const STATUS_TEXT: Record<Rule['verdict']['status'], string> = {
  allowed: 'text-green-700',
  not_allowed: 'text-red-700',
  limited: 'text-amber-700',
};

/**
 * Card layout per the agreed homepage spec: title, a two-line summary,
 * then the verdict pinned to the bottom edge. `flex-grow` on the summary
 * keeps every verdict on the same baseline across a row, so two cards of
 * unequal text length still line up.
 *
 * summary is clamped to two lines (it averages ~100 chars, up to 174), so
 * the card height stays uniform rather than one card stretching a row.
 *
 * Reading order is deliberate -- title, explanation, then status. The
 * verdict is a quiet dot + label rather than a filled pill or a coloured
 * edge rail, so it supports the title instead of overpowering it.
 */
const RuleCard: React.FC<RuleCardProps> = ({ rule }) => {
  const handleSetReturnAnchor = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      sessionStorage.setItem('ytg:last-rule-slug', rule.slug);
    } catch {
      // Ignore storage errors silently.
    }
  }, [rule.slug]);

  return (
    <Link
      href={buildRuleUrl(rule)}
      id={`rule-${rule.slug}`}
      className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-300 hover:shadow-[0_6px_20px_-12px_rgba(15,23,42,0.25)] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      onClick={handleSetReturnAnchor}
    >
      <h3 className="text-base font-semibold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
        {rule.shortTitle}
      </h3>
      <p className="mt-2 flex-grow text-sm text-slate-600 leading-relaxed line-clamp-2">
        {rule.verdict.summary}
      </p>
      <span
        className={`mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide ${STATUS_TEXT[rule.verdict.status]}`}
      >
        <span
          className={`inline-block h-1.5 w-1.5 rounded-full ${STATUS_DOT[rule.verdict.status]}`}
          aria-hidden="true"
        />
        {STATUS_LABEL[rule.verdict.status]}
      </span>
    </Link>
  );
};

export default RuleCard;
