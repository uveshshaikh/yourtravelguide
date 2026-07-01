import { ExternalLink } from 'lucide-react';
import type { SourceView } from '@/lib/knowledge/view';
import { evidenceLevelRankLabel } from '@/lib/knowledge/labels';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/format';
import { cn } from '@/lib/utils';

/**
 * OfficialSourcesList — the citations behind the answer. Each links to the
 * authority's publication (and an archived snapshot when available) so the user
 * can verify, with its evidence tier shown.
 */
export function OfficialSourcesList({
  sources,
  className,
}: {
  sources: SourceView[];
  className?: string;
}) {
  if (sources.length === 0) return null;
  return (
    <section
      aria-labelledby="sources-heading"
      className={cn('border-border bg-card rounded-xl border p-5', className)}
    >
      <h2 id="sources-heading" className="text-sm font-semibold">
        Official sources
      </h2>
      <ul className="mt-3 space-y-3">
        {sources.map((s) => (
          <li key={s.id} className="border-border border-l-2 pl-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium">{s.authority}</span>
              <Badge variant="neutral">{evidenceLevelRankLabel[s.evidenceLevel]}</Badge>
              {s.publishedAt ? (
                <span className="text-muted-foreground text-xs">{formatDate(s.publishedAt)}</span>
              ) : null}
            </div>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary mt-0.5 inline-flex items-center gap-1 text-sm hover:underline"
            >
              {s.title}
              <ExternalLink className="size-3.5 shrink-0" aria-hidden />
            </a>
            {s.archivedUrl ? (
              <a
                href={s.archivedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground ml-2 text-xs hover:underline"
              >
                archived copy
              </a>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
