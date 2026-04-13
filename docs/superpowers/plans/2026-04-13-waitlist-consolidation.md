# Waitlist Consolidation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Retire the separate `waitlist` table and make `quiz_results` the single source of truth for all email signups, with quiz fields nullable for landing-page-only signups.

**Architecture:** Three changes in sequence — DB migration first (make quiz columns nullable + add UNIQUE on email + migrate existing waitlist rows), then update the self-test submit to upsert instead of insert, then update the landing page to write to `quiz_results` and count from it. The `waitlist` table is kept in Supabase but no longer written to or read from. Email uniqueness is enforced at the DB level; the landing page uses `ignoreDuplicates: true` so an existing test-submission row is never overwritten with nulls.

**Tech Stack:** Supabase Postgres (migrations via MCP), Supabase JS v2 CDN, vanilla JS in `reanchor/index.html` and `reanchor/self-test.html`

---

## File Map

| File | Action | What changes |
|---|---|---|
| Supabase SQL editor | Migration | Nullable columns, UNIQUE constraint, migrate existing rows |
| `reanchor/self-test.html` | Modify | `.insert()` → `.upsert()` with `onConflict: 'email'` |
| `reanchor/index.html` | Modify | Count query + insert both point to `quiz_results` |

---

## Task 1: DB migration — nullable columns, unique constraint, data migration

**Files:**
- Supabase dashboard SQL editor (no local file)

- [ ] **Step 1: Run the migration**

Go to https://supabase.com/dashboard/project/rzxvpkbhortfcaavqjgu/sql/new and run:

```sql
-- Make quiz-specific columns nullable (landing page signups won't have these)
alter table public.quiz_results
  alter column total_score drop not null,
  alter column dim_1       drop not null,
  alter column dim_2       drop not null,
  alter column dim_3       drop not null,
  alter column dim_4       drop not null,
  alter column profile     drop not null,
  alter column answers     drop not null;

-- Single source of truth: one row per email
alter table public.quiz_results
  add constraint quiz_results_email_key unique (email);

-- Migrate existing waitlist rows (landing page signups before consolidation)
insert into public.quiz_results (email, cta_source, created_at)
select email, 'landing_page', created_at
from   public.waitlist
on conflict (email) do nothing;
```

- [ ] **Step 2: Verify columns are nullable**

In the Supabase Table Editor → `quiz_results`, click any row. Confirm that `total_score`, `dim_1`–`dim_4`, `profile`, and `answers` show as nullable (no red asterisk). Also confirm the `email` column now shows a UNIQUE badge.

- [ ] **Step 3: Verify waitlist rows were migrated**

Run in SQL editor:

```sql
select email, cta_source, total_score, created_at
from public.quiz_results
where cta_source = 'landing_page'
order by created_at;
```

Expected: one or more rows with `total_score = null` and `cta_source = 'landing_page'` — one for each row that was in `waitlist`.

Also confirm the total count is correct:

```sql
select
  (select count(*) from public.waitlist) as old_waitlist_count,
  (select count(*) from public.quiz_results where cta_source = 'landing_page') as migrated_count;
```

Expected: both counts match.

---

## Task 2: Update self-test submit to upsert

**Files:**
- Modify: `reanchor/self-test.html` (inside `handleCtaSubmit` function, ~line 1512)

- [ ] **Step 1: Find the current insert call**

In `reanchor/self-test.html`, inside `handleCtaSubmit`, find this line:

```javascript
      const { error } = await _supa.from('quiz_results').insert({
```

- [ ] **Step 2: Replace insert with upsert**

Replace the entire insert call (from `const { error } =` through the closing `});`) with:

```javascript
      const { error } = await _supa.from('quiz_results').upsert({
        email,
        total_score: total,
        dim_1: dimScores[0],
        dim_2: dimScores[1],
        dim_3: dimScores[2],
        dim_4: dimScores[3],
        profile: profile ? profile.name : '',
        answers: Object.assign({}, answers),
        cta_source: source
      }, { onConflict: 'email' });
```

The only change is `.insert(` → `.upsert(` and adding `, { onConflict: 'email' }` as the second argument. Everything else stays identical.

This means: if someone signed up on the landing page and then takes the test, their existing row gets upgraded with the full quiz data. If they're new, a fresh row is inserted.

- [ ] **Step 3: Verify by reading the updated block**

Read the `handleCtaSubmit` function and confirm:
- The call is `.upsert(` not `.insert(`
- The second argument is `{ onConflict: 'email' }`
- The payload object is unchanged (all 9 fields present)

- [ ] **Step 4: Commit**

```bash
git add reanchor/self-test.html
git commit -m "feat: upsert quiz results on email conflict"
```

---

## Task 3: Update landing page — count query and insert

**Files:**
- Modify: `reanchor/index.html` (~lines 3101 and 3153)

- [ ] **Step 1: Update the count query**

Find this line (~line 3101):

```javascript
        return _supa.from('waitlist').select('*', { count: 'exact', head: true });
```

Replace with:

```javascript
        return _supa.from('quiz_results').select('*', { count: 'exact', head: true });
```

One word changes: `'waitlist'` → `'quiz_results'`.

- [ ] **Step 2: Update the insert**

Find this block (~line 3152):

```javascript
      try {
        await _supa.from('waitlist').insert({ email });
      } catch (_) {
        // best-effort — still show success to avoid blocking UX
      }
```

Replace with:

```javascript
      try {
        await _supa.from('quiz_results').upsert(
          { email, cta_source: 'landing_page' },
          { onConflict: 'email', ignoreDuplicates: true }
        );
      } catch (_) {
        // best-effort — still show success to avoid blocking UX
      }
```

`ignoreDuplicates: true` maps to `ON CONFLICT DO NOTHING` — if the email already exists (e.g. from a prior test submission), we leave the existing row untouched rather than overwriting quiz data with nulls.

- [ ] **Step 3: Verify both changes by reading the relevant sections**

Read lines ~3095–3110 and ~3148–3160 of `reanchor/index.html`. Confirm:
- Count query: `from('quiz_results')`, not `from('waitlist')`
- Insert: `from('quiz_results').upsert(...)` with `ignoreDuplicates: true`
- No other references to `from('waitlist')` remain in the JS (grep to be sure)

```bash
grep -n "from('waitlist')" reanchor/index.html
```

Expected: no matches.

- [ ] **Step 4: Commit**

```bash
git add reanchor/index.html
git commit -m "feat: consolidate waitlist into quiz_results table"
```

---

## Task 4: End-to-end verification

**Files:**
- No code changes — verification only

- [ ] **Step 1: Start local server**

```bash
python3 -m http.server 8080
```

Visit `http://localhost:8080/reanchor/index.html`

- [ ] **Step 2: Verify waitlist count reflects quiz_results**

The counter showing "X people already on the list" should match:

```sql
select (select value from public.display_offsets where key = 'waitlist_base') +
       (select count(*) from public.quiz_results) as expected_display_count;
```

Note: `BASE_COUNT` in the JS is 247 and gets overridden by `display_offsets.waitlist_base` if set. Add the `quiz_results` count on top of whatever base is set.

- [ ] **Step 3: Submit from the landing page with a new email**

Enter a fresh email (e.g. `test-landing@example.com`) and click "Join Waitlist". Confirm:
- Success state appears
- Counter increments by 1

Verify in Supabase:

```sql
select email, cta_source, total_score, answers
from public.quiz_results
where email = 'test-landing@example.com';
```

Expected: one row with `cta_source = 'landing_page'`, `total_score = null`, `answers = null`.

- [ ] **Step 4: Test deduplication — same email takes the quiz**

Visit `http://localhost:8080/reanchor/self-test.html`. Complete the quiz (answer all 16 questions). On the results page, enter the same email (`test-landing@example.com`) and click "Send my analysis →".

Verify in Supabase:

```sql
select email, cta_source, total_score, answers
from public.quiz_results
where email = 'test-landing@example.com';
```

Expected: still only ONE row, but now `total_score` and `answers` are populated (the landing page row was upgraded by the upsert). `cta_source` should now reflect the test submission source.

Also verify total count in `quiz_results` did NOT increase (still same number — no duplicate row was created).

- [ ] **Step 5: Test deduplication — quiz first, then landing page**

Use a new email (e.g. `test-quiz-first@example.com`). Complete and submit the self-test. Then visit the landing page and submit the same email via "Join Waitlist".

Verify in Supabase:

```sql
select email, cta_source, total_score, answers
from public.quiz_results
where email = 'test-quiz-first@example.com';
```

Expected: still ONE row, quiz data unchanged (the landing page upsert with `ignoreDuplicates: true` did not overwrite the quiz data).

- [ ] **Step 6: Stop server**

```bash
kill $(lsof -ti:8080)
```
