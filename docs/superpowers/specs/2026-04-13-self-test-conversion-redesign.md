# Self-Test Conversion Redesign

**Date:** 2026-04-13
**File:** `reanchor/self-test.html`

## Overview

Redesign the results CTA on the self-test page to improve conversion by replacing the generic "Join Waitlist" prompt with a value-first "Get your full analysis — free" offer. Capture user scores and individual answers in Supabase to enable targeted follow-up. Remove Netlify form integration entirely.

## Goals

1. Increase email capture rate by framing the CTA as delivering personalized value (analysis email), not just access to a waitlist.
2. Build a rich user profile in Supabase: email + all scores + all 16 individual answers + which CTA they clicked.
3. Keep "join the waitlist" as a lower-friction secondary option for users who don't want the report.

## Changes

### 1. Results page — minor addition

Add one sentence at the bottom of the existing insight card bridging to the CTA:

> "Your full analysis goes deeper on your highest dimension and what to focus on first."

No other changes to the results display (score ring, dimension bars, profile name/desc, insight card all stay as-is).

### 2. CTA block — redesign

Replace the current CTA content with:

- **Eyebrow:** `Your results are ready`
- **Headline:** `Get your full analysis — free.`
- **Sub:** `We'll send a personalized breakdown for your highest dimension, with what it means and where to start. You'll also be first in line when ReAnchor launches.`
- **Form:** single email input + primary button `Send my analysis →`
- **Secondary option:** small muted text link below the form: `or just join the waitlist`
- **Success state (primary):** headline `Your analysis is on its way.` + sub `Check your inbox — we'll also let you know when ReAnchor launches.`
- **Success state (secondary):** headline `You're on the list.` + sub `We'll reach out when ReAnchor launches.`
- **Error state:** inline text `Something went wrong — try again.` (retry keeps form visible)

### 3. Remove Netlify form

Remove from the `<form>` element:
- `data-netlify="true"`
- `netlify-honeypot="bot-field"`
- `name="waitlist-selftest"`
- Hidden `<input name="form-name" value="waitlist-selftest" />`
- Hidden `<p style="display:none"><input name="bot-field" /></p>`

The `<form>` element itself stays (for semantics/accessibility) but submission is handled entirely by JS via Supabase. Prevent default form POST with `event.preventDefault()`.

### 4. Supabase integration

Add Supabase JS CDN to `self-test.html` (reuse same project URL + anon key from `reanchor/index.html`):

```
https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js
```

On submit, insert one row into a `quiz_results` table:

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | auto-generated |
| `email` | text | from input |
| `total_score` | int | sum of all 16 answers |
| `dim_1` | int | Analysis Paralysis (4–20) |
| `dim_2` | int | Post-Decision Rumination (4–20) |
| `dim_3` | int | Maximizing Tendency (4–20) |
| `dim_4` | int | Avoidance & Approval (4–20) |
| `profile` | text | e.g. "Decision-Anxious" |
| `answers` | jsonb | `{"q_1_0": 4, "q_1_1": 3, ...}` — all 16 keys |
| `cta_source` | text | `"full_analysis"` or `"waitlist"` |
| `created_at` | timestamptz | auto (default now()) |

The `quiz_results` table must be created in Supabase before deployment. RLS policy: insert allowed for anon role, select/update/delete not allowed for anon.

Submit flow:
1. User clicks primary button or secondary link
2. Validate email (non-empty, basic format)
3. Call `supabase.from('quiz_results').insert({...})`
4. On success: hide form, show correct success state
5. On error: show inline error, keep form visible for retry

The `cta_source` value is set by which action triggered the submit: `"full_analysis"` for the primary button, `"waitlist"` for the text link.

## What is NOT changing

- Quiz flow (intro → 4 dimension steps → results)
- Results display (score ring, dimension bars, interpretations, insight card)
- Footer
- Retake link
- All existing CSS (new styles added for error state and updated CTA copy only)
