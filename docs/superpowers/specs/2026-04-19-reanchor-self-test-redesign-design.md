# ReAnchor Self-Test Redesign — Identity-First, Shareable, Mobile-First

**Date:** 2026-04-19
**File under change:** `reanchor/self-test.html`
**Status:** Design locked; ready for implementation plan.

---

## 1. Why this redesign

The current result page gives users a generic score-and-tier reading ("You have moderate decision anxiety"). This is **not shareable** — it lacks identity, emotional specificity, and a reason for the user to broadcast it. The quiz flow (4 screens × 4 questions) also degrades on mobile: horizontal Likert scales crush to the point where labels have to be hidden.

The redesign has two intertwined goals:

1. **Make the result something a user wants to share**, on purpose, unprompted. Achieved via a dominant-dimension identity label, a reversal-punchline quote, a percentile comparison, a dignity line that earns the user's "yes, that's me", and a tag-prompt share CTA.
2. **Make the quiz feel good on a phone.** Achieved via one-question-per-screen flow, vertical Likert, auto-advance with a 500ms buffer.

The principle behind every copy and layout choice is the 80/20 rule the user locked in: **80% "you are seen", 20% "and here's what that's costing you"**. Pure empathy is forgettable; pure edge makes people defensive. The sequence is always: recognize → land the hit.

---

## 2. Scope — what changes, what stays

### Replaced
- **Total-score ring** (0–80 circle) — removed; identity replaces it as the anchor visual
- **4-tier profile system** (Grounded Decider / Occasional Doubter / Decision-Anxious / Chronically Paralyzed) — removed; replaced by 4 dominant-dimension identities
- **Generic insight card** ("What this means for you") — removed; replaced by per-identity dignity line + "You likely" bullets + closing hit
- **Existing share section** (share-card + share-btn) — replaced by new identity card + tag-prompt CTA
- **Quiz step structure** (4 dimension steps, 4 questions each) — replaced by 16 single-question screens

### Kept
- Intro step (including the 4 dimension preview cards and science note) — minor copy tightening only
- Per-dimension breakdown bars on the result page — kept as context below the identity block, with the dominant dimension visually highlighted
- Email CTA ("Send me the full analysis" / "Join waitlist") — kept, repositioned below the breakdown
- Retake link — kept
- Supabase `quiz_results` schema — kept; one new column added (see §7)
- Existing design tokens and fonts (Fraunces + DM Sans, accent green, dark surface system)

---

## 3. The four identities — full copy matrix

Identity is assigned from the **single highest-scoring dimension**. Ties broken by dimension order (1 → 2 → 3 → 4).

### 🧊 The Freezer  *(dominant dim 1: Analysis Paralysis)*

- **Dignity line:** *You don't move easily — because once you do, it feels irreversible.*
- **Punchline:** *I don't avoid decisions. I avoid not being able to undo them.*
- **Intensity phrase (paired with percentile):**
  - 4–9 → *slightly frozen at the starting line*
  - 10–14 → *often frozen at the starting line*
  - 15–20 → *frozen at the starting line*
- **You likely:**
  - delay even obvious choices, hoping something settles it for you
  - rehearse the moment of commitment in your head, over and over
  - feel exhausted by decisions you haven't even made yet
- **Closing hit:** *At this point, waiting isn't protecting you. It's compressing your options until one picks you.*
- **Tag-prompt:** *Tag the friend who's still "thinking about it" 3 months later.*
- **Secondary-identity phrase** (when another dimension is within 10 points): *and you often freeze before moving*

### 🌀 Loop Thinker  *(dominant dim 2: Post-Decision Rumination)*

- **Dignity line:** *You think this much because getting it wrong feels expensive.*
- **Punchline:** *I don't struggle to decide. I struggle to stop thinking.*
- **Intensity phrase:**
  - 4–9 → *slightly stuck in your head*
  - 10–14 → *often stuck in your head*
  - 15–20 → *trapped in your head*
- **You likely:**
  - replay the same decision for days (or weeks)
  - keep looking for a version of the answer that feels complete
  - delay action even when you already know what to do
- **Closing hit:** *Thinking isn't bringing you closer. It's keeping you where you are.*
- **Tag-prompt:** *Tag the one who overthinks everything… then rethinks it again.*
- **Secondary-identity phrase:** *and you can't stop replaying decisions*

### 🎯 The Maximizer  *(dominant dim 3: Maximizing Tendency)*

- **Dignity line:** *You don't settle easily — because you've seen what happens when people do.*
- **Punchline:** *I'm not picky. I just can't unsee the better option.*
- **Intensity phrase:**
  - 4–9 → *slightly chasing better*
  - 10–14 → *often chasing better*
  - 15–20 → *always chasing better*
- **You likely:**
  - open another tab, another option, another comparison — "just to check"
  - feel a flash of doubt the moment after you commit
  - compare your choice to the path you didn't take, long after it's too late
- **Closing hit:** *At this point, the search replaced the thing you were searching for.*
- **Tag-prompt:** *Tag the friend who takes 10 minutes to order… then regrets it.*
- **Secondary-identity phrase:** *and you keep chasing better options*

### 🌫️ The Avoider  *(dominant dim 4: Avoidance & Approval)*

- **Dignity line:** *You hesitate — because your choices don't just affect you.*
- **Punchline:** *I don't avoid decisions. I avoid the impact they have on others.*
- **Intensity phrase:**
  - 4–9 → *slightly hoping it decides itself*
  - 10–14 → *often hoping it decides itself*
  - 15–20 → *always hoping it decides itself*
- **You likely:**
  - ask 3 people their opinion before you let yourself have one
  - let timelines expire so the decision gets made for you
  - pick the safest option, even when you know it's not what you want
- **Closing hit:** *At this point, waiting for consensus isn't kindness. It's how you disappear from your own life.*
- **Tag-prompt:** *Tag the friend who always says "you choose"… and means it.*
- **Secondary-identity phrase:** *and you often wait for someone else to decide*

---

## 4. Percentile table

Used for the intensity-line suffix: *"…more than **X%** of people who took this test."* Numbers are a **plausible calibration** — not real data. The suffix "who took this test" is mandatory; it makes the claim defensible and more credible.

Mapping is on the **dominant dimension's raw score** (4–20):

| Score | Above % | | Score | Above % |
|:---:|:---:|---|:---:|:---:|
| 4 | 5% | | 13 | 87% |
| 5 | 15% | | 14 | 91% |
| 6 | 28% | | 15 | 94% |
| 7 | 42% | | 16 | 96% |
| 8 | 55% | | 17 | 98% |
| 9 | 62% | | 18 | 99% |
| 10 | **68%** | | 19 | **99.5%** |
| 11 | 75% | | 20 | **99.8%** |
| 12 | **82%** | | | |

Render rule: `"more than ${percent}% of people who took this test"`. No rounding other than what's in the table.

---

## 5. Secondary-identity rule

If `secondDim.score >= topDim.score - 10`, render the secondary line beneath the identity line, connected with **"and you…"** (never "who also…"):

> **You're a Loop Thinker**
> *and you keep chasing better options*

The phrase used is the **dimension of the second-highest score** — not the dominant. Mapping:

| Second-highest dim | Phrase |
|---|---|
| Analysis Paralysis (1) | *and you often freeze before moving* |
| Post-Decision Rumination (2) | *and you can't stop replaying decisions* |
| Maximizing Tendency (3) | *and you keep chasing better options* |
| Avoidance & Approval (4) | *and you often wait for someone else to decide* |

The threshold `10` is on the 0–20 dimension scale (i.e., half the dimension range).

---

## 6. Result page — full architecture

Top-to-bottom order on the result view:

1. **Identity Card** — the screenshot unit. Details in §6.1.
2. **Share block** — tag-prompt + primary Share button + fallback copy-link. Details in §6.2.
3. **Dignity line** — one-line centered italic, Fraunces.
4. **"You likely:" list** — three bullets, specific to identity.
5. **Closing hit** — standalone line, larger type, italic, accent-tinted.
6. **Dimension breakdown** — four bars (existing visual), dominant dimension highlighted.
7. **Email CTA** — unchanged behavior, reworded headline to match new tone: *"Want the full map of your decision anxiety?"*
8. **Retake link**

### 6.1 Identity Card — the screenshot unit

**Principle the user locked in:** if *only these three lines* are visible, the card must still trigger a share:
- identity name
- punchline
- intensity + percentile

Everything else is bonus. Card fits in a single mobile viewport (no scroll).

Vertical order inside the card:

1. **Emoji glyph** (🧊 / 🌀 / 🎯 / 🌫️) — small, subdued, top-centered
2. **Identity name** — *biggest font on the card*. Fraunces, `clamp(36px, 8vw, 56px)`, `--text`. This is the size anchor.
3. **Secondary-identity phrase** — only if rule §5 triggers. DM Sans small, `--muted`, italic.
4. **Short accent divider** (2px × 40px, `--accent`)
5. **Punchline** — *highest contrast*. Fraunces italic, `clamp(18px, 4.2vw, 24px)`, color `--accent-text`. Centered, two physical lines matching the authored line breaks.
6. **Short accent divider**
7. **Intensity phrase** — Fraunces, DM Sans acceptable; `clamp(14px, 3vw, 18px)`, `--muted`.
8. **Percentile line** — DM Sans, 13px, `--dim`. Always reads *"more than X% of people who took this test"*.
9. **Branding** — tiny caps, `--dim`, centered at the bottom: `━  reanchor test  ━`

**Visual treatment:** dark card, subtle accent-green radial glow at top (reuse `.result-share-card::before`). Rounded 20px, 1px `--border`. The card is what users screenshot — no interactive elements live inside it.

**Critical hierarchy rule:** Identity name is the **largest** element. Punchline is **not larger** but has the strongest visual pull via color + italic. Size anchors position; contrast anchors attention. Never invert this.

### 6.2 Share block

Directly below the card — **not** at the page footer. The card is the artifact; the share CTA must be adjacent so users in "I want to share this" mode don't have to scroll.

Layout:

- **Tag-prompt** (per identity, from §3): Fraunces italic, centered, `--muted`, ~15–16px. One authored line of copy; it may wrap on mobile.
- **Primary share button**: full width (capped at ~420px), accent-green fill, label `Share your result →`. Triggers `navigator.share()` with the prefilled payload below.
- **Fallback link**: below the button, small, underlined, `--dim`: *"or copy the link"*. Triggers clipboard copy of URL + one-line toast.

**Web Share API payload** (built per-identity, intensity-aware):

```
I just found out I'm a Loop Thinker.

"I don't struggle to decide.
I struggle to stop thinking."

Apparently this is more accurate than I'm comfortable with.

https://lynqtech.io/reanchor/self-test?r=loop-thinker-high
```

Substitutions:
- `Loop Thinker` — identity name
- quoted block — punchline (preserve line break)
- URL's `r=` value — `<identity-slug>-<intensity>`, where identity ∈ `{freezer, loop-thinker, maximizer, avoider}` and intensity ∈ `{low, mid, high}` (e.g. `freezer-mid`, `maximizer-low`)

The closing jab line (*"Apparently this is more accurate than I'm comfortable with."*) is constant across identities — it reads as authentically self-deprecating and travels well.

**Feature-detect** `navigator.share`. If unavailable, hide the primary share button and promote the copy-link path (still two lines: `Tag-prompt` → `Copy the link`).

### 6.3 Dimension breakdown (kept)

Retain the existing 4-bar visualization. Three small changes:
- Highlight the dominant-dimension bar (stronger border or a ▸ glyph beside the name)
- Remove the per-dimension long-form interpretation paragraph (redundant with identity copy). Keep score (`X/20`) and bar only.
- Reorder bars so the dominant dimension is first

---

## 7. Shared-link "friend view"

When the page loads with `?r=<identity-slug>-<intensity>`, the quiz does **not** show the intro or start the test. It shows a dedicated **Friend View** first.

Purpose: turn the shared link into a second piece of traveling content. A friend who clicks the link sees *"Your friend is a Loop Thinker"* — the same curiosity trigger, but framed for them.

Layout (mobile-first, single-screen):

```
         🌀

   Your friend is a
     Loop Thinker

   ─────

   "I don't struggle to decide.
    I struggle to stop thinking."

   ─────

   they overthink more than 94% of people
   who took this test

   ┌───────────────────────────────┐
   │   Take your own test   →      │
   └───────────────────────────────┘

   or browse decision anxiety types

          ━ reanchor ━
```

Clicking **Take your own test** → enters the normal quiz flow (intro, then 16 questions).
Clicking the secondary link → scrolls to the 4-dimension preview in the intro.

**Branding:** the Friend View carries a small ReAnchor wordmark at the bottom — same treatment as the identity card (`━ reanchor ━`, `--dim`, tiny caps). The top nav also shows the `ReAnchor` brand link so a curious friend can click through to the product page without taking the test.

Copy variations per identity for the Friend View (intensity phrase adapts per §3):

| Identity | "they ___" phrasing |
|---|---|
| Freezer | *they freeze on decisions more than X% of people who took this test* |
| Loop Thinker | *they overthink more than X% of people who took this test* |
| Maximizer | *they chase "better" more than X% of people who took this test* |
| Avoider | *they avoid deciding more than X% of people who took this test* |

**Slug parsing:** accept `?r=<identity>-<intensity>` where `identity ∈ {freezer, loop-thinker, maximizer, avoider}` and `intensity ∈ {low, mid, high}`. The displayed intensity phrase is looked up from the per-identity intensity map in §3; the URL always uses the identity-agnostic `low/mid/high` tokens to keep parsing trivial. Invalid slug → fall through to the normal intro.

---

## 8. Quiz flow redesign — 16 screens × 1 question

### 8.1 Screen structure

Each of the 16 question screens contains:
- Top: 2px progress bar fill + small `N / 16` label (DM Sans, `--dim`, 12px)
- Middle: the question text, Fraunces, centered, `clamp(22px, 4.5vw, 30px)`, `--text`. Max width ~560px.
- Below: vertical Likert stack (see §8.2)
- Bottom-left: `← Back` button (`--muted`, transparent border)

No dimension badge; no "Dimension 2 of 4" headers; no per-dimension titles. Users experience a continuous 16-step flow.

### 8.2 Vertical Likert

Replace the horizontal 5-button row with a vertical stack of 5 full-width rows, 10px gap:

```
[ 1   Never     ]
[ 2   Rarely    ]
[ 3   Sometimes ]
[ 4   Often     ]
[ 5   Always    ]
```

- Each row ~52px tall — comfortable thumb target
- Number (Fraunces, bold) on the left; label (DM Sans, 500) to its right
- Unselected: `--surface-2` fill, 1px `--border`
- Hover (desktop only): accent-tinted fill
- Selected: `--accent-glow` fill, 1px `--accent` border, number turns `--accent`
- Selection animation: scale 0.97 at click, 150ms ease back to 1

### 8.3 Auto-advance with buffer

- On click: visually mark the row as selected immediately (no delay)
- Start a 500ms timer
- During the 500ms window: clicking a different row cancels the pending advance and re-starts the timer from the new click
- After 500ms elapses: the current screen fades out (220ms) and the next question fades in
- After last question (Q16): same 500ms buffer → fade out → compute scores → render result view

### 8.4 Back navigation

- `← Back` button lower-left on every question screen
- Clicking Back restores the previous screen and pre-selects the previously recorded answer for that question
- No swipe-back gesture (conflicts with iOS system gesture)

### 8.5 Progress semantics

- The top 2px progress bar fills smoothly from 0% to 100% across Q1 → Q16
- `N / 16` label updates on screen change
- No visible "dimension" transitions; internally the scoring still maps questions 1–4 → dim 1, 5–8 → dim 2, etc.

### 8.6 Intro screen copy trims

Intro remains structurally the same (4 dimension preview cards + science note). Copy changes:
- Headline stays: *"How much is doubt actually costing you?"*
- Sub body: tighten to a single sentence emphasizing identity output ("By the end, you'll know which pattern is loudest in your head — and how loud it is.")
- CTA unchanged (`Start the test →`)

---

## 9. Data & backend

### 9.1 Scoring pipeline (client)

1. Collect 16 answers (1–5 each).
2. Compute 4 dimension scores (sum of 4 answers per dimension, range 4–20).
3. `dominantDim = argmax(dimScores)` (ties → lower dim index).
4. `secondDim = argmax of remaining dims`.
5. `showSecondary = topDim.score - secondDim.score <= 10`.
6. `identity = identityForDim[dominantDim]`.
7. `intensity = scoreToIntensity(dominantDim.score)` — `low` if 4–9, `mid` if 10–14, `high` if 15–20.
8. `percentile = percentileTable[dominantDim.score]`.
9. `shareSlug = ${identity}-${intensity}` (e.g., `loop-thinker-high`).

### 9.2 Supabase `quiz_results` changes

Existing columns kept: `email`, `total_score`, `dim_1..4`, `answers`, `cta_source`.

One column added (or repurposed from existing `profile` string):
- **`profile`** (existing text column): now stores the new identity label (`Loop Thinker`) instead of the old tier name. **Migration note:** existing rows with old profile names stay as-is; new rows carry new labels. Schema unchanged.

If we want stricter separation, add two new columns:
- `identity` text — `Freezer` / `Loop Thinker` / `Maximizer` / `Avoider`
- `intensity` text — `low` / `mid` / `high`

**Recommendation for v1:** reuse the existing `profile` column (store `Loop Thinker`), skip adding new columns. Can always denormalize later if analytics needs it.

### 9.3 Share analytics

Emit a `quiz_results` row when a user **triggers** a share, so we can measure viral coefficient. Two `cta_source` values are added:

- `share_native` — user tapped the primary share button and `navigator.share` resolved (or was dismissed — both count as "intent to share")
- `share_copy` — user tapped the fallback "copy the link" path

**Write logic:**
- If the user has **already submitted an email** earlier in this session (`full_analysis` or `waitlist` CTA), update that row's `cta_source` to reflect the share event — *or* insert a second row with the same email and new `cta_source`. Simpler is a second row; keeps each action atomic. **Decision: insert a second row.**
- If the user has **not** submitted an email, still insert a row with `email = null` (or a session-scoped anonymous id) and `cta_source = 'share_native' | 'share_copy'`, plus the full score payload. This captures the "shared without signing up" funnel.

Schema implication: `email` column must allow NULL, or we use a synthetic `anon:<uuid>` per session. **Decision: allow NULL on `email`** (add migration if the current schema requires NOT NULL).

Fields set on share-event rows: `total_score`, `dim_1..4`, `profile` (identity), `answers`, `cta_source`. No new columns needed.

---

## 10. Design tokens & visual dependencies

All existing CSS variables in `self-test.html` are reused. No new global tokens needed. New per-identity accent mapping (for optional coloration on card edges and progress-bar glow):

| Identity | Accent token |
|---|---|
| Freezer | `--blue` (`#60a5fa`) |
| Loop Thinker | `--danger` (`#fb7185`) |
| Maximizer | `--amber` (`#fbbf24`) |
| Avoider | `--purple` (`#a78bfa`) |

Use sparingly — the card is primarily styled with `--accent` green. The per-identity color appears as a thin top-edge glow on the card and as the dominant bar color in the breakdown.

---

## 11. Success criteria

- A user who scores in the top intensity tier feels **seen** by the dignity line and **identified** by the identity+punchline pair, such that screenshotting or tapping "Share" feels like a natural next move.
- A friend who opens a shared link understands who the sender is and what the test does, within one screen, without scrolling.
- On a 375px-wide iPhone viewport, the quiz feels light: each question consumes 2–5 seconds; the entire 16-question flow completes under 90 seconds of real interaction time.
- The identity card, if screenshotted, remains legible and self-explanatory without the surrounding page chrome.

---

## 12. Out of scope for this redesign

- Rewriting the 16 Likert question texts themselves (kept verbatim).
- Rewriting the privacy / terms sub-pages.
- Adding test-retaking analytics or A/B experiments (can be layered later).
- Dynamic real-population percentiles (v1 uses the baked table; we revisit once we have >1k quiz completions in Supabase).
- Translating to non-English.

---

## 13. Resolved decisions

All open questions from earlier drafting have been resolved in the sections above:

1. **Friend-view branding** — resolved in §7: ReAnchor wordmark at bottom of Friend View + nav brand link visible.
2. **Share analytics** — resolved in §9.3: emit `share_native` / `share_copy` rows in `quiz_results`; allow NULL email to capture share-without-signup funnel.
