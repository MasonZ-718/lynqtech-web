# Why ReAnchor Section Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the verbose editorial-row layout in the `#different` section with a compact 3-column competitor grid + full-width ReAnchor card, each clickable to open a modal with depth (pros/cons or comparison table + waitlist form).

**Architecture:** All changes are in `reanchor/index.html` — a single self-contained static file. New CSS replaces the old `.diff-row*` / `.diff-declaration*` blocks. New HTML replaces `.diff-rows` and `.diff-declaration`. A single shared modal DOM element is populated dynamically via JS based on which card is clicked. The modal waitlist form reuses the existing `_supa` Supabase client already on the page.

**Tech Stack:** Vanilla HTML, CSS custom properties, vanilla JS (no build step, no bundler). Supabase JS SDK v2 (already loaded via CDN on the page).

---

## File Map

| File | What changes |
|---|---|
| `reanchor/index.html` | CSS (~lines 2072–2188): remove old, add new card + modal styles |
| `reanchor/index.html` | HTML (~lines 2526–2577): replace `.diff-rows` + `.diff-declaration` with card grid + ReAnchor card |
| `reanchor/index.html` | HTML (~line 3376): add modal DOM element before `</body>` |
| `reanchor/index.html` | JS (~line 3376): add modal open/close/content-swap + modal form submit logic |

---

## Task 1: Replace old CSS with new card + modal styles

**Files:**
- Modify: `reanchor/index.html` lines ~2072–2188

The goal is to delete every CSS rule that starts with `.diff-rows`, `.diff-row`, or `.diff-declaration`, and the `@media` overrides for them — then insert the new `.comp-*` and modal CSS in their place.

- [ ] **Step 1: Delete the old editorial-row and declaration CSS**

Find and delete the block from the comment `/* Editorial rows */` (line ~2071) through to (and including) the closing `}` of the `@media (max-width: 480px)` block that references `.diff-intro` and `.diff-declaration` (~line 2187). Leave `.diff-label` and `.diff-intro` CSS intact (lines ~2048–2070) — those are kept.

The text to remove starts at:
```
    /* Editorial rows */
    .diff-rows {
```
and ends at:
```
    @media (max-width: 480px) {
      #different { padding: 80px 0; }
      .diff-intro { font-size: 24px; margin-bottom: 48px; }
      .diff-declaration { padding-top: 48px; }
    }
```

- [ ] **Step 2: Insert new card + modal CSS in place of the deleted block**

Insert the following immediately after the `.diff-intro em` rule (after line ~2069):

```css
    /* ── Competitor cards ── */
    .comp-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 16px;
    }

    .comp-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 28px 24px;
      cursor: pointer;
      transition: border-color 0.2s ease;
      text-align: left;
      width: 100%;
    }

    .comp-card:hover {
      border-color: var(--muted);
    }

    .comp-card--reanchor {
      background: var(--surface);
      border: 1px solid var(--border);
      border-left: 3px solid var(--accent);
      border-radius: 12px;
      padding: 28px 24px;
      cursor: pointer;
      transition: border-color 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      text-align: left;
    }

    .comp-card--reanchor:hover {
      border-color: var(--accent);
    }

    .comp-card-label {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: var(--dim);
      margin-bottom: 10px;
    }

    .comp-card-line {
      font-size: clamp(13px, 1.4vw, 15px);
      font-weight: 500;
      color: var(--muted);
      line-height: 1.55;
    }

    .comp-card--reanchor .comp-card-line {
      font-weight: 600;
      color: var(--accent);
    }

    .comp-card-cta {
      font-size: 12px;
      color: var(--accent);
      letter-spacing: 0.3px;
      flex-shrink: 0;
      margin-left: 24px;
      white-space: nowrap;
    }

    /* ── Shared modal ── */
    .comp-modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(9, 9, 11, 0.88);
      z-index: 200;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease;
    }

    .comp-modal-backdrop.is-open {
      opacity: 1;
      pointer-events: all;
    }

    .comp-modal {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 40px;
      max-width: 660px;
      width: 100%;
      max-height: 85vh;
      overflow-y: auto;
      position: relative;
      transform: translateY(16px);
      transition: transform 0.25s ease;
    }

    .comp-modal-backdrop.is-open .comp-modal {
      transform: translateY(0);
    }

    .comp-modal-close {
      position: absolute;
      top: 18px;
      right: 18px;
      background: none;
      border: none;
      color: var(--dim);
      font-size: 22px;
      cursor: pointer;
      line-height: 1;
      padding: 4px 8px;
      border-radius: 4px;
      transition: color 0.15s ease;
    }

    .comp-modal-close:hover { color: var(--text); }

    .comp-modal-title {
      font-family: 'Fraunces', Georgia, serif;
      font-size: clamp(20px, 2.5vw, 28px);
      font-weight: 400;
      color: var(--text);
      margin-bottom: 28px;
      padding-right: 40px;
      line-height: 1.3;
    }

    /* Competitor modal: pros/cons columns */
    .comp-modal-cols {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 28px;
    }

    .comp-modal-col-head {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--dim);
      margin-bottom: 14px;
    }

    .comp-modal-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .comp-modal-list li {
      font-size: 13px;
      color: var(--muted);
      line-height: 1.65;
      margin-bottom: 10px;
      padding-left: 16px;
      position: relative;
    }

    .comp-modal-list li::before {
      content: '–';
      position: absolute;
      left: 0;
      color: var(--dim);
    }

    /* ReAnchor modal: comparison table */
    .comp-table-wrap {
      overflow-x: auto;
      margin-bottom: 36px;
    }

    .comp-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }

    .comp-table th {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--dim);
      text-align: center;
      padding: 8px 12px 10px;
      border-bottom: 1px solid var(--border);
    }

    .comp-table th:first-child { text-align: left; }
    .comp-table th.col-reanchor { color: var(--accent); }

    .comp-table td {
      padding: 12px;
      color: var(--muted);
      border-bottom: 1px solid rgba(39, 39, 42, 0.5);
      text-align: center;
      vertical-align: middle;
    }

    .comp-table td:first-child {
      text-align: left;
      color: var(--text);
      padding-right: 20px;
    }

    .comp-table .tick { color: var(--accent); font-size: 15px; }
    .comp-table .cross { color: var(--dim); font-size: 15px; }

    /* ReAnchor modal CTA */
    .comp-modal-cta-label {
      font-size: 14px;
      color: var(--muted);
      margin-bottom: 16px;
      line-height: 1.5;
    }

    .comp-modal-form {
      display: flex;
      gap: 12px;
    }

    .comp-modal-success {
      display: none;
      font-size: 14px;
      color: var(--accent);
    }

    @media (max-width: 768px) {
      .comp-grid { grid-template-columns: 1fr; }
      .comp-card--reanchor { flex-direction: column; align-items: flex-start; gap: 12px; }
      .comp-modal-cols { grid-template-columns: 1fr; gap: 20px; }
      .comp-modal { padding: 28px 20px; }
      .comp-modal-form { flex-direction: column; }
      #different { padding: 80px 0; }
      .diff-intro { font-size: 24px; margin-bottom: 48px; }
    }
```

- [ ] **Step 3: Verify CSS is syntactically correct**

Open `reanchor/index.html` in a browser via `python3 -m http.server 8080`. The page should load without console errors. The `#different` section will look unstyled for now (old HTML still in place) — that's expected.

- [ ] **Step 4: Commit**

```bash
git add reanchor/index.html
git commit -m "style: add comp-card and modal CSS for Why ReAnchor section"
```

---

## Task 2: Replace section HTML

**Files:**
- Modify: `reanchor/index.html` lines ~2526–2577

- [ ] **Step 1: Replace the `.diff-rows` block and `.diff-declaration` block**

Find this HTML (starts ~line 2526):
```html
      <p class="diff-label reveal">Why ReAnchor</p>
      <h2 class="diff-intro reveal reveal-delay-1">You've tried the obvious tools.<br><em>None of them were built for this moment.</em></h2>

      <div class="diff-rows">
        ...
      </div>

      <!-- Declaration -->
      <div class="diff-declaration reveal reveal-delay-3">
        ...
      </div>
```

Replace the entire block (everything from `<p class="diff-label reveal">` through `</div>` of the declaration, inclusive) with:

```html
      <p class="diff-label reveal">Why ReAnchor</p>
      <h2 class="diff-intro reveal reveal-delay-1">You've tried the obvious.<br><em>None of them solves for this moment like ReAnchor does.</em></h2>

      <!-- Competitor grid -->
      <div class="comp-grid">

        <button class="comp-card reveal" data-modal="yourself" aria-haspopup="dialog">
          <p class="comp-card-label">Yourself</p>
          <p class="comp-card-line">"You replay everything in your head, or read what you wrote on journal, but it keeps getting messier"</p>
        </button>

        <button class="comp-card reveal reveal-delay-1" data-modal="friends" aria-haspopup="dialog">
          <p class="comp-card-label">Friends &amp; family</p>
          <p class="comp-card-line">"They listen. They validate. They can't return you to the call you made."</p>
        </button>

        <button class="comp-card reveal reveal-delay-2" data-modal="ai" aria-haspopup="dialog">
          <p class="comp-card-label">AI chatbots</p>
          <p class="comp-card-line">"It tells you what you want to hear. And gives you more to think about."</p>
        </button>

      </div>

      <!-- ReAnchor card -->
      <button class="comp-card--reanchor reveal reveal-delay-3" data-modal="reanchor" aria-haspopup="dialog">
        <div>
          <p class="comp-card-label">ReAnchor</p>
          <p class="comp-card-line">"The decision you made. Before the doubt started."</p>
        </div>
        <span class="comp-card-cta" aria-hidden="true">See how it compares →</span>
      </button>
```

- [ ] **Step 2: Verify layout in browser**

Reload `http://localhost:8080/reanchor/`. Scroll to the `#different` section and confirm:
- Three competitor cards render in a row on desktop
- ReAnchor card spans full width below, with left accent border and green text
- On a narrow window (< 768px), all four cards stack vertically

- [ ] **Step 3: Commit**

```bash
git add reanchor/index.html
git commit -m "feat: replace diff-rows with comp-card grid in Why ReAnchor section"
```

---

## Task 3: Add modal DOM element

**Files:**
- Modify: `reanchor/index.html` — add before `</body>` (~line 3378)

- [ ] **Step 1: Insert modal HTML before `</body>`**

Find `</body>` (the last line before `</html>`) and insert this immediately above it:

```html
  <!-- ═══════════════════════════════════
       COMPETITOR / REANCHOR MODALS
  ═══════════════════════════════════ -->
  <div
    class="comp-modal-backdrop"
    id="comp-modal-backdrop"
    role="dialog"
    aria-modal="true"
    aria-labelledby="comp-modal-title"
  >
    <div class="comp-modal" id="comp-modal">
      <button class="comp-modal-close" id="comp-modal-close" aria-label="Close">&#x2715;</button>
      <h3 class="comp-modal-title" id="comp-modal-title"></h3>
      <div id="comp-modal-body"></div>
    </div>
  </div>
```

- [ ] **Step 2: Verify DOM is present**

Open browser DevTools console and run:
```js
document.getElementById('comp-modal-backdrop')
```
Expected: the element is returned (not `null`).

- [ ] **Step 3: Commit**

```bash
git add reanchor/index.html
git commit -m "feat: add modal DOM shell for Why ReAnchor cards"
```

---

## Task 4: Add modal JS (open/close + content + waitlist form)

**Files:**
- Modify: `reanchor/index.html` — add a new `<script>` block before `</body>`, after the modal DOM element

- [ ] **Step 1: Insert modal JS**

Directly after the modal HTML from Task 3 (and still before `</body>`), insert:

```html
  <script>
  // ── Why ReAnchor — modal ──
  (function () {
    var backdrop = document.getElementById('comp-modal-backdrop');
    var closeBtn  = document.getElementById('comp-modal-close');
    var titleEl   = document.getElementById('comp-modal-title');
    var bodyEl    = document.getElementById('comp-modal-body');
    var modal     = document.getElementById('comp-modal');

    var CONTENT = {
      yourself: {
        title: 'Yourself',
        html: '<div class="comp-modal-cols">'
          + '<div>'
          + '<p class="comp-modal-col-head">What helps</p>'
          + '<ul class="comp-modal-list">'
          + '<li>Forces you to articulate thoughts, which can bring some clarity</li>'
          + '<li>No external pressure — you\'re honest with yourself</li>'
          + '<li>Available any time, no social cost</li>'
          + '</ul></div>'
          + '<div>'
          + '<p class="comp-modal-col-head">Where it falls short</p>'
          + '<ul class="comp-modal-list">'
          + '<li>Replaying in your head gives doubt more material to spiral with</li>'
          + '<li>Written notes capture your mood at the time, not the reasoning behind the decision</li>'
          + '<li>There\'s no protocol to return to — just more words, more noise</li>'
          + '<li>Journaling processes thoughts; it can\'t return you to a decision</li>'
          + '</ul></div>'
          + '</div>'
      },
      friends: {
        title: 'Friends & family',
        html: '<div class="comp-modal-cols">'
          + '<div>'
          + '<p class="comp-modal-col-head">What helps</p>'
          + '<ul class="comp-modal-list">'
          + '<li>Articulating to others forces you to simplify, which can sharpen your thinking</li>'
          + '<li>A trusted person can offer perspective you hadn\'t considered</li>'
          + '<li>Emotional support matters — feeling heard reduces anxiety</li>'
          + '</ul></div>'
          + '<div>'
          + '<p class="comp-modal-col-head">Where it falls short</p>'
          + '<ul class="comp-modal-list">'
          + '<li>You may unconsciously dramatise or selectively present the situation</li>'
          + '<li>People close to you are socially incentivised to soften their view</li>'
          + '<li>They lack the full context of your original reasoning at the moment you made the call</li>'
          + '<li>Conflicting advice from multiple people often makes doubt worse, not better</li>'
          + '</ul></div>'
          + '</div>'
      },
      ai: {
        title: 'AI chatbots',
        html: '<div class="comp-modal-cols">'
          + '<div>'
          + '<p class="comp-modal-col-head">What helps</p>'
          + '<ul class="comp-modal-list">'
          + '<li>Available at any hour, no judgment</li>'
          + '<li>Can surface angles you hadn\'t considered</li>'
          + '<li>Useful for factual research around a decision</li>'
          + '</ul></div>'
          + '<div>'
          + '<p class="comp-modal-col-head">Where it falls short</p>'
          + '<ul class="comp-modal-list">'
          + '<li>Trained to be agreeable — tells you what you want to hear, not what you need to hear</li>'
          + '<li>Generates more to think about; more thinking is the last thing you need when doubt sets in</li>'
          + '<li>Has no record of what you actually believed when you made the decision</li>'
          + '<li>Encourages reflection loops, not resolution</li>'
          + '</ul></div>'
          + '</div>'
      },
      reanchor: {
        title: 'Why ReAnchor is different',
        html: '<div class="comp-table-wrap">'
          + '<table class="comp-table">'
          + '<thead><tr>'
          + '<th></th>'
          + '<th>Yourself</th>'
          + '<th>Friends &amp; family</th>'
          + '<th>AI chatbots</th>'
          + '<th class="col-reanchor">ReAnchor</th>'
          + '</tr></thead>'
          + '<tbody>'
          + '<tr><td>Captures your reasoning <em>before</em> doubt starts</td><td><span class="cross">✗</span></td><td><span class="cross">✗</span></td><td><span class="cross">✗</span></td><td><span class="tick">✓</span></td></tr>'
          + '<tr><td>Available at 2am when doubt peaks</td><td><span class="tick">✓</span></td><td><span class="cross">✗</span></td><td><span class="tick">✓</span></td><td><span class="tick">✓</span></td></tr>'
          + '<tr><td>Free from social pressure or incentivised advice</td><td><span class="tick">✓</span></td><td><span class="cross">✗</span></td><td><span class="cross">✗</span></td><td><span class="tick">✓</span></td></tr>'
          + '<tr><td>Doesn\'t generate more to think about</td><td><span class="cross">✗</span></td><td><span class="cross">✗</span></td><td><span class="cross">✗</span></td><td><span class="tick">✓</span></td></tr>'
          + '<tr><td>Returns you to <em>your</em> original clarity</td><td><span class="cross">✗</span></td><td><span class="cross">✗</span></td><td><span class="cross">✗</span></td><td><span class="tick">✓</span></td></tr>'
          + '</tbody></table>'
          + '</div>'
          + '<p class="comp-modal-cta-label">Join people anchoring their decisions before the doubt arrives.</p>'
          + '<div id="modal-form-wrap">'
          + '<form class="comp-modal-form" id="modal-waitlist-form" novalidate aria-label="Waitlist signup">'
          + '<label for="modal-email" class="sr-only">Email address</label>'
          + '<input type="email" id="modal-email" name="email" placeholder="your@email.com" class="waitlist-input" required aria-required="true" />'
          + '<button type="submit" class="waitlist-btn" id="modal-submit-btn">Join Waitlist</button>'
          + '</form>'
          + '<p class="comp-modal-success" id="modal-success">You\'re on the list. We\'ll be in touch.</p>'
          + '</div>'
      }
    };

    function openModal(key) {
      var content = CONTENT[key];
      if (!content) return;
      titleEl.textContent = content.title;
      bodyEl.innerHTML = content.html;
      backdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';

      if (key === 'reanchor') {
        var mForm   = document.getElementById('modal-waitlist-form');
        var mSubmit = document.getElementById('modal-submit-btn');
        var mSuccess = document.getElementById('modal-success');
        mForm.addEventListener('submit', async function (e) {
          e.preventDefault();
          var email = document.getElementById('modal-email').value.trim();
          if (!email || !email.includes('@')) {
            document.getElementById('modal-email').focus();
            return;
          }
          mSubmit.disabled = true;
          mSubmit.textContent = 'Joining…';
          try {
            await _supa.from('quiz_results').upsert(
              { email: email, cta_source: 'why_reanchor_modal' },
              { onConflict: 'email', ignoreDuplicates: true }
            );
          } catch (_) { /* best-effort */ }
          mForm.style.display = 'none';
          mSuccess.style.display = 'block';
        });
      }

      closeBtn.focus();
    }

    function closeModal() {
      backdrop.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-modal]').forEach(function (el) {
      el.addEventListener('click', function () { openModal(el.dataset.modal); });
    });

    closeBtn.addEventListener('click', closeModal);

    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && backdrop.classList.contains('is-open')) closeModal();
    });

    // Focus trap
    modal.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var focusable = Array.from(modal.querySelectorAll('button, input, a[href], [tabindex]:not([tabindex="-1"])'));
      if (!focusable.length) return;
      var first = focusable[0];
      var last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    });
  }());
  </script>
```

- [ ] **Step 2: Verify competitor card modals open correctly**

Open `http://localhost:8080/reanchor/` and scroll to `#different`. Click the "Yourself" card.

Expected:
- Modal appears with title "Yourself"
- Two columns: "What helps" / "Where it falls short"
- 3 bullets in left column, 4 bullets in right column

Click the × button. Expected: modal closes, scroll is re-enabled.

- [ ] **Step 3: Verify Friends & family and AI chatbots modals**

Click each remaining competitor card. Expected: correct title and bullets for each (see spec for content).

Press Escape while a modal is open. Expected: modal closes.

Click the dark backdrop outside the modal panel. Expected: modal closes.

- [ ] **Step 4: Verify ReAnchor card modal and comparison table**

Click the ReAnchor card. Expected:
- Modal opens with title "Why ReAnchor is different"
- Comparison table with 5 rows visible
- Column headers: Yourself, Friends & family, AI chatbots, ReAnchor (in green)
- First row ("Captures your reasoning before doubt starts"): ✗ ✗ ✗ ✓
- Second row ("Available at 2am"): ✓ ✗ ✓ ✓
- Email input and "Join Waitlist" button visible below the table

- [ ] **Step 5: Verify ReAnchor modal waitlist form submits**

Enter a test email in the modal form and click "Join Waitlist".

Expected:
- Button shows "Joining…" briefly
- Form disappears, replaced by "You're on the list. We'll be in touch."
- No console errors

Confirm the row appears in Supabase `quiz_results` table with `cta_source = 'why_reanchor_modal'`.

- [ ] **Step 6: Verify focus trap**

Open any modal. Tab repeatedly. Expected: focus cycles through modal elements only (close button → any inputs/buttons in body → back to close button). Does not reach page elements behind the modal.

- [ ] **Step 7: Commit**

```bash
git add reanchor/index.html
git commit -m "feat: add modal open/close logic and waitlist form for Why ReAnchor cards"
```

---

## Task 5: Verify full section on mobile and across browsers

- [ ] **Step 1: Verify mobile layout**

Resize browser to 375px width (or use DevTools device emulation). Scroll to `#different`.

Expected:
- All four cards stack vertically (full width)
- No horizontal overflow
- "See how it compares →" text wraps neatly on the ReAnchor card
- Modal opens full-width on mobile, scrollable if content is tall

- [ ] **Step 2: Verify scroll reveal still works**

Reload the page and scroll down to `#different`. Expected:
- Competitor cards fade/slide in with stagger (cards 1 → 2 → 3)
- ReAnchor card follows with a slight delay
- No card is visible before the section scrolls into view

- [ ] **Step 3: Verify no console errors on page load**

Open DevTools → Console. Reload page. Expected: zero errors. (Warnings about Supabase anon key are acceptable — they're pre-existing.)

- [ ] **Step 4: Final commit if any fixes were needed**

```bash
git add reanchor/index.html
git commit -m "fix: address mobile and reveal issues in Why ReAnchor section"
```

---

## Spec Coverage Checklist

| Spec requirement | Task |
|---|---|
| 3-col grid on desktop, stacked on mobile | Task 2 + CSS in Task 1 |
| ReAnchor card full-width with accent left border | Task 2 + CSS in Task 1 |
| Subhead copy updated | Task 2 |
| Scroll reveal stagger maintained | Task 2 (reveal classes) |
| Competitor cards clickable → pros/cons modal | Task 3 + 4 |
| ReAnchor card clickable → comparison table modal | Task 3 + 4 |
| Comparison table with 5 criteria rows | Task 4 |
| Modal closes on ×, Escape, backdrop click | Task 4 |
| Focus trap in modal | Task 4 |
| Modal waitlist form uses existing Supabase client | Task 4 |
| `cta_source` field distinguishes modal signups | Task 4 |
| Old `.diff-row*` and `.diff-declaration*` CSS removed | Task 1 |
