import { type ComponentProps, type ReactNode } from 'react';
import { AlertTriangle, CheckCircle2, Info, OctagonAlert, type LucideIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * StatusNote — the canonical callout for warnings, official notices, and state
 * messages. Tones map to the locked verdict/trust palette, so a "success" note
 * and an "Allowed" verdict share one colour language:
 *   info=official-blue · success=green · warning=amber · danger=red.
 * This is the foundation the future answer-page callouts (official notice,
 * warning, prohibited) build on.
 */
const noteVariants = cva('rounded-lg border-l-4 p-4 text-sm', {
  variants: {
    tone: {
      info: 'border-l-info bg-info-subtle text-info-subtle-foreground',
      success: 'border-l-allowed bg-allowed-subtle text-allowed-subtle-foreground',
      warning: 'border-l-conditional bg-conditional-subtle text-conditional-subtle-foreground',
      danger: 'border-l-denied bg-denied-subtle text-denied-subtle-foreground',
    },
  },
  defaultVariants: { tone: 'info' },
});

const icons: Record<NonNullable<VariantProps<typeof noteVariants>['tone']>, LucideIcon> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: OctagonAlert,
};

type StatusNoteProps = Omit<ComponentProps<'div'>, 'title'> &
  VariantProps<typeof noteVariants> & { title?: ReactNode };

export function StatusNote({
  className,
  tone = 'info',
  title,
  children,
  ...props
}: StatusNoteProps) {
  const Icon = icons[tone ?? 'info'];
  return (
    <div role="note" className={cn(noteVariants({ tone }), className)} {...props}>
      <div className="flex gap-3">
        <Icon className="mt-0.5 size-5 shrink-0" aria-hidden />
        <div className="min-w-0">
          {title ? <p className="font-semibold">{title}</p> : null}
          {children ? <div className={cn(title && 'mt-1')}>{children}</div> : null}
        </div>
      </div>
    </div>
  );
}

export { noteVariants };
