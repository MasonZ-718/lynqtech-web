# /about Founder Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a best-in-class founder /about page at `https://lynqtech.io/about` that serves both ReAnchor users and investors/press.

**Architecture:** Single self-contained static HTML file at `/about/index.html` following the existing Lynq Tech pattern (no build step, no bundler). Mountain photos converted from HEIC to JPEG and stored in `/about/photos/`. Existing schemas in `index.html` and `reanchor/index.html` updated to point to the new page.

**Tech Stack:** HTML5, CSS (inline in `<style>`), vanilla JS (minimal — accordion only if needed), Schema.org JSON-LD, macOS `sips` for HEIC conversion.

---

## File Map

| Action | File | Purpose |
|---|---|---|
| Create | `/about/index.html` | The full about page |
| Create | `/about/photos/mason.jpg` | Mason photo (converted from HEIC) |
| Create | `/about/photos/mountain-1.jpg` | Mountain photo 1 |
| Create | `/about/photos/mountain-2.jpg` | Mountain photo 2 |
| Create | `/about/photos/mountain-3.jpg` | Mountain photo 3 |
| Modify | `/index.html` | Add About link to footer; update Organization schema `founder.url` |
| Modify | `/reanchor/index.html` | Update MobileApplication schema `author.url` |

---

## Task 1: Convert Photos from HEIC to JPEG

**Files:**
- Create: `about/photos/mason.jpg`
- Create: `about/photos/mountain-1.jpg`
- Create: `about/photos/mountain-2.jpg`
- Create: `about/photos/mountain-3.jpg`

- [ ] **Step 1: Create the photos directory**

```bash
mkdir -p /Users/mchristinenajjar/lynqtech-web/about/photos
```

- [ ] **Step 2: Convert Mason photo**

```bash
sips -s format jpeg /Users/mchristinenajjar/lynqtech-web/Photos/Mason.HEIC --out /Users/mchristinenajjar/lynqtech-web/about/photos/mason.jpg
```

Expected output: `mason.jpg` created, file size ~300-800KB.

- [ ] **Step 3: Convert mountain photos**

```bash
sips -s format jpeg /Users/mchristinenajjar/lynqtech-web/Photos/IMG_8322.HEIC --out /Users/mchristinenajjar/lynqtech-web/about/photos/mountain-1.jpg
sips -s format jpeg /Users/mchristinenajjar/lynqtech-web/Photos/IMG_8360.HEIC --out /Users/mchristinenajjar/lynqtech-web/about/photos/mountain-2.jpg
sips -s format jpeg /Users/mchristinenajjar/lynqtech-web/Photos/IMG_8523.HEIC --out /Users/mchristinenajjar/lynqtech-web/about/photos/mountain-3.jpg
```

- [ ] **Step 4: Verify files exist and are non-zero size**

```bash
ls -lh /Users/mchristinenajjar/lynqtech-web/about/photos/
```

Expected: 4 `.jpg` files, each >100KB.

- [ ] **Step 5: Commit**

```bash
cd /Users/mchristinenajjar/lynqtech-web
git add about/photos/
git commit -m "feat: add converted photo assets for /about page"
```

---

## Task 2: Create /about/index.html — Head, Meta, Schema

**Files:**
- Create: `about/index.html`

- [ ] **Step 1: Create the file with head, meta tags, and JSON-LD schemas**

Create `/about/index.html` with the following content (stop before `<style>` — that comes in Task 3):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- SEO -->
  <title>Mason Zhou — Founder of Lynq Tech</title>
  <meta name="description" content="Mason Zhou is the founder of Lynq Tech, builder of ReAnchor, and creator of 1001Lives. Former BCG consultant and IESE MBA. Building tools for clearer thinking." />
  <meta name="author" content="Mason Zhou" />
  <link rel="canonical" href="https://lynqtech.io/about" />

  <!-- Open Graph -->
  <meta property="og:title" content="Mason Zhou — Founder of Lynq Tech" />
  <meta property="og:description" content="Former BCG consultant. IESE MBA. Building tools for clearer thinking and a world with less noise in people's heads." />
  <meta property="og:type" content="profile" />
  <meta property="og:url" content="https://lynqtech.io/about" />
  <meta property="og:site_name" content="Lynq Tech" />
  <meta property="og:image" content="https://lynqtech.io/about/photos/mason.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Mason Zhou — Founder of Lynq Tech" />
  <meta name="twitter:description" content="Former BCG consultant. IESE MBA. Building tools for clearer thinking." />
  <meta name="twitter:image" content="https://lynqtech.io/about/photos/mason.jpg" />

  <!-- JSON-LD: Person -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mason Zhou",
    "jobTitle": "Founder",
    "url": "https://lynqtech.io/about",
    "image": "https://lynqtech.io/about/photos/mason.jpg",
    "worksFor": {
      "@type": "Organization",
      "name": "Lynq Tech",
      "url": "https://lynqtech.io"
    },
    "alumniOf": [
      {
        "@type": "Organization",
        "name": "IESE Business School"
      },
      {
        "@type": "Organization",
        "name": "Boston Consulting Group"
      }
    ],
    "knowsAbout": ["decision making", "decision anxiety", "behavioral psychology", "product development", "iOS apps"],
    "sameAs": [
      "https://www.linkedin.com/in/deng-zhou/",
      "https://x.com/lessinmyhead",
      "https://www.instagram.com/lessinmyhead2026",
      "https://www.youtube.com/@OneThousandandOneLives",
      "https://www.tiktok.com/@less.in.my.head"
    ]
  }
  </script>

  <!-- JSON-LD: BreadcrumbList -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lynqtech.io/" },
      { "@type": "ListItem", "position": 2, "name": "About", "item": "https://lynqtech.io/about" }
    ]
  }
  </script>

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
</head>
```

- [ ] **Step 2: Commit**

```bash
cd /Users/mchristinenajjar/lynqtech-web
git add about/index.html
git commit -m "feat: add /about page head, meta, and Person schema"
```

---

## Task 3: CSS — Design System + Page-Specific Styles

**Files:**
- Modify: `about/index.html` (append `<style>` block inside `<head>`)

- [ ] **Step 1: Add the complete `<style>` block inside `<head>`, before `</head>`**

```html
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:             #09090b;
      --surface:        #18181b;
      --surface-2:      #1c1c1f;
      --border:         #27272a;
      --border-subtle:  #1f1f22;
      --text:           #f4f4f5;
      --muted:          #a1a1aa;
      --dim:            #71717a;
      --accent:         #34d399;
      --accent-text:    rgba(52, 211, 153, 0.82);
      --accent-glow:    rgba(52, 211, 153, 0.10);
      --accent-border:  rgba(52, 211, 153, 0.22);
    }

    html { height: 100%; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'DM Sans', -apple-system, sans-serif;
      min-height: 100%;
      padding: 0;
      position: relative;
      overflow-x: hidden;
    }

    /* Grain texture */
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

    /* Layout */
    .page { max-width: 680px; margin: 0 auto; padding: 64px 24px 80px; position: relative; z-index: 1; }

    /* Section spacing */
    section { margin-bottom: 72px; }

    /* Eyebrow */
    .eyebrow {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: var(--accent-text);
      margin-bottom: 20px;
      display: block;
    }

    /* Hero */
    .hero-photo-wrap {
      width: 100%;
      height: 380px;
      border-radius: 20px;
      overflow: hidden;
      margin-bottom: 36px;
      position: relative;
    }

    .hero-photo-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(0.75) saturate(0.85);
    }

    .hero-photo-wrap::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, transparent 40%, rgba(9,9,11,0.7) 100%);
    }

    h1 {
      font-family: 'Fraunces', Georgia, serif;
      font-size: clamp(28px, 5vw, 44px);
      font-weight: 300;
      color: var(--text);
      line-height: 1.15;
      letter-spacing: -0.5px;
      margin-bottom: 14px;
    }

    h1 em { font-style: italic; color: var(--muted); }

    .hero-sub {
      font-size: 15px;
      color: var(--dim);
      line-height: 1.6;
    }

    /* Credentials */
    .cred-list {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .cred-item {
      display: flex;
      align-items: center;
      gap: 16px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 16px 20px;
    }

    .cred-logo {
      width: 32px;
      height: 32px;
      object-fit: contain;
      flex-shrink: 0;
      filter: brightness(0) invert(1) opacity(0.7);
    }

    .cred-badge {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: var(--surface-2);
      border: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 1px;
      color: var(--dim);
      flex-shrink: 0;
    }

    .cred-info { display: flex; flex-direction: column; gap: 2px; }

    .cred-title {
      font-size: 14px;
      font-weight: 500;
      color: var(--text);
    }

    .cred-org {
      font-size: 12px;
      color: var(--dim);
    }

    /* The Why */
    .body-text {
      font-size: 15px;
      color: var(--muted);
      line-height: 1.75;
      margin-bottom: 16px;
    }

    .body-text em { color: var(--text); font-style: italic; }

    .pull-quote {
      font-family: 'Fraunces', Georgia, serif;
      font-size: clamp(17px, 3vw, 22px);
      font-weight: 300;
      font-style: italic;
      color: var(--text);
      line-height: 1.5;
      border-left: 2px solid var(--accent-border);
      padding-left: 20px;
      margin: 28px 0;
    }

    /* Belief cards */
    .belief-grid {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .belief-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 20px 24px;
    }

    .belief-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--text);
      margin-bottom: 6px;
    }

    .belief-body {
      font-size: 14px;
      color: var(--dim);
      line-height: 1.65;
    }

    /* Building cards */
    .building-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .building-card {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 20px 24px;
      text-decoration: none;
      transition: border-color 0.2s, background 0.2s;
      gap: 16px;
    }

    a.building-card:hover {
      border-color: var(--accent-border);
      background: var(--surface-2);
      box-shadow: 0 4px 24px rgba(52, 211, 153, 0.06);
    }

    .building-card-static {
      opacity: 0.6;
    }

    .building-info { display: flex; flex-direction: column; gap: 6px; flex: 1; }

    .building-name {
      font-size: 15px;
      font-weight: 600;
      color: var(--text);
    }

    .building-desc {
      font-family: 'Fraunces', Georgia, serif;
      font-size: 13px;
      font-style: italic;
      color: var(--dim);
      line-height: 1.55;
    }

    .building-badge {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--accent);
      background: var(--accent-glow);
      border: 1px solid var(--accent-border);
      border-radius: 6px;
      padding: 3px 8px;
      flex-shrink: 0;
      white-space: nowrap;
    }

    .building-badge-neutral {
      color: var(--dim);
      background: transparent;
      border-color: var(--border);
    }

    /* Photo strip */
    .photo-strip {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin: 24px 0;
    }

    .photo-strip img {
      width: 100%;
      aspect-ratio: 4/3;
      object-fit: cover;
      border-radius: 12px;
      filter: brightness(0.8) saturate(0.9);
    }

    /* Interest tags */
    .tag-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 4px;
    }

    .tag {
      font-size: 13px;
      color: var(--muted);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 5px 14px;
    }

    /* Connect */
    .connect-headline {
      font-family: 'Fraunces', Georgia, serif;
      font-size: clamp(20px, 4vw, 28px);
      font-weight: 300;
      font-style: italic;
      color: var(--text);
      margin-bottom: 10px;
    }

    .connect-body {
      font-size: 14px;
      color: var(--dim);
      line-height: 1.65;
      margin-bottom: 28px;
    }

    .social-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .social-link {
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 10px 16px;
      text-decoration: none;
      font-size: 13px;
      color: var(--muted);
      transition: border-color 0.2s, color 0.2s;
    }

    .social-link:hover {
      border-color: var(--accent-border);
      color: var(--text);
    }

    .social-icon { font-size: 14px; }

    /* Nav */
    .nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 56px;
    }

    .nav-brand {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: var(--accent-text);
      text-decoration: none;
    }

    .nav-back {
      font-size: 13px;
      color: var(--dim);
      text-decoration: none;
      transition: color 0.2s;
    }

    .nav-back:hover { color: var(--text); }

    /* Footer */
    .footer {
      font-size: 12px;
      color: #3f3f46;
      margin-top: 80px;
      padding-top: 24px;
      border-top: 1px solid var(--border-subtle);
    }

    /* Rule */
    .rule { width: 40px; height: 1px; background: var(--border); margin-bottom: 72px; }

    @media (max-width: 480px) {
      .photo-strip { grid-template-columns: repeat(2, 1fr); }
      .photo-strip img:last-child { display: none; }
    }
  </style>
</head>
```

- [ ] **Step 2: Verify the file opens without errors in a browser**

```bash
cd /Users/mchristinenajjar/lynqtech-web && python3 -m http.server 8080 &
open http://localhost:8080/about/
```

Expected: blank dark page (no body yet), no console errors.

- [ ] **Step 3: Kill the server**

```bash
kill $(lsof -ti:8080)
```

- [ ] **Step 4: Commit**

```bash
cd /Users/mchristinenajjar/lynqtech-web
git add about/index.html
git commit -m "feat: add CSS design system for /about page"
```

---

## Task 4: HTML Body — Hero + Credentials Sections

**Files:**
- Modify: `about/index.html` (add `<body>` with sections 1–2)

- [ ] **Step 1: Add body with Hero and Credentials sections**

Add after `</head>`:

```html
<body>
  <div class="page">
    <nav class="nav">
      <a href="/" class="nav-brand">Lynq Tech</a>
      <a href="/" class="nav-back">← Home</a>
    </nav>

    <!-- SECTION 1: HERO -->
    <section>
      <div class="hero-photo-wrap">
        <img src="photos/mason.jpg" alt="Mason Zhou in the mountains" />
      </div>
      <span class="eyebrow">Mason Zhou — Founder</span>
      <h1>Building tools for clearer thinking —<br /><em>and a world with less noise in people's heads.</em></h1>
      <p class="hero-sub">Founder of Lynq Tech. Creator of 1001Lives. Former BCG consultant.</p>
    </section>

    <div class="rule"></div>

    <!-- SECTION 2: CREDENTIALS -->
    <section>
      <span class="eyebrow">Background</span>
      <div class="cred-list">
        <div class="cred-item">
          <img class="cred-logo" src="../reanchor/logos/BCG.png" alt="Boston Consulting Group" />
          <div class="cred-info">
            <span class="cred-title">Consultant</span>
            <span class="cred-org">Boston Consulting Group</span>
          </div>
        </div>
        <div class="cred-item">
          <img class="cred-logo" src="../reanchor/logos/iese.png" alt="IESE Business School" />
          <div class="cred-info">
            <span class="cred-title">MBA</span>
            <span class="cred-org">IESE Business School</span>
          </div>
        </div>
        <div class="cred-item">
          <div class="cred-badge">GE</div>
          <div class="cred-info">
            <span class="cred-title">Commercial Leadership Program</span>
            <span class="cred-org">General Electric</span>
          </div>
        </div>
        <div class="cred-item">
          <div class="cred-badge">BSc</div>
          <div class="cred-info">
            <span class="cred-title">Double Degree — Automation &amp; Economics</span>
            <span class="cred-org">Undergraduate</span>
          </div>
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Verify in browser**

```bash
cd /Users/mchristinenajjar/lynqtech-web && python3 -m http.server 8080 &
open http://localhost:8080/about/
```

Expected: dark page with Mason photo, eyebrow, H1, and 4 credential rows visible. Kill server after.

```bash
kill $(lsof -ti:8080)
```

- [ ] **Step 3: Commit**

```bash
cd /Users/mchristinenajjar/lynqtech-web
git add about/index.html
git commit -m "feat: add hero and credentials sections to /about page"
```

---

## Task 5: HTML Body — The Why + What I Believe Sections

**Files:**
- Modify: `about/index.html` (append sections 3–4 inside `.page`, before closing `</div>`)

- [ ] **Step 1: Add The Why and What I Believe sections after the credentials `</section>`**

```html
    <!-- SECTION 3: THE WHY -->
    <section>
      <span class="eyebrow">Why I Walked Away</span>
      <p class="body-text">At BCG, I sat in rooms where the world's most complex decisions were made — with data, frameworks, and billions on the line.</p>
      <p class="body-text">But what struck me wasn't how well people decided. It was how much they struggled <em>after</em> — relitigating calls that were already made, letting doubt quietly undo clarity. Not because they lacked intelligence. Because decisions are not purely logical. And nobody had built anything to help with that.</p>
      <blockquote class="pull-quote">"The hard part wasn't deciding to leave. It was the weeks after — when I'd already decided, but my mind kept relitigating it. That loop is why ReAnchor exists."</blockquote>
    </section>

    <!-- SECTION 4: WHAT I BELIEVE -->
    <section>
      <span class="eyebrow">What I Believe</span>
      <p class="body-text">Better decisions don't come from more information. They come from clarity.</p>
      <div class="belief-grid">
        <div class="belief-card">
          <div class="belief-title">Clarity over analysis</div>
          <div class="belief-body">Most people already know what they want. They need structure to hear themselves — not more data.</div>
        </div>
        <div class="belief-card">
          <div class="belief-title">Emotion is signal, not noise</div>
          <div class="belief-body">Feelings are information. The goal isn't to eliminate them — it's to stop letting temporary ones overwrite permanent decisions.</div>
        </div>
        <div class="belief-card">
          <div class="belief-title">Technology should support humans, not replace them</div>
          <div class="belief-body">The best tools give you back your own thinking. They don't think for you.</div>
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Verify in browser, check pull-quote renders with left accent border**

```bash
cd /Users/mchristinenajjar/lynqtech-web && python3 -m http.server 8080 &
open http://localhost:8080/about/
kill $(lsof -ti:8080)
```

- [ ] **Step 3: Commit**

```bash
cd /Users/mchristinenajjar/lynqtech-web
git add about/index.html
git commit -m "feat: add The Why and What I Believe sections to /about page"
```

---

## Task 6: HTML Body — What I'm Building + Beyond the Build Sections

**Files:**
- Modify: `about/index.html` (append sections 5–6)

- [ ] **Step 1: Add What I'm Building and Beyond the Build sections**

```html
    <!-- SECTION 5: WHAT I'M BUILDING -->
    <section>
      <span class="eyebrow">What I'm Building</span>
      <div class="building-list">
        <a href="/reanchor" class="building-card">
          <div class="building-info">
            <span class="building-name">ReAnchor</span>
            <span class="building-desc">An iOS app that captures your decisions at the moment of clarity — so you can return to them when doubt shows up at 2am. Built for the calls that keep you up at night.</span>
          </div>
          <span class="building-badge">Launching Spring 2026</span>
        </a>
        <a href="https://www.youtube.com/@OneThousandandOneLives" target="_blank" rel="noopener noreferrer" class="building-card">
          <div class="building-info">
            <span class="building-name">1001Lives</span>
            <span class="building-desc">A project collecting stories from people across all walks of life — how they navigate decisions, struggles, and turning points. Because sometimes the best clarity comes from perspective, not tools.</span>
          </div>
          <span class="building-badge">Storytelling Project</span>
        </a>
        <div class="building-card building-card-static">
          <div class="building-info">
            <span class="building-name">What's Next</span>
            <span class="building-desc">ReAnchor is the first of many. We're exploring tools for navigating uncertainty, life transitions, and meaningful connection — products that combine logic and emotion, not just one or the other.</span>
          </div>
          <span class="building-badge building-badge-neutral">In Exploration</span>
        </div>
      </div>
    </section>

    <!-- SECTION 6: BEYOND THE BUILD -->
    <section>
      <span class="eyebrow">Beyond the Build</span>
      <p class="body-text">When I'm not building, I'm usually somewhere with no signal.</p>
      <div class="photo-strip">
        <img src="photos/mountain-1.jpg" alt="Mountain landscape" />
        <img src="photos/mountain-2.jpg" alt="Mountain landscape" />
        <img src="photos/mountain-3.jpg" alt="Mountain landscape" />
      </div>
      <div class="tag-row">
        <span class="tag">🏔 Mountains &amp; hiking</span>
        <span class="tag">📷 Photography</span>
        <span class="tag">🌍 Exploring new places</span>
      </div>
    </section>
```

- [ ] **Step 2: Verify in browser — check photo strip renders 3 columns, cards link correctly**

```bash
cd /Users/mchristinenajjar/lynqtech-web && python3 -m http.server 8080 &
open http://localhost:8080/about/
kill $(lsof -ti:8080)
```

- [ ] **Step 3: Commit**

```bash
cd /Users/mchristinenajjar/lynqtech-web
git add about/index.html
git commit -m "feat: add What I'm Building and Beyond the Build sections to /about page"
```

---

## Task 7: HTML Body — Connect Section + Close Tags

**Files:**
- Modify: `about/index.html` (append section 7, close `.page` and `<body>`)

- [ ] **Step 1: Add Connect section and close the page**

```html
    <!-- SECTION 7: CONNECT -->
    <section>
      <span class="eyebrow">Let's Connect</span>
      <p class="connect-headline">Building in public. Always open to a conversation.</p>
      <p class="connect-body">Whether you're navigating a big decision, building something similar, or just curious — reach out.</p>
      <div class="social-grid">
        <a href="mailto:mason.zhou@lynqtech.io" class="social-link">
          <span class="social-icon">✉</span>
          <span>mason.zhou@lynqtech.io</span>
        </a>
        <a href="https://x.com/lessinmyhead" target="_blank" rel="noopener noreferrer" class="social-link">
          <span class="social-icon">𝕏</span>
          <span>@lessinmyhead</span>
        </a>
        <a href="https://www.instagram.com/lessinmyhead2026" target="_blank" rel="noopener noreferrer" class="social-link">
          <span class="social-icon">📷</span>
          <span>@lessinmyhead2026</span>
        </a>
        <a href="https://www.linkedin.com/in/deng-zhou/" target="_blank" rel="noopener noreferrer" class="social-link">
          <span class="social-icon">in</span>
          <span>LinkedIn</span>
        </a>
        <a href="https://www.youtube.com/@OneThousandandOneLives" target="_blank" rel="noopener noreferrer" class="social-link">
          <span class="social-icon">▶</span>
          <span>YouTube</span>
        </a>
        <a href="https://www.tiktok.com/@less.in.my.head" target="_blank" rel="noopener noreferrer" class="social-link">
          <span class="social-icon">♪</span>
          <span>TikTok</span>
        </a>
      </div>
    </section>

    <footer class="footer">© 2026 Lynq Tech</footer>

  </div><!-- /.page -->
</body>
</html>
```

- [ ] **Step 2: Verify full page in browser — scroll top to bottom, check all sections render**

```bash
cd /Users/mchristinenajjar/lynqtech-web && python3 -m http.server 8080 &
open http://localhost:8080/about/
kill $(lsof -ti:8080)
```

- [ ] **Step 3: Commit**

```bash
cd /Users/mchristinenajjar/lynqtech-web
git add about/index.html
git commit -m "feat: add Connect section and complete /about page HTML"
```

---

## Task 8: Update Existing Pages — Homepage Footer + Schemas

**Files:**
- Modify: `index.html` (add About link to footer; update Organization schema `founder.url`)
- Modify: `reanchor/index.html` (update MobileApplication schema `author.url`)

- [ ] **Step 1: Add About link to homepage footer**

In `/index.html`, find:
```html
    <p class="footer">© 2026 Lynq Tech</p>
```

Replace with:
```html
    <p class="footer">© 2026 Lynq Tech · <a href="/about" style="color: inherit; text-decoration: none; opacity: 0.7;">About</a></p>
```

- [ ] **Step 2: Update Organization schema `founder.url` in `index.html`**

Find:
```json
    "founder": {
      "@type": "Person",
      "name": "Mason Zhou",
      "jobTitle": "Founder",
      "worksFor": {
        "@type": "Organization",
        "name": "Lynq Tech"
      }
    },
```

Replace with:
```json
    "founder": {
      "@type": "Person",
      "name": "Mason Zhou",
      "jobTitle": "Founder",
      "url": "https://lynqtech.io/about",
      "worksFor": {
        "@type": "Organization",
        "name": "Lynq Tech"
      }
    },
```

- [ ] **Step 3: Update MobileApplication schema `author.url` in `reanchor/index.html`**

Find:
```json
    "author": {
      "@type": "Person",
      "name": "Mason Zhou",
      "jobTitle": "Founder & Developer",
      "url": "https://lynqtech.io"
    },
```

Replace with:
```json
    "author": {
      "@type": "Person",
      "name": "Mason Zhou",
      "jobTitle": "Founder & Developer",
      "url": "https://lynqtech.io/about"
    },
```

- [ ] **Step 4: Verify homepage footer shows About link**

```bash
cd /Users/mchristinenajjar/lynqtech-web && python3 -m http.server 8080 &
open http://localhost:8080/
kill $(lsof -ti:8080)
```

- [ ] **Step 5: Commit**

```bash
cd /Users/mchristinenajjar/lynqtech-web
git add index.html reanchor/index.html
git commit -m "feat: add About link to homepage footer and fix Person schema URLs"
```

---

## Task 9: Final QA Pass

- [ ] **Step 1: Start server and do a full visual pass**

```bash
cd /Users/mchristinenajjar/lynqtech-web && python3 -m http.server 8080 &
open http://localhost:8080/about/
```

Check each section:
- [ ] Hero photo loads and is visible
- [ ] H1 text renders in Fraunces serif
- [ ] BCG and IESE logos visible in credential rows
- [ ] GE and BSc text badges render correctly
- [ ] Pull-quote has left green border
- [ ] 3 belief cards render
- [ ] ReAnchor card links to `/reanchor`
- [ ] 1001Lives card links to YouTube (new tab)
- [ ] "What's Next" card is visually dimmed (opacity 0.6) and has no link
- [ ] Photo strip shows 3 mountain photos
- [ ] Interest tags render as pills
- [ ] All 6 social links render
- [ ] Email link opens mail client
- [ ] External links open in new tab
- [ ] Page is responsive at 375px (mobile)
- [ ] Grain texture overlay is visible (subtle)
- [ ] Footer shows "© 2026 Lynq Tech"

- [ ] **Step 2: Check homepage footer**

```bash
open http://localhost:8080/
```

- [ ] About link visible in footer
- [ ] About link navigates to `/about`

- [ ] **Step 3: Kill server**

```bash
kill $(lsof -ti:8080)
```

- [ ] **Step 4: Final commit**

```bash
cd /Users/mchristinenajjar/lynqtech-web
git add -A
git status
git commit -m "feat: complete /about founder page with photo assets and schema updates"
```
