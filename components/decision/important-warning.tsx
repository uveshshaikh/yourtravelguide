import { type ReactNode } from 'react';
import type { WarningView } from '@/lib/knowledge/view';
import { StatusNote } from '@/components/feedback/status-note';

/**
 * ImportantWarning — a prominent, high-signal warning. A thin wrapper over the
 * Sprint-3A StatusNote so warnings share one visual language with official
 * notices and success states (no duplicate styling).
 */
export function ImportantWarning({
  title,
  tone = 'warning',
  children,
}: {
  title: ReactNode;
  tone?: 'warning' | 'danger' | 'info';
  children?: ReactNode;
}) {
  return (
    <StatusNote tone={tone} title={title}>
      {children}
    </StatusNote>
  );
}

/** Renders a list of warnings (danger first — highest stakes on top). */
export function WarningList({ warnings }: { warnings: WarningView[] }) {
  if (warnings.length === 0) return null;
  const ordered = [...warnings].sort(
    (a, b) => rank(b.tone ?? 'warning') - rank(a.tone ?? 'warning'),
  );
  return (
    <div className="space-y-3">
      {ordered.map((w) => (
        <ImportantWarning key={w.id} tone={w.tone ?? 'warning'} title={w.title}>
          {w.detail ? <p>{w.detail}</p> : null}
        </ImportantWarning>
      ))}
    </div>
  );
}

function rank(tone: 'warning' | 'danger' | 'info'): number {
  return tone === 'danger' ? 2 : tone === 'warning' ? 1 : 0;
}
