import { ExternalLink, Landmark } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * AuthorityPanel — the body whose word backs the answer. "Who says so?" made
 * concrete, with a link to the authority so users can check for themselves.
 */
export function AuthorityPanel({
  name,
  jurisdiction,
  websiteUrl,
  description,
  className,
}: {
  name: string;
  jurisdiction?: string;
  websiteUrl?: string;
  description?: string;
  className?: string;
}) {
  return (
    <section className={cn('border-border bg-card rounded-xl border p-5', className)}>
      <div className="flex items-start gap-3">
        <span className="bg-info-subtle text-info-subtle-foreground grid size-9 shrink-0 place-items-center rounded-lg">
          <Landmark className="size-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <h2 className="text-sm font-semibold">{name}</h2>
          {jurisdiction ? <p className="text-muted-foreground text-xs">{jurisdiction}</p> : null}
          {description ? <p className="text-muted-foreground mt-2 text-sm">{description}</p> : null}
          {websiteUrl ? (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary mt-2 inline-flex items-center gap-1 text-sm font-medium hover:underline"
            >
              Visit official site
              <ExternalLink className="size-3.5" aria-hidden />
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
