# Self-Test Conversion Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic "Join Waitlist" CTA on the self-test results page with a value-first "Get your full analysis — free" offer backed by Supabase, capturing email + full quiz scores + all 16 individual answers.

**Architecture:** All changes are confined to `reanchor/self-test.html` (single static file, no build step). Supabase JS is loaded via CDN and initialized with the same project credentials already used in `reanchor/index.html`. A new `quiz_results` table is created in the existing Supabase project via the dashboard SQL editor before deployment.

**Tech Stack:** Vanilla HTML/CSS/JS, Supabase JS v2 (CDN), Supabase Postgres (existing project at `rzxvpkbhortfcaavqjgu.supabase.co`)

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `reanchor/self-test.html` | Modify | All HTML, CSS, and JS changes |
| Supabase dashboard SQL editor | Run SQL | Create `quiz_results` table with RLS |

---

## Task 1: Create Supabase quiz_results table

**Files:**
- Supabase dashboard → SQL Editor (no local file)

- [ ] **Step 1: Open Supabase SQL editor**

Go to https://supabase.com/dashboard/project/rzxvpkbhortfcaavqjgu/sql/new

- [ ] **Step 2: Run the following SQL**

```sql
create table public.quiz_results (
  id          uuid        primary key default gen_random_uuid(),
  email       text        not null,
  total_score int         not null,
  dim_1       int         not null,
  dim_2       int         not null,
  dim_3       int         not null,
  dim_4       int         not null,
  profile     text        not null,
  answers     jsonb       not null,
  cta_source  text        not null,
  created_at  timestamptz not null default now()
);

alter table public.quiz_results enable row level security;

create policy "anon insert only"
  on public.quiz_results
  for insert
  to anon
  with check (true);
```

- [ ] **Step 3: Verify table was created**

In the Supabase Table Editor, confirm `quiz_results` appears with all 11 columns. Confirm RLS is enabled (shield icon is active).

---

## Task 2: Add Supabase CDN and client to self-test.html

**Files:**
- Modify: `reanchor/self-test.html`

- [ ] **Step 1: Add Supabase CDN script tag**

In `self-test.html`, locate the closing `</style>` tag (around line 797). Add the CDN script directly before `</head>`:

```html
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js"></script>
</head>
```

- [ ] **Step 2: Add Supabase client initialization**

At the very top of the existing `<script>` block (around line 1112, just after `<script>`), add:

```javascript
    // ─────────────────────────────────────────────
    // SUPABASE CLIENT
    // ─────────────────────────────────────────────

    const _supa = window.supabase.createClient(
      'https://rzxvpkbhortfcaavqjgu.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6eHZwa2Job3J0ZmNhYXZxamd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4MDA1NjYsImV4cCI6MjA5MTM3NjU2Nn0.CFd_xrBxX08sWi80qAkFTEaNYR7JN0_iwmbsJqrg35o'
    );
```

- [ ] **Step 3: Verify in browser console**

Open `reanchor/self-test.html` in a browser (via `python3 -m http.server 8080` from repo root, then visit `http://localhost:8080/reanchor/self-test.html`). Open DevTools console and run:

```javascript
window.supabase
```

Expected: the Supabase module object (not `undefined`).

Also run:

```javascript
typeof _supa.from
```

Expected: `"function"`

- [ ] **Step 4: Commit**

```bash
git add reanchor/self-test.html
git commit -m "feat: add supabase client to self-test"
```

---

## Task 3: Remove Netlify form attributes and update CTA HTML

**Files:**
- Modify: `reanchor/self-test.html` (lines ~1054–1092)

- [ ] **Step 1: Replace the entire CTA block**

Find the existing CTA block starting at `<!-- CTA -->` (around line 1054) and ending just before `<p class="retake-link">` (around line 1094). Replace it entirely with:

```html
        <!-- CTA -->
        <div class="results-cta">
          <p class="results-cta-eyebrow">Your results are ready</p>
          <h3 class="results-cta-headline">Get your full analysis — free.</h3>
          <p class="results-cta-sub">
            We'll send a personalized breakdown for your highest dimension, with what it means and where to start. You'll also be first in line when ReAnchor launches.
          </p>

          <div id="cta-form-wrap">
            <form class="waitlist-form-inline" id="cta-form" novalidate>
              <label for="cta-email" class="sr-only">Email address</label>
              <input
                type="email"
                id="cta-email"
                name="email"
                class="waitlist-input-inline"
                placeholder="your@email.com"
                autocomplete="email"
                required
              />
              <button type="submit" class="waitlist-btn-inline" id="cta-submit">
                Send my analysis →
              </button>
            </form>
            <p class="cta-secondary-wrap">
              <a class="cta-secondary-link" id="cta-waitlist-link" role="button" tabindex="0">
                or just join the waitlist
              </a>
            </p>
            <p class="cta-error" id="cta-error">Something went wrong — try again.</p>
          </div>

          <div class="inline-success" id="cta-success-analysis">
            <div class="inline-success-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M3.5 9l3.5 3.5 7-7" stroke="#34d399" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <p class="inline-success-text">Your analysis is on its way.</p>
            <p class="inline-success-sub">Check your inbox — we'll also let you know when ReAnchor launches.</p>
          </div>

          <div class="inline-success" id="cta-success-waitlist">
            <div class="inline-success-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M3.5 9l3.5 3.5 7-7" stroke="#34d399" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <p class="inline-success-text">You're on the list.</p>
            <p class="inline-success-sub">We'll reach out when ReAnchor launches.</p>
          </div>
        </div>
```

- [ ] **Step 2: Add bridge sentence to the insight card**

Find the insight card block (around line 1048):

```html
        <div class="insight-card" id="insight-card">
          <p class="insight-card-label">What this means for you</p>
          <p class="insight-card-text" id="insight-text"></p>
        </div>
```

Replace with:

```html
        <div class="insight-card" id="insight-card">
          <p class="insight-card-label">What this means for you</p>
          <p class="insight-card-text" id="insight-text"></p>
          <p class="insight-card-bridge">Your full analysis goes deeper on your highest dimension and what to focus on first.</p>
        </div>
```

- [ ] **Step 3: Verify in browser**

Complete the quiz and reach the results page. Confirm:
- New headline reads "Get your full analysis — free."
- "or just join the waitlist" link appears below the form
- No Netlify-related attributes remain in the DOM (inspect the form element — it should have no `data-netlify`, `name`, or honeypot fields)
- Bridge sentence appears below the insight text

- [ ] **Step 4: Commit**

```bash
git add reanchor/self-test.html
git commit -m "feat: redesign self-test CTA and remove netlify form"
```

---

## Task 4: Add CSS for new CTA elements

**Files:**
- Modify: `reanchor/self-test.html` (inside `<style>` block, after existing `.retake-link` styles, around line 759)

- [ ] **Step 1: Add styles for secondary link, error state, and bridge sentence**

Find the `.retake-link a:hover { text-decoration: underline; }` line (around line 759). Add the following immediately after:

```css
    .cta-secondary-wrap {
      margin-top: 14px;
      position: relative;
      z-index: 1;
    }
    .cta-secondary-link {
      font-size: 13px;
      color: var(--dim);
      cursor: pointer;
      text-decoration: underline;
      text-underline-offset: 3px;
      text-decoration-color: rgba(113,113,122,0.4);
      transition: color 0.15s;
    }
    .cta-secondary-link:hover { color: var(--muted); }

    .cta-error {
      display: none;
      font-size: 13px;
      color: var(--danger);
      margin-top: 10px;
      position: relative;
      z-index: 1;
    }
    .cta-error.show { display: block; }

    .insight-card-bridge {
      font-size: 13px;
      color: var(--dim);
      margin-top: 14px;
      line-height: 1.55;
      font-style: italic;
    }
```

- [ ] **Step 2: Verify in browser**

Reach the results page. Confirm:
- "or just join the waitlist" renders in muted color, underlined, below the form
- Bridge sentence in the insight card is italicized and muted
- No layout breakage on mobile (resize to 375px width)

- [ ] **Step 3: Commit**

```bash
git add reanchor/self-test.html
git commit -m "feat: add CSS for CTA secondary link, error state, and bridge sentence"
```

---

## Task 5: Implement submit logic and wire up events

**Files:**
- Modify: `reanchor/self-test.html` (inside `<script>` block)

- [ ] **Step 1: Add handleCtaSubmit function**

Find the `retakeTest()` function (around line 1422). Add the following block directly before it:

```javascript
    // ─────────────────────────────────────────────
    // CTA SUBMIT
    // ─────────────────────────────────────────────

    async function handleCtaSubmit(source) {
      const emailInput = document.getElementById('cta-email');
      const errorEl   = document.getElementById('cta-error');
      const submitBtn = document.getElementById('cta-submit');
      const waitlistLink = document.getElementById('cta-waitlist-link');
      const email = emailInput.value.trim();

      // Validate email
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailInput.style.borderColor = 'rgba(251,113,133,0.5)';
        emailInput.focus();
        return;
      }
      emailInput.style.borderColor = '';
      errorEl.classList.remove('show');

      // Disable UI while submitting
      submitBtn.disabled = true;
      waitlistLink.style.pointerEvents = 'none';
      waitlistLink.style.opacity = '0.4';

      // Build payload from current quiz state
      const dimScores = [1, 2, 3, 4].map(d =>
        [0, 1, 2, 3].reduce((sum, i) => sum + (answers['q_' + d + '_' + i] || 0), 0)
      );
      const total = dimScores.reduce((a, b) => a + b, 0);
      const profile = PROFILES.find(p => total >= p.range[0] && total <= p.range[1]);

      const { error } = await _supa.from('quiz_results').insert({
        email,
        total_score: total,
        dim_1: dimScores[0],
        dim_2: dimScores[1],
        dim_3: dimScores[2],
        dim_4: dimScores[3],
        profile: profile ? profile.name : '',
        answers: Object.assign({}, answers),
        cta_source: source
      });

      if (error) {
        errorEl.classList.add('show');
        submitBtn.disabled = false;
        waitlistLink.style.pointerEvents = '';
        waitlistLink.style.opacity = '';
        return;
      }

      // Show correct success state
      document.getElementById('cta-form-wrap').style.display = 'none';
      const successId = source === 'full_analysis' ? 'cta-success-analysis' : 'cta-success-waitlist';
      document.getElementById(successId).classList.add('show');
    }
```

- [ ] **Step 2: Wire up form submit and waitlist link events**

At the bottom of the `<script>` block, just before the closing `</script>` tag, add:

```javascript
    // ─────────────────────────────────────────────
    // CTA EVENT LISTENERS
    // ─────────────────────────────────────────────

    document.getElementById('cta-form').addEventListener('submit', function (e) {
      e.preventDefault();
      handleCtaSubmit('full_analysis');
    });

    document.getElementById('cta-waitlist-link').addEventListener('click', function () {
      handleCtaSubmit('waitlist');
    });

    document.getElementById('cta-waitlist-link').addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') handleCtaSubmit('waitlist');
    });
```

- [ ] **Step 3: Update retakeTest() to reset CTA state**

Find the `retakeTest()` function. It ends with `updateProgress(); window.scrollTo(...)`. Add the following lines inside `retakeTest()`, just before the closing `}`:

```javascript
      // Reset CTA
      document.getElementById('cta-form-wrap').style.display = '';
      document.getElementById('cta-success-analysis').classList.remove('show');
      document.getElementById('cta-success-waitlist').classList.remove('show');
      document.getElementById('cta-email').value = '';
      document.getElementById('cta-email').style.borderColor = '';
      document.getElementById('cta-submit').disabled = false;
      document.getElementById('cta-waitlist-link').style.pointerEvents = '';
      document.getElementById('cta-waitlist-link').style.opacity = '';
      document.getElementById('cta-error').classList.remove('show');
```

- [ ] **Step 4: Commit**

```bash
git add reanchor/self-test.html
git commit -m "feat: implement supabase submit logic for self-test CTA"
```

---

## Task 6: End-to-end verification

**Files:**
- No code changes — verification only

- [ ] **Step 1: Start local server**

```bash
python3 -m http.server 8080
```

Visit `http://localhost:8080/reanchor/self-test.html`

- [ ] **Step 2: Complete the quiz and test primary CTA**

Complete all 16 questions. On the results page:
1. Enter a real email address in the input
2. Click "Send my analysis →"
3. Confirm the form disappears and the success state shows: "Your analysis is on its way." with sub "Check your inbox — we'll also let you know when ReAnchor launches."

- [ ] **Step 3: Verify Supabase row (primary)**

In Supabase Table Editor → `quiz_results`, confirm a row was inserted with:
- Correct email
- `cta_source` = `"full_analysis"`
- `total_score` matching what the results page showed
- `dim_1`–`dim_4` matching the dimension breakdown bars
- `answers` jsonb containing all 16 keys (`q_1_0` through `q_4_3`) with values 1–5
- `profile` matching the profile name shown on screen (e.g. "Decision-Anxious")

- [ ] **Step 4: Test secondary waitlist link**

Click "Retake the test". Complete all 16 questions again with different answers. On the results page:
1. Enter an email
2. Click "or just join the waitlist"
3. Confirm success state shows: "You're on the list." with sub "We'll reach out when ReAnchor launches."

- [ ] **Step 5: Verify Supabase row (waitlist)**

In Table Editor, confirm new row has `cta_source` = `"waitlist"`.

- [ ] **Step 6: Test error state**

To simulate a Supabase error, temporarily break the table name in the insert call (change `'quiz_results'` to `'quiz_results_bad'`), submit the form, and confirm:
- "Something went wrong — try again." appears in danger color
- Form remains visible and button re-enables

Revert the table name change.

- [ ] **Step 7: Test empty/invalid email**

Leave email blank and click "Send my analysis →". Confirm the input border turns red and focus returns to the input. Enter `notanemail` and try again — confirm same validation behavior.

- [ ] **Step 8: Test retake resets CTA**

After a successful submission, click "Retake the test". Confirm the email form is visible again, email input is empty, and no success state is shown.

- [ ] **Step 9: Final commit if any fixes were made**

```bash
git add reanchor/self-test.html
git commit -m "fix: address issues found during e2e verification"
```

Only run this step if fixes were needed. Skip if all checks passed cleanly.
