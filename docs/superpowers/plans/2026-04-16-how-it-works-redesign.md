# HOW IT WORKS Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the HOW IT WORKS section in `reanchor/index.html` with a method-first headline, stat pills, and two expandable scenario cards (planned-ahead vs already-doubting), removing the old 3-step feature cards and doubt preview widget.

**Architecture:** All changes are confined to `reanchor/index.html`. CSS additions go in the `<style>` block. HTML changes replace the contents of `<section id="how">`. A small inline JS block handles the expand/collapse toggle. No new files, no libraries.

**Tech Stack:** Vanilla HTML/CSS/JS. Static site, no build step. Verify changes by opening the file in a browser.

---

## File Map

| File | Change |
|---|---|
| `reanchor/index.html` | Add CSS (~line 695), remove dead CSS (lines ~697–701, ~1545–1607, ~2151–2224), replace Section 5 HTML (lines ~2851–2919), add JS toggle handler (~line 3573) |

---

## Task 1: Add new CSS classes

**Files:**
- Modify: `reanchor/index.html` — insert after the closing brace of `.how-headline` (~line 695)

- [ ] **Step 1: Locate the insertion point**

Find this block in the `<style>` section (around line 686):

```css
    .how-headline {
      font-family: 'Fraunces', Georgia, serif;
      font-size: clamp(28px, 4vw, 44px);
      font-weight: 400;
      color: var(--text);
      text-align: center;
      margin-bottom: 72px;
      line-height: 1.18;
      letter-spacing: -0.4px;
    }
```

- [ ] **Step 2: Replace `.how-headline` with updated version + new classes**

Replace the entire `.how-headline` block with this (the headline itself gains `margin-bottom: 24px` to allow space for the body text below it; the old `72px` bottom margin is now carried by the stat pills):

```css
    .how-headline {
      font-family: 'Fraunces', Georgia, serif;
      font-size: clamp(28px, 4vw, 44px);
      font-weight: 400;
      color: var(--text);
      text-align: center;
      margin-bottom: 24px;
      line-height: 1.18;
      letter-spacing: -0.4px;
    }
    .how-method-body {
      font-size: 16px;
      color: var(--muted);
      max-width: 560px;
      margin: 0 auto 32px;
      line-height: 1.7;
      text-align: center;
    }
    .how-stat-pills {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
      margin-bottom: 72px;
    }
    .how-stat-pill {
      display: inline-flex;
      align-items: center;
      background: var(--accent-glow);
      border: 1px solid var(--accent-border);
      border-radius: 6px;
      padding: 5px 14px;
      font-size: 12px;
      font-weight: 600;
      color: var(--accent);
      letter-spacing: 0.5px;
    }
    .scenario-cards {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .scenario-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 28px 24px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .scenario-label {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--dim);
      margin: 0;
    }
    .scenario-hook {
      font-family: 'Fraunces', Georgia, serif;
      font-style: italic;
      font-size: 18px;
      color: var(--text);
      line-height: 1.35;
      margin: 0;
    }
    .scenario-desc {
      font-size: 15px;
      color: var(--muted);
      line-height: 1.6;
      margin: 0;
    }
    .scenario-toggle {
      align-self: flex-start;
      background: none;
      border: none;
      padding: 0;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      color: var(--accent);
      cursor: pointer;
      margin-top: 4px;
    }
    .scenario-toggle:hover { opacity: 0.8; }
    .scenario-steps {
      display: none;
      flex-direction: column;
      gap: 0;
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid var(--border);
    }
    .scenario-steps--open { display: flex; }
    @media (max-width: 768px) {
      .scenario-cards { grid-template-columns: 1fr; }
    }
```

- [ ] **Step 3: Verify no syntax errors**

Open `reanchor/index.html` in a browser. The page should still load without visual breakage. The HOW IT WORKS section still shows the old content at this point — that's fine.

---

## Task 2: Remove dead CSS — `.steps` container

**Files:**
- Modify: `reanchor/index.html` — remove lines ~697–701

The `.steps` container class is defined in CSS but never used in any HTML. The individual `.step`, `.step-number`, `.step-content`, `.step-title`, `.step-desc`, `.step-accent` classes will be reused by the new expanded steps, so keep those. Only remove the unused `.steps` container.

- [ ] **Step 1: Find and remove `.steps` container CSS**

Find this exact block (around line 697):

```css
    .steps {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
```

Delete it entirely.

- [ ] **Step 2: Verify**

Save the file. Reload in browser. No visual change expected — `.steps` was unused.

---

## Task 3: Remove dead CSS — `.feature-cards` and `.feature-card` blocks

**Files:**
- Modify: `reanchor/index.html` — remove feature-card styles from ~line 1545 and clean up a media query at ~line 1603

- [ ] **Step 1: Remove the main feature-card CSS block**

Find and delete this entire block (around lines 1545–1601):

```css
    /* ─────────────────────────────────────
       FEATURE CARDS (How it works)
    ───────────────────────────────────── */
    .feature-cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-top: 56px;
    }
    .feature-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 24px 20px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      transition: border-color 0.2s;
    }
    .feature-card:hover {
      border-color: var(--accent-border);
      background: var(--surface-2);
      box-shadow: 0 4px 24px rgba(52, 211, 153, 0.06);
    }
    .feature-icon {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background: var(--accent-glow);
      border: 1px solid var(--accent-border);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .feature-step-num {
      font-family: 'Fraunces', Georgia, serif;
      font-size: 11px;
      font-weight: 600;
      color: var(--dim);
      letter-spacing: 1px;
    }
    .feature-title {
      font-size: 17px;
      font-weight: 600;
      color: var(--text);
      line-height: 1.3;
    }
    .feature-desc {
      font-size: 15px;
      color: var(--muted);
      line-height: 1.7;
      flex: 1;
    }
    .feature-accent {
      font-family: 'Fraunces', Georgia, serif;
      font-style: italic;
      color: var(--accent);
    }
```

- [ ] **Step 2: Remove the `.feature-cards` responsive override from the media query**

Find this media query (around line 1602). It contains four rules — remove only the `.feature-cards` line, leaving the others intact:

Before:
```css
    @media (max-width: 640px) {
      .feature-cards { grid-template-columns: 1fr; }
      .phones-wrap { flex-direction: column; align-items: center; gap: 48px; }
      .phone-col { width: 100%; }
      .iphone { width: 200px; height: 408px; }
    }
```

After:
```css
    @media (max-width: 640px) {
      .phones-wrap { flex-direction: column; align-items: center; gap: 48px; }
      .phone-col { width: 100%; }
      .iphone { width: 200px; height: 408px; }
    }
```

- [ ] **Step 3: Verify**

Save and reload in browser. No visual change expected — these classes were only used in Section 5 HTML which still has the old markup at this point.

---

## Task 4: Remove dead CSS — `.doubt-preview` block

**Files:**
- Modify: `reanchor/index.html` — remove doubt-preview styles ~lines 2151–2224

- [ ] **Step 1: Remove the main doubt-preview comment + CSS block**

Find and delete from the comment header through the closing brace of `.doubt-preview-footer strong` (around lines 2151–2220):

```css
    /* ─────────────────────────────────────
       DOUBT REVIEW PREVIEW (below How It Works)
    ───────────────────────────────────── */
    .doubt-preview { ... }
    .doubt-preview-bar { ... }
    .doubt-preview-inner { ... }
    .doubt-preview-meta { ... }
    .doubt-preview-label { ... }
    .doubt-preview-progress { ... }
    .doubt-preview-q { ... }
    .doubt-preview-opts { ... }
    .doubt-preview-opt { ... }
    .doubt-preview-opt.dp-highlight { ... }
    .doubt-preview-footer { ... }
    .doubt-preview-footer strong { color: var(--muted); font-weight: 500; }
```

Delete the entire block from the `/* ─── DOUBT REVIEW PREVIEW` comment down through `.doubt-preview-footer strong { ... }`.

- [ ] **Step 2: Remove the doubt-preview responsive media query**

Immediately after the block above, find and delete this self-contained media query (around lines 2221–2224):

```css
    @media (max-width: 640px) {
      .doubt-preview-inner { padding: 20px; }
      .doubt-preview-meta { flex-direction: column; align-items: flex-start; gap: 4px; }
    }
```

- [ ] **Step 3: Verify**

Save and reload. No visual change expected yet.

---

## Task 5: Replace Section 5 HTML

**Files:**
- Modify: `reanchor/index.html` — replace `<section id="how">` contents (lines ~2851–2919)

- [ ] **Step 1: Locate the section**

Find the opening tag (around line 2851):
```html
  <section id="how" aria-label="How it works">
```
and the closing tag a few lines after line 2919:
```html
  </section>
```
(It ends just before `<!-- SECTION 5.5: WHY DIFFERENT -->`)

- [ ] **Step 2: Replace the entire section with new markup**

Replace everything from `<section id="how"` through its closing `</section>` with:

```html
  <!-- ═══════════════════════════════════
       SECTION 5: HOW IT WORKS
  ═══════════════════════════════════ -->
  <section id="how" aria-label="How it works">
    <div class="container">
      <p class="how-label reveal">How it works</p>
      <h2 class="how-headline reveal reveal-delay-1">
        A protocol for doubt. Not a chatbot.
      </h2>
      <p class="how-method-body reveal reveal-delay-2">Most tools hand you an AI and hope it says the right thing. ReAnchor runs on a structured decision protocol — the same evidence-informed questions, every time, regardless of your mood or your story. You get a repeatable process, not a response.</p>
      <div class="how-stat-pills reveal reveal-delay-3" aria-label="Key facts about ReAnchor">
        <span class="how-stat-pill">7 structured questions</span>
        <span class="how-stat-pill">2 proven paths</span>
        <span class="how-stat-pill">0 AI guesswork</span>
      </div>

      <div class="scenario-cards">

        <div class="scenario-card reveal">
          <p class="scenario-label">If you planned ahead</p>
          <p class="scenario-hook">Anchor it now. Return when doubt hits.</p>
          <p class="scenario-desc">Record your decision at the moment of clarity. When doubt arrives weeks later, your past self is already waiting with the answer.</p>
          <button class="scenario-toggle" aria-expanded="false" aria-controls="steps-planned">Show steps ↓</button>
          <div class="scenario-steps" id="steps-planned" aria-hidden="true">
            <div class="step">
              <div class="step-number">01</div>
              <div class="step-content">
                <p class="step-title">Anchor the decision</p>
                <p class="step-desc">Write what you decided, why you decided it, how you felt, and what you feared. Not a journal — <span class="step-accent">a record</span> you can return to.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">02</div>
              <div class="step-content">
                <p class="step-title">Return when doubt arrives</p>
                <p class="step-desc">At 2am, after a hard week, when someone asks "are you sure?" — open it. Find <span class="step-accent">who you were</span> when you made the call, and why.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">03</div>
              <div class="step-content">
                <p class="step-title">Do the Doubt Review</p>
                <p class="step-desc">7 structured questions. 10 minutes. Separate <span class="step-accent">new facts</span> from old fears. Hold the line — or flag that something real shifted.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="scenario-card reveal reveal-delay-1">
          <p class="scenario-label">If you're already doubting</p>
          <p class="scenario-hook">Come in mid-doubt. We'll anchor it with you.</p>
          <p class="scenario-desc">Made a decision you never logged? Start here. We'll reconstruct your reasoning, capture what changed, and help you resolve the doubt in the same session.</p>
          <button class="scenario-toggle" aria-expanded="false" aria-controls="steps-retro">Show steps ↓</button>
          <div class="scenario-steps" id="steps-retro" aria-hidden="true">
            <div class="step">
              <div class="step-number">01</div>
              <div class="step-content">
                <p class="step-title">Reconstruct your reasoning</p>
                <p class="step-desc">Walk through what you decided, when, and why — even if it's a rough memory. <span class="step-accent">Approximate is enough.</span></p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">02</div>
              <div class="step-content">
                <p class="step-title">Name what's changed</p>
                <p class="step-desc">Is it a feeling, or did something real shift? The protocol separates <span class="step-accent">the two.</span></p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">03</div>
              <div class="step-content">
                <p class="step-title">Re-anchor or change course</p>
                <p class="step-desc">Recommit with clear eyes — or capture a <span class="step-accent">new direction</span> in the same session. Either way, you leave with an anchor.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
```

- [ ] **Step 3: Verify in browser**

Open `reanchor/index.html` in a browser. Check:
- The HOW IT WORKS section shows the new headline "A protocol for doubt. Not a chatbot."
- Three green stat pills appear below the body text
- Two scenario cards appear side by side (desktop) or stacked (mobile ≤768px)
- Each card shows label, hook, description, and a "Show steps ↓" button
- Clicking the button does nothing yet (JS not added) — that's expected
- No old `.feature-card` content visible
- No doubt preview widget visible

---

## Task 6: Add JS expand/collapse toggle

**Files:**
- Modify: `reanchor/index.html` — insert after the FAQ accordion block (~line 3573)

- [ ] **Step 1: Find the insertion point**

Locate the end of the FAQ accordion handler (around line 3573):

```js
    // ── FAQ accordion ──
    document.querySelectorAll('.faq-item').forEach(item => {
      ...
    });
```

- [ ] **Step 2: Insert the scenario toggle handler immediately after**

Add this block right after the closing `});` of the FAQ handler:

```js
    // ── Scenario steps expand/collapse ──
    document.querySelectorAll('.scenario-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const steps = document.getElementById(btn.getAttribute('aria-controls'));
        const open = steps.classList.toggle('scenario-steps--open');
        btn.textContent = open ? 'Hide steps ↑' : 'Show steps ↓';
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        steps.setAttribute('aria-hidden', open ? 'false' : 'true');
      });
    });
```

- [ ] **Step 3: Verify in browser**

Open `reanchor/index.html` in a browser. Check:
- Clicking "Show steps ↓" on either card reveals the three steps inline
- Button text changes to "Hide steps ↑"
- Clicking again collapses the steps and restores "Show steps ↓"
- Both cards are independent — opening one does not affect the other
- Steps expand/collapse works on mobile (≤768px stacked layout)

---

## Task 7: Commit

- [ ] **Step 1: Stage and commit**

```bash
git add reanchor/index.html
git commit -m "feat: redesign How It Works section with method block and two scenario cards

- Replace 'Three steps. One anchor.' with methodology-first headline
- Add body copy and three stat pills (7 questions, 2 paths, 0 AI)
- Replace single 3-step feature cards with two expandable scenario cards
  (planned-ahead flow and retro/already-doubting flow)
- Remove doubt preview widget
- Remove dead .feature-card, .doubt-preview, .steps CSS"
```

- [ ] **Step 2: Confirm**

Run `git log --oneline -3` and verify the commit appears at the top.
