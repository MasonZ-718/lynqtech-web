# Why ReAnchor Section Redesign — Spec

## Context

The current "Why ReAnchor" section on `/reanchor/index.html` is too wordy. Content is good but delivered as paragraphs (quote + verdict per competitor) when it should land faster. Goal: same insight, delivered with design impact — with optional depth available on click for people who want the "why."

---

## Design Direction

**The Contrast Grid + Modal Depth**

Three competitor cards in a 3-column row, followed by a full-width ReAnchor card. Each card is two lines maximum — category label + one gut-punch line. Clicking a competitor card opens a modal with honest pros/cons analysis. Clicking the ReAnchor card opens a modal with a full comparison table and an inline waitlist signup.

The narrative arc: you try journaling yourself → you lean on friends & family → you ask an AI → then past-you appears as the real answer. Three wrong answers, one right one.

---

## Layout

**Section structure:**
- Eyebrow: `Why ReAnchor`
- Subhead: `You've tried the obvious. None of them solves for this moment like ReAnchor does.`
- Three competitor cards in a 3-column grid
- ReAnchor card below, spanning full width
- Declaration block removed — ReAnchor card replaces it

**Card anatomy:**
- Category label (small, `--dim`)
- Single gut-punch line (`--muted` for competitors, `--accent` for ReAnchor)
- Subtle "tap to learn more" affordance (e.g. a small chevron or underline on hover) — competitor cards only
- ReAnchor card uses a distinct CTA hint: e.g. "See how it compares →"

**Competitor card visual treatment:**
- Category label: `--dim`
- Gut-punch line: `--muted`, font-weight 500
- Minimal visual weight — these are the wrong answers
- Cursor pointer; subtle hover state (slight border brightness or opacity lift)

**ReAnchor card visual treatment:**
- Gut-punch line: `--accent`, font-weight 600
- Subtle left border in `--accent` color
- Feels like the answer, not another option

**Responsive:**
- Desktop (≥768px): 3-column grid for competitor cards, ReAnchor card full-width below
- Mobile (<768px): all four cards stacked full-width, same vertical order
- Modals: centered overlay on desktop, bottom sheet or full-screen on mobile

**Scroll reveal:**
- Competitor cards stagger in (reveal, reveal-delay-1, reveal-delay-2)
- ReAnchor card follows with reveal-delay-3

---

## Copy

### Competitor cards

| Category | Gut-punch line |
|---|---|
| Yourself | "You replay everything in your head, or read what you wrote on journal, but it keeps getting messier" |
| Friends & family | "They listen. They validate. They can't return you to the call you made." |
| AI chatbots | "It tells you what you want to hear. And gives you more to think about." |

### ReAnchor card

- **Label:** `ReAnchor`
- **Gut-punch line:** "The decision you made. Before the doubt started."

---

## Modal Content

### Competitor modal structure
- Title: the category name
- Two columns: **What helps** (pros) / **Where it falls short** (cons)
- Close button (×) top right
- No CTA — purely informational

---

**Yourself modal**

*What helps*
- Forces you to articulate thoughts, which can bring some clarity
- No external pressure — you're honest with yourself
- Available any time, no social cost

*Where it falls short*
- Replaying in your head gives doubt more material to spiral with
- Written notes capture your mood at the time, not the structured reasoning behind the decision
- There's no protocol to return to — just more words, more noise
- The more you write the more tangled it gets; journaling processes thoughts, it can't return you to a decision

---

**Friends & family modal**

*What helps*
- Articulating to others forces you to simplify, which can sharpen your thinking
- A trusted person can offer perspective you hadn't considered
- Emotional support matters — feeling heard reduces anxiety

*Where it falls short*
- You may unconsciously dramatise or selectively present the situation when explaining to others
- People close to you are socially incentivised to soften their view — they don't want to hurt you or damage the relationship
- They lack the full context of your original reasoning at the moment you made the call
- Asking too many people creates noise; conflicting advice often makes doubt worse, not better

---

**AI chatbots modal**

*What helps*
- Available at any hour, no judgment
- Can surface angles you hadn't considered
- Useful for factual research around a decision

*Where it falls short*
- Trained to be agreeable — it tells you what you want to hear, not what you need to hear
- Generates more to think about; more thinking is the last thing you need when doubt has already set in
- Has no record of what you actually believed when you made the decision
- Encourages reflection loops, not resolution

---

### ReAnchor modal structure
- Title: `Why ReAnchor is different`
- Comparison table (see below)
- Social proof line + waitlist form
- Close button (×) top right

**Comparison table**

| | Yourself | Friends & family | AI chatbots | ReAnchor |
|---|---|---|---|---|
| Captures your reasoning *before* doubt starts | ✗ | ✗ | ✗ | ✓ |
| Available at 2am when doubt peaks | ✓ | ✗ | ✓ | ✓ |
| Free from social pressure or incentivised advice | ✓ | ✗ | ✗ | ✓ |
| Doesn't generate more to think about | ✗ | ✗ | ✗ | ✓ |
| Returns you to *your* original clarity | ✗ | ✗ | ✗ | ✓ |

**CTA copy (below table):**
> "Join [n] people anchoring their decisions before the doubt arrives."
> [email input] [Join Waitlist button]

Note: [n] is a real-time count from the waitlist table, or a static number updated manually. Placeholder for now.

---

## Implementation Notes

### Section markup
- Section ID: `#different` (existing, unchanged)
- Replace `.diff-rows` and all `.diff-row*` markup with `.comp-grid` + `.comp-card` markup
- Replace `.diff-declaration` markup with `.comp-card--reanchor`
- Keep `.diff-label` (eyebrow) and `.diff-intro` (subhead) — classes and structure unchanged
- Remove all old `.diff-row*` and `.diff-declaration*` CSS — no longer needed

### Card classes
- `.comp-grid` — 3-column grid container for competitor cards
- `.comp-card` — individual competitor card (clickable)
- `.comp-card--reanchor` — ReAnchor card (full-width, clickable)

### Modal
- Single modal element in the DOM, reused for all four cards
- JS swaps content on open based on which card was clicked
- Trap focus inside modal when open; close on Escape key or clicking the backdrop
- Competitor modal and ReAnchor modal have different inner templates (pros/cons vs. comparison table)
- ReAnchor modal contains a separate form (`id="modal-waitlist-form"`) — distinct from `#waitlist-form` on the page to avoid conflicts
- Reuse the existing Supabase client (`_supa`) and the same `quiz_results` / waitlist table logic already used by `#waitlist-form`
- Show same success state pattern as existing form on submit

---

## What to Verify After Implementation

1. On desktop: 3 competitor cards sit side by side, ReAnchor card spans full width below
2. On mobile: all four cards stack cleanly, no truncation
3. Clicking each competitor card opens the correct modal content
4. Clicking the ReAnchor card opens the comparison table modal with the waitlist form
5. Modal closes on ×, Escape key, and backdrop click
6. Waitlist form in modal submits successfully and shows success state
7. ReAnchor card reads as the answer — accent color and left border distinguish it
8. Section vertical footprint is noticeably tighter than the previous editorial-row layout
9. Section flows naturally from the doubt/self-test section before it into the vision section after it
