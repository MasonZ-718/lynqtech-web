# Retroactive Anchor — Design Spec
**Date:** 2026-04-13  
**Status:** Approved for implementation  
**Priority:** Build now (highest acquisition gap)

---

## 1. Problem

Most new users arrive at ReAnchor already in doubt about a decision they made weeks or months ago — with no prior recording in the app. The current app has no entry point for them. They land on a home screen that assumes they're ready to anchor something new, not process something they're already spiraling on.

This is the highest-friction onboarding gap and the highest-priority fix.

**Target user:** "I made a big decision a few weeks ago and I keep second-guessing it. Someone told me about this app. I want to stop the spiral."

---

## 2. Solution Overview

Add a **Retroactive Anchor** flow (`app/retro.tsx`) — a distinct, emotionally-guided, multi-step experience that:

1. Validates the user's feeling before asking anything
2. Reconstructs their original reasoning via warm guided prompts
3. Captures their doubt trigger and current emotional state
4. Forks into two process-driven paths: **new feelings** (re-anchor) or **new facts** (evaluate + choose)
5. Ends in either a re-anchor commitment or a same-session new decision capture

The resulting record is a first-class `Decision` object. After it's saved, `app/decision/[id].tsx` handles all future view / doubt / review interactions identically to any other decision.

---

## 3. Entry Point

### 3.1 Home screen (`app/index.tsx`)

No structural changes. The three existing menu items stay. The "I'm Having Doubt" item now routes to a new **doubt fork screen** instead of directly to `doubt-selection.tsx`.

```
"I'm Having Doubt"  →  doubt-fork screen  →  A) About an anchored decision  →  doubt-selection.tsx (existing)
                                             B) About a decision I never recorded  →  retro.tsx (new)
```

### 3.2 Doubt type popup (no new screen)

Tapping "I'm Having Doubt" presents a **bottom-sheet modal** inline on `index.tsx` — no navigation, no new route.

Two options in the sheet:
- **"A decision I've already anchored"** — dismisses modal, routes to `doubt-selection.tsx`
- **"A decision I never recorded"** — dismisses modal, routes to `retro.tsx`

Copy (sheet header): *"What are you doubting?"*

UI pattern: same `Modal` component used elsewhere in the app (e.g. `PaywallModal`). Two pressable rows with icon, title, and subtitle. Backdrop tap dismisses. No new file needed — modal state lives in `index.tsx`.

### 3.3 New decision creation — anchor date field

`app/new.tsx` gets one new optional field in Step 1: **"When did you make this decision?"**

- Default: today
- Options: "Today", "Yesterday", "Pick a date" (DateTimePicker, same component used elsewhere)
- Persisted as: `decisionMadeAt` (ISO string)
- Hint copy: *"Adjust if you decided earlier but are recording now."*

This does **not** change the retro flow — it's purely for users who made a decision recently and are recording it for the first time with full clarity (not in doubt).

---

## 4. Data Model Redesign

### 4.1 New types

```ts
// A single checklist item — used for fears, assumptions, successCriteria, anticipatedDoubts
interface ChecklistItem {
  id: string;       // uuid generated at creation
  text: string;
}

// How a checklist item was evaluated during a doubt review
interface ChecklistItemReview {
  itemId: string;
  outcome: 'unchanged' | 'partially' | 'happened' | 'achieved' | 'not_achieved';
  note?: string;
}

// The embedded first doubt session — only present on retro decisions
interface RetroDoubtCapture {
  trigger: string;                                          // what brought them here (step 3 free text)
  emotionalState: EmotionalState | string;                  // current emotion at time of recording
  type: 'new_feelings' | 'new_facts';                      // the fork choice
  facts?: ChecklistItem[];                                  // path B only: what specifically changed
  factsImpact?: 'minor' | 'significant' | 'game_changing'; // path B only: user's self-assessment
  resolution: 're_anchored' | 'decision_changed';          // what the user chose at the end
  resolvedAt: number;                                       // timestamp
}

// A stored doubt review session — written by [id].tsx doubt mode
interface DoubtReview {
  id: string;
  reviewedAt: number;
  trigger: string;
  type: 'new_feelings' | 'new_facts' | 'mixed';
  fearReviews?: ChecklistItemReview[];
  assumptionReviews?: ChecklistItemReview[];
  successCriteriaReviews?: ChecklistItemReview[];
  factsImpact?: 'minor' | 'significant' | 'game_changing';
  resolution: 're_anchored' | 'decision_changed' | 'still_processing';
  commitmentPeriod?: '2_weeks' | '1_month' | '3_months';
  notes?: string;
}
```

### 4.2 Updated `Decision` type

```ts
interface Decision {
  // === Core — required on all decisions ===
  id: string;
  decisionText: string;
  whyText: string;                          // primary reason
  category: string;
  createdAt: number;                         // timestamp when record was saved
  revisitDate: string;                       // ISO date
  isLocked: boolean;

  // === Decision identity ===
  type: 'new' | 'retro';                    // NEW — creation mode
  decisionMadeAt?: string;                   // NEW — ISO date when decision was actually made
                                             //   'new': optional, defaults to createdAt
                                             //   'retro': required, user-provided approximate

  // === Emotional state ===
  // For 'new' decisions: emotion at time of recording (present, intentional)
  // For 'retro' decisions: current emotion while doubting (captured in step 3)
  emotionalState: EmotionalState | string;

  // === Checklist-based context (replaces free-text blobs) ===
  fears?: ChecklistItem[];                   // was: fear?: string
  assumptions?: ChecklistItem[];             // was: assumptions?: string
  successCriteria?: ChecklistItem[];         // was: outcomeSuccess?: string
  anticipatedDoubts?: ChecklistItem[];       // NEW — "how might future-you doubt this?"

  // === Free text (not checklistable — nuanced or personal) ===
  reasoning?: string;                        // additional reasoning beyond whyText
  motivation?: string;                       // deeper motivation / values
  futureSelfMessage?: string;               // letter to future self
  revisitCondition?: string;
  context?: string;                          // broader situational context

  // === Retro-specific: embedded first doubt session ===
  retroDoubt?: RetroDoubtCapture;           // only present when type === 'retro'

  // === Full doubt review history ===
  doubtReviews?: DoubtReview[];             // NEW — log of all [id].tsx doubt sessions
                                             // powers process-driven scoring

  // === Lineage ===
  linkedFromId?: string;                    // NEW — if created via "change decision",
                                             // points to the original retro decision

  // === Lifecycle ===
  status?: DecisionStatus;
  isArchived?: boolean;
  isDraft?: boolean;
  completedAt?: string;
  lastEditedAt?: number;
}
```

### 4.3 Migration

The app is pre-release with no published user data. No backwards compatibility needed.

The old free-text fields (`fear`, `assumptions`, `outcomeSuccess`, `learningSuccess`, `context` as blob) are **removed from the `Decision` type entirely**. All context is captured via the new checklist fields going forward. `[id].tsx` view mode renders `fears[]`, `assumptions[]`, `successCriteria[]` only.

---

## 5. Retro Flow — Screen by Screen

All screens use `SafeContainer` + `ScreenHeader`. Step indicator: DM Sans Micro (11px, uppercase, `#52525b`) top-left. Navigation: back arrow top-left (except intro), `Button` component bottom for primary action. All decision content in Fraunces; all UI chrome in DM Sans. Emerald (`#34d399`) accent for primary CTAs and active states.

### Screen 0 — Intro (no data captured)

Full-screen centered layout. No step indicator.

- Symbol: `◎` (large, `#a78bfa` — the retro accent, distinct from new-decision emerald)
- Heading (Fraunces 400, 24px): *"You made that decision for a reason."*
- Body (DM Sans 15px, `#71717a`): *"Doubt doesn't mean you were wrong. It means you care. Let's find your anchor together."*
- CTA `Button`: *"I'm ready"*

**Why purple accent here:** Retroactive anchoring uses a muted purple (`#a78bfa`) throughout as a visual signal distinct from the emerald of forward-looking new decisions. This is the only flow-level color difference. All other design tokens are identical.

### Screen 1 — What did you decide? + When

Step label: `RECONSTRUCTING · 1 OF 4`

- Question (DM Sans 17px, Subhead): *"What did you decide?"*
- Hint (DM Sans 13px, `#71717a`): *"Use one sentence. Don't worry about wording it perfectly — this is just for you."*
- `TextInput` (Fraunces italic, multiline) for `decisionText`
- Section label: `WHEN DID YOU MAKE THIS CALL?`
- Chip row: `Last week` / `~1 month ago` / `~3 months ago` / `Pick a date`
  - Chips follow existing emotion-picker chip style (active: purple-tinted background + border)
  - "Pick a date" opens `DateTimePicker` (same component as `new.tsx`)
- Hint: *"Approximate is fine. We just want to understand what was true then."*
- Section label: `WHAT AREA OF LIFE IS THIS?`
- Category chips — same set and component as `new.tsx` (`DEFAULT_CATEGORIES` constant)

Writes: `decisionText`, `decisionMadeAt`, `category`, `type: 'retro'`

### Screen 2a — Why + Fears

Step label: `RECONSTRUCTING · 2 OF 4`

- Question: *"Why did you make it?"*
- Hint: *"What was the reason that tipped you over the edge? Even a rough memory is enough."*
- `TextInput` (Fraunces italic) for `whyText`
- Section label: `WHAT WERE YOU AFRAID OF AT THE TIME?`  
  Hint: *"Fears you were already making peace with."*
- Checklist input for `fears[]`:
  - Existing items rendered as dismissable rows (dark card, `#27272a` border with a faint pink tint `rgba(251,113,133,0.15)`)
  - `+ Add a fear` inline add button (dashed border, `#52525b` text)
  - Each item: free text input, `×` remove button

### Screen 2b — Assumptions + Success Criteria

Step label: `RECONSTRUCTING · 2 OF 4 (CONT.)`

- Question: *"What were you counting on?"*
- Hint: *"What needed to be true for this to work? And what would 'good' have looked like?"*
- Section label: `THINGS YOU ASSUMED WOULD HAPPEN`
  - Checklist for `assumptions[]` — amber tint `rgba(251,191,36,0.12)` border
  - `+ Add an assumption`
- Section label: `WHAT SUCCESS WOULD LOOK LIKE`
  - Checklist for `successCriteria[]` — green tint `rgba(52,211,153,0.12)` border
  - `+ Add a milestone`

Both sections optional. Skip link: *"I don't remember clearly — skip these"* routes to Screen 3.

### Screen 3 — Doubt trigger + Emotional state

Step label: `TODAY · 3 OF 4`

- Question: *"What brought you here today?"*
- Hint: *"Something happened, or something's been building. What is it?"*
- `TextInput` (DM Sans, multiline) for `retroDoubt.trigger`
- Section label: `HOW ARE YOU FEELING RIGHT NOW?`
- Emotion chip row — same component as `new.tsx` (`EMOTIONAL_STATES` constant), writes `emotionalState`

### Screen 4 — The Fork

Step label: `TODAY · 4 OF 4`

- Question (Fraunces 400, 20px): *"Has anything actually changed — or does it just feel different?"*
- Hint: *"There's no wrong answer. This just helps us know where to go next."*
- Two selection cards (same dark card style as `index.tsx` menu items):
  - **"It just feels different"** — sub: *"The circumstances haven't changed, but something inside has shifted."*
  - **"Something has actually changed"** — sub: *"New information, new circumstances — real things have shifted since you decided."*
- Selecting either navigates forward immediately (no secondary CTA needed)

Writes: `retroDoubt.type`

---

## 6. Path A — New Feelings → Re-anchor

### Screen A1 — Surface original context

Header: *"Let's look at what you knew then"*  
Body (Fraunces italic, `#c4b5fd`): *"Past-you wasn't naive. Here's what they carried into this."*

- `whyText` rendered in a soft purple-tinted card (same `reason-card` style as existing doubt view)
- `fears[]` listed below with label: *"Fears you already knew about"*
  - Each item shown as a read-only row with the note: *"— you saw this coming"*
- If `assumptions[]` exist, show them similarly
- Footer hint: *"These weren't surprises. They were part of the deal."*

### Screen A2 — Re-anchor commitment

Full-screen centered. Same `ResolutionSequence` pattern as existing `[id].tsx` resolve flow, adapted:

- Symbol: `⚓`
- Title (Fraunces): *"Decision anchored."*
- Body: *"The doubt was real. So was your reasoning. You've chosen to stay the course — with clear eyes."*
- Section label: `CHECK IN WITH YOURSELF`
- Revisit date chips: `1 month` / `3 months` / `6 months` — same chip style, default `3 months`
- CTA: *"I'm staying the course"*

On confirm: saves `Decision` record with `retroDoubt.resolution: 're_anchored'`, `revisitDate` from chip selection, navigates to dashboard.

---

## 7. Path B — New Facts → Process-driven evaluation

### Screen B1 — Collect facts + impact

Header: *"Let's get specific"*  
Question: *"What's actually different now?"*  
Hint: *"List each thing that's changed, one at a time. Keep it factual."*

- Checklist for `retroDoubt.facts[]` — amber-tinted rows
- `+ Add something that changed`
- Section label: `HOW MUCH DO THESE SHIFT THINGS FOR YOU?`
- Impact rating row — three chips: `A little` / `Quite a bit` / `Everything`
  - Maps to: `'minor'` / `'significant'` / `'game_changing'`
  - Active chip: solid border + tinted background; inactive: dim
  - User must select one before proceeding

Writes: `retroDoubt.facts[]`, `retroDoubt.factsImpact`

### Screen B2 — Recommendation

Header: *"Here's our read"*  
Question (Fraunces): *"These changes are real. You get to decide what to do with them."*

Recommendation logic (process-driven, not AI):

| `factsImpact` | Recommendation framing |
|---|---|
| `minor` | Lead with "Stay the course" — facts noted but don't change the core. Single option with a softer secondary. |
| `significant` | Present both options equally — honest that either is valid. |
| `game_changing` | Lead with "Change direction" — gently acknowledges the core rationale may have shifted. |

**Stay the course card (emerald):**
- Label: `STAY THE COURSE`
- Body: *"Your core reason still holds. Recommit — but adjust your plan, not your decision."*
- CTA: *"I'm staying the course"*

**Change direction card (muted red `#fb7185`):**
- Label: `CHANGE DIRECTION`
- Body: *"The facts have genuinely shifted what's possible. Changing course isn't giving up — it's being honest with yourself."*
- CTA: *"I need to reconsider"*

### Screen B3 — Change decision (same session)

Shown only if user chose "Change direction."

Header: *"A new anchor"*  
Question: *"So what are you deciding now?"*  
Hint: *"Pre-filled from what you shared. Make it yours."*

- `TextInput` (Fraunces italic) pre-filled with original `decisionText` for easy editing
- Section label: `CHECK IN WITH YOURSELF`
- Revisit date chips: `1 month` / `3 months` / `6 months` — default `1 month` (new direction warrants an earlier check-in)
- Footer note (DM Sans 13px, `#52525b`): *"Your previous decision will be closed with a note. This becomes your new anchor going forward."*
- CTA `Button`: *"Anchor this decision"*

On confirm:
1. Original retro `Decision` saved with `retroDoubt.resolution: 'decision_changed'`, `status: 'completed'`, `isArchived: true`
2. New `Decision` created with `type: 'new'`, `linkedFromId: originalDecision.id`, `decisionText` from B3 input, `revisitDate` from chip, `category` inherited from original decision
3. Navigate to dashboard

---

## 8. Impact on `app/decision/[id].tsx` (Doubt Mode)

The existing doubt mode in `[id].tsx` evolves to use the new checklist fields when present. This is a progressive enhancement — decisions without checklist fields fall back to the current free-text behaviour.

**When `fears[]` exists:**
- Instead of asking "Did your fears change?" (open text), ask each fear as a checkbox question:
  - *"Has this fear come true?"* with options: No / Partially / Yes
  - Writes `ChecklistItemReview[]` entries into a new `DoubtReview` record

**Process-driven scoring logic (no AI):**
- If 0 of N fears occurred → hint: *"Your fears haven't materialised. This doubt may be emotional rather than factual."*
- If 1 of N fears occurred → neutral, surface the specific one
- If 2+ of N fears occurred → acknowledge real change, route toward "new facts" path

Same pattern applies to `assumptions[]` and `successCriteria[]`.

**Each completed doubt session appends to `doubtReviews[]`** — this builds a history the app can use for future reviews (*"Last time you doubted this, you stayed the course. Here's what you said."*).

---

## 9. UI/UX Conventions

All new screens follow the existing design system without deviation:

- `SafeContainer` + `AuroraBackground` + `ScreenHeader` on every screen
- `Button` component for all primary CTAs — no custom button styles
- `useHaptics()` for all confirmations and selections
- Step indicators: DM Sans Micro 11px uppercase, `#52525b`, top-left
- Decision/why text: Fraunces (italic for placeholder, regular for filled)
- All labels: DM Sans 13px uppercase with `letterSpacing: 2`, `#52525b`
- Checklist items: same card style as existing decision cards — `rgba(24,24,27,0.6)` background, `#27272a` border, 16px border radius
- Active chip state: `rgba(52,211,153,0.12)` background + `rgba(52,211,153,0.4)` border for new decisions; `rgba(139,92,246,0.12)` + `rgba(139,92,246,0.4)` for retro flow
- Only retro-specific differentiation: muted purple `#a78bfa` as the accent for the retro flow's intro and section labels. All other design tokens identical to the existing app.
- No new third-party libraries required

---

## 10. File Changes Summary

| File | Change |
|---|---|
| `types/index.ts` | Add `ChecklistItem`, `ChecklistItemReview`, `RetroDoubtCapture`, `DoubtReview`; update `Decision` (remove old free-text fields) |
| `app/retro.tsx` | **New** — full retro anchor flow |
| `app/index.tsx` | Add bottom-sheet modal state; "I'm Having Doubt" opens modal instead of routing |
| `app/new.tsx` | Add optional `decisionMadeAt` date field in Step 1 |
| `app/decision/[id].tsx` | Evolve doubt mode to use checklist fields + write `DoubtReview` to `doubtReviews[]` |
| `context/StoreContext.tsx` | Handle new fields in persist/load; no breaking changes |

---

## 11. Out of Scope

- AI-assisted reconstruction (mentioned in spec as v2)
- Draft support for retro flow (if user exits mid-flow, data is lost — acceptable for v1)
- Push notifications / reminders for retro decisions
- Habit Goal mode (separate feature, post-launch)
- Doubt review history UI in `[id].tsx` view mode (foundation is laid, surface in v1.2)
