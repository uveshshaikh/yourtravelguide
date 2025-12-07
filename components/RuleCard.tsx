import React, { useCallback } from 'react';
import Link from 'next/link';
import { Rule } from '../data/types';
import TagChip from './TagChip';

interface RuleCardProps {
  rule: Rule;
  contextLabel?: string;
}

const RuleCard: React.FC<RuleCardProps> = ({ rule, contextLabel }) => {
  const handleSetReturnAnchor = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      sessionStorage.setItem('ytg:last-rule-slug', rule.slug);
    } catch {
      // Ignore storage errors silently.
    }
  }, [rule.slug]);
  const getCategoryLabel = () => {
    if (contextLabel) return contextLabel;
    if (rule.category === 'documents') return 'Documents & ID';
    if (rule.category === 'general-travel') return 'Travel Tip';
    if (rule.category === 'train') return 'Train Rule';
    if (rule.category === 'bus') return 'Bus Rule';
    if (rule.category === 'flight') return 'Flight Rule';
    return 'Travel Rule';
  };

  const getStatusColor = (status: Rule['verdict']['status']) => {
    switch (status) {
      case 'allowed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'not_allowed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'limited':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusLabel = (status: Rule['verdict']['status']) => {
    switch (status) {
      case 'allowed':
        return 'Allowed';
      case 'not_allowed':
        return 'Not Allowed';
      case 'limited':
        return 'Limited';
      default:
        return status;
    }
  };

  return (
    <Link
      href={`/rules/${rule.slug}`}
      className="block h-full focus-visible:outline-0"
      onClick={handleSetReturnAnchor}
    >
      <article id={`rule-${rule.slug}`} className="rule-card group">
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">{getCategoryLabel()}</p>
            <h3 className="text-lg font-semibold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
              {rule.shortTitle}
            </h3>
          </div>
          <span className={`rule-card__status ${getStatusColor(rule.verdict.status)}`}>
            {getStatusLabel(rule.verdict.status)}
          </span>
        </div>

        <p className="text-slate-600 text-sm mb-5 flex-grow">
          {rule.verdict.summary}
        </p>

        <div className="rule-card__footer">
          {rule.tags.slice(0, 3).map(tag => (
            <TagChip key={tag} label={tag} />
          ))}
          {rule.tags.length > 3 && (
            <span className="text-xs text-slate-400 ml-1">+{rule.tags.length - 3}</span>
          )}
          <span className="text-xs text-slate-400 ml-auto">Last updated {rule.lastUpdated}</span>
        </div>
      </article>
    </Link>
  );
};

export default RuleCard;
