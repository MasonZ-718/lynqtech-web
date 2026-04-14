# Why ReAnchor Section Redesign — Spec

## Context

The current "Why ReAnchor" section on `/reanchor/index.html` is too wordy. Content is good but delivered as paragraphs (quote + verdict per competitor) when it should land faster. Goal: same insight, delivered with design impact.

---

## Design Direction

**Approach — The Contrast Grid**

Three competitor cards in a row, followed by a full-width ReAnchor card. Each card is two lines maximum — category name + one gut-punch observation. No quotes, no paragraphs, no example lists. Whitespace and typography carry the weight.

The narrative arc: you try journaling yourself → you lean on friends & family → you ask an AI → then past-you appears as the real answer. Three wrong answers, one right one.

---

## Layout

**Section structure:**
- Eyebrow: `Why ReAnchor`
- Subhead: `You've tried the obvious tools. None of them were built for this moment.`
- Three competitor cards in a 3-column grid
- ReAnchor card below, spanning full width
- Declaration block removed — ReAnchor card replaces it

**Card anatomy (both competitor and ReAnchor):**
- Category label (small, `--dim`)
- Single gut-punch line (`--muted` for competitors, `--accent` for ReAnchor)

**Competitor card visual treatment:**
- Category label: `--dim`
- Gut-punch line: `--muted`, font-weight 500
- Minimal visual weight — these are the wrong answers
- No icons, no border highlights

**ReAnchor card visual treatment:**
- Gut-punch line: `--accent`, font-weight 600
- Subtle left border in `--accent` color to separate from competitors
- Feels like the answer, not another option

**Responsive:**
- Desktop (≥768px): 3-column grid for competitor cards, ReAnchor card full-width below
- Mobile (<768px): all four cards stacked full-width, same vertical order
- Cards maintain vertical rhythm on all sizes

**Scroll reveal:**
- Competitor cards stagger in (reveal, reveal-delay-1, reveal-delay-2)
- ReAnchor card follows with reveal-delay-3

---

## Copy

### Competitor cards

| Category | Gut-punch line |
|---|---|
| Journal apps | "You wrote everything down. Past-you is nowhere to be found at 2am." |
| Friends & family | "They listen. They validate. They can't return you to the call you made." |
| AI chatbots | "It tells you what you want to hear. And gives you more to think about." |

### ReAnchor card

- **Label:** `ReAnchor`
- **Gut-punch line:** "The decision you made. Before the doubt started."

---

## Implementation Notes

- Section ID: `#different` (existing)
- Replace `.diff-rows` and all `.diff-row*` markup with new card grid markup
- Replace `.diff-declaration` markup with ReAnchor card markup
- Keep `.diff-label` (eyebrow) and `.diff-intro` (subhead) — copy and classes unchanged
- Remove all old `.diff-row*` and `.diff-declaration*` CSS — no longer needed
- New CSS class prefix: `.comp-grid` (grid container), `.comp-card`, `.comp-card--reanchor`
- Scroll reveal behavior maintained (`.reveal` / `.reveal-delay-*` on each card)
- No changes to surrounding sections

---

## What to Verify After Implementation

1. On desktop: competitor cards sit side by side in a 3-column row, ReAnchor card spans full width below
2. On mobile: all four cards stack cleanly, no truncation
3. ReAnchor card clearly reads as the answer — accent color and left border distinguish it from the competitors
4. Section vertical footprint is noticeably tighter than the previous editorial-row layout
5. Section flows naturally from the doubt/self-test section before it into the vision section after it
