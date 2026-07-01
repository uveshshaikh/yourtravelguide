# Knowledge model — relationships & justification

Companion to ADR-0004. Two things every table must pass:

- **Rule 10:** what traveller decision becomes better because this table exists?
- **Rule 9:** why does each relationship exist (not just what it connects)?

## Tables → the traveller decision each serves

| Table                                                                                       | The decision it improves                                                                                           |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `authorities`                                                                               | "Who says so?" — lets every answer show its source authority so a traveller can trust it.                          |
| `sources`                                                                                   | Links an answer to a specific, archived official publication — the traveller can verify.                           |
| `evidence`                                                                                  | The exact sourced assertion behind a verdict; tiering it prevents opinion masquerading as law.                     |
| `countries` / `airlines` / `airports` / `documents` / `travel_items` / `traveller_profiles` | The real-world things travellers ask about; one record powers every page/tool that mentions it.                    |
| `facts`                                                                                     | The reusable numbers a traveller needs (baggage kg, Wh limits, duty allowances) — correct once, everywhere.        |
| `fact_versions`                                                                             | "Is this current, and what changed?" — freshness is the #1 trust factor for travel rules.                          |
| `fact_evidence`                                                                             | Ties each fact to its proof so the fact can never outlive or contradict its evidence.                              |
| `claims`                                                                                    | The actual verdicts ("Can I carry X?") — the decisions the platform exists to resolve.                             |
| `claim_facts`                                                                               | Lets a verdict embed live facts, so a rule and the numbers it cites never disagree.                                |
| `claim_evidence`                                                                            | Guarantees every verdict cites official evidence (Constitution: never guess).                                      |
| `claim_exceptions`                                                                          | Profile-specific answers (medical/infant/minor) without duplicating pages — the right answer for _this_ traveller. |
| `claim_versions`                                                                            | Audit + "what changed" for verdicts — freshness travellers can see.                                                |
| `topics`                                                                                    | The traveller's question in their words + its journey/risk classification — routes them to the right answer.       |
| `topic_claims`                                                                              | Connects a question to the verdict(s) that answer it.                                                              |
| `topic_edges`                                                                               | "Next in your journey" / "you should also know" — turns isolated answers into a guided path.                       |
| `journeys` / `journey_stages` / `journey_topics`                                            | Guided end-to-end flows (e.g. first international trip) — reduces first-timer anxiety.                             |
| `reviews`                                                                                   | Keeps every answer fresh on a schedule — the mechanism that stops silent staleness (the existential risk).         |

## Relationships → why they exist

- **Authority → Source → Evidence (one-to-many chain).** Provenance is a chain: a
  body publishes documents; documents yield specific assertions. This lets a single
  citation carry authority + document + exact claim, which is what earns trust.
- **Authority owns Fact / Claim (one-to-many).** Every truth needs one accountable
  owner to drive re-verification and conflict resolution (Rule 3). Without an
  owner, a fact has no review schedule and rots.
- **Evidence to Fact / Claim (many-to-many junction).** One regulation can back
  many facts and one fact can rest on several sources. The junction is what makes
  trust derive from evidence instead of being re-typed on each node.
- **Fact to Claim (many-to-many junction).** The reuse engine: one fact ("IndiGo
  cabin = 7kg") powers many verdicts and comparisons. Updating the fact updates
  every verdict — one home for truth.
- **Claim to ClaimException (one-to-many, composition).** Exceptions are a composed
  child, not a separate claim, because a profile delta is meaningless without its
  base verdict; this avoids duplicating a whole answer per traveller type.
- **Claim to Scope (columns on the claim).** Scope is intrinsic to a claim (its
  applicability), so it lives on the claim, not a side table — resolution reads it
  without a join, which keeps most-specific-wins fast at 100k claims.
- **Topic to Claim (many-to-many junction).** A question may need several verdicts
  (domestic vs international); a verdict may answer several phrasings. Many-to-many
  keeps both reusable.
- **Topic to Topic (three edge types).** Separate edge types exist because "what's
  next in my trip" (forward), "similar rules" (lateral), and "what I didn't know to
  ask" (deeper) are different traveller needs and render differently.
  `next_decision` is constrained to point forward in time so recommendations never
  loop backward.
- **Journey to Stage / Topic (one-to-many / many-to-many).** A journey is an
  ordered view over existing topics — composition, never new truth — so guided
  flows cost no duplicated content.
- **Review to Fact / Claim / Topic (polymorphic).** One freshness engine serves all
  node types; `risk_level` is denormalised onto the review at scheduling time to
  route the required reviewer without a join.
