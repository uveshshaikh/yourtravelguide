import { Building2, FileText, Globe, Plane, Search, Users } from 'lucide-react';
import type {
  CategoryResultView,
  EntityResultView,
  QuestionResultView,
} from '@/lib/knowledge/view';
import { Badge } from '@/components/ui/badge';
import { verdictVisuals } from '@/components/decision/verdict-config';
import { cn } from '@/lib/utils';

/** A question match — the primary result type (answer-shaped). */
export function QuestionResult({ result }: { result: QuestionResultView }) {
  const v = result.verdict ? verdictVisuals[result.verdict] : null;
  return (
    <a
      href={result.href}
      className="group border-border bg-card hover:border-primary/40 block rounded-xl border p-4 transition-colors"
    >
      <div className="flex items-start gap-3">
        <Search className="text-muted-foreground mt-0.5 size-4 shrink-0" aria-hidden />
        <div className="min-w-0 flex-1">
          <p className="font-medium text-pretty">{result.question}</p>
          <div className="mt-1.5 flex items-center gap-2">
            {v ? (
              <Badge variant={v.badge}>
                <v.Icon className="size-3.5" aria-hidden />
                {v.label}
              </Badge>
            ) : null}
            {result.summary ? (
              <span className="text-muted-foreground truncate text-sm">{result.summary}</span>
            ) : null}
          </div>
        </div>
      </div>
    </a>
  );
}

/** A category/hub match. */
export function CategoryResult({ result }: { result: CategoryResultView }) {
  return (
    <a
      href={result.href}
      className="border-border bg-card hover:border-primary/40 block rounded-xl border p-4 transition-colors"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="font-medium">{result.title}</p>
        {typeof result.count === 'number' ? (
          <span className="text-muted-foreground text-xs">{result.count} answers</span>
        ) : null}
      </div>
      {result.description ? (
        <p className="text-muted-foreground mt-1 text-sm">{result.description}</p>
      ) : null}
    </a>
  );
}

const entityIcon = {
  airline: Plane,
  airport: Building2,
  country: Globe,
  document: FileText,
  traveller_profile: Users,
} as const;

/** An entity match (airline/airport/country/document/profile). */
export function EntityResult({ result }: { result: EntityResultView }) {
  const Icon = entityIcon[result.kind];
  return (
    <a
      href={result.href}
      className={cn(
        'border-border bg-card hover:border-primary/40 flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors',
      )}
    >
      <span className="bg-muted text-muted-foreground grid size-9 shrink-0 place-items-center rounded-lg">
        <Icon className="size-5" aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block truncate font-medium">{result.label}</span>
        {result.sublabel ? (
          <span className="text-muted-foreground block truncate text-sm">{result.sublabel}</span>
        ) : null}
      </span>
    </a>
  );
}
