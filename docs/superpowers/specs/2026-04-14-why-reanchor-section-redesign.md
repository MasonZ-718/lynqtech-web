# Why ReAnchor Section Redesign — Spec

## Context

The current "Why ReAnchor" section on `/reanchor/index.html` is too wordy. Content is good but delivered as paragraphs (quote + verdict per competitor) when it should land faster. Goal: same insight, delivered with design impact.

---

## Design Direction

**Approach 2 — The Contrast Card**

Three stacked "competitor" cards, followed by a visually distinct ReAnchor card. Each card is two lines maximum — category name + one gut-punch observation. No quotes, no paragraphs, no example lists. Whitespace and typography carry the weight.

---

## Layout

**Section structure:**
- Eyebrow: `Why ReAnchor`
- Subhead: `You've tried the obvious tools. None of them were built for this moment.`
- Three competitor cards (stacked, vertical)
- ReAnchor card (visually distinct)
- Declaration block removed — ReAnchor card replaces it

**Card anatomy (both competitor and ReAnchor):**
- Category label (small, muted)
- Single gut-punch line (medium-bold)

**Competitor card visual treatment:**
- Text in `--dim` / muted color
- Minimal visual weight — these are wrong answers
- No icons, no border highlights

**ReAnchor card visual treatment:**
- `--accent` green text for the gut-punch line
- Subtle left border or background tint to separate from competitors
- Feels like the answer, not another option

**Responsive:**
- Mobile: same stacked layout, cards go full-width
- Cards maintain vertical rhythm on all sizes

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
- Replace `.diff-rows` (current three-row layout) with new card markup
- Replace `.diff-declaration` with ReAnchor card
- Keep `.diff-label` (eyebrow) and `.diff-intro` (subhead) — these are fine
- New CSS class prefix: `.comp-card` and `.comp-card--reanchor`
- Scroll reveal behavior maintained (`.reveal` class on section container)
- No changes to surrounding sections

---

## What to Verify After Implementation

1. Cards are visually distinct from surrounding content — competitor vs. ReAnchor clear at a glance
2. Copy fits on mobile without truncation
3. ReAnchor card clearly reads as the answer, not another competitor
4. Section flows naturally from the doubt/self-test section before it into the vision section after it
