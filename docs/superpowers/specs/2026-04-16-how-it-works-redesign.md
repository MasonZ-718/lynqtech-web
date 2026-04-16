# HOW IT WORKS Section Redesign
**Date:** 2026-04-16
**Status:** Approved for implementation
**File:** `reanchor/index.html` — Section 5 (`#how`)

---

## 1. Problem

The current HOW IT WORKS section shows only one flow: make a new decision, return when doubt hits, do the Doubt Review. This leaves out a critical second user type — someone who arrives already doubting a decision they never logged. The section also doesn't explain *why* ReAnchor works, only *what* it does. There is no methodology framing to distinguish it from AI-based tools.

---

## 2. Goals

1. Surface both supported flows so visitors immediately understand the full scope of the product.
2. Lead with a philosophical/methodology statement that positions ReAnchor as a structured protocol, not an AI chatbot.
3. Keep the section scannable on first load, with detail available on demand (progressive disclosure).
4. Remove the doubt preview widget (Question 3 of 7 example) — it adds noise without adding clarity.

---

## 3. Section Structure

```
[Section eyebrow]
[Headline]
[Method body]
[Stat pills row]

[Scenario card: Planned ahead]   [Scenario card: Already doubting]
  ↳ [Expanded steps — hidden by default, revealed on click]
```

---

## 4. Method Block (top)

**Eyebrow** (existing `.how-label` style — 11px, uppercase, dim, letter-spacing 3px):
`How it works`

**Headline** (existing `.how-headline` style — Fraunces 400, clamp 28–44px):
`A protocol for doubt. Not a chatbot.`

**Body** (DM Sans 16px, `var(--muted)`, line-height 1.7, max-width ~560px, centered):
`Most tools hand you an AI and hope it says the right thing. ReAnchor runs on a structured decision protocol — the same evidence-informed questions, every time, regardless of your mood or your story. You get a repeatable process, not a response.`

**Stat pills row** (flex row, centered, gap 12px, margin-top 32px):
Three pill badges using the existing `.waitlist-badge` style (accent-glow background, accent border, 6px border-radius):
- `7 structured questions`
- `2 proven paths`
- `0 AI guesswork`

---

## 5. Scenario Cards

Two cards displayed side-by-side on desktop (≥768px), stacked on mobile. Use existing `.feature-card` style — `rgba(24,24,27,0.6)` background, `#27272a` border, 16px border radius.

### Card 1 — Planned ahead

- **Scenario label** (11px, uppercase, `var(--dim)`, letter-spacing 2px): `If you planned ahead`
- **Hook** (Fraunces italic, ~18px, `var(--text)`): *"Anchor it now. Return when doubt hits."*
- **Description** (DM Sans 15px, `var(--muted)`, line-height 1.6):
  `Record your decision at the moment of clarity. When doubt arrives weeks later, your past self is already waiting with the answer.`
- **Expand toggle** (DM Sans 13px, `var(--accent)`, cursor pointer): `Show steps ↓` / `Hide steps ↑`

**Expanded steps (hidden by default):**

| # | Title | Description |
|---|---|---|
| 01 | Anchor the decision | Write what you decided, why, how you felt, and what you feared. Not a journal — a record you can return to. |
| 02 | Return when doubt arrives | At 2am, after a hard week, when someone asks "are you sure?" — open it. Find who you were when you made the call. |
| 03 | Do the Doubt Review | 7 structured questions. 10 minutes. Separate new facts from old fears. Hold the line — or flag that something real shifted. |

### Card 2 — Already doubting (Retro)

- **Scenario label**: `If you're already doubting`
- **Hook** (Fraunces italic): *"Come in mid-doubt. We'll anchor it with you."*
- **Description**:
  `Made a decision you never logged? Start here. We'll reconstruct your reasoning, capture what changed, and help you resolve the doubt in the same session.`
- **Expand toggle**: `Show steps ↓` / `Hide steps ↑`

**Expanded steps (hidden by default):**

| # | Title | Description |
|---|---|---|
| 01 | Reconstruct your reasoning | Walk through what you decided, when, and why — even if it's a rough memory. Approximate is enough. |
| 02 | Name what's changed | Is it a feeling, or did something real shift? The protocol separates the two. |
| 03 | Re-anchor or change course | Recommit with clear eyes — or capture a new direction in the same session. Either way, you leave with an anchor. |

---

## 6. Removals

- **Doubt preview widget** (`.doubt-preview` block, ~lines 2899–2916 in current HTML) — removed entirely.
- **Current headline** `Three steps. One anchor.` — replaced by new headline.
- **Current 3-step `.feature-cards` block** — replaced by the two scenario cards.

---

## 7. CSS Changes

- New `.how-stat-pills` container: flex, centered, gap 12px, margin-top 32px.
- New `.how-stat-pill`: reuse `.waitlist-badge` styles (or extract shared class).
- New `.scenario-cards` container: CSS grid, `grid-template-columns: 1fr 1fr` on ≥768px, single column on mobile, gap 16px, margin-top 56px.
- New `.scenario-steps`: hidden by default (`display: none`), shown with `.scenario-steps--open` (`display: flex`, flex-direction column, gap 16px, margin-top 24px, padding-top 24px, border-top 1px solid `var(--border)`).
- Step rows within expanded area: same `.step` grid style (64px number col + content col) already in CSS — reuse as-is.
- Expand toggle: `.scenario-toggle` — no special styles beyond accent color + cursor pointer + small font size.

---

## 8. JS Changes

Minimal. One click handler per card toggle:

```js
document.querySelectorAll('.scenario-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const steps = btn.closest('.scenario-card').querySelector('.scenario-steps');
    const open = steps.classList.toggle('scenario-steps--open');
    btn.textContent = open ? 'Hide steps ↑' : 'Show steps ↓';
  });
});
```

No libraries required. Follows existing inline script pattern in the file.

---

## 9. Out of Scope

- Animating the expand/collapse (acceptable to add later, not required for v1).
- Any changes to Section 5.5 (Why Different) or other sections.
- Mobile-specific step layout differences beyond single-column stacking.
