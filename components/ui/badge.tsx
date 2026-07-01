import { cva, type VariantProps } from 'class-variance-authority';
import { type ComponentProps } from 'react';
import { cn } from '@/lib/utils';

/**
 * Badge — small status/label pill.
 *
 * The verdict variants encode the LOCKED Phase-1 semantics so every future
 * answer surface uses one canonical colour language:
 *   allowed=green · conditional=amber · denied=red · info=official-blue.
 * Subtle (tinted) fills are used so verdicts read calmly, not alarmingly.
 */
const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap',
  {
    variants: {
      variant: {
        neutral: 'bg-muted text-muted-foreground',
        brand: 'bg-accent text-accent-foreground',
        allowed: 'bg-allowed-subtle text-allowed-subtle-foreground',
        conditional: 'bg-conditional-subtle text-conditional-subtle-foreground',
        denied: 'bg-denied-subtle text-denied-subtle-foreground',
        info: 'bg-info-subtle text-info-subtle-foreground',
        outline: 'border border-border text-foreground',
      },
    },
    defaultVariants: { variant: 'neutral' },
  },
);

type BadgeProps = ComponentProps<'span'> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}

export { badgeVariants };
export type { BadgeProps };
