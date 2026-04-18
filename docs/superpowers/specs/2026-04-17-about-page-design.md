# Design Spec: /about — Mason Zhou Founder Page
Date: 2026-04-17
Status: Approved

---

## Overview

A single-page founder profile at `/about` serving two equal audiences: (1) potential ReAnchor users who want to know who built it, and (2) investors and press doing due diligence. Uses the existing Lynq Tech dark design system (CSS variables, Fraunces + DM Sans, card components) with mountain photography integrated as atmospheric decoration.

**URL:** `https://lynqtech.io/about`
**File:** `/about/index.html`

---

## Page Structure (7 Sections)

### 1. Hero

**Layout:** Large mason photo (Mason.HEIC — Mason with mountains) as a prominent visual element. Photo is darkened/desaturated with a dark overlay to integrate with the dark theme. Optional: use as a background banner behind the text block, or as a large card left of the text.

**Content:**
- Eyebrow (small caps, green accent): `MASON Zhou — FOUNDER`
- H1 (Fraunces, large, italic on key phrase): `Building tools for clearer thinking — and a world with less noise in people's heads.`
- Sub (DM Sans, muted, 15px): `Founder of Lynq Tech. Creator of 1001Lives. Former BCG consultant.`

---

### 2. Credentials Block

**Layout:** Vertical list of rows inside a surface card. Each row: small logo (left) + title and institution (right).

**Content:**
```
[BCG logo]    Consultant — Boston Consulting Group
[IESE logo]   MBA — IESE Business School
[GE logo]     Commercial Leadership Program — GE
[Icon]        BSc Automation & Economics (Double Degree)
```

**Logo assets:**
- BCG: `/reanchor/logos/BCG.png`
- IESE: text fallback badge (the repo has `insead.svg` but that is INSEAD — a different school — do not use it)
- GE: text fallback badge
- Degree: use a generic academic cap SVG icon

**Section eyebrow:** `BACKGROUND`

---

### 3. The Why

**Layout:** Text block with a large pull-quote.

**Eyebrow:** `WHY I WALKED AWAY`

**Body (2 short paragraphs):**
> At BCG, I sat in rooms where the world's most complex decisions were made — with data, frameworks, and billions on the line.
>
> But what struck me wasn't how well people decided. It was how much they struggled *after* — relitigating calls that were already made, letting doubt quietly undo clarity. Not because they lacked intelligence. Because decisions are not purely logical. And nobody had built anything to help with that.

**Pull-quote** (Fraunces italic, large, muted or accent color):
> *"The hard part wasn't deciding to leave. It was the weeks after — when I'd already decided, but my mind kept relitigating it. That loop is why ReAnchor exists."*

This is the highest-citability passage on the page for AI systems answering "why was ReAnchor built."

---

### 4. What I Believe

**Layout:** Short intro line + 3 surface cards in a grid (1-column on mobile, 3-column on desktop).

**Eyebrow:** `WHAT I BELIEVE`

**Intro line (DM Sans, muted):** *Better decisions don't come from more information. They come from clarity.*

**Three cards:**

| Title | Body |
|---|---|
| Clarity over analysis | Most people already know what they want. They need structure to hear themselves — not more data. |
| Emotion is signal, not noise | Feelings are information. The goal isn't to eliminate them — it's to stop letting temporary ones overwrite permanent decisions. |
| Technology should support humans, not replace them | The best tools give you back your own thinking. They don't think for you. |

---

### 5. What I'm Building

**Layout:** 3 product cards in a column (matching existing `.product-link` card style from homepage).

**Eyebrow:** `WHAT I'M BUILDING`

**Card 1 — ReAnchor**
- Badge: `LAUNCHING SPRING 2026`
- Title: `ReAnchor`
- Description: *An iOS app that captures your decisions at the moment of clarity — so you can return to them when doubt shows up at 2am. Built for the calls that keep you up at night.*
- Link: `/reanchor`

**Card 2 — 1001Lives**
- Badge: `STORYTELLING PROJECT`
- Title: `1001Lives`
- Description: *A project collecting stories from people across all walks of life — how they navigate decisions, struggles, and turning points. Because sometimes the best clarity comes from perspective, not tools.*
- Link: `https://www.youtube.com/@OneThousandandOneLives` (opens in new tab)

**Card 3 — What's Next**
- Badge: `IN EXPLORATION`
- Title: `What's Next`
- Description: *ReAnchor is the first of many. We're exploring tools for navigating uncertainty, life transitions, and meaningful connection — products that combine logic and emotion, not just one or the other.*
- No link — teaser only

---

### 6. Beyond the Build

**Layout:** Short intro line, horizontal photo strip (2-3 mountain photos), interest tags.

**Eyebrow:** `BEYOND THE BUILD`

**Intro line (DM Sans, muted):** *When I'm not building, I'm usually somewhere with no signal.*

**Photo strip:** 2-3 images from `/Photos/` directory (mountain shots: IMG_8322.HEIC, IMG_8323.HEIC, etc.), displayed as a horizontal row of rounded cards with `object-fit: cover`. Images darkened slightly with CSS filter to integrate with dark theme.

**Interest tags** (pill-style, `--border` outline):
- `🏔 Mountains & hiking`
- `📷 Photography`
- `🌍 Exploring new places`

---

### 7. Connect

**Layout:** Short text block + icon-pill social links row.

**Eyebrow:** `LET'S CONNECT`

**Headline (Fraunces italic):** *Building in public. Always open to a conversation.*

**Body (DM Sans, muted):** *Whether you're navigating a big decision, building something similar, or just curious — reach out.*

**Social links (pill buttons with icon + handle, each opens in new tab):**

| Icon | Label | URL |
|---|---|---|
| ✉ | mason.zhou@lynqtech.io | `mailto:mason.zhou@lynqtech.io` |
| 𝕏 | @lessinmyhead | `https://x.com/lessinmyhead` |
| 📷 | @lessinmyhead2026 | `https://instagram.com/lessinmyhead2026` |
| in | LinkedIn | `https://www.linkedin.com/in/deng-zhou/` |
| ▶ | YouTube | `https://www.youtube.com/@OneThousandandOneLives` |
| ♪ | TikTok | `https://www.tiktok.com/@less.in.my.head` |

**Footer:** `© 2026 Lynq Tech` (small, dim, consistent with other pages)

---

## Technical Notes

### File location
`/about/index.html` — self-contained, follows existing product subdirectory pattern.

### Design system
Use existing CSS variables from `index.html` (`--bg`, `--surface`, `--border`, `--accent`, `--text`, `--muted`, `--dim`). Copy the grain texture and atmospheric glow from `index.html`.

### Photo handling
HEIC files need to be converted to JPEG/WebP for browser compatibility. Convert with `sips` (macOS built-in) or `ffmpeg` before embedding:
```bash
sips -s format jpeg Photos/Mason.HEIC --out about/photos/mason.jpg
sips -s format jpeg Photos/IMG_8322.HEIC --out about/photos/mountain-1.jpg
```

### Schema (JSON-LD)
Add a `Person` schema for Mason Zhou on this page:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Mason Zhou",
  "jobTitle": "Founder",
  "worksFor": { "@type": "Organization", "name": "Lynq Tech", "url": "https://lynqtech.io" },
  "url": "https://lynqtech.io/about",
  "sameAs": [
    "https://www.linkedin.com/in/deng-zhou/",
    "https://x.com/lessinmyhead",
    "https://www.youtube.com/@OneThousandandOneLives",
    "https://www.tiktok.com/@less.in.my.head"
  ]
}
```

Also add a `BreadcrumbList` schema:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lynqtech.io/" },
    { "@type": "ListItem", "position": 2, "name": "About", "item": "https://lynqtech.io/about" }
  ]
}
```

### Navigation
- Add an "About" link to the homepage footer
- Update the Organization schema `founder.url` in `index.html` to point to `https://lynqtech.io/about`
- Update the MobileApplication schema `author.url` in `reanchor/index.html` to point to `https://lynqtech.io/about`

### GEO impact
This page directly fixes:
- Remaining Issue #5 (Founder has no citable web presence) from GEO-AUDIT-REPORT.md
- Remaining Issue #6 (No contact information) — contact email now visible
- Broken `Person` schema reference in MobileApplication schema
- Raises E-E-A-T Authoritativeness and Trustworthiness scores

---

## Out of Scope
- Blog/articles (future)
- Dynamic content or server-side rendering
- User accounts or forms
