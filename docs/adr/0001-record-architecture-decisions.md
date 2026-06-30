# 1. Record architecture decisions

- **Status:** Accepted
- **Date:** 2026-06-30

## Context

This platform is designed to operate for 10+ years. Decisions made now (stack,
structure, boundaries) will be questioned later by people who weren't in the room.
Without a durable record, teams re-litigate settled choices or, worse, violate them
unknowingly.

## Decision

We keep lightweight **Architecture Decision Records** (ADRs) in `docs/adr`, numbered
sequentially. Each ADR captures the context, the decision, and its consequences.
ADRs are immutable once accepted; a reversal is a new ADR that supersedes the old one
(mirroring the platform's own "append-only history" principle).

## Consequences

- Onboarding engineers can read the "why" behind the codebase, not just the "what".
- Changing a foundational decision requires writing a superseding ADR — friction that
  is appropriate for foundational change.
- The planning documents (Constitution, Phase 1/2, Knowledge Blueprint) are the
  highest-level "why"; ADRs record engineering-level decisions beneath them.

## Template

```
# N. Title
- Status: Proposed | Accepted | Superseded by ADR-XXX
- Date: YYYY-MM-DD
## Context
## Decision
## Consequences
```
