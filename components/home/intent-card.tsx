import {
  ArrowRight,
  Baby,
  Briefcase,
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
  Baggage: Briefcase,
  'At the airport': Plane,
  'Airport security': ShieldCheck,
  Boarding: DoorOpen,
  'International travel': Globe,
  Arrival: MapPin,
  'Family travel': Baby,
  'Medical travel': HeartPulse,
  Documents: FileText,
  'Money & customs': Landmark,
  'Travel disruptions': TriangleAlert,
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
  href,
}: {
  group: string;
  description: string;
  questions: QuestionSummaryView[];
  max?: number;
  /** Override the "browse more" destination (defaults to the journey-stage
   *  filter). Required for anything that isn't a real IntentGroup, e.g. a
   *  persona collection — never let the label alone imply a working filter. */
  href?: string;
}) {
  const Icon = intentIcon[group] ?? Compass;
  const shown = questions.slice(0, max);
  const remaining = questions.length - shown.length;

  return (
    <section
      aria-label={group}
      className="border-border bg-card flex h-full flex-col rounded-2xl border p-5 shadow-sm transition-shadow hover:shadow-md"
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

      <ul className="border-border/70 mt-4 space-y-0.5 border-t pt-3 pb-1">
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

      {/* Bottom-pinned action on every card, so heights align across the row. */}
      <a
        href={href ?? `/search?intent=${encodeURIComponent(group)}`}
        className="text-primary mt-auto inline-flex items-center gap-1 pt-3 text-xs font-medium hover:underline"
      >
        {remaining > 0 ? `+${remaining} more` : `Explore ${group}`}
        <ArrowRight className="size-3" aria-hidden />
      </a>
    </section>
  );
}
