import type { VersionEntryView } from '@/lib/knowledge/view';
import { VersionBadge } from '@/components/trust/trust-badges';
import { formatDate } from '@/lib/format';
import { cn } from '@/lib/utils';

/**
 * VersionHistory — the append-only "what changed" trail. Visible history is a
 * trust artifact: users (and search engines) can see the answer is maintained.
 */
export function VersionHistory({
  versions,
  className,
}: {
  versions: VersionEntryView[];
  className?: string;
}) {
  if (versions.length === 0) return null;
  const ordered = [...versions].sort((a, b) => b.version - a.version);
  return (
    <section aria-labelledby="history-heading" className={className}>
      <h2 id="history-heading" className="text-sm font-semibold">
        Version history
      </h2>
      <ol className="mt-3 space-y-4">
        {ordered.map((v) => (
          <li key={v.version} className="flex gap-3">
            <div className="flex flex-col items-center">
              <VersionBadge version={v.version} />
              <span className="bg-border mt-1 w-px flex-1" aria-hidden />
            </div>
            <div className={cn('pb-1')}>
              <p className="text-muted-foreground text-xs">{formatDate(v.date)}</p>
              <p className="mt-0.5 text-sm font-medium">{v.summary}</p>
              {v.changeReason ? (
                <p className="text-muted-foreground mt-0.5 text-sm">{v.changeReason}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
