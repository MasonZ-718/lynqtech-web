# Lynq Tech Design System

This document defines the visual language for all Lynq Tech properties. It is the source of truth for color, typography, spacing, components, and behavior. Every page — the company homepage, product landing pages, and future pages — should feel like it belongs to the same quiet, intentional hand.

---

## 1. Philosophy

Lynq Tech builds tools for clearer thinking. The design should embody that mission: deliberate, uncluttered, and emotionally honest. Not minimal as a stylistic pose — minimal as respect for the person on the other side.

Three tensions to hold in balance:

- **Warmth and precision** — Fraunces serif brings human warmth; DM Sans carries crisp utility. Neither dominates.
- **Dark and alive** — The near-black canvas is not emptiness. The grain, the glow, the green accent make it breathe.
- **Restraint and intention** — Every element earns its presence. Nothing decorates; everything communicates.

**Borrowed principles, adapted:**
- From Apple: tight display line-heights, disciplined single-accent color, cinematic section rhythm
- From VoltAgent: border weight as the primary elevation signal, warm-toned containment over generic grays, the "two-shade dark system" (page vs. surface)
- From Together AI: large stat numbers as visual anchors, green-tinted shadows instead of generic black, section duality (active vs. quiet zones)

---

## 2. Color

### CSS Variables

```css
:root {
  /* Backgrounds */
  --bg:               #09090b;   /* Page canvas — near-black with warm undertone */
  --surface:          #18181b;   /* Cards, containers — one shade lifted */
  --surface-2:        #1c1c1f;   /* Nested surfaces, secondary cards */

  /* Borders */
  --border:           #27272a;   /* Standard containment */
  --border-subtle:    #1f1f22;   /* Hairline dividers, quiet separators */

  /* Text */
  --text:             #f4f4f5;   /* Primary — warm off-white, never pure white */
  --muted:            #a1a1aa;   /* Secondary */
  --dim:              #71717a;   /* Tertiary, metadata, placeholders */

  /* Accent */
  --accent:           #34d399;   /* Emerald green — the only chromatic color */
  --accent-glow:      rgba(52, 211, 153, 0.12);
  --accent-border:    rgba(52, 211, 153, 0.25);
  --accent-text:      rgba(52, 211, 153, 0.85); /* Accent on nav/labels, slightly dimmed */

  /* Semantic */
  --danger:           #fb7185;   /* Error states, friction moments */
}
```

### Color Roles

| Token | Role | Never use for |
|---|---|---|
| `--bg` | Page background only | Cards, components |
| `--surface` | Cards, containers, nav | Page background |
| `--surface-2` | Nested content, hover states | Primary cards |
| `--border` | Card outlines, section dividers | Text |
| `--text` | Primary readable text | Decorative accents |
| `--muted` | Secondary text, long-form body | Headlines |
| `--dim` | Labels, eyebrows, timestamps, hints | Body text |
| `--accent` | CTAs, active states, highlights | Backgrounds, large fills |
| `--danger` | Error feedback, friction language | Decorative use |

### Accent Discipline (from Apple)

`--accent` is the **only chromatic color** in the system. Its budget is deliberately small: CTAs, active borders, inline highlights, the brand name mark. When green appears, it signals significance. Dilute it and it loses that power.

- Do not use `--accent` as a background fill on any surface larger than a badge
- Do not introduce secondary accent colors (no blue, no purple, no orange)
- When the accent appears at reduced emphasis (labels, nav marks), use `--accent-text` at 0.85 opacity

### Shadow System (from Together AI, adapted)

Lynq Tech shadows are tinted with the accent, not generic black. This ties elevation to brand identity.

```css
/* Soft card lift */
box-shadow: 0 4px 24px rgba(52, 211, 153, 0.06);

/* Modal / overlay float */
box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px var(--border);

/* Accent glow (CTAs, focused inputs) */
box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.18);
```

---

## 3. Typography

### Typefaces

| Family | Role | Source |
|---|---|---|
| **Fraunces** | Display, hero headings, editorial pulls, italic emphasis | Google Fonts |
| **DM Sans** | UI, body, navigation, buttons, labels | Google Fonts |

```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;1,9..144,300;1,9..144,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
```

**The pairing logic:** Fraunces handles moments of feeling — the headline that stops a scroll, the italic phrase that lands a concept. DM Sans handles everything functional — nav links, buttons, labels, body paragraphs. They do not compete; they take turns.

### Type Scale

| Role | Family | Size | Weight | Line Height | Letter Spacing | Notes |
|---|---|---|---|---|---|---|
| Display Hero | Fraunces | clamp(40px, 7vw, 80px) | 300–400 | 1.12 | -0.5px | Full-viewport hero headlines |
| Section Heading | Fraunces | clamp(28px, 4vw, 48px) | 400 | 1.2 | -0.4px | Section-opening statements |
| Pull Quote | Fraunces italic | clamp(20px, 3vw, 36px) | 300–400 | 1.5 | -0.2px | Emotional/editorial paragraphs |
| Feature Title | DM Sans | 18px | 600 | 1.3 | -0.1px | Card headings, feature names |
| Body | DM Sans | 15–16px | 400 | 1.7 | normal | Readable paragraphs |
| Body Muted | Fraunces italic | 13–15px | 300 | 1.6 | normal | Product descriptions, captions |
| UI Label | DM Sans | 13px | 500–600 | 1.4 | normal | Button text, nav items |
| Eyebrow | DM Sans | 10–11px | 600 | 1 | 3–4px | Section labels — always uppercase |
| Micro | DM Sans | 11–12px | 400–500 | 1.4 | normal | Badges, timestamps, footnotes |

### Typography Principles (from Apple)

**Tight display, open body.** Hero headlines use line-heights of 1.10–1.15 — compressed and cinematic. Body paragraphs breathe at 1.65–1.75. The contrast between them creates clear hierarchy through rhythm alone, without relying on size differences.

**Negative tracking scales with size.** Don't just track headlines — apply subtle negative letter-spacing at all sizes:
- 80px display: `-0.6px`
- 48px section heading: `-0.4px`
- 36px pull quote: `-0.2px`
- 16px body: `normal` (DM Sans is pre-spaced well)
- Eyebrows: `+3px to +4px` (uppercase only — positive spacing earned by caps)

**Italic as emphasis, not decoration.** Fraunces italic is used to land emotional weight on a specific phrase — *"clearer thinking"*, *"an anchor for your decisions"*. It is not a stylistic default. Each italic usage should have a reason.

---

## 4. Depth & Elevation (from VoltAgent)

Elevation in this system is communicated primarily through **border treatment and background tone**, not shadows. Shadows accent the system — they don't carry it.

| Level | Treatment | Use |
|---|---|---|
| 0 — Canvas | `--bg` background, no border | Page background |
| 1 — Contained | `--surface` + `1px solid var(--border)` | Standard cards, nav, code blocks |
| 2 — Raised | `--surface` + `1px solid var(--border)` + accent-tinted shadow | Hovered cards, active states |
| 3 — Accent | `--surface` + `1px solid var(--accent-border)` | Active / highlighted feature cards |
| 4 — Overlay | `--bg` + `0 12px 48px rgba(0,0,0,0.5), 0 0 0 1px var(--border)` | Modals, popovers |

**Atmospheric glow.** A subtle radial gradient in the accent color sits behind hero sections — not as a component, but as a feeling. It should be barely perceptible: `rgba(52,211,153,0.05)` to `transparent` over a large ellipse.

**Grain texture.** Applied as a fixed `::after` pseudo-element at `opacity: 0.04`. This prevents the dark surface from reading as flat or digital. It is always present, always subtle.

---

## 5. Components

### Navigation

- Floating pill, fixed at top — not a full-width bar
- `background: rgba(9,9,11,0.85)` + `backdrop-filter: blur(12px)` (glass effect from Apple)
- `border: 1px solid var(--border)` — Level 1 containment
- `border-radius: 14px`
- Width: `calc(100% - 48px)`, max `900px`
- Brand mark: DM Sans, 13px, weight 700, `letter-spacing: 2px`, uppercase, `--accent-text` color
- CTA: solid accent fill, dark text, `border-radius: 10px`

```css
nav {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(9, 9, 11, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 12px 20px;
}
```

### Buttons

**Primary (filled accent)**
- Background: `var(--accent)`
- Text: `#09090b` (dark — never white on green)
- Font: DM Sans, 13–15px, weight 600
- Padding: `10px 20px`
- Radius: `10px`
- Hover: `opacity: 0.85`
- Focus: `box-shadow: 0 0 0 3px rgba(52,211,153,0.25)`

**Secondary (outlined)**
- Background: transparent
- Text: `var(--text)`
- Border: `1px solid var(--border)`
- Radius: `10px`
- Hover: `border-color: var(--accent-border)`, `background: var(--accent-glow)`

**Ghost (text link style)**
- No background, no border
- Text: `var(--muted)` → `var(--text)` on hover
- Font: DM Sans, 14px, weight 400
- Use for: "Learn more", inline links, footer nav

### Cards

Standard card — Level 1 elevation:
```css
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
}
.card:hover {
  border-color: var(--accent-border);
  background: var(--surface-2);
  box-shadow: 0 4px 24px rgba(52, 211, 153, 0.06);
}
```

Accent card — Level 3 (highlighted state):
```css
.card-accent {
  border-color: var(--accent-border);
  box-shadow: 0 0 0 1px var(--accent-border), 0 4px 24px rgba(52, 211, 153, 0.08);
}
```

### Badges / Tags

- Background: `rgba(52,211,153,0.08)`
- Border: `1px solid rgba(52,211,153,0.18)`
- Text: `var(--accent)`, DM Sans, 10px, weight 600, uppercase, `letter-spacing: 1px`
- Padding: `3px 8px`
- Radius: `6px`

For neutral/dim tags:
- Background: `var(--surface-2)`
- Border: `1px solid var(--border)`
- Text: `var(--dim)`

### Eyebrows / Section Labels

DM Sans, 10–11px, weight 600, uppercase, `letter-spacing: 3–4px`, `var(--dim)` color.
Used to orient the reader before a section without competing with the heading.

### Stat Display (from Together AI)

Large numbers as visual anchors. When showing research-backed statistics:
- Number: Fraunces, 40–48px, weight 600, `var(--text)`
- Label: DM Sans, 13–14px, `var(--muted)`, line-height 1.5
- Layout: horizontal grid, `1px solid var(--border)` gaps, `--surface` background cells, `border-radius: 16px` on the grid container

```css
.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
}
.stat {
  background: var(--surface);
  padding: 28px 20px;
  text-align: center;
}
```

### Dividers

Avoid heavy horizontal rules. Use:
- `border-top: 1px solid var(--border)` — section boundaries
- A `40px` wide, `1px` tall `--border` colored rule to signal a soft pause within a section
- Whitespace alone when a full-width divider would feel mechanical

---

## 6. Spacing & Layout

### Spacing Scale

Base unit: **8px**

```
4px   — icon gap, tight inline spacing
8px   — component internal gap (icon + text)
12px  — between sibling labels
16px  — standard gap (list items, form fields)
20px  — card padding tight
24px  — card padding standard, container padding
32px  — between components within a section
40px  — between major content blocks
48px  — section header to first content element
64px  — between sections (minimum)
80px  — between sections (breathing)
120px — major section padding (top and bottom)
```

### Container

```css
.container {
  max-width: 760px;   /* product pages — focused, editorial */
  margin: 0 auto;
  padding: 0 24px;
}

.container-wide {
  max-width: 960px;   /* homepage, wider layouts */
  margin: 0 auto;
  padding: 0 24px;
}
```

### Section Rhythm (from Apple)

Sections breathe. Each major section gets `120px` vertical padding. This is not wasted space — it creates the pause that makes what comes next feel considered.

The cinematic section principle: before the reader reaches new content, they should feel like they've arrived somewhere, not scrolled past something.

---

## 7. Border Radius Scale

| Value | Use |
|---|---|
| `6px` | Badges, small tags, inline pills |
| `10px` | Buttons |
| `14px` | Navigation pill, product link cards |
| `16px` | Standard content cards, thought bubbles, stat grids |
| `20px` | Large hero containers, full-bleed surface sections |

Do not use radii larger than `20px` on rectangular elements. Do not use `9999px` (pill) except on very small badge/tag elements where the radius genuinely matches the height.

---

## 8. Animation & Motion

Motion should feel like physics — ease out for things entering, ease in for things leaving. Never linear. Never spring-bouncy.

### Scroll Reveal

```css
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

Stagger siblings with `transition-delay`: `0.1s`, `0.2s`, `0.35s`, `0.5s`.

### Hover Transitions

All interactive elements: `transition: 0.2s ease` on `border-color`, `background`, `opacity`, `box-shadow`.
Never transition `transform` on hover for cards — it creates visual noise. Reserve transforms for scroll reveals and explicit interactions.

### Ambient Animations

- Grain overlay: static (no animation)
- Atmospheric glow: static radial gradient (no pulse/breathe)
- Scroll hint arrows: subtle bounce `4px` over `2s`, ease-in-out, infinite
- Thought slide-ins: `translateX(-40px) → 0`, `0.6s ease`, staggered 0.15s

Keep animations slow and purposeful. Fast motion contradicts the "quiet clarity" identity.

---

## 9. Atmospheric Effects

These are the invisible hand that makes the dark canvas feel alive, not empty.

### Grain Texture

```css
body::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 220px 220px;
}
```

### Hero Glow

```css
body::before {
  content: '';
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 500px;
  background: radial-gradient(ellipse at center, rgba(52,211,153,0.055) 0%, transparent 65%);
  pointer-events: none;
}
```

Adjust `top` per page — for product pages with a centered hook section, `30%` works. For homepage, `25%` brings it higher.

---

## 10. Page Archetypes

### Company Homepage (`/index.html`)

**Purpose:** Orient visitors. Establish Lynq Tech as the maker. Surface products.

**Structure:**
- Centered, single-column, vertically centered in viewport
- Brand eyebrow → hero headline → sub → rule → products → footer
- Max width: `480px` (tighter than product pages — more personal, like a calling card)
- No nav needed — this page is already minimal

**Tone:** Quiet confidence. The page doesn't sell — it introduces.

### Product Landing Page (`/productname/index.html`)

**Structure:**
1. **Hook** — full-viewport. Eyebrow → Fraunces display headline → morphing subtext → CTA
2. **Pain** — what the user feels before the product exists
3. **Insight** — the reframe. What most people misunderstand.
4. **How it works** — concrete, sequential
5. **Stats** — research-backed social proof (3-column stat grid)
6. **FAQ** — schema-marked, citability-optimized
7. **Waitlist CTA** — simple form, one field, one button
8. **Footer** — copyright, nav link back to lynqtech.io

**Section spacing:** `120px` top/bottom padding per section, `border-top: 1px solid var(--border)` between sections.

---

## 11. Responsive Behavior

### Breakpoints

| Name | Width | Changes |
|---|---|---|
| Mobile | < 480px | Single column, reduced font sizes, nav collapses |
| Tablet | 480–768px | Same single column, mid font sizes |
| Desktop | 768px+ | Full layout, max-width containers active |

### Type Scaling

Use `clamp()` for display and section headings:
- Hero: `clamp(40px, 7vw, 80px)`
- Section: `clamp(28px, 4vw, 48px)`
- Pull quote: `clamp(22px, 3.5vw, 36px)`

Body text does not scale with `clamp` — `15–16px` is fixed. Scaling body text creates uncomfortable rhythm shifts across breakpoints.

### Touch Targets

- Buttons: minimum `44px` height
- Nav CTA: `padding: 8px 16px` (comfortable)
- Product link cards: full card is touch target

---

## 12. Voice in Design

The design system should never feel like it's trying to impress. It should feel like it's trying to be honest. Some guidelines that translate from brand to pixel:

- **No decorative elements without purpose.** Every border, every shadow, every animation earns its presence.
- **Stats are not bragging.** Research numbers are shown because they help users understand the problem — not to manufacture social proof.
- **Fraunces italic is used like underlining.** Only on the phrase that matters most.
- **Green is a signal, not a theme.** When the accent appears, the eye goes there. Use it to direct attention, not fill space.
- **Quiet pages are confident pages.** Whitespace is not absence — it is the visual equivalent of a pause before you say something true.

---

## 13. Do's and Don'ts

### Do
- Use `--accent` on one element per visual zone — one CTA, one active border, one highlight
- Compress Fraunces display headings to `line-height: 1.10–1.20` — tight and deliberate
- Apply `transition: 0.2s ease` to all interactive state changes
- Use `border: 1px solid var(--border)` as the primary elevation signal
- Add green-tinted shadows (`rgba(52,211,153,0.06)`) for raised cards — not generic black shadows
- Scale type with `clamp()` for display sizes; fix body text
- Always pair stat numbers with a source-cited label beneath

### Don't
- Don't introduce any new accent colors — the system has exactly one
- Don't use `--accent` as a large fill (backgrounds, full-width sections)
- Don't animate hover states with `transform: scale()` on cards — it's jarring
- Don't add heavy drop shadows (`0 20px 60px rgba(0,0,0,0.5)`) to standard cards
- Don't widen letter-spacing on Fraunces headlines — it loses its authoritative compression
- Don't center-align body text — left-align always (center is reserved for stat numbers and CTAs)
- Don't create new components when an existing pattern can be adapted
- Don't use pure white (`#ffffff`) anywhere — `--text` (`#f4f4f5`) is the ceiling
