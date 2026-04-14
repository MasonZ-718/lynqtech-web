# Vision Section Redesign — ReAnchor
**Date:** 2026-04-14
**File:** `reanchor/index.html` — Section 6: VISION

---

## Overview

Redesign Section 6 (Vision) of the ReAnchor landing page to communicate greater ambition, introduce the Duolingo metaphor, and make the feature voting area more scannable with a compact chip + modal pattern.

Three areas of change:
1. **Evolution strip** — asymmetric layout, bolder copy, Duolingo tagline inside the DecisionOS card
2. **Feature cards** — replace tall carousel cards with compact chips in a grid; full detail moves to a modal on click
3. **Feature list** — remove Scheduled Revisits, rename Pre-Decision Builder, add 3 new features

---

## 1. Header Copy

No change to the main headline or eyebrow. These stay as-is:

- **Eyebrow:** Vision
- **Headline:** Decision-making is a skill. We're building the gym.
- **Sub:** The world has tools for fitness, finances, and focus. Nothing exists yet for the quality of your choices — the decisions that define your career, your relationships, your life. ReAnchor is building that category from scratch.

> The sub copy is upgraded from the current version to explicitly name the stakes (career, relationships, life) so readers feel the weight of what ReAnchor is building.

---

## 2. Evolution Strip

### Layout
- **Split:** 40% Today / 60% DecisionOS (was 50/50)
- On mobile: stacks vertically, Today on top

### Today side (40%, subdued)
- Pill: `● Today` (green, existing style)
- Title: "Decision Journal & Doubt Review" — existing font size (~20px)
- Background: same faint green tint, unchanged
- Bullets (unchanged):
  - Record any decision at the moment of clarity
  - Run a structured Doubt Review when 2am hits
  - Everything stays on your device. No account needed.

### DecisionOS side (60%, dominant, glowing)
- Pill: `● Coming` (purple, slightly larger than Today pill)
- Title: **"DecisionOS"** — larger than Today title (~28px Fraunces)
- Tagline below title: *"Duolingo for your decisions"* — smaller, muted/accent color
- Divider: subtle `→` arrow or beam element in the border between the two sides
- Background: subtle purple radial glow (rgba(167, 139, 250, 0.08–0.12))
- New bullet copy:
  - Train your judgment the way athletes train their body
  - Know your patterns before they know you
  - Build a decision practice that compounds over a lifetime

### Visual intent
The asymmetry communicates ambition without words. The reader's eye lands on the DecisionOS side and stays. "Today" reads as a starting block; "DecisionOS" reads as a destination.

---

## 3. Feature Cards — Compact Chips + Modal

### Card (chip) design
Replace the tall carousel cards with a **3-column grid** (2 on tablet, 1 on mobile).

Each chip shows:
- Small category icon (top-left)
- Feature name (prominent)
- Category tag (Clarity / Pattern / Commitment / Sync)
- Vote count + vote button

No description text on the card. Description lives in the modal.

Clicking anywhere on the card opens the modal.

### Modal design
- Centered overlay with `backdrop-filter: blur`
- Same dark surface + border language as existing cards
- Contents: icon, category tag, feature name, full description, vote button
- Close: Escape key, click-outside, or X button
- Focus trap for accessibility; restore focus to opener on close

### Carousel removal
The carousel + arrows + dots are removed. The grid replaces it. The vote tally counter stays in the section header area.

---

## 4. Feature List

| # | Name | Tag | Status |
|---|---|---|---|
| 1 | AI Decision Coach | Clarity | Renamed from "Pre-Decision Builder" — AI helps you stress-test thinking before committing |
| 2 | Pattern Insights | Pattern | Unchanged |
| 3 | Accountability Partners | Commitment | Unchanged |
| 4 | Values Axis | Clarity | Unchanged |
| 5 | Decision Forecast | Pattern | Unchanged |
| 6 | Cloud Sync | Sync | New — cross-platform access + enables AI analysis across devices |
| 7 | Habit Decisions | Commitment | New — stay committed to daily/lifestyle choices, not just big decisions |
| 8 | AI Assisted Doubt Review | Clarity | New — AI guides you through doubt sessions when 2am hits |

**Removed:** Scheduled Revisits (functionality exists in current version).

### New tag: Sync
Cloud Sync needs a fourth category tag (blue/teal tone suggested — distinct from Clarity, Pattern, Commitment).

---

## 5. Copy for New Features (modal descriptions)

**AI Decision Coach**
Stress-test your thinking before you commit. What are you assuming? What would have to be true for this to be the wrong call? Your personal coach for the moment before you decide.

**Cloud Sync**
Access your decision journal from any device. Your entries stay private and encrypted — but now your history travels with you, and AI analysis can surface patterns across your full timeline.

**Habit Decisions**
Not every decision is a career pivot. ReAnchor helps you stay anchored to smaller daily commitments too — the habits, routines, and lifestyle choices that quietly define who you become.

**AI Assisted Doubt Review**
When doubt arrives at 2am, you shouldn't face it alone. AI walks you through the Doubt Review questions, helps you separate real new information from noise, and tells you whether something actually changed.

---

## Out of Scope

- No changes to Section 7 (FAQ) or any other section
- No backend/database for vote persistence (votes remain localStorage as today)
- No changes to the existing Doubt Review feature in the current app version

---

## Open Questions

None — all decisions resolved in design session.
