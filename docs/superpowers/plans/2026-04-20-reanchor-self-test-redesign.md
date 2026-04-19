# ReAnchor Self-Test Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `reanchor/self-test.html` with 16 single-question screens (vertical Likert, auto-advance), a shareable identity-card result page (The Freezer / Loop Thinker / The Maximizer / The Avoider), Web Share API integration, and a Friend View for shared `?r=` links.

**Architecture:** All logic lives in a single self-contained `reanchor/self-test.html` (no bundler, no build step). The page has four view states: `friend` (when `?r=` param present), `intro`, `question` (Q1–Q16), and `results`. State is module-scoped JS variables. Supabase is used for `quiz_results` analytics only.

**Tech Stack:** Vanilla JS (ES2020), CSS custom properties, Supabase JS CDN, Web Share API, Clipboard API.

---

## File Structure

Single file: `reanchor/self-test.html`

Sections:
- `<style>` — all CSS
- `<body>` — nav, progress bar, step container (intro / friend-view / 16 question steps / results), footer
- `<script>` — data constants, scoring, navigation, rendering, Supabase calls

---

## Task 1: Identity data structures + scoring pipeline

**Files:** Modify `reanchor/self-test.html` — `<script>` DATA block

- [ ] **Step 1.1: Add identity constants after `LIKERT_LABELS`**

In `reanchor/self-test.html`, after `const LIKERT_LABELS = [...]`, insert:

```javascript
const ALL_QUESTIONS = [
  ...QUESTIONS[1], ...QUESTIONS[2], ...QUESTIONS[3], ...QUESTIONS[4],
];

const IDENTITIES = {
  1: {
    name: 'The Freezer', emoji: '🧊', slug: 'freezer',
    dignityLine: "You don't move easily — because once you do, it feels irreversible.",
    punchline: "I don't avoid decisions. I avoid not being able to undo them.",
    intensity: {
      low: 'slightly frozen at the starting line',
      mid: 'often frozen at the starting line',
      high: 'frozen at the starting line',
    },
    youLikely: [
      'delay even obvious choices, hoping something settles it for you',
      'rehearse the moment of commitment in your head, over and over',
      "feel exhausted by decisions you haven't even made yet",
    ],
    closingHit: "At this point, waiting isn't protecting you. It's compressing your options until one picks you.",
    tagPrompt: 'Tag the friend who\'s still "thinking about it" 3 months later.',
    friendPhrase: 'they freeze on decisions',
    accentVar: '--blue',
  },
  2: {
    name: 'Loop Thinker', emoji: '🌀', slug: 'loop-thinker',
    dignityLine: "You think this much because getting it wrong feels expensive.",
    punchline: "I don't struggle to decide. I struggle to stop thinking.",
    intensity: {
      low: 'slightly stuck in your head',
      mid: 'often stuck in your head',
      high: 'trapped in your head',
    },
    youLikely: [
      'replay the same decision for days (or weeks)',
      'keep looking for a version of the answer that feels complete',
      'delay action even when you already know what to do',
    ],
    closingHit: "Thinking isn't bringing you closer. It's keeping you where you are.",
    tagPrompt: 'Tag the one who overthinks everything… then rethinks it again.',
    friendPhrase: 'they overthink',
    accentVar: '--danger',
  },
  3: {
    name: 'The Maximizer', emoji: '🎯', slug: 'maximizer',
    dignityLine: "You don't settle easily — because you've seen what happens when people do.",
    punchline: "I'm not picky. I just can't unsee the better option.",
    intensity: {
      low: 'slightly chasing better',
      mid: 'often chasing better',
      high: 'always chasing better',
    },
    youLikely: [
      'open another tab, another option, another comparison — "just to check"',
      'feel a flash of doubt the moment after you commit',
      "compare your choice to the path you didn't take, long after it's too late",
    ],
    closingHit: "At this point, the search replaced the thing you were searching for.",
    tagPrompt: 'Tag the friend who takes 10 minutes to order… then regrets it.',
    friendPhrase: 'they chase "better"',
    accentVar: '--amber',
  },
  4: {
    name: 'The Avoider', emoji: '🌫️', slug: 'avoider',
    dignityLine: "You hesitate — because your choices don't just affect you.",
    punchline: "I don't avoid decisions. I avoid the impact they have on others.",
    intensity: {
      low: 'slightly hoping it decides itself',
      mid: 'often hoping it decides itself',
      high: 'always hoping it decides itself',
    },
    youLikely: [
      'ask 3 people their opinion before you let yourself have one',
      'let timelines expire so the decision gets made for you',
      "pick the safest option, even when you know it's not what you want",
    ],
    closingHit: "At this point, waiting for consensus isn't kindness. It's how you disappear from your own life.",
    tagPrompt: 'Tag the friend who always says "you choose"… and means it.',
    friendPhrase: 'they avoid deciding',
    accentVar: '--purple',
  },
};

const SECONDARY_PHRASES = {
  1: 'and you often freeze before moving',
  2: "and you can't stop replaying decisions",
  3: 'and you keep chasing better options',
  4: 'and you often wait for someone else to decide',
};

const PERCENTILE_TABLE = {
  4: 5, 5: 15, 6: 28, 7: 42, 8: 55, 9: 62,
  10: 68, 11: 75, 12: 82, 13: 87, 14: 91,
  15: 94, 16: 96, 17: 98, 18: 99, 19: 99.5, 20: 99.8,
};

// Representative percentiles per intensity bucket (exact score unknown in friend view)
const INTENSITY_PERCENTILES = { low: 42, mid: 82, high: 97 };
```

- [ ] **Step 1.2: Replace STATE block and add `computeResult()`**

Replace the existing STATE block:
```javascript
let currentStep = 0;
let answers = {};
```

With:
```javascript
let currentView = 'intro'; // 'friend' | 'intro' | 'question' | 'results'
let currentQ = 0;
let answers = new Array(17).fill(null); // answers[1..16]
let advanceTimer = null;
let lastResult = null;
let emailSubmitted = false;
```

Then add `computeResult()` immediately after the STATE block:

```javascript
function computeResult() {
  const dimScores = [0, 0, 0, 0];
  for (let n = 1; n <= 16; n++) {
    dimScores[Math.floor((n - 1) / 4)] += answers[n] || 0;
  }

  let topIdx = 0;
  for (let i = 1; i < 4; i++) {
    if (dimScores[i] > dimScores[topIdx]) topIdx = i;
  }

  let secondIdx = topIdx === 0 ? 1 : 0;
  for (let i = 0; i < 4; i++) {
    if (i !== topIdx && dimScores[i] > dimScores[secondIdx]) secondIdx = i;
  }

  const topScore = dimScores[topIdx];
  const secondScore = dimScores[secondIdx];
  const showSecondary = (topScore - secondScore) <= 10;
  const identity = IDENTITIES[topIdx + 1];
  const intensity = topScore <= 9 ? 'low' : topScore <= 14 ? 'mid' : 'high';
  const percentile = PERCENTILE_TABLE[topScore];
  const shareSlug = `${identity.slug}-${intensity}`;
  const total = dimScores.reduce((a, b) => a + b, 0);

  return {
    dimScores, total, topIdx, secondIdx, showSecondary,
    identity, intensity, percentile, shareSlug,
    secondaryPhrase: showSecondary ? SECONDARY_PHRASES[secondIdx + 1] : null,
  };
}
```

- [ ] **Step 1.3: Verify scoring in browser console**

Open `reanchor/self-test.html`. In DevTools console:

```javascript
// All high — dim 1 wins on tie-break (lowest index)
answers = new Array(17).fill(null);
for (let n = 1; n <= 16; n++) answers[n] = 5;
let r = computeResult();
console.assert(r.identity.name === 'The Freezer', 'tie → dim 1');
console.assert(r.intensity === 'high', 'intensity high');
console.assert(r.percentile === 99.8, 'percentile 99.8');
console.assert(r.dimScores.join(',') === '20,20,20,20', 'all 20');

// Loop Thinker dominant, no secondary
answers = new Array(17).fill(null);
for (let n = 1; n <= 4; n++) answers[n] = 1;   // dim1: 4
for (let n = 5; n <= 8; n++) answers[n] = 5;   // dim2: 20
for (let n = 9; n <= 16; n++) answers[n] = 1;  // dim3,4: 4
let r2 = computeResult();
console.assert(r2.identity.name === 'Loop Thinker', 'loop thinker');
console.assert(r2.shareSlug === 'loop-thinker-high', 'slug correct');
console.assert(r2.showSecondary === false, 'no secondary (20-4=16>10)');

// Secondary identity rule — scores within 10
answers = new Array(17).fill(null);
for (let n = 1; n <= 4; n++) answers[n] = 4;   // dim1: 16
for (let n = 5; n <= 8; n++) answers[n] = 3;   // dim2: 12 (16-12=4 ≤ 10)
for (let n = 9; n <= 16; n++) answers[n] = 1;
let r3 = computeResult();
console.assert(r3.showSecondary === true, 'secondary shown');
console.assert(r3.secondaryPhrase === "and you can't stop replaying decisions", 'phrase correct');
```

Expected: all assertions pass silently.

- [ ] **Step 1.4: Commit**

```bash
git add reanchor/self-test.html
git commit -m "feat: add identity data structures and computeResult() scoring pipeline"
```

---

## Task 2: CSS — vertical Likert, identity card, share block, result sections

**Files:** Modify `reanchor/self-test.html` — `<style>` block

- [ ] **Step 2.1: Add vertical Likert CSS**

After the `/* Scale legend */` CSS block, add:

```css
/* ── Vertical Likert ── */
.v-likert {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 32px;
}
.v-likert-row {
  display: flex;
  align-items: center;
  gap: 14px;
  height: 52px;
  padding: 0 18px;
  border-radius: 12px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  transition: background 0.15s, border-color 0.15s, transform 0.1s;
}
@media (hover: hover) {
  .v-likert-row:hover {
    background: rgba(52,211,153,0.06);
    border-color: var(--accent-border);
  }
}
.v-likert-row.selected {
  background: var(--accent-glow);
  border-color: var(--accent);
}
.v-likert-row.selecting { transform: scale(0.97); }
.v-likert-num {
  font-family: 'Fraunces', Georgia, serif;
  font-size: 16px;
  font-weight: 700;
  color: var(--dim);
  width: 20px;
  flex-shrink: 0;
}
.v-likert-row.selected .v-likert-num { color: var(--accent); }
.v-likert-lbl {
  font-size: 15px;
  font-weight: 500;
  color: var(--muted);
}
.v-likert-row.selected .v-likert-lbl { color: var(--text); }

/* ── Single-question screen ── */
.q-screen {
  max-width: 560px;
  margin: 0 auto;
}
.q-text {
  font-family: 'Fraunces', Georgia, serif;
  font-size: clamp(22px, 4.5vw, 30px);
  font-weight: 400;
  color: var(--text);
  line-height: 1.4;
  text-align: center;
}
.btn-back-q {
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--muted);
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  padding: 9px 16px;
  cursor: pointer;
  margin-top: 32px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: border-color 0.15s, color 0.15s;
}
.btn-back-q:hover { border-color: var(--muted); color: var(--text); }
```

- [ ] **Step 2.2: Add identity card + share block CSS**

After the question-screen CSS, add:

```css
/* ── Identity Card ── */
.identity-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 36px 28px 28px;
  text-align: center;
  position: relative;
  overflow: hidden;
  margin-bottom: 24px;
}
.identity-card::before {
  content: '';
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: 200px;
  background: radial-gradient(ellipse at center top, rgba(52,211,153,0.09) 0%, transparent 70%);
  pointer-events: none;
  transition: background 0.3s;
}
.identity-card[data-identity="freezer"]::before {
  background: radial-gradient(ellipse at center top, rgba(96,165,250,0.09) 0%, transparent 70%);
}
.identity-card[data-identity="loop-thinker"]::before {
  background: radial-gradient(ellipse at center top, rgba(251,113,133,0.09) 0%, transparent 70%);
}
.identity-card[data-identity="maximizer"]::before {
  background: radial-gradient(ellipse at center top, rgba(251,191,36,0.09) 0%, transparent 70%);
}
.identity-card[data-identity="avoider"]::before {
  background: radial-gradient(ellipse at center top, rgba(167,139,250,0.09) 0%, transparent 70%);
}
.identity-emoji {
  font-size: 24px;
  margin-bottom: 10px;
  display: block;
  line-height: 1;
}
.identity-name {
  font-family: 'Fraunces', Georgia, serif;
  font-size: clamp(36px, 8vw, 56px);
  font-weight: 400;
  color: var(--text);
  line-height: 1.1;
  letter-spacing: -1px;
  margin-bottom: 8px;
}
.identity-secondary {
  font-size: 13px;
  font-weight: 400;
  color: var(--muted);
  font-style: italic;
  margin-bottom: 16px;
}
.identity-divider {
  width: 40px;
  height: 2px;
  background: var(--accent);
  border-radius: 2px;
  margin: 0 auto 16px;
}
.identity-punchline {
  font-family: 'Fraunces', Georgia, serif;
  font-size: clamp(18px, 4.2vw, 24px);
  font-weight: 400;
  font-style: italic;
  color: var(--accent-text);
  line-height: 1.4;
  margin-bottom: 16px;
}
.identity-intensity {
  font-size: clamp(14px, 3vw, 18px);
  color: var(--muted);
  margin-bottom: 6px;
}
.identity-percentile {
  font-size: 13px;
  color: var(--dim);
  margin-bottom: 20px;
}
.identity-branding {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--dim);
}

/* ── Share Block ── */
.share-block { margin-bottom: 40px; }
.share-tag-prompt {
  font-family: 'Fraunces', Georgia, serif;
  font-size: 15px;
  font-style: italic;
  color: var(--muted);
  text-align: center;
  margin-bottom: 16px;
  line-height: 1.5;
}
.btn-share-primary {
  width: 100%;
  max-width: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--accent);
  color: #09090b;
  border: none;
  border-radius: 12px;
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  font-weight: 600;
  padding: 14px 20px;
  cursor: pointer;
  margin: 0 auto 12px;
  transition: opacity 0.15s;
}
.btn-share-primary:hover { opacity: 0.88; }
.btn-copy-link {
  display: block;
  text-align: center;
  font-size: 13px;
  color: var(--dim);
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
  background: none;
  border: none;
  font-family: 'DM Sans', sans-serif;
  transition: color 0.15s;
  margin: 0 auto;
}
.btn-copy-link:hover { color: var(--muted); }
.share-toast {
  font-size: 12px;
  color: var(--accent);
  text-align: center;
  margin-top: 8px;
  min-height: 18px;
}

/* ── Result body sections ── */
.result-dignity-line {
  font-family: 'Fraunces', Georgia, serif;
  font-size: clamp(16px, 2.5vw, 20px);
  font-style: italic;
  color: var(--muted);
  text-align: center;
  margin-bottom: 32px;
  line-height: 1.55;
}
.result-you-likely { margin-bottom: 40px; }
.result-you-likely-title {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--dim);
  margin-bottom: 14px;
}
.result-you-likely ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.result-you-likely li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 15px;
  color: var(--muted);
  line-height: 1.6;
}
.result-you-likely li::before {
  content: '▸';
  color: var(--accent);
  font-size: 12px;
  margin-top: 4px;
  flex-shrink: 0;
}
.result-closing-hit {
  font-family: 'Fraunces', Georgia, serif;
  font-size: clamp(18px, 3vw, 22px);
  font-style: italic;
  color: var(--accent-text);
  text-align: center;
  line-height: 1.5;
  margin-bottom: 48px;
  padding: 24px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

/* ── Dominant bar highlight ── */
.dim-row.dominant .dim-row-name { font-weight: 600; }
.dim-row.dominant .dim-row-score { color: var(--text); }
.dim-dominant-marker {
  font-size: 11px;
  color: var(--accent);
  margin-left: 4px;
}
```

- [ ] **Step 2.3: Commit**

```bash
git add reanchor/self-test.html
git commit -m "feat: add CSS for vertical Likert, identity card, share block, and result sections"
```

---

## Task 3: HTML — replace old quiz steps with new structure

**Files:** Modify `reanchor/self-test.html` — `<body>` step container

- [ ] **Step 3.1: Remove class `active` from step-0 in static HTML**

Find:
```html
<div class="step active" id="step-0"
```
Change to:
```html
<div class="step" id="step-0"
```

`initPage()` (added in Task 4) will add `active` at runtime.

- [ ] **Step 3.2: Add Friend View before step-0**

Directly before the `<!-- STEP 0: INTRO -->` comment, insert:

```html
<!-- ═══════════════════════════════
     FRIEND VIEW
═══════════════════════════════ -->
<div class="step" id="step-friend" role="region" aria-label="Your friend's result">
  <div style="text-align:center; max-width:440px; margin:0 auto; padding-top:16px;">
    <p class="identity-emoji" id="friend-emoji" style="font-size:32px; margin-bottom:16px;"></p>
    <p style="font-size:11px; font-weight:600; letter-spacing:3px; text-transform:uppercase; color:var(--dim); margin-bottom:12px;">Your friend is a</p>
    <h2 class="identity-name" id="friend-identity-name" style="margin-bottom:20px;"></h2>
    <div class="identity-divider" style="margin-bottom:20px;"></div>
    <p class="identity-punchline" id="friend-punchline" style="margin-bottom:20px;"></p>
    <div class="identity-divider" style="margin-bottom:20px;"></div>
    <p style="font-size:14px; color:var(--dim); margin-bottom:40px;" id="friend-percentile-line"></p>
    <button class="btn-next" id="btn-friend-take-test" style="width:100%; max-width:360px;">
      Take your own test →
    </button>
    <p style="margin-top:16px;">
      <button id="btn-browse-dims" style="font-size:13px; color:var(--dim); text-decoration:underline; text-underline-offset:3px; cursor:pointer; background:none; border:none; font-family:inherit;">
        or browse decision anxiety types
      </button>
    </p>
    <p class="identity-branding" style="margin-top:48px;">━&nbsp; reanchor &nbsp;━</p>
  </div>
</div>
```

- [ ] **Step 3.3: Replace steps 1–4 with question container**

Find the block starting with:
```html
<!-- ═══════════════════════════════
     STEP 1: ANALYSIS PARALYSIS
```
through the closing `</div>` of step-4 (the line before `<!-- STEP 5: RESULTS -->`). Replace the entire block (all four steps) with:

```html
<!-- Question steps — rendered by buildQuestions() -->
<div id="question-steps-container"></div>
```

- [ ] **Step 3.4: Replace step-5 results with new results structure**

Find `<!-- STEP 5: RESULTS -->` through its closing `</div>`. Replace the entire results step with:

```html
<!-- ═══════════════════════════════
     RESULTS VIEW
═══════════════════════════════ -->
<div class="step" id="step-results" role="region" aria-label="Your results">

  <!-- 1. Identity Card -->
  <div class="identity-card" id="identity-card">
    <span class="identity-emoji" id="result-emoji" aria-hidden="true"></span>
    <h2 class="identity-name" id="result-identity-name"></h2>
    <p class="identity-secondary" id="result-secondary-phrase"></p>
    <div class="identity-divider"></div>
    <p class="identity-punchline" id="result-punchline"></p>
    <div class="identity-divider"></div>
    <p class="identity-intensity" id="result-intensity-phrase"></p>
    <p class="identity-percentile" id="result-percentile"></p>
    <p class="identity-branding">━&nbsp; reanchor test &nbsp;━</p>
  </div>

  <!-- 2. Share block -->
  <div class="share-block">
    <p class="share-tag-prompt" id="result-tag-prompt"></p>
    <button class="btn-share-primary" id="btn-share-primary">Share your result →</button>
    <button class="btn-copy-link" id="btn-copy-link">or copy the link</button>
    <p class="share-toast" id="share-toast" aria-live="polite"></p>
  </div>

  <!-- 3. Dignity line -->
  <p class="result-dignity-line" id="result-dignity-line"></p>

  <!-- 4. You likely -->
  <div class="result-you-likely">
    <p class="result-you-likely-title">You likely:</p>
    <ul id="result-you-likely-list"></ul>
  </div>

  <!-- 5. Closing hit -->
  <p class="result-closing-hit" id="result-closing-hit"></p>

  <!-- 6. Dimension breakdown -->
  <div class="dimensions-section">
    <p class="dimensions-title">Breakdown by dimension</p>
    <div id="breakdown-rows"></div>
  </div>

  <!-- 7. Email CTA -->
  <div class="results-cta">
    <p class="results-cta-eyebrow">Want to go deeper?</p>
    <h3 class="results-cta-headline">Want the full map of your decision anxiety?</h3>
    <p class="results-cta-sub">
      We'll send a personalized breakdown for your highest dimension, with what it means and where to start. You'll also be first in line when ReAnchor launches.
    </p>
    <div id="cta-form-wrap">
      <form class="waitlist-form-inline" id="cta-form" novalidate>
        <label for="cta-email" class="sr-only">Email address</label>
        <input type="email" id="cta-email" name="email" class="waitlist-input-inline"
               placeholder="your@email.com" autocomplete="email" required />
        <button type="submit" class="waitlist-btn-inline" id="cta-submit">Send my analysis →</button>
      </form>
      <p class="cta-secondary-wrap">
        <a class="cta-secondary-link" id="cta-waitlist-link" role="button" tabindex="0">
          or just join the waitlist
        </a>
      </p>
      <p class="cta-error" id="cta-error" role="alert" aria-live="assertive">Something went wrong — try again.</p>
    </div>
    <div class="inline-success" id="cta-success-analysis" role="status" aria-live="polite">
      <div class="inline-success-icon">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M3.5 9l3.5 3.5 7-7" stroke="#34d399" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <p class="inline-success-text">Your analysis is on its way.</p>
      <p class="inline-success-sub">Check your inbox — we'll also let you know when ReAnchor launches.</p>
    </div>
    <div class="inline-success" id="cta-success-waitlist" role="status" aria-live="polite">
      <div class="inline-success-icon">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M3.5 9l3.5 3.5 7-7" stroke="#34d399" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <p class="inline-success-text">You're on the list.</p>
      <p class="inline-success-sub">We'll reach out when ReAnchor launches.</p>
    </div>
  </div>

  <!-- 8. Retake -->
  <p class="retake-link">
    <a id="retake-btn" role="button" tabindex="0">Retake the test</a>
  </p>

</div>
```

- [ ] **Step 3.5: Commit**

```bash
git add reanchor/self-test.html
git commit -m "feat: replace old quiz steps with 16-question container and new results/friend view HTML"
```

---

## Task 4: JS — navigation, question rendering, init

**Files:** Modify `reanchor/self-test.html` — `<script>` block, replacing INIT and NAVIGATION sections

- [ ] **Step 4.1: Replace `buildQuestions()` with 16-step version**

Replace the existing `buildQuestions()` function:

```javascript
function buildQuestions() {
  const container = document.getElementById('question-steps-container');
  let html = '';
  ALL_QUESTIONS.forEach((qText, i) => {
    const n = i + 1;
    html += `
      <div class="step" id="step-q${n}" role="region" aria-label="Question ${n} of 16">
        <div class="q-screen">
          <p class="q-text">${qText}</p>
          <div class="v-likert" role="radiogroup" aria-label="${qText}" id="likert-q${n}">
            ${['Never','Rarely','Sometimes','Often','Always'].map((lbl, vi) => `
              <div class="v-likert-row" data-q="${n}" data-v="${vi+1}"
                   role="radio" aria-checked="false" tabindex="${vi === 0 ? 0 : -1}">
                <span class="v-likert-num">${vi+1}</span>
                <span class="v-likert-lbl">${lbl}</span>
              </div>
            `).join('')}
          </div>
          <button class="btn-back-q" data-back-q="${n}">← Back</button>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;

  container.querySelectorAll('.v-likert-row').forEach(row => {
    row.addEventListener('click', () => handleLikertClick(row));
    row.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleLikertClick(row); }
    });
  });

  container.querySelectorAll('.btn-back-q').forEach(btn => {
    btn.addEventListener('click', () => goBackQ(parseInt(btn.dataset.backQ, 10)));
  });
}
```

- [ ] **Step 4.2: Replace navigation functions**

Delete the existing `startQuiz`, `goToStep`, `updateProgress`, `nextStep`, `recordAnswer` functions. Replace with:

```javascript
function transitionSteps(fromId, toId) {
  const from = fromId ? document.getElementById(fromId) : null;
  const to = document.getElementById(toId);
  if (!to) return;

  if (from && from.classList.contains('active')) {
    from.classList.add('exit');
    setTimeout(() => {
      from.classList.remove('active', 'exit');
      to.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const focus = to.querySelector('h1, h2, .q-text');
      if (focus) { focus.setAttribute('tabindex', '-1'); focus.focus(); }
    }, 280);
  } else {
    to.classList.add('active');
  }
}

function updateProgress() {
  const wrap = document.getElementById('progress-wrap');
  const fill = document.getElementById('progress-fill');
  const label = document.getElementById('progress-label');
  if (currentView !== 'question') { wrap.classList.remove('show'); return; }
  wrap.classList.add('show');
  const pct = ((currentQ - 1) / 16) * 100;
  fill.style.width = pct + '%';
  wrap.setAttribute('aria-valuenow', Math.round(pct));
  label.textContent = currentQ + ' / 16';
}

function handleLikertClick(row) {
  const n = parseInt(row.dataset.q, 10);
  const v = parseInt(row.dataset.v, 10);

  const likert = document.getElementById('likert-q' + n);
  likert.querySelectorAll('.v-likert-row').forEach(r => {
    r.classList.remove('selected');
    r.setAttribute('aria-checked', 'false');
  });
  row.classList.add('selected', 'selecting');
  row.setAttribute('aria-checked', 'true');
  setTimeout(() => row.classList.remove('selecting'), 150);

  answers[n] = v;

  if (advanceTimer) clearTimeout(advanceTimer);
  advanceTimer = setTimeout(() => {
    advanceTimer = null;
    if (n < 16) { showQuestion(n + 1); } else { finishQuiz(); }
  }, 500);
}

function restoreSelection(n) {
  const likert = document.getElementById('likert-q' + n);
  if (!likert) return;
  likert.querySelectorAll('.v-likert-row').forEach(r => {
    const sel = answers[n] === parseInt(r.dataset.v, 10);
    r.classList.toggle('selected', sel);
    r.setAttribute('aria-checked', sel ? 'true' : 'false');
  });
}

function showQuestion(n) {
  const fromId = currentView === 'intro' ? 'step-0' :
                 currentView === 'question' ? 'step-q' + currentQ : null;
  transitionSteps(fromId, 'step-q' + n);
  currentView = 'question';
  currentQ = n;
  updateProgress();
  restoreSelection(n);
}

function goBackQ(n) {
  if (advanceTimer) { clearTimeout(advanceTimer); advanceTimer = null; }
  if (n === 1) { showIntro(); } else {
    transitionSteps('step-q' + n, 'step-q' + (n - 1));
    currentView = 'question';
    currentQ = n - 1;
    updateProgress();
    restoreSelection(n - 1);
  }
}

function startQuiz() { showQuestion(1); }

function showIntro() {
  const fromId = currentView === 'friend' ? 'step-friend' :
                 currentView === 'question' ? 'step-q' + currentQ :
                 currentView === 'results' ? 'step-results' : null;
  transitionSteps(fromId, 'step-0');
  currentView = 'intro';
  currentQ = 0;
  updateProgress();
}

function finishQuiz() {
  lastResult = computeResult();
  renderResults(lastResult);
  transitionSteps('step-q16', 'step-results');
  currentView = 'results';
  updateProgress();
  setTimeout(() => animateBars(lastResult.dimScores), 500);
}
```

- [ ] **Step 4.3: Add `initPage()` and wire up buttons**

Replace the bare `buildQuestions();` call with:

```javascript
buildQuestions();
initPage();

function initPage() {
  // Friend view routing
  const params = new URLSearchParams(window.location.search);
  const r = params.get('r');
  if (r) {
    const parsed = parseFriendSlug(r);
    if (parsed) {
      populateFriendView(parsed);
      document.getElementById('step-friend').classList.add('active');
      currentView = 'friend';
      setupFriendButtons();
      setupShareButtons();
      setupCtaListeners();
      return;
    }
  }
  document.getElementById('step-0').classList.add('active');
  currentView = 'intro';
  setupShareButtons();
  setupCtaListeners();
}

function parseFriendSlug(slug) {
  const m = slug.match(/^(freezer|loop-thinker|maximizer|avoider)-(low|mid|high)$/);
  if (!m) return null;
  const map = { 'freezer': 1, 'loop-thinker': 2, 'maximizer': 3, 'avoider': 4 };
  return { identity: IDENTITIES[map[m[1]]], intensity: m[2] };
}

function populateFriendView({ identity, intensity }) {
  document.getElementById('friend-emoji').textContent = identity.emoji;
  document.getElementById('friend-identity-name').textContent = identity.name;
  document.getElementById('friend-punchline').textContent = '\u201c' + identity.punchline + '\u201d';
  const pct = INTENSITY_PERCENTILES[intensity];
  document.getElementById('friend-percentile-line').textContent =
    `${identity.friendPhrase} more than ${pct}% of people who took this test`;
}

function setupFriendButtons() {
  document.getElementById('btn-friend-take-test').addEventListener('click', showIntro);
  document.getElementById('btn-browse-dims').addEventListener('click', function() {
    showIntro();
    setTimeout(() => {
      const grid = document.querySelector('.dimension-grid');
      if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 400);
  });
}

function setupShareButtons() {
  const primary = document.getElementById('btn-share-primary');
  const copy = document.getElementById('btn-copy-link');
  if (!navigator.share) { primary.style.display = 'none'; }
  else { primary.addEventListener('click', handleSharePrimary); }
  copy.addEventListener('click', handleCopyLink);
}

function setupCtaListeners() {
  document.getElementById('cta-form').addEventListener('submit', e => {
    e.preventDefault(); handleCtaSubmit('full_analysis');
  });
  const waitlistLink = document.getElementById('cta-waitlist-link');
  waitlistLink.addEventListener('click', () => handleCtaSubmit('waitlist'));
  waitlistLink.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCtaSubmit('waitlist'); }
  });
  const retakeBtn = document.getElementById('retake-btn');
  retakeBtn.addEventListener('click', retakeTest);
  retakeBtn.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); retakeTest(); }
  });
}
```

- [ ] **Step 4.4: Remove old event listener block**

Delete the old event listener block at the bottom of `<script>` (the `document.getElementById('cta-form').addEventListener(...)` block and the old `retake-link` keyboard listener). They are now handled by `setupCtaListeners()`.

Also remove the old `buildQuestions()` function body (only the new one from Step 4.1 should remain).

- [ ] **Step 4.5: Verify quiz flow in browser**

Open `reanchor/self-test.html`:
1. Intro shows. Click "Start the test →" → Q1 appears (centered Fraunces text, 5 vertical rows)
2. Click "Never" → row highlights green, after 500ms Q2 appears with fade
3. Click a different row before 500ms → previous selection replaced, timer restarts
4. On Q2, click "← Back" → Q1 shows with Q1's previous answer pre-selected
5. Progress bar: Q1 shows "1 / 16" and ~0% fill, Q2 shows "2 / 16", Q16 shows "16 / 16"
6. After Q16 answer auto-advances: results step appears (identity card will be empty until Task 5)

- [ ] **Step 4.6: Commit**

```bash
git add reanchor/self-test.html
git commit -m "feat: implement 16-question navigation with auto-advance, back, and initPage routing"
```

---

## Task 5: Result page rendering JS

**Files:** Modify `reanchor/self-test.html` — add `renderResults()` and `animateBars()`

- [ ] **Step 5.1: Add `renderResults()` and `animateBars()`**

Replace the old `renderResults()` and `animateResults()` functions with:

```javascript
function renderResults(result) {
  const { identity, intensity, percentile, showSecondary, secondaryPhrase,
          dimScores, topIdx } = result;

  // Identity card
  document.getElementById('identity-card').dataset.identity = identity.slug;
  document.getElementById('result-emoji').textContent = identity.emoji;
  document.getElementById('result-identity-name').textContent = identity.name;

  const secEl = document.getElementById('result-secondary-phrase');
  if (showSecondary && secondaryPhrase) {
    secEl.textContent = secondaryPhrase;
    secEl.style.display = '';
  } else {
    secEl.style.display = 'none';
  }

  document.getElementById('result-punchline').textContent =
    '\u201c' + identity.punchline + '\u201d';
  document.getElementById('result-intensity-phrase').textContent =
    'You are ' + identity.intensity[intensity];
  document.getElementById('result-percentile').textContent =
    'more than ' + percentile + '% of people who took this test';

  // Share block
  document.getElementById('result-tag-prompt').textContent = identity.tagPrompt;

  // Dignity
  document.getElementById('result-dignity-line').textContent = identity.dignityLine;

  // You likely
  document.getElementById('result-you-likely-list').innerHTML =
    identity.youLikely.map(item => `<li>${item}</li>`).join('');

  // Closing hit
  document.getElementById('result-closing-hit').textContent = identity.closingHit;

  // Breakdown — dominant dimension first
  const dimOrder = [topIdx, ...[0,1,2,3].filter(i => i !== topIdx)];
  const dimNames = ['Analysis Paralysis', 'Post-Decision Rumination', 'Maximizing Tendency', 'Avoidance & Approval'];
  const dimColors = ['var(--blue)', 'var(--danger)', 'var(--amber)', 'var(--purple)'];
  const dimBarClasses = ['dim-1', 'dim-2', 'dim-3', 'dim-4'];

  document.getElementById('breakdown-rows').innerHTML = dimOrder.map(idx => `
    <div class="dim-row${idx === topIdx ? ' dominant' : ''}" style="margin-bottom:24px;">
      <div class="dim-row-header">
        <span class="dim-row-name">
          <span class="dim-row-dot" style="background:${dimColors[idx]};"></span>
          ${dimNames[idx]}
          ${idx === topIdx ? '<span class="dim-dominant-marker">▸ dominant</span>' : ''}
        </span>
        <span class="dim-row-score">${dimScores[idx]}/20</span>
      </div>
      <div class="dim-bar-track">
        <div class="dim-bar-fill ${dimBarClasses[idx]}" id="dim-bar-${idx+1}" style="width:0%"></div>
      </div>
    </div>
  `).join('');
}

function animateBars(dimScores) {
  [0,1,2,3].forEach((idx, order) => {
    const pct = (dimScores[idx] / 20) * 100;
    setTimeout(() => {
      const bar = document.getElementById('dim-bar-' + (idx + 1));
      if (bar) bar.style.width = pct + '%';
    }, 100 + order * 150);
  });
}
```

- [ ] **Step 5.2: Verify result page in browser**

Complete all 16 questions (click any row for each). Verify the results page shows:
- Identity card: emoji, large identity name, italic punchline in accent green, intensity + percentile line, `━ reanchor test ━`
- Card glow color matches identity (blue for Freezer, red for Loop Thinker, amber for Maximizer, purple for Avoider)
- Secondary phrase only appears when two dims are within 10 points
- Tag prompt, share buttons below card
- Dignity line (italic, muted)
- Three "You likely" bullets with ▸ green markers
- Closing hit (italic, accent green)
- Breakdown bars: dominant dim listed first with "▸ dominant" label, bars animate in

- [ ] **Step 5.3: Commit**

```bash
git add reanchor/self-test.html
git commit -m "feat: render identity card, dignity, bullets, closing hit, and breakdown on result page"
```

---

## Task 6: Share functionality + Supabase analytics

**Files:** Modify `reanchor/self-test.html` — add share handlers, rewrite `handleCtaSubmit`, rewrite `retakeTest`

- [ ] **Step 6.1: Add share and analytics functions**

After `animateBars()`, add:

```javascript
function buildSharePayload() {
  if (!lastResult) return null;
  const { identity, shareSlug } = lastResult;
  return {
    title: `I'm a ${identity.name} — ReAnchor Decision Anxiety Test`,
    text: `I just found out I'm a ${identity.name}.\n\n\u201c${identity.punchline}\u201d\n\nApparently this is more accurate than I'm comfortable with.`,
    url: `https://lynqtech.io/reanchor/self-test?r=${shareSlug}`,
  };
}

async function handleSharePrimary() {
  const payload = buildSharePayload();
  if (!payload) return;
  try {
    await navigator.share(payload);
    logShareEvent('share_native');
  } catch (err) {
    // AbortError = user cancelled — not a failure
  }
}

async function handleCopyLink() {
  const payload = buildSharePayload();
  if (!payload) return;
  const toast = document.getElementById('share-toast');
  try {
    await navigator.clipboard.writeText(payload.url);
    toast.textContent = 'Link copied!';
    setTimeout(() => { toast.textContent = ''; }, 2500);
    logShareEvent('share_copy');
  } catch {
    toast.textContent = 'Could not copy — try manually.';
    setTimeout(() => { toast.textContent = ''; }, 3000);
  }
}

async function logShareEvent(ctaSource) {
  if (!lastResult) return;
  const { dimScores, total, identity } = lastResult;
  await _supa.from('quiz_results').insert({
    email: null,
    total_score: total,
    dim_1: dimScores[0], dim_2: dimScores[1],
    dim_3: dimScores[2], dim_4: dimScores[3],
    profile: identity.name,
    answers: answers.slice(1),
    cta_source: ctaSource,
  });
}
```

- [ ] **Step 6.2: Rewrite `handleCtaSubmit()`**

Replace the existing `handleCtaSubmit` function:

```javascript
async function handleCtaSubmit(source) {
  const submitBtn = document.getElementById('cta-submit');
  if (submitBtn.disabled) return;
  const emailInput = document.getElementById('cta-email');
  const errorEl = document.getElementById('cta-error');
  const waitlistLink = document.getElementById('cta-waitlist-link');
  const email = emailInput.value.trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailInput.style.borderColor = 'rgba(251,113,133,0.5)';
    emailInput.focus();
    return;
  }
  emailInput.style.borderColor = '';
  errorEl.classList.remove('show');
  submitBtn.disabled = true;
  waitlistLink.style.pointerEvents = 'none';
  waitlistLink.style.opacity = '0.4';

  if (!lastResult) { submitBtn.disabled = false; return; }
  const { dimScores, total, identity } = lastResult;

  const { error } = await _supa.from('quiz_results').upsert({
    email,
    total_score: total,
    dim_1: dimScores[0], dim_2: dimScores[1],
    dim_3: dimScores[2], dim_4: dimScores[3],
    profile: identity.name,
    answers: answers.slice(1),
    cta_source: source,
  }, { onConflict: 'email' });

  if (error) {
    errorEl.classList.add('show');
    submitBtn.disabled = false;
    waitlistLink.style.pointerEvents = '';
    waitlistLink.style.opacity = '';
    return;
  }

  emailSubmitted = true;
  document.getElementById('cta-form-wrap').style.display = 'none';
  document.getElementById(
    source === 'full_analysis' ? 'cta-success-analysis' : 'cta-success-waitlist'
  ).classList.add('show');
}
```

- [ ] **Step 6.3: Rewrite `retakeTest()`**

Replace the existing `retakeTest`:

```javascript
function retakeTest() {
  answers = new Array(17).fill(null);
  lastResult = null;
  emailSubmitted = false;
  if (advanceTimer) { clearTimeout(advanceTimer); advanceTimer = null; }

  document.querySelectorAll('.v-likert-row').forEach(r => {
    r.classList.remove('selected');
    r.setAttribute('aria-checked', 'false');
  });

  document.getElementById('cta-form-wrap').style.display = '';
  ['cta-success-analysis', 'cta-success-waitlist'].forEach(id =>
    document.getElementById(id).classList.remove('show')
  );
  document.getElementById('cta-email').value = '';
  document.getElementById('cta-email').style.borderColor = '';
  document.getElementById('cta-submit').disabled = false;
  document.getElementById('cta-waitlist-link').style.pointerEvents = '';
  document.getElementById('cta-waitlist-link').style.opacity = '';
  document.getElementById('cta-error').classList.remove('show');
  document.getElementById('share-toast').textContent = '';

  document.getElementById('step-results').classList.remove('active');
  showIntro();
}
```

- [ ] **Step 6.4: Verify share + analytics**

1. Complete 16 questions → results page
2. Click "or copy the link" → toast "Link copied!" appears, then fades
3. Open DevTools → Network → filter "quiz_results" → verify POST with `cta_source: "share_copy"` and `email: null`
4. Enter email, click "Send my analysis →" → success state shows; verify Supabase upsert with `cta_source: "full_analysis"`
5. Click "Retake the test" → intro appears with blank state
6. On a desktop browser where `navigator.share` is absent: "Share your result →" button should be hidden, only "or copy the link" visible

- [ ] **Step 6.5: Commit**

```bash
git add reanchor/self-test.html
git commit -m "feat: implement Web Share API, copy-link fallback, share analytics, and retake reset"
```

---

## Task 7: Intro copy tightening + dead code removal

**Files:** Modify `reanchor/self-test.html` — HTML, CSS, and JS cleanup

- [ ] **Step 7.1: Tighten intro body copy**

Find the `.intro-body` paragraph. Replace its content:
```html
<p class="intro-body">
  By the end, you'll know which pattern is loudest in your head — and how loud it is.
</p>
```

- [ ] **Step 7.2: Remove dead CSS blocks**

From `<style>`, delete these blocks that are no longer used:
- `.step-eyebrow`, `.step-dim-badge`, `.step-dim-badge.dim-1/2/3/4`
- `.step-headline`, `.step-subhead`
- `.question-card`, `.question-card.answered`, `.question-num`, `.question-text`
- `.likert`, `.likert-option`, `.likert-option input[type="radio"]`, `.likert-option label`, `.likert-option label:hover`, `.likert-option label:active`, `.likert-option input:checked + label`, `.likert-val`, `.likert-lbl`, `.scale-legend`
- `.validation-msg`
- `.step-nav`, `.btn-back`
- `.results-header`, `.results-eyebrow`, `.results-score-wrap`, `.results-score-ring`, `.score-ring-bg`, `.score-ring-fill`, `.score-ring-fill.low/moderate/high/severe`, `.results-score-number`, `.results-score-label`
- `.result-badge`, `.results-profile-name`, `.results-profile-desc`, `.result-punchline`, `.result-divider`
- `.insight-card`, `.insight-card-label`, `.insight-card-text`, `.insight-card-bridge`
- `.share-section`, `.share-section-label`, `.share-card`, `.share-card-top`, `.share-card-brand`, `.share-card-sep`, `.share-card-test`, `.share-card-title`, `.share-card-sub`, `.share-card-punchline`, `.share-card-url`, `.share-btn`, `.share-copy-hint`, `.share-native-hint`
- `.dim-interpretation`

Keep: `.results-cta`, `.results-cta-eyebrow`, `.results-cta-headline`, `.results-cta-sub`, `.waitlist-form-inline`, `.waitlist-input-inline`, `.waitlist-btn-inline`, `.inline-success`, `.cta-secondary-wrap`, `.cta-secondary-link`, `.cta-error`, `.retake-link`, `.dimensions-section`, `.dimensions-title`, `.dim-row`, `.dim-row-header`, `.dim-row-name`, `.dim-row-dot`, `.dim-row-score`, `.dim-bar-track`, `.dim-bar-fill`, `.btn-next`, `.progress-wrap`, `.progress-bar-track`, `.progress-bar-fill`, `.progress-label`.

- [ ] **Step 7.3: Remove dead JS**

Delete from `<script>`:
- `PROFILES` constant
- `DIM_INTERPRETATIONS` constant
- Any remaining references to `btn-start` onclick (now handled by button's `onclick="startQuiz()"` in HTML — check that it still has this attribute; if it was removed, re-add it)
- Old `goToStep`, `nextStep`, `recordAnswer` functions if any fragments remain

Verify `onclick="startQuiz()"` is still on the `#btn-start` button in the intro HTML.

- [ ] **Step 7.4: Final end-to-end verification**

Open `reanchor/self-test.html` in browser. Test all paths:

**Normal flow:**
1. Intro → short body copy visible
2. "Start the test →" → Q1 with vertical Likert
3. Answer Q1–Q16 via auto-advance → results
4. Identity card shows: emoji, name (≥36px Fraunces), secondary phrase only if applicable, divider, punchline (italic, accent-green), divider, intensity phrase, percentile line, branding
5. Share block directly below card
6. Dignity line → You likely bullets → Closing hit → Breakdown (dominant first) → CTA → Retake

**Mobile (375px viewport in DevTools):**
- Q-screen: question text centered, 5 Likert rows full-width, thumb-comfortable (~52px tall)
- Identity card fits in single viewport without scroll
- Share button full-width

**Friend view:**
- `?r=freezer-low` → 🧊, "The Freezer", correct punchline, "they freeze on decisions more than 42% of people who took this test"
- `?r=maximizer-high` → 🎯, "The Maximizer", "more than 97%"
- `?r=bad-slug` → normal intro
- "Take your own test →" → intro
- "or browse decision anxiety types" → intro + scrolls to 4 dimension cards

- [ ] **Step 7.5: Commit**

```bash
git add reanchor/self-test.html
git commit -m "feat: tighten intro copy, remove dead CSS/JS from old quiz structure"
```

---

## Spec Coverage Checklist (Self-Review)

| Spec section | Task | Status |
|---|---|---|
| §2 — replaced: score ring, 4-tier profiles, insight card, old share section, 4-step quiz | 3, 5, 7 | ✓ |
| §2 — kept: intro + dim cards, science note, breakdown bars, email CTA, retake, Supabase | 3, 5, 6 | ✓ |
| §3 — four identity copy matrices | 1 | ✓ |
| §4 — percentile table | 1 | ✓ |
| §5 — secondary identity rule (≤10 point gap) | 1, 5 | ✓ |
| §6 — result page order (card → share → dignity → bullets → closing → breakdown → CTA → retake) | 3, 5 | ✓ |
| §6.1 — identity card: emoji, name largest, secondary phrase, dividers, punchline, intensity, percentile, branding | 2, 3, 5 | ✓ |
| §6.2 — share block: tag-prompt, Share button (Web Share), copy-link fallback, prefilled payload | 2, 3, 6 | ✓ |
| §6.3 — breakdown: dominant first, ▸ marker, score only (no interpretation paragraph) | 2, 5 | ✓ |
| §7 — friend view: emoji, "Your friend is a", punchline, percentile line, "Take test" CTA, browse link, branding | 3, 4 | ✓ |
| §8 — 16 single-question screens, vertical Likert (52px rows), auto-advance 500ms, back nav | 2, 3, 4 | ✓ |
| §8.2 — selection animation (scale 0.97, 150ms) | 2, 4 | ✓ |
| §8.3 — back button cancels pending advance | 4 | ✓ |
| §8.5 — progress bar 0→100% across Q1→Q16, N/16 label | 4 | ✓ |
| §8.6 — intro body copy tightened | 7 | ✓ |
| §9.1 — scoring: argmax, tie→lower index, secondary rule, intensity buckets, percentile, shareSlug | 1 | ✓ |
| §9.2 — profile column stores identity name (e.g., "Loop Thinker") | 6 | ✓ |
| §9.3 — share_native / share_copy rows, null email allowed | 6 | ✓ |
| §10 — per-identity card top-glow (blue/red/amber/purple via data-identity CSS selectors) | 2, 5 | ✓ |
| §11 — identity card fits single mobile viewport | verified in Task 7.4 | ✓ |
