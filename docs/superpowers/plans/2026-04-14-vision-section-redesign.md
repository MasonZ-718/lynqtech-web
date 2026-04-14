# Vision Section Redesign — ReAnchor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign Section 6 (Vision) of `reanchor/index.html` to communicate greater ambition: asymmetric evolution strip with Duolingo tagline, compact chip cards with vote-by-name + detail modal, and an updated 8-feature list.

**Architecture:** All changes are confined to `reanchor/index.html` (single static file, no build step). CSS lives in the `<style>` block (~line 1663+), HTML in Section 6 (~line 2772+), JS at the bottom `<script>` block (~line 3364+). Verification is done by opening the file in a browser.

**Tech Stack:** Vanilla HTML/CSS/JS, Supabase JS client (vote persistence), localStorage (voted state)

---

## File Map

Single file modified throughout: `reanchor/index.html`

| Area | Approx. Lines | What Changes |
|---|---|---|
| CSS — vision split | ~1705–1774 | Asymmetric widths, glow, tagline, arrow separator |
| CSS — feature cards | ~1857–1968 | Remove old feat-card styles; add feat-grid, feat-chip, sync-tag, modal |
| CSS — responsive | ~1995–2008 | Update media query refs to new classes |
| HTML — vision-sub | ~2780 | New copy |
| HTML — vision-split | ~2783–2808 | Asymmetric layout, arrow sep, tagline, new bullets |
| HTML — feature area | ~2810–2942 | Replace carousel + 6 cards → grid + 8 chips |
| HTML — modal | near `</body>` | New modal overlay DOM |
| JS — voting | ~3364–3420 | Update selectors from `.feat-card` → `.feat-chip` |
| JS — carousel IIFE | ~3422–3560 | Delete entirely |
| JS — feature data + modal | after `// ── Feature voting ──` | Add `FEATURE_DATA` const + modal open/close IIFE |

---

## Task 1: Update vision-sub copy

**Files:**
- Modify: `reanchor/index.html:2780`

- [ ] **Step 1: Replace the sub paragraph text**

Find (line ~2780):
```html
<p class="vision-sub reveal reveal-delay-2">Most people have tools for fitness, finances, and productivity — nothing for the quality of their choices. ReAnchor changes that.</p>
```

Replace with:
```html
<p class="vision-sub reveal reveal-delay-2">The world has tools for fitness, finances, and focus. Nothing exists yet for the quality of your choices — the decisions that define your career, your relationships, your life. ReAnchor is building that category from scratch.</p>
```

- [ ] **Step 2: Verify in browser**

Open `reanchor/index.html` in a browser. Scroll to Vision. Confirm the new sub copy appears correctly under the headline.

- [ ] **Step 3: Commit**

```bash
git add reanchor/index.html
git commit -m "copy: raise ambition in Vision sub — name career/relationships/life stakes"
```

---

## Task 2: Evolution strip CSS — asymmetric layout + glow + typography

**Files:**
- Modify: `reanchor/index.html` — CSS `<style>` block (~lines 1705–1774)

- [ ] **Step 1: Replace the vision-split-col rules with asymmetric flex ratios, remove border-right**

Find:
```css
    .vision-split-col {
      flex: 1;
      padding: 30px 32px;
    }
    .vision-split-col.v-now {
      background: rgba(52, 211, 153, 0.04);
      border-right: 1px solid var(--border);
    }
    .vision-split-col.v-future {
      background: rgba(167, 139, 250, 0.04);
    }
```

Replace with:
```css
    .vision-split-col {
      padding: 30px 32px;
    }
    .vision-split-col.v-now {
      flex: 2;
      background: rgba(52, 211, 153, 0.04);
    }
    .vision-split-col.v-future {
      flex: 3;
      background: rgba(167, 139, 250, 0.06);
      background-image: radial-gradient(ellipse at 80% 20%, rgba(167, 139, 250, 0.14) 0%, transparent 65%);
    }
    .vision-split-sep {
      width: 1px;
      background: var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      position: relative;
    }
    .vision-split-arrow {
      position: absolute;
      width: 28px;
      height: 28px;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: var(--dim);
      flex-shrink: 0;
    }
```

- [ ] **Step 2: Add larger DecisionOS title + tagline styles**

After the `.split-col-item::before` rule block (around line 1774), add:

```css
    .vision-split-col.v-future .split-col-title {
      font-size: 28px;
      letter-spacing: -0.5px;
    }
    .split-col-tagline {
      font-size: 13px;
      color: #a78bfa;
      font-style: italic;
      margin-top: -8px;
      margin-bottom: 18px;
      opacity: 0.85;
      line-height: 1.4;
    }
```

- [ ] **Step 3: Update the `@media (max-width: 768px)` vision-split rules**

Find (around line 2002–2003):
```css
      .vision-split { flex-direction: column; }
      .vision-split-col.v-now { border-right: none; border-bottom: 1px solid var(--border); }
```

Replace with:
```css
      .vision-split { flex-direction: column; }
      .vision-split-col.v-now { border-bottom: 1px solid var(--border); }
      .vision-split-sep { width: 100%; height: 1px; }
      .vision-split-arrow { transform: rotate(90deg); }
      .vision-split-col.v-future .split-col-title { font-size: 22px; }
```

- [ ] **Step 4: Verify in browser**

Desktop: Today column is narrower, DecisionOS column is wider and has a visible purple radial glow. Resize to ≤768px: columns stack, separator becomes horizontal.

- [ ] **Step 5: Commit**

```bash
git add reanchor/index.html
git commit -m "style: asymmetric vision strip — 40/60 flex, purple glow, larger future title"
```

---

## Task 3: Evolution strip HTML — new content

**Files:**
- Modify: `reanchor/index.html:2783–2808`

- [ ] **Step 1: Replace the vision-split block**

Find the entire block from `<div class="vision-split reveal reveal-delay-3">` through its closing `</div>` (lines ~2783–2808).

Replace with:

```html
      <div class="vision-split reveal reveal-delay-3">
        <div class="vision-split-col v-now">
          <div class="split-pill v-now">
            <div class="split-pill-dot"></div>
            Today
          </div>
          <h3 class="split-col-title">Decision Journal &amp; Doubt Review</h3>
          <div class="split-col-items">
            <div class="split-col-item">Record any decision at the moment of clarity</div>
            <div class="split-col-item">Run a structured Doubt Review when 2am hits</div>
            <div class="split-col-item">Everything stays on your device. No account needed.</div>
          </div>
        </div>

        <div class="vision-split-sep" aria-hidden="true">
          <div class="vision-split-arrow">→</div>
        </div>

        <div class="vision-split-col v-future">
          <div class="split-pill v-future">
            <div class="split-pill-dot"></div>
            Coming
          </div>
          <h3 class="split-col-title">DecisionOS</h3>
          <p class="split-col-tagline">Duolingo for your decisions</p>
          <div class="split-col-items">
            <div class="split-col-item">Train your judgment the way athletes train their body</div>
            <div class="split-col-item">Know your patterns before they know you</div>
            <div class="split-col-item">Build a decision practice that compounds over a lifetime</div>
          </div>
        </div>
      </div>
```

- [ ] **Step 2: Verify in browser**

DecisionOS side shows: "Coming" pill → large "DecisionOS" title → italic purple "Duolingo for your decisions" tagline → 3 ambitious bullets. The `→` arrow appears centered on the divider line. Today side is visibly narrower.

- [ ] **Step 3: Commit**

```bash
git add reanchor/index.html
git commit -m "feat: evolution strip — Duolingo tagline, new bullets, arrow divider"
```

---

## Task 4: Feature grid + chip + sync-tag CSS

**Files:**
- Modify: `reanchor/index.html` — CSS `<style>` block

- [ ] **Step 1: Add feat-grid and feat-chip styles**

After the `.carousel-sub` rule block (around line 1794), add:

```css
    /* Feature grid (replaces carousel) */
    .feat-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 20px;
    }
    .feat-chip {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      cursor: pointer;
      transition: border-color 0.22s, box-shadow 0.22s;
    }
    .feat-chip:hover {
      border-color: rgba(52, 211, 153, 0.28);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.18);
    }
    .feat-chip:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }
    .feat-chip.voted {
      border-color: rgba(52, 211, 153, 0.35);
    }
    .feat-chip-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
    }
    .feat-chip-name {
      font-size: 14px;
      font-weight: 600;
      color: var(--text);
      line-height: 1.3;
      margin: 0;
    }
    .feat-chip-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
```

- [ ] **Step 2: Add Sync tag + icon CSS**

Find `.feat-tag.commit-tag` rule (around line 1909). After it, add:

```css
    .feat-tag.sync-tag { background: rgba(34,211,238,0.10); color: #22d3ee; border: 1px solid rgba(34,211,238,0.25); }
    .feat-icon.sync-ic  { background: rgba(34,211,238,0.10); }
```

- [ ] **Step 3: Add responsive grid breakpoints**

Inside the existing `@media (max-width: 640px)` block (around line 1994), add:

```css
      .feat-grid { grid-template-columns: repeat(2, 1fr); }
```

After the `@media (max-width: 480px)` block, add:

```css
    @media (max-width: 380px) {
      .feat-grid { grid-template-columns: 1fr; }
    }
```

- [ ] **Step 4: Verify in browser — no errors**

Open DevTools → Console. Confirm no CSS parse errors.

- [ ] **Step 5: Commit**

```bash
git add reanchor/index.html
git commit -m "style: add feat-grid, feat-chip, and sync-tag CSS"
```

---

## Task 5: Modal CSS + HTML

**Files:**
- Modify: `reanchor/index.html` — CSS `<style>` block and HTML `<body>`

- [ ] **Step 1: Add modal CSS**

After the `.feat-chip-footer` rule block (just added in Task 4), add:

```css
    /* Feature detail modal */
    .feat-modal-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      z-index: 900;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .feat-modal-overlay.open {
      display: flex;
    }
    .feat-modal {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 22px;
      padding: 32px;
      max-width: 480px;
      width: 100%;
      position: relative;
      box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);
    }
    .feat-modal-close {
      position: absolute;
      top: 16px;
      right: 16px;
      background: transparent;
      border: 1px solid var(--border);
      border-radius: 9px;
      color: var(--muted);
      width: 32px;
      height: 32px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.18s, border-color 0.18s;
    }
    .feat-modal-close:hover {
      color: var(--text);
      border-color: var(--muted);
    }
    .feat-modal-close:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }
    .feat-modal-tag-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 16px;
    }
    .feat-modal-title {
      font-family: 'Fraunces', Georgia, serif;
      font-size: 22px;
      font-weight: 400;
      color: var(--text);
      margin-bottom: 12px;
      line-height: 1.2;
    }
    .feat-modal-desc {
      font-size: 15px;
      color: var(--muted);
      line-height: 1.75;
      margin-bottom: 24px;
    }
```

- [ ] **Step 2: Add modal HTML**

Search for `</body>` (near the very end of the file). Directly before it, add:

```html
  <!-- Feature detail modal -->
  <div class="feat-modal-overlay" id="feat-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="feat-modal-title">
    <div class="feat-modal" id="feat-modal">
      <button class="feat-modal-close" id="feat-modal-close" aria-label="Close">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 2l8 8M10 2L2 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>
      <div class="feat-modal-tag-row">
        <div class="feat-icon" id="feat-modal-icon"></div>
        <span class="feat-tag" id="feat-modal-tag"></span>
      </div>
      <h3 class="feat-modal-title" id="feat-modal-title"></h3>
      <p class="feat-modal-desc" id="feat-modal-desc"></p>
      <button class="feat-vote-btn" id="feat-modal-vote-btn">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 1v10M1 6h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        <span class="vote-label">Vote</span><span class="vote-count">0</span>
      </button>
    </div>
  </div>
```

- [ ] **Step 3: Smoke-test modal visibility**

Open in browser. In DevTools console run:
```javascript
document.getElementById('feat-modal-overlay').classList.add('open')
```
Modal overlay should appear. Run:
```javascript
document.getElementById('feat-modal-overlay').classList.remove('open')
```
Modal should disappear.

- [ ] **Step 4: Commit**

```bash
git add reanchor/index.html
git commit -m "feat: add feature detail modal DOM and CSS"
```

---

## Task 6: Replace carousel HTML with 8-chip grid

**Files:**
- Modify: `reanchor/index.html:2810–2942`

- [ ] **Step 1: Replace the feature carousel block**

Find from `<!-- Feature carousel -->` (line ~2810) through `<div class="carousel-dots" id="carousel-dots"></div>` (line ~2942). Delete this entire block and replace with:

```html
      <!-- Feature grid -->
      <div class="carousel-header reveal">
        <div>
          <h3 class="carousel-title">Shape what comes next</h3>
          <p class="carousel-sub">Vote for the features you want built first — click any card for details</p>
        </div>
        <div class="vote-tally"><strong id="total-votes">0</strong> votes cast</div>
      </div>

      <div class="feat-grid" id="feat-grid">

        <!-- Chip 1: AI Decision Coach -->
        <div class="feat-chip" data-feature="ai-decision-coach" role="button" tabindex="0"
             onclick="openFeatureModal('ai-decision-coach', this)"
             onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openFeatureModal('ai-decision-coach',this);}"
             aria-label="AI Decision Coach — click for details">
          <div class="feat-chip-top">
            <div class="feat-icon clarity-ic">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2v4M10 14v4M2 10h4M14 10h4M4.343 4.343l2.828 2.828M12.829 12.829l2.828 2.828M15.657 4.343l-2.828 2.828M7.171 12.829l-2.828 2.828" stroke="#60a5fa" stroke-width="1.4" stroke-linecap="round"/></svg>
            </div>
            <span class="feat-tag clarity-tag">Clarity</span>
          </div>
          <h4 class="feat-chip-name">AI Decision Coach</h4>
          <div class="feat-chip-footer">
            <button class="feat-vote-btn" onclick="event.stopPropagation(); castVote(this, 'ai-decision-coach')" aria-label="Vote for AI Decision Coach">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 1v10M1 6h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
              <span class="vote-label">Vote</span><span class="vote-count">89</span>
            </button>
          </div>
        </div>

        <!-- Chip 2: Pattern Insights -->
        <div class="feat-chip" data-feature="pattern-insights" role="button" tabindex="0"
             onclick="openFeatureModal('pattern-insights', this)"
             onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openFeatureModal('pattern-insights',this);}"
             aria-label="Pattern Insights — click for details">
          <div class="feat-chip-top">
            <div class="feat-icon pattern-ic">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 15l4.5-5.5 4 3.5 4.5-6L18 10" stroke="#a78bfa" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <span class="feat-tag pattern-tag">Pattern</span>
          </div>
          <h4 class="feat-chip-name">Pattern Insights</h4>
          <div class="feat-chip-footer">
            <button class="feat-vote-btn" onclick="event.stopPropagation(); castVote(this, 'pattern-insights')" aria-label="Vote for Pattern Insights">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 1v10M1 6h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
              <span class="vote-label">Vote</span><span class="vote-count">74</span>
            </button>
          </div>
        </div>

        <!-- Chip 3: Accountability Partners -->
        <div class="feat-chip" data-feature="accountability" role="button" tabindex="0"
             onclick="openFeatureModal('accountability', this)"
             onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openFeatureModal('accountability',this);}"
             aria-label="Accountability Partners — click for details">
          <div class="feat-chip-top">
            <div class="feat-icon commit-ic">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="8" cy="6" r="2.5" stroke="#34d399" stroke-width="1.4"/><path d="M3 17c0-2.761 2.239-5 5-5" stroke="#34d399" stroke-width="1.4" stroke-linecap="round"/><circle cx="15" cy="11" r="2" stroke="#34d399" stroke-width="1.4"/><path d="M12.5 17c0-1.933 1.119-3.5 2.5-3.5" stroke="#34d399" stroke-width="1.4" stroke-linecap="round"/></svg>
            </div>
            <span class="feat-tag commit-tag">Commitment</span>
          </div>
          <h4 class="feat-chip-name">Accountability Partners</h4>
          <div class="feat-chip-footer">
            <button class="feat-vote-btn" onclick="event.stopPropagation(); castVote(this, 'accountability')" aria-label="Vote for Accountability Partners">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 1v10M1 6h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
              <span class="vote-label">Vote</span><span class="vote-count">61</span>
            </button>
          </div>
        </div>

        <!-- Chip 4: Values Axis -->
        <div class="feat-chip" data-feature="values-axis" role="button" tabindex="0"
             onclick="openFeatureModal('values-axis', this)"
             onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openFeatureModal('values-axis',this);}"
             aria-label="Values Axis — click for details">
          <div class="feat-chip-top">
            <div class="feat-icon clarity-ic">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2v16M2 10h16" stroke="#60a5fa" stroke-width="1.4" stroke-linecap="round"/><circle cx="10" cy="10" r="2.5" stroke="#60a5fa" stroke-width="1.4"/></svg>
            </div>
            <span class="feat-tag clarity-tag">Clarity</span>
          </div>
          <h4 class="feat-chip-name">Values Axis</h4>
          <div class="feat-chip-footer">
            <button class="feat-vote-btn" onclick="event.stopPropagation(); castVote(this, 'values-axis')" aria-label="Vote for Values Axis">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 1v10M1 6h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
              <span class="vote-label">Vote</span><span class="vote-count">53</span>
            </button>
          </div>
        </div>

        <!-- Chip 5: Decision Forecast -->
        <div class="feat-chip" data-feature="decision-forecast" role="button" tabindex="0"
             onclick="openFeatureModal('decision-forecast', this)"
             onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openFeatureModal('decision-forecast',this);}"
             aria-label="Decision Forecast — click for details">
          <div class="feat-chip-top">
            <div class="feat-icon pattern-ic">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 17c2-4 4-8 8-9" stroke="#a78bfa" stroke-width="1.4" stroke-linecap="round"/><circle cx="14" cy="6" r="2.5" stroke="#a78bfa" stroke-width="1.4" stroke-dasharray="2 1.5"/><path d="M11.5 8.5L17 4" stroke="#a78bfa" stroke-width="1.4" stroke-linecap="round"/></svg>
            </div>
            <span class="feat-tag pattern-tag">Pattern</span>
          </div>
          <h4 class="feat-chip-name">Decision Forecast</h4>
          <div class="feat-chip-footer">
            <button class="feat-vote-btn" onclick="event.stopPropagation(); castVote(this, 'decision-forecast')" aria-label="Vote for Decision Forecast">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 1v10M1 6h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
              <span class="vote-label">Vote</span><span class="vote-count">47</span>
            </button>
          </div>
        </div>

        <!-- Chip 6: Cloud Sync -->
        <div class="feat-chip" data-feature="cloud-sync" role="button" tabindex="0"
             onclick="openFeatureModal('cloud-sync', this)"
             onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openFeatureModal('cloud-sync',this);}"
             aria-label="Cloud Sync — click for details">
          <div class="feat-chip-top">
            <div class="feat-icon sync-ic">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5.5 13.5A4 4 0 016 6h1a5 5 0 019.9 1H17a3 3 0 010 6H6" stroke="#22d3ee" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <span class="feat-tag sync-tag">Sync</span>
          </div>
          <h4 class="feat-chip-name">Cloud Sync</h4>
          <div class="feat-chip-footer">
            <button class="feat-vote-btn" onclick="event.stopPropagation(); castVote(this, 'cloud-sync')" aria-label="Vote for Cloud Sync">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 1v10M1 6h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
              <span class="vote-label">Vote</span><span class="vote-count">0</span>
            </button>
          </div>
        </div>

        <!-- Chip 7: Habit Decisions -->
        <div class="feat-chip" data-feature="habit-decisions" role="button" tabindex="0"
             onclick="openFeatureModal('habit-decisions', this)"
             onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openFeatureModal('habit-decisions',this);}"
             aria-label="Habit Decisions — click for details">
          <div class="feat-chip-top">
            <div class="feat-icon commit-ic">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4a6 6 0 100 12A6 6 0 0010 4z" stroke="#34d399" stroke-width="1.4"/><path d="M10 7v3l2 2" stroke="#34d399" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <span class="feat-tag commit-tag">Commitment</span>
          </div>
          <h4 class="feat-chip-name">Habit Decisions</h4>
          <div class="feat-chip-footer">
            <button class="feat-vote-btn" onclick="event.stopPropagation(); castVote(this, 'habit-decisions')" aria-label="Vote for Habit Decisions">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 1v10M1 6h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
              <span class="vote-label">Vote</span><span class="vote-count">0</span>
            </button>
          </div>
        </div>

        <!-- Chip 8: AI Assisted Doubt Review -->
        <div class="feat-chip" data-feature="ai-doubt-review" role="button" tabindex="0"
             onclick="openFeatureModal('ai-doubt-review', this)"
             onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openFeatureModal('ai-doubt-review',this);}"
             aria-label="AI Assisted Doubt Review — click for details">
          <div class="feat-chip-top">
            <div class="feat-icon clarity-ic">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="#60a5fa" stroke-width="1.4"/><path d="M10 7v.01M10 10v3" stroke="#60a5fa" stroke-width="1.4" stroke-linecap="round"/></svg>
            </div>
            <span class="feat-tag clarity-tag">Clarity</span>
          </div>
          <h4 class="feat-chip-name">AI Assisted Doubt Review</h4>
          <div class="feat-chip-footer">
            <button class="feat-vote-btn" onclick="event.stopPropagation(); castVote(this, 'ai-doubt-review')" aria-label="Vote for AI Assisted Doubt Review">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 1v10M1 6h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
              <span class="vote-label">Vote</span><span class="vote-count">0</span>
            </button>
          </div>
        </div>

      </div>
```

- [ ] **Step 2: Verify in browser**

All 8 chips render in a 3-column grid. Carousel arrows and dots are gone. Each chip shows icon, name, tag, and vote button. Clicking the vote button does not throw a JS error (castVote is called with `event.stopPropagation()`).

- [ ] **Step 3: Commit**

```bash
git add reanchor/index.html
git commit -m "feat: replace carousel with 8-chip grid — updated feature list"
```

---

## Task 7: Add FEATURE_DATA + modal JS

**Files:**
- Modify: `reanchor/index.html` — `<script>` block

- [ ] **Step 1: Add FEATURE_DATA constant**

Find the comment `// ── Feature voting ──` (around line 3364). Directly before it, add:

```javascript
    // ── Feature data (for detail modal) ──
    const FEATURE_DATA = {
      'ai-decision-coach': {
        title: 'AI Decision Coach',
        tagClass: 'clarity-tag',
        tagLabel: 'Clarity',
        iconClass: 'clarity-ic',
        icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2v4M10 14v4M2 10h4M14 10h4M4.343 4.343l2.828 2.828M12.829 12.829l2.828 2.828M15.657 4.343l-2.828 2.828M7.171 12.829l-2.828 2.828" stroke="#60a5fa" stroke-width="1.4" stroke-linecap="round"/></svg>`,
        desc: 'Stress-test your thinking before you commit. What are you assuming? What would have to be true for this to be the wrong call? Your personal coach for the moment before you decide.'
      },
      'pattern-insights': {
        title: 'Pattern Insights',
        tagClass: 'pattern-tag',
        tagLabel: 'Pattern',
        iconClass: 'pattern-ic',
        icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 15l4.5-5.5 4 3.5 4.5-6L18 10" stroke="#a78bfa" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        desc: 'Surface what your decision history actually reveals: recurring fears, timing patterns, what outcomes felt right in retrospect.'
      },
      'accountability': {
        title: 'Accountability Partners',
        tagClass: 'commit-tag',
        tagLabel: 'Commitment',
        iconClass: 'commit-ic',
        icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="8" cy="6" r="2.5" stroke="#34d399" stroke-width="1.4"/><path d="M3 17c0-2.761 2.239-5 5-5" stroke="#34d399" stroke-width="1.4" stroke-linecap="round"/><circle cx="15" cy="11" r="2" stroke="#34d399" stroke-width="1.4"/><path d="M12.5 17c0-1.933 1.119-3.5 2.5-3.5" stroke="#34d399" stroke-width="1.4" stroke-linecap="round"/></svg>`,
        desc: 'Invite one trusted person to follow your decisions. Read-only. No advice. Knowing someone knows changes everything.'
      },
      'values-axis': {
        title: 'Values Axis',
        tagClass: 'clarity-tag',
        tagLabel: 'Clarity',
        iconClass: 'clarity-ic',
        icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2v16M2 10h16" stroke="#60a5fa" stroke-width="1.4" stroke-linecap="round"/><circle cx="10" cy="10" r="2.5" stroke="#60a5fa" stroke-width="1.4"/></svg>`,
        desc: 'Define what matters most to you. See how each decision aligns with who you want to be — not just what you chose.'
      },
      'decision-forecast': {
        title: 'Decision Forecast',
        tagClass: 'pattern-tag',
        tagLabel: 'Pattern',
        iconClass: 'pattern-ic',
        icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 17c2-4 4-8 8-9" stroke="#a78bfa" stroke-width="1.4" stroke-linecap="round"/><circle cx="14" cy="6" r="2.5" stroke="#a78bfa" stroke-width="1.4" stroke-dasharray="2 1.5"/><path d="M11.5 8.5L17 4" stroke="#a78bfa" stroke-width="1.4" stroke-linecap="round"/></svg>`,
        desc: 'How will you feel about this in 3 months? Based on your history, ReAnchor gives you a probabilistic read. Not prophecy — perspective.'
      },
      'cloud-sync': {
        title: 'Cloud Sync',
        tagClass: 'sync-tag',
        tagLabel: 'Sync',
        iconClass: 'sync-ic',
        icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5.5 13.5A4 4 0 016 6h1a5 5 0 019.9 1H17a3 3 0 010 6H6" stroke="#22d3ee" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        desc: 'Access your decision journal from any device. Your entries stay private and encrypted — but now your history travels with you, and AI analysis can surface patterns across your full timeline.'
      },
      'habit-decisions': {
        title: 'Habit Decisions',
        tagClass: 'commit-tag',
        tagLabel: 'Commitment',
        iconClass: 'commit-ic',
        icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4a6 6 0 100 12A6 6 0 0010 4z" stroke="#34d399" stroke-width="1.4"/><path d="M10 7v3l2 2" stroke="#34d399" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        desc: 'Not every decision is a career pivot. ReAnchor helps you stay anchored to smaller daily commitments too — the habits, routines, and lifestyle choices that quietly define who you become.'
      },
      'ai-doubt-review': {
        title: 'AI Assisted Doubt Review',
        tagClass: 'clarity-tag',
        tagLabel: 'Clarity',
        iconClass: 'clarity-ic',
        icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="#60a5fa" stroke-width="1.4"/><path d="M10 7v.01M10 10v3" stroke="#60a5fa" stroke-width="1.4" stroke-linecap="round"/></svg>`,
        desc: 'When doubt arrives at 2am, you shouldn\'t face it alone. AI walks you through the Doubt Review questions, helps you separate real new information from noise, and tells you whether something actually changed.'
      }
    };
```

- [ ] **Step 2: Add modal open/close IIFE**

After the `FEATURE_DATA` constant (still before `// ── Feature voting ──`), add:

```javascript
    // ── Feature modal ──
    (function() {
      const overlay  = document.getElementById('feat-modal-overlay');
      const closeBtn = document.getElementById('feat-modal-close');
      if (!overlay || !closeBtn) return;
      let lastOpener = null;

      function renderModalVote(featureKey) {
        const btn = document.getElementById('feat-modal-vote-btn');
        if (!btn) return;
        const count = getCount(featureKey);
        if (voteStore[featureKey]) {
          btn.classList.add('voted');
          btn.disabled = true;
          btn.innerHTML = CHECK_SVG + '<span class="vote-label">Voted</span><span class="vote-count">' + count + '</span>';
        } else {
          btn.classList.remove('voted');
          btn.disabled = false;
          btn.innerHTML = PLUS_SVG + '<span class="vote-label">Vote</span><span class="vote-count">' + count + '</span>';
        }
      }

      window.openFeatureModal = function(featureKey, openerEl) {
        const data = FEATURE_DATA[featureKey];
        if (!data) return;
        lastOpener = openerEl || null;

        const iconEl = document.getElementById('feat-modal-icon');
        iconEl.className = 'feat-icon ' + data.iconClass;
        iconEl.innerHTML = data.icon;

        const tagEl = document.getElementById('feat-modal-tag');
        tagEl.className = 'feat-tag ' + data.tagClass;
        tagEl.textContent = data.tagLabel;

        document.getElementById('feat-modal-title').textContent = data.title;
        document.getElementById('feat-modal-desc').textContent  = data.desc;

        const voteBtn = document.getElementById('feat-modal-vote-btn');
        voteBtn.setAttribute('aria-label', 'Vote for ' + data.title);
        voteBtn.onclick = function(e) {
          e.stopPropagation();
          castVote(voteBtn, featureKey);
          renderModalVote(featureKey);
        };
        renderModalVote(featureKey);

        overlay.classList.add('open');
        closeBtn.focus();
      };

      function closeModal() {
        overlay.classList.remove('open');
        if (lastOpener) { lastOpener.focus(); lastOpener = null; }
      }

      closeBtn.addEventListener('click', closeModal);
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeModal();
      });
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
      });
    })();
```

**Note:** `renderModalVote` references `getCount`, `voteStore`, `CHECK_SVG`, `PLUS_SVG`, and `castVote` — all defined in the `// ── Feature voting ──` block below it. This IIFE runs at parse time but the functions are closures, so they will be available at call time. No ordering issue.

- [ ] **Step 3: Verify modal interactions**

Open in browser. Click any chip card. Confirm:
- Modal opens with correct title, description, tag colour, and icon
- X button closes modal and returns focus to the chip
- Clicking the backdrop closes the modal
- Pressing Escape closes the modal

- [ ] **Step 4: Commit**

```bash
git add reanchor/index.html
git commit -m "feat: add FEATURE_DATA and modal open/close with accessibility"
```

---

## Task 8: Update vote JS selectors for feat-chip

**Files:**
- Modify: `reanchor/index.html` — `<script>` block (~lines 3396–3407)

- [ ] **Step 1: Update renderVotedState**

Find:
```javascript
    function renderVotedState() {
      document.querySelectorAll('.feat-card').forEach(renderCard);
      updateTotalVotes();
    }
```

Replace with:
```javascript
    function renderVotedState() {
      document.querySelectorAll('.feat-chip').forEach(renderCard);
      updateTotalVotes();
    }
```

- [ ] **Step 2: Update castVote**

Find:
```javascript
      document.querySelectorAll(`.feat-card[data-feature="${feature}"]`).forEach(renderCard);
```

Replace with:
```javascript
      document.querySelectorAll(`.feat-chip[data-feature="${feature}"]`).forEach(renderCard);
```

- [ ] **Step 3: Verify voting end-to-end**

Open in browser. Open DevTools → Application → Local Storage. Clear the `reanchor_votes` key. Reload.

1. Click the Vote button on the AI Decision Coach chip (not the card itself). Confirm chip border turns green and button shows checkmark + "Voted".
2. Open the AI Decision Coach modal. Confirm the modal vote button also shows "Voted" (state already cast).
3. Open the Pattern Insights modal. Vote from within the modal. Close modal. Confirm the Pattern Insights chip in the grid now shows voted state.
4. Reload. Confirm both voted chips are still in voted state (localStorage persisted).

- [ ] **Step 4: Commit**

```bash
git add reanchor/index.html
git commit -m "fix: update vote JS selectors from feat-card to feat-chip"
```

---

## Task 9: Remove carousel JS IIFE

**Files:**
- Modify: `reanchor/index.html` — `<script>` block (~lines 3422–3560)

- [ ] **Step 1: Delete the carousel IIFE**

Find the comment `// ── Feature carousel (infinite loop) ──` (around line 3422).

Delete from that comment through the closing `})();` of the carousel IIFE. To find the end: search for the last `})();` that follows `prevBtn.addEventListener` / `nextBtn.addEventListener` — that is the carousel IIFE closing.

After deletion, search the JS for `carousel-outer` — should return zero results.

- [ ] **Step 2: Verify no JS errors**

Open in browser → DevTools → Console. Reload. No errors. Feature grid renders. Voting works. Modal opens/closes.

- [ ] **Step 3: Commit**

```bash
git add reanchor/index.html
git commit -m "chore: remove carousel JS IIFE — replaced by static grid"
```

---

## Task 10: Remove dead carousel + feat-card CSS

**Files:**
- Modify: `reanchor/index.html` — CSS `<style>` block

- [ ] **Step 1: Delete carousel and old feat-card CSS rules**

Delete the following rule blocks from the `<style>` block. Search for each selector to find it:

- `.carousel-outer { ... }` and `.carousel-outer.is-dragging { ... }`
- `.carousel-track { ... }` and `.carousel-track.no-transition { ... }`
- `.feat-card { ... }`, `.feat-card:hover { ... }`, `.feat-card.voted { ... }`
- `.feat-card-top { ... }`
- `.feat-body { ... }`
- `.feat-title { ... }`
- `.feat-desc { ... }`
- `.carousel-dots { ... }`, `.carousel-dot { ... }`, `.carousel-dot.active { ... }`, `.carousel-dot:focus-visible { ... }`
- `.carousel-arrow { ... }`, `.carousel-arrow:hover:not(:disabled) { ... }`, `.carousel-arrow:focus-visible { ... }`, `.carousel-arrow:disabled { ... }`
- `.carousel-controls-group { ... }`

- [ ] **Step 2: Update the reduced-motion media query**

Find (around line 1995):
```css
    @media (prefers-reduced-motion: reduce) {
      .carousel-track { transition: none !important; }
      .feat-card, .feat-vote-btn, .carousel-arrow { transition: none !important; }
    }
```

Replace with:
```css
    @media (prefers-reduced-motion: reduce) {
      .feat-chip, .feat-vote-btn { transition: none !important; }
    }
```

- [ ] **Step 3: Final full verification checklist**

Open in browser on desktop and resize to mobile (≤768px). Check each item:

- [ ] Headline: "Decision-making is a skill. We're building the gym." — unchanged
- [ ] Sub copy: raises stakes (career/relationships/life)
- [ ] Evolution strip: Today column is narrower (~40%), DecisionOS is wider (~60%)
- [ ] DecisionOS side: purple radial glow visible
- [ ] Arrow `→` appears centered on the divider between columns
- [ ] "DecisionOS" title is larger than "Today" title
- [ ] Italic purple tagline "Duolingo for your decisions" appears below DecisionOS title
- [ ] New ambitious bullet copy on DecisionOS side
- [ ] 8 chips in 3-column grid (no carousel, no arrows, no dots)
- [ ] Chips show: icon, name, tag, vote count
- [ ] No description text visible on chip (detail lives in modal)
- [ ] Clicking chip opens modal
- [ ] Modal shows: icon, tag, title, full description, vote button
- [ ] Voting from chip works — chip border turns green
- [ ] Voting from modal works — chip in grid updates
- [ ] Vote state persists on reload
- [ ] Escape closes modal
- [ ] Click-outside (overlay backdrop) closes modal
- [ ] X button closes modal, focus returns to opener chip
- [ ] Mobile: columns stack, arrow rotates 90°, grid collapses to 2 columns
- [ ] DevTools console: zero JS errors

- [ ] **Step 4: Commit**

```bash
git add reanchor/index.html
git commit -m "chore: remove dead carousel and feat-card CSS"
```
