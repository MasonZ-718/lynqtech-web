# GEO Audit Report: Lynq Tech / ReAnchor

**Audit Date:** 2026-04-16
**URL:** https://lynqtech.io
**Business Type:** Mobile App — Pre-launch (iOS, Spring 2026)
**Pages Analyzed:** 3 (/, /reanchor, /reanchor/self-test) + /mydecision (404)

---

## Executive Summary

**Overall GEO Score: 49/100 (Poor — pre-optimisation)**

Lynq Tech has a technically sound foundation — static HTML on Netlify, all AI crawlers allowed, and a well-written product page with FAQPage schema. The critical gaps were (1) a broken sitemap and stale llms.txt pointing to a 404 page, (2) near-zero off-site brand authority as a pre-launch company, and (3) schema completeness falling short of what's needed for rich results and AI entity recognition. All code-level issues have been fixed in this audit run.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 72/100 | 25% | 18.0 |
| Brand Authority | 12/100 | 20% | 2.4 |
| Content E-E-A-T | 42/100 | 20% | 8.4 |
| Technical GEO | 79/100 | 15% | 11.9 |
| Schema & Structured Data | 54/100 | 10% | 5.4 |
| Platform Optimization | 33/100 | 10% | 3.3 |
| **Overall GEO Score** | | | **49/100** |

**Projected score after all code fixes applied (this audit):** ~62/100

**Ceiling before launch:** ~68/100 — Brand Authority and Platform Optimization require real-world presence (App Store listing, press, community) that cannot be manufactured pre-launch.

---

## Fixes Applied in This Audit

All code-level issues were fixed immediately. Summary:

| Fix | File | Severity |
|---|---|---|
| Removed `/mydecision` (404) from sitemap; added `/reanchor` + `/reanchor/self-test` with lastmod | `sitemap.xml` | Critical |
| Rewrote `llms.txt` — replaced MyDecision with ReAnchor, added self-test, added Key Concepts section | `llms.txt` | Critical |
| Created `netlify.toml` with security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy) | `netlify.toml` | High |
| Enhanced Organization schema: added logo, expanded knowsAbout, enhanced founder node, added makesOffer | `index.html` | High |
| Enhanced WebSite schema: added description, publisher, inLanguage | `index.html` | Medium |
| Enhanced MobileApplication schema: added featureList, applicationSubCategory, softwareVersion, releaseNotes, PreOrder availability | `reanchor/index.html` | High |
| Fixed FAQPage schema: rewrote all 6 questions synced to live HTML (was 5), fixed drifted privacy answer | `reanchor/index.html` | High |
| Added HowTo schema for the Doubt Review process | `reanchor/index.html` | High |
| Added BreadcrumbList schema | `reanchor/index.html` | Medium |
| Fixed typo: "securly encripted" → "securely encrypted" | `reanchor/index.html` | Low |
| Fixed FAQ pricing contradiction: aligned to "free to download" consistently | `reanchor/index.html` | High |
| Added WebApplication schema + BreadcrumbList to self-test page (was zero schema) | `reanchor/self-test.html` | High |

---

## Remaining Issues

### High Priority (cannot be fixed in code alone)

**1. `sameAs` array in Organization schema is empty**
- The schema has `"sameAs": []` — fill in actual URLs once social/listing accounts exist.
- Add: LinkedIn company page, Twitter/X, Crunchbase, Product Hunt
- Impact: Entity disambiguation — biggest single GEO gain available

**2. No `og:image` on any page**
- All pages have OG tags but no `og:image`. Links shared from the site render without a preview image.
- Fix: Create a 1200×630 OG image for homepage and /reanchor.

**3. Research citations are image-only (logos), not linked to papers**
- Harvard, MIT, Stanford etc. appear as `<img>` elements in a marquee — AI systems cannot extract citation value from visual logos.
- Fix: Add a visible research sources section with 3–5 actual citations (author, title, institution, year).

**4. No visible publish/updated date on /reanchor**
- AI systems use dates to assess content freshness. No date = unknown freshness.
- Fix: Add a small visible "Last updated: [date]" near the page footer.

**5. Founder has no citable web presence**
- Mason Zarif is credited in JSON-LD and HTML but has no Person page, LinkedIn, or any indexed profile.
- Fix: Add a minimal About/Founder page at `/about`. This is the #1 E-E-A-T ceiling for this site.

---

### Medium Priority

**6. No contact information on any page**
- Zero email, social handle, or contact form. Reduces trustworthiness signals.
- Fix: Add at minimum one contact method to the footer.

**7. Privacy policy may still reference MyDecision**
- `/reanchor/privacy.html` — verify and update product name references.

---

### Low Priority (Post-Launch)

**8. `aggregateRating` missing from MobileApplication schema** — add after App Store reviews exist.
**9. `downloadUrl` missing from MobileApplication schema** — add after App Store listing exists.
**10. No `screenshot` in MobileApplication schema** — add once app screenshots exist.

---

## Category Deep Dives

### AI Citability — 72/100
**Strengths:** Product page has multiple direct, extractable definitions. FAQPage schema is implemented. The "A journal captures how you feel. ReAnchor captures why you decided." contrast is highly quotable. Founder origin story is specific and attributable.

**Weaknesses:** Research citations are visual-only (logos in a marquee, not linked to papers). FAQ accordion answers in collapsed state may be partially missed by some crawlers — FAQPage JSON-LD mitigates this.

**Best citable passages:**
- "ReAnchor is an iOS app that helps you record your decisions at the moment of clarity — what you decided, why, how you felt, and what you feared."
- "7 structured questions. 10 minutes. Separate new facts from old fears."
- "A journal captures how you feel. ReAnchor captures why you decided."

---

### Brand Authority — 12/100
**Context:** Lynq Tech was founded in 2025 and hasn't launched. This score is expected and will rise naturally post-launch.

**Current signals:** Domain live and indexed. Founder credited in structured data. Organization schema present with logo and makesOffer (now fixed).

**Missing:** Wikipedia/Wikidata, Reddit presence, YouTube content, LinkedIn company page, Product Hunt listing, press coverage, backlinks.

**Fastest gains:** Wikidata entity (30 min), Crunchbase listing (20 min), LinkedIn company page (20 min), Product Hunt page before launch.

---

### Content E-E-A-T — 42/100
**Strengths:** Founder personal narrative is genuine and specific. Self-test cites validated instruments with disclaimers. Privacy claims are consistent. Pre-launch status is transparent.

**Weaknesses:** Authoritativeness is the ceiling — Mason Zarif has no citable external web presence. Statistics (78%, 60%, 3x) lack traceable citations. No supporting content cluster.

---

### Technical GEO — 79/100
**Strengths:** Static HTML on Netlify CDN. All AI crawlers explicitly allowed. Canonical tags on all pages.

**Fixed:** Sitemap now accurate. netlify.toml created with security headers.

**Remaining:** Verify Netlify dashboard that no `X-Robots-Tag` headers block crawlers. Confirm `/reanchor/self-test` clean URL works (Netlify pretty URLs are on by default).

---

### Schema & Structured Data — 54/100 → ~82/100 after fixes
**Fixed:** MobileApplication enhanced with featureList, availability, softwareVersion. FAQPage synced to 6 questions. HowTo schema added. BreadcrumbList added on both /reanchor and /reanchor/self-test. self-test now has WebApplication + BreadcrumbList. Organization enhanced with logo, makesOffer, expanded knowsAbout.

**Remaining:** Add `sameAs` URLs once accounts exist. Post-launch: aggregateRating, downloadUrl, screenshot.

---

### Platform Optimization — 33/100
| Platform | Score | Key Action |
|---|---|---|
| Google AI Overviews | 42/100 | FAQPage schema is the asset; needs organic ranking to trigger AIO |
| ChatGPT | 18/100 | Wikidata entry + Bing Webmaster Tools registration |
| Perplexity | 22/100 | Reddit posts in r/productivity (46.7% of Perplexity citations are Reddit) |
| Gemini | 28/100 | Google Business Profile + sameAs in Organization schema |
| Bing Copilot | 15/100 | Bing Webmaster Tools + corrected sitemap submission |

---

## Quick Wins (Implement This Week)

1. **Fill in `sameAs` array** in `index.html` Organization schema with real social URLs
2. **Add `og:image`** to homepage and /reanchor (1200×630)
3. **Create Wikidata entity** for Lynq Tech
4. **Register on Bing Webmaster Tools** and submit corrected sitemap
5. **Create LinkedIn company page** — reference in sameAs
6. **Create Crunchbase listing** — reference in sameAs
7. **Create Product Hunt page** before launch
8. **Add visible "Last updated" date** to /reanchor

---

## 30-Day Action Plan

### Week 1: Code fixes — ✅ Done in this audit
- [x] Fix sitemap.xml
- [x] Rewrite llms.txt
- [x] Create netlify.toml with security headers
- [x] Enhance all schema across all pages
- [x] Fix FAQ pricing contradiction
- [x] Fix privacy answer typo
- [x] Add HowTo, BreadcrumbList, WebApplication schema

### Week 2: Entity infrastructure
- [ ] Create Wikidata entry for Lynq Tech
- [ ] Create Crunchbase listing
- [ ] Create LinkedIn company page
- [ ] Create Product Hunt page
- [ ] Fill in `sameAs` array in index.html with real URLs
- [ ] Register on Bing Webmaster Tools + submit sitemap
- [ ] Add og:image to homepage and /reanchor

### Week 3: Content depth
- [ ] Add Founder/About page at /about
- [ ] Add visible research citations section to /reanchor (3–5 real paper references)
- [ ] Add "Last updated" date to /reanchor
- [ ] Add contact information to footer

### Week 4: Community seeding (pre-launch)
- [ ] Post in r/productivity, r/decisionmaking (authentic, value-first)
- [ ] Post on Hacker News — Show HN thread
- [ ] Post on Indie Hackers
- [ ] Share self-test on relevant communities to build inbound links

---

## Appendix: Pages Analyzed

| URL | Status | GEO Issues Remaining |
|---|---|---|
| https://lynqtech.io/ | 200 | sameAs empty; og:image missing |
| https://lynqtech.io/reanchor | 200 | Research citations image-only; no visible date; no contact |
| https://lynqtech.io/reanchor/self-test | 200 | No visible instrument citations |
| https://lynqtech.io/mydecision | 404 | Removed from sitemap and llms.txt |
