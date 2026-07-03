import {
  ArrowRight,
  Baby,
  ClipboardCheck,
  Compass,
  DoorOpen,
  FileText,
  Globe,
  HeartPulse,
  Landmark,
  Luggage,
  MapPin,
  Plane,
  ShieldCheck,
  Ticket,
  TriangleAlert,
  type LucideIcon,
} from 'lucide-react';
import type { QuestionSummaryView } from '@/lib/knowledge/view';
import { verdictDisplay } from '@/components/decision/verdict-config';

/** Icon per intent group (journey wayfinding). Falls back to a compass. */
const intentIcon: Record<string, LucideIcon> = {
  'Before you book': Ticket,
  'Before you fly': ClipboardCheck,
  Packing: Luggage,
  'At the airport': Plane,
  'Airport security': ShieldCheck,
  Boarding: DoorOpen,
  'International travel': Globe,
  Arrival: MapPin,
  'Family travel': Baby,
  'Medical travel': HeartPulse,
  Documents: FileText,
  'Money & customs': Landmark,
  'Emergency situations': TriangleAlert,
};

/**
 * IntentCard — a discovery tile for one journey stage. Neutral surface, one calm
 * brand-tinted icon, and its real verified questions so travellers discover what
 * they didn't know to ask. Data-driven (auto-populated from the Knowledge Core).
 */
export function IntentCard({
  group,
  description,
  questions,
  max = 5,
}: {
  group: string;
  description: string;
  questions: QuestionSummaryView[];
  max?: number;
}) {
  const Icon = intentIcon[group] ?? Compass;
  const shown = questions.slice(0, max);
  const remaining = questions.length - shown.length;

  return (
    <section
      aria-label={group}
      className="border-border bg-card flex flex-col rounded-2xl border p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="bg-muted text-primary grid size-10 shrink-0 place-items-center rounded-xl">
          <Icon className="size-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="leading-tight font-semibold">{group}</h3>
          <p className="text-muted-foreground truncate text-xs">{description}</p>
        </div>
        <span className="bg-muted text-muted-foreground shrink-0 rounded-full px-2 py-0.5 text-xs font-medium">
          {questions.length}
        </span>
      </div>

      <ul className="border-border/70 mt-4 space-y-0.5 border-t pt-3">
        {shown.map((q) => {
          const v = verdictDisplay(q.answerKind, q.verdict);
          return (
            <li key={q.slug}>
              <a
                href={`/question/${q.slug}`}
                className="group hover:bg-muted -mx-2 flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors"
              >
                <span className={`size-1.5 shrink-0 rounded-full ${v.dot}`} aria-hidden />
                <span className="group-hover:text-foreground text-muted-foreground min-w-0 flex-1 truncate text-sm transition-colors">
                  {q.question}
                </span>
                <ArrowRight
                  className="text-muted-foreground/50 group-hover:text-primary size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
              </a>
            </li>
          );
        })}
      </ul>

      {remaining > 0 ? (
        <a
          href="/search"
          className="text-primary mt-3 inline-flex items-center gap-1 text-xs font-medium hover:underline"
        >
          +{remaining} more <ArrowRight className="size-3" aria-hidden />
        </a>
      ) : null}
    </section>
  );
}
