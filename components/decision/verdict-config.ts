import { CheckCircle2, HelpCircle, TriangleAlert, XCircle, type LucideIcon } from 'lucide-react';
import type { AnswerKind, Verdict } from '@/lib/knowledge/types';
import type { BadgeProps } from '@/components/ui/badge';
import { verdictLabel } from '@/lib/knowledge/labels';

/**
 * Single source mapping the LOCKED verdict enum to its visual language. Every
 * decision component reads from here, so colour/icon/label are consistent
 * platform-wide and can never drift per component.
 */
export interface VerdictVisual {
  label: string;
  Icon: LucideIcon;
  badge: NonNullable<BadgeProps['variant']>;
  /** Banner surface classes (subtle tint + border). */
  banner: string;
  /** Solid accent text/icon colour. */
  accent: string;
  /** Left-accent border colour. */
  bar: string;
  /** Solid background for a small status dot. */
  dot: string;
}

export const verdictVisuals: Record<Verdict, VerdictVisual> = {
  allowed: {
    label: verdictLabel.allowed,
    Icon: CheckCircle2,
    badge: 'allowed',
    banner: 'border-allowed/25 bg-allowed-subtle text-allowed-subtle-foreground',
    accent: 'text-allowed',
    bar: 'border-l-allowed',
    dot: 'bg-allowed',
  },
  allowed_with_conditions: {
    label: verdictLabel.allowed_with_conditions,
    Icon: TriangleAlert,
    badge: 'conditional',
    banner: 'border-conditional/25 bg-conditional-subtle text-conditional-subtle-foreground',
    accent: 'text-conditional',
    bar: 'border-l-conditional',
    dot: 'bg-conditional',
  },
  not_allowed: {
    label: verdictLabel.not_allowed,
    Icon: XCircle,
    badge: 'denied',
    banner: 'border-denied/25 bg-denied-subtle text-denied-subtle-foreground',
    accent: 'text-denied',
    bar: 'border-l-denied',
    dot: 'bg-denied',
  },
  unresolved: {
    label: verdictLabel.unresolved,
    Icon: HelpCircle,
    badge: 'info',
    banner: 'border-info/25 bg-info-subtle text-info-subtle-foreground',
    accent: 'text-info',
    bar: 'border-l-info',
    dot: 'bg-info',
  },
};

/**
 * Tone = the visual polarity a verdict carries once worded for its AnswerKind.
 * It reuses the verdict colour tokens so the whole platform shares one palette.
 */
/** Human-readable decision-type name (shown as a small tag on cards). */
export const answerKindLabel: Record<AnswerKind, string> = {
  carry: 'Carry rule',
  requirement: 'Requirement',
  validity: 'Validity',
  acceptance: 'Acceptance',
  recommendation: 'Recommendation',
  eligibility: 'Eligibility',
};

export type VerdictTone = 'positive' | 'conditional' | 'negative' | 'neutral';

const toneToVerdict: Record<VerdictTone, Verdict> = {
  positive: 'allowed',
  conditional: 'allowed_with_conditions',
  negative: 'not_allowed',
  neutral: 'unresolved',
};

/**
 * The label + tone a given verdict polarity takes for each decision type. This
 * is the ONE table that guarantees the wording matches the user's intent — e.g.
 * a requirement never says "Not allowed", it says "Not required".
 */
const answerKindTable: Record<AnswerKind, Record<Verdict, { label: string; tone: VerdictTone }>> = {
  carry: {
    allowed: { label: 'Allowed', tone: 'positive' },
    allowed_with_conditions: { label: 'Allowed with conditions', tone: 'conditional' },
    not_allowed: { label: 'Not allowed', tone: 'negative' },
    unresolved: { label: 'Depends on your trip', tone: 'neutral' },
  },
  requirement: {
    allowed: { label: 'Required', tone: 'conditional' },
    allowed_with_conditions: { label: 'Depends', tone: 'neutral' },
    not_allowed: { label: 'Not required', tone: 'positive' },
    unresolved: { label: 'Depends', tone: 'neutral' },
  },
  validity: {
    allowed: { label: 'Valid', tone: 'positive' },
    allowed_with_conditions: { label: 'Minimum required', tone: 'conditional' },
    not_allowed: { label: 'Insufficient validity', tone: 'negative' },
    unresolved: { label: 'Depends on your trip', tone: 'neutral' },
  },
  acceptance: {
    allowed: { label: 'Accepted', tone: 'positive' },
    allowed_with_conditions: { label: 'Accepted with conditions', tone: 'conditional' },
    not_allowed: { label: 'Not accepted', tone: 'negative' },
    unresolved: { label: 'Depends on your trip', tone: 'neutral' },
  },
  recommendation: {
    allowed: { label: 'Recommended', tone: 'positive' },
    allowed_with_conditions: { label: 'Optional', tone: 'neutral' },
    not_allowed: { label: 'Not recommended', tone: 'negative' },
    unresolved: { label: 'Optional', tone: 'neutral' },
  },
  eligibility: {
    allowed: { label: 'Eligible', tone: 'positive' },
    allowed_with_conditions: { label: 'Eligible with conditions', tone: 'conditional' },
    not_allowed: { label: 'Not eligible', tone: 'negative' },
    unresolved: { label: 'Depends on your trip', tone: 'neutral' },
  },
};

export interface VerdictDisplay {
  label: string;
  tone: VerdictTone;
  Icon: LucideIcon;
  badge: NonNullable<BadgeProps['variant']>;
  banner: string;
  accent: string;
  bar: string;
  dot: string;
}

/**
 * The single entry point every surface uses to render a verdict: given the
 * decision type (AnswerKind) and the stored polarity (Verdict), it returns the
 * correct wording AND the shared colour/icon for that tone. Defaults to `carry`.
 */
export function verdictDisplay(kind: AnswerKind | undefined, verdict: Verdict): VerdictDisplay {
  const entry = answerKindTable[kind ?? 'carry'][verdict];
  const v = verdictVisuals[toneToVerdict[entry.tone]];
  return {
    label: entry.label,
    tone: entry.tone,
    Icon: v.Icon,
    badge: v.badge,
    banner: v.banner,
    accent: v.accent,
    bar: v.bar,
    dot: v.dot,
  };
}
