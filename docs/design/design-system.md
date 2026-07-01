# YourTravelGuide — Design System (Sprint 3A)

The permanent Experience Foundation. **Everything built after 3A reuses this** —
do not invent parallel tokens or one-off colours.

## Principles

Every UI element must improve **trust, clarity, speed, confidence, or decision-making**.
If it doesn't, don't build it. Calm, high-whitespace, mobile-first, WCAG 2.2 AA.

## Tokens (`app/globals.css`)

CSS custom properties mapped into Tailwind via `@theme inline`, so utilities like
`bg-primary`, `text-muted-foreground`, `bg-allowed-subtle` exist. Light + dark
(`.dark`) both defined.

- **Neutrals (slate):** `background`, `foreground`, `card`, `muted`,
  `muted-foreground`, `subtle` (section wash), `border`, `input`, `secondary`.
- **Brand (teal):** `primary` (teal-700, AA with white text), `primary-hover`,
  `accent` / `accent-foreground`, `ring` (focus).
- **Verdict system (LOCKED, Phase 1)** — one colour language for every answer:
  - `allowed` (green), `conditional` (amber), `denied` (red), `info`
    (official-blue). Each has solid + `-subtle` / `-subtle-foreground` pairings.
- **Radius:** `--radius` 0.75rem → `radius-sm/md/lg/xl`.
- **Layout:** `--container-max` (72rem), `--spacing-section`.
- **Type:** `--font-sans` (Geist Sans), `--font-mono` (Geist Mono, for units like
  `100 Wh`). Self-hosted via the `geist` package — no network fetch.

## Components

| Component                   | Path                                   | Use                                                                              |
| --------------------------- | -------------------------------------- | -------------------------------------------------------------------------------- |
| `Container`                 | `components/layout/container.tsx`      | Page width + gutters (one source)                                                |
| `Button`                    | `components/ui/button.tsx`             | Actions (default/secondary/outline/ghost/link/destructive)                       |
| `Badge`                     | `components/ui/badge.tsx`              | Status pills; **verdict variants** encode the palette                            |
| `Skeleton`                  | `components/ui/skeleton.tsx`           | Loading placeholders (no layout shift)                                           |
| `Spinner`                   | `components/ui/spinner.tsx`            | Inline loading                                                                   |
| `Kbd`                       | `components/ui/kbd.tsx`                | Keyboard hints                                                                   |
| `StatusNote`                | `components/feedback/status-note.tsx`  | Callouts (info/success/warning/danger) → future official-notice / warning blocks |
| `EmptyState`                | `components/feedback/empty-state.tsx`  | "Nothing here yet" surfaces                                                      |
| `SiteHeader/Footer`         | `components/layout/*`                  | Permanent shell                                                                  |
| `SearchTrigger`             | `components/layout/search-trigger.tsx` | Primary search entry (placeholder in 3A)                                         |
| `ThemeToggle` / `MobileNav` | `components/layout/*`                  | Client islands                                                                   |

## Accessibility rules (baked in)

- Semantic landmarks (`header`/`nav`/`main`/`footer`), single `h1` per page,
  skip-link to `#main-content`.
- Global `:focus-visible` ring (teal), 2px offset — never removed.
- `prefers-reduced-motion` honoured globally; animations are subtle CSS only.
- Colour is never the only signal (verdict badges pair colour + text/icon).
- Contrast: primary and verdict solids meet AA (≥4.5:1) with their foregrounds.

## Icons

**Lucide only** (`lucide-react`), functional not decorative, `aria-hidden` when
paired with text. Sizes via `size-4` / `size-5`.

## Motion

CSS transitions + `tw-animate-css` only. No framer-motion, no gradients, no
glassmorphism, no flashy effects. Trust over spectacle.
