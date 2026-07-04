/**
 * ComparisonNotice — for questions whose answer genuinely depends on a
 * per-entity comparison (e.g. per-airline limits). The Knowledge Core has no
 * schema shape for structured comparison rows today, so there is no real
 * table to render. Rather than fabricate one, silently fall back to a generic
 * list, or wrap the admission in a box that overstates its importance, this
 * says so plainly as a single line of text. Replace with a real comparison
 * table only once the Knowledge Core actually stores per-entity rows for a
 * question of this type.
 */
export function ComparisonNotice() {
  return (
    <p className="text-muted-foreground text-sm italic">
      Airline-specific information has not yet been verified for this question.
    </p>
  );
}
