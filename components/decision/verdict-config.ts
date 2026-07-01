import { CheckCircle2, HelpCircle, TriangleAlert, XCircle, type LucideIcon } from 'lucide-react';
import type { Verdict } from '@/lib/knowledge/types';
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
}

export const verdictVisuals: Record<Verdict, VerdictVisual> = {
  allowed: {
    label: verdictLabel.allowed,
    Icon: CheckCircle2,
    badge: 'allowed',
    banner: 'border-allowed/25 bg-allowed-subtle text-allowed-subtle-foreground',
    accent: 'text-allowed',
    bar: 'border-l-allowed',
  },
  allowed_with_conditions: {
    label: verdictLabel.allowed_with_conditions,
    Icon: TriangleAlert,
    badge: 'conditional',
    banner: 'border-conditional/25 bg-conditional-subtle text-conditional-subtle-foreground',
    accent: 'text-conditional',
    bar: 'border-l-conditional',
  },
  not_allowed: {
    label: verdictLabel.not_allowed,
    Icon: XCircle,
    badge: 'denied',
    banner: 'border-denied/25 bg-denied-subtle text-denied-subtle-foreground',
    accent: 'text-denied',
    bar: 'border-l-denied',
  },
  unresolved: {
    label: verdictLabel.unresolved,
    Icon: HelpCircle,
    badge: 'info',
    banner: 'border-info/25 bg-info-subtle text-info-subtle-foreground',
    accent: 'text-info',
    bar: 'border-l-info',
  },
};
