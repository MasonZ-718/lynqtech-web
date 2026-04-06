# GEO Audit Report: MyDecision / Lynq Tech

**Audit Date:** 2026-04-06
**URL:** https://lynqtech.io/mydecision
**Business Type:** Mobile App — Pre-launch waitlist (iOS, Spring 2026)
**Pages Analyzed:** 2 (lynqtech.io, lynqtech.io/mydecision)

---

## Executive Summary

**Overall GEO Score: 26/100 (Critical)**

MyDecision's landing page has strong emotional copywriting and a clear product narrative, but is nearly invisible to AI systems. The site has zero schema markup, no robots.txt, no sitemap, no llms.txt, no Open Graph tags, no sourced citations, and no off-site brand presence. As a pre-launch product this is expected — but fixing the technical GEO layer now costs almost nothing and ensures that when AI systems (ChatGPT, Perplexity, Claude) are asked about "decision journaling apps," MyDecision has a chance to appear.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 42/100 | 25% | 10.5 |
| Brand Authority | 12/100 | 20% | 2.4 |
| Content E-E-A-T | 35/100 | 20% | 7.0 |
| Technical GEO | 28/100 | 15% | 4.2 |
| Schema & Structured Data | 5/100 | 10% | 0.5 |
| Platform Optimization | 8/100 | 10% | 0.8 |
| **Overall GEO Score** | | | **26/100** |

---

## Critical Issues (Fix Immediately)

### 1. Zero Schema.org Markup — Both Pages
Neither `lynqtech.io` nor `lynqtech.io/mydecision` contains any JSON-LD or microdata. AI systems rely heavily on structured data to understand what a product is, who makes it, and what it does. Without an `Organization` or `MobileApplication` schema, the site is essentially unclassifiable by AI.

**Fix:** Add the following JSON-LD blocks (see Quick Wins section for code).

### 2. No robots.txt
A 404 on `/robots.txt` means AI crawlers (GPTBot, ClaudeBot, PerplexityBot) receive no signals. While they will crawl anyway, the absence of a robots.txt is a technical signal of an unmanaged site and some crawlers deprioritize such domains.

**Fix:** Create `/robots.txt` allowing all crawlers, and point to the sitemap.

### 3. No Open Graph / Twitter Card Meta Tags
Neither page has `og:title`, `og:description`, `og:image`, or `twitter:card`. When anyone shares the URL on social media or in AI chat interfaces, it renders as a blank card. This also suppresses distribution signals that AI systems use.

**Fix:** Add OG meta tags to both pages (5-minute fix).

---

## High Priority Issues

### 4. No llms.txt File
`/llms.txt` returned 404. This is the emerging standard (analogous to `robots.txt`) that tells AI systems what the site is about, what content is available, and how to navigate it. Perplexity and others actively look for it.

**Fix:** Create `/llms.txt` with a plain-language description of Lynq Tech and MyDecision.

### 5. No Sitemap
`/sitemap.xml` returns 404. Without a sitemap, AI crawlers must discover pages through links alone. With only 2 pages and no internal linking between sections, discovery is highly limited.

**Fix:** Create a simple `/sitemap.xml` listing both pages.

### 6. Statistics Without Sources
The landing page cites three statistics ("78% of people doubt a major decision within 3 weeks," "60% reverse good decisions due to doubt," "3× more likely to regret backing out") with no citations, sources, or links. AI systems cannot cite or repeat statistics they cannot verify, and unverified claims reduce E-E-A-T scores.

**Fix:** Add footnotes or a "Sources" section linking to real research (psychology, behavioral economics). If these are original estimates, label them as such.

### 7. Founder Has No Verifiable Identity
The page references "Mason, founder of MyDecision" but there is no last name, no LinkedIn link, no Twitter/X, no About page, and no photo. AI systems build entity graphs. A founder without a verifiable public identity is invisible to those graphs.

**Fix:** Add Mason's last name and one external profile link (LinkedIn minimum). Create a minimal `/about` page.

---

## Medium Priority Issues

### 8. No Meta Description on Root Homepage (lynqtech.io)
The root homepage has no `<meta name="description">` tag. The /mydecision page has one in the HTML but it's not being detected by crawlers reliably.

**Fix:** Verify the meta description tag is in the `<head>` (not dynamically injected) on both pages.

### 9. No Canonical Tags
Neither page has `<link rel="canonical">`. Without canonical tags, if the page is accessible via multiple URLs (http vs https, www vs non-www, trailing slash variants), AI crawlers may index duplicate versions and split authority.

**Fix:** Add `<link rel="canonical" href="https://lynqtech.io/mydecision">` to the mydecision page.

### 10. Content Is Not Structured for AI Extraction
The landing page is written as emotional narrative (excellent for human conversion) but lacks structured Q&A blocks that AI systems extract to answer user queries. AI models prefer content that directly answers "What is MyDecision?", "How does MyDecision work?", "Who is MyDecision for?" in clear, extractable prose.

**Fix:** Add a hidden-from-design but crawlable FAQ section, or restructure one section as explicit Q&A.

### 11. No External Links to Authoritative Sources
The page has zero outbound links. While this preserves "link equity" in traditional SEO, in GEO it signals low E-E-A-T — authoritative content always cites its sources.

---

## Low Priority Issues

### 12. JavaScript-Dependent Content
The morphing doubt text, counter animations, and scroll-reveal effects are JavaScript-dependent. While modern crawlers execute JS, dynamic content that changes on every render is harder to index consistently.

### 13. No RSS or Content Feed
No blog, no feed, no recurring content signal. AI systems favor sites that produce fresh content they can learn from.

### 14. No Favicon or Apple Touch Icon Referenced
Minor, but contributes to site completeness signals.

---

## Category Deep Dives

### AI Citability: 42/100
The writing is emotionally compelling and highly human — but AI citability requires a different structure. AI systems extract content when it:
- Directly answers a specific question
- Contains a verifiable statistic with a source
- Uses clear entity definitions ("MyDecision is a mobile app that...")
- Has a dedicated FAQ block with schema markup

**What's working:** The "2:47 AM" pain narrative is vivid and memorable. The three-step "How It Works" section is structured and extractable. The founder quote is citable if attributed properly.

**What's missing:** A definitional paragraph ("MyDecision is..."), sourced statistics, FAQ schema, and a structured "Who is this for?" section.

**Rewrite suggestion for top of page:**
> "MyDecision is an iOS app that helps people document their decisions at the moment of clarity, then revisit them when doubt sets in. Built for anyone who has made a hard call and later struggled to remember why."

This single paragraph would be cited by AI systems when users ask "what is MyDecision."

---

### Brand Authority: 12/100
As a pre-launch product, this is expected. However:
- No Reddit presence (no posts in r/productivity, r/DecisionMaking, r/Entrepreneur)
- No YouTube content
- No LinkedIn company page detected
- No Product Hunt listing
- No press or blog mentions
- No Wikipedia entity

**Path forward:** Brand authority is built over time, but seeding early Reddit comments, a LinkedIn page, and a Product Hunt launch will rapidly improve this score post-launch.

---

### Content E-E-A-T: 35/100
**Experience:** The founder story (leaving a job, making a hard decision) is authentic and powerful — this is a genuine E signal. ✓

**Expertise:** No credentials, no research links, no external evidence of domain expertise in psychology or behavioral science.

**Authoritativeness:** No press, no backlinks, no external endorsements.

**Trustworthiness:** Privacy claim ("all data stays on your device") is strong. No privacy policy page linked. No terms of service. This is a trust gap, especially for an app asking for email addresses.

**Fix:** Link to or create a `/privacy` page. Add Mason's full name and LinkedIn.

---

### Technical GEO: 28/100
| Signal | Status |
|---|---|
| robots.txt | ❌ Missing (404) |
| sitemap.xml | ❌ Missing (404) |
| llms.txt | ❌ Missing (404) |
| Canonical tags | ❌ Missing |
| Open Graph tags | ❌ Missing |
| Meta description (/mydecision) | ✓ Present in HTML |
| HTTPS | ✓ Present |
| Static HTML (crawlable) | ✓ No SSR issues |
| Mobile optimized | ✓ Responsive CSS |
| Page speed | ⚠ Unknown (Google Fonts load may add latency) |

---

### Schema & Structured Data: 5/100
Zero schema markup anywhere on the site. For a mobile app in pre-launch, the minimum viable schema set is:

1. `Organization` on lynqtech.io
2. `MobileApplication` on /mydecision
3. `FAQPage` on /mydecision
4. `WebSite` with sitelinks search on root

---

### Platform Optimization: 8/100
No detectable presence on:
- Reddit (r/productivity, r/entrepreneur, r/decisionmaking)
- Product Hunt
- LinkedIn (company page)
- YouTube
- Any podcast appearance
- Any newsletter feature

This is normal pre-launch. A coordinated launch across these platforms will dramatically improve AI visibility within 60-90 days.

---

## Quick Wins — Implement This Week

### 1. Add JSON-LD Schema to Both Pages (30 min)

Add to `<head>` of `lynqtech.io/index.html`:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Lynq Tech",
  "url": "https://lynqtech.io",
  "description": "Building tools for clearer thinking.",
  "founder": { "@type": "Person", "name": "Mason [LastName]" },
  "sameAs": ["https://linkedin.com/company/lynqtech"]
}
</script>
```

Add to `<head>` of `mydecision/index.html`:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "MyDecision",
  "url": "https://lynqtech.io/mydecision",
  "description": "An anchor for your decisions. Record your decisions at the moment of clarity, then revisit them when doubt sets in.",
  "operatingSystem": "iOS",
  "applicationCategory": "LifestyleApplication",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Person", "name": "Mason [LastName]" }
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is MyDecision?",
      "acceptedAnswer": { "@type": "Answer", "text": "MyDecision is an iOS app that helps you record your decisions at the moment of clarity, so you can return to them when doubt sets in. It includes a structured Doubt Review flow to help you separate new facts from old fears." }
    },
    {
      "@type": "Question",
      "name": "How does MyDecision work?",
      "acceptedAnswer": { "@type": "Answer", "text": "You anchor a decision by writing what you decided, why, how you felt, and what you feared. When doubt arrives later, you open the app and do a Doubt Review — 7 structured questions in 10 minutes that help you determine whether something actually changed or whether it's just fear." }
    },
    {
      "@type": "Question",
      "name": "Who is MyDecision for?",
      "acceptedAnswer": { "@type": "Answer", "text": "MyDecision is for anyone who has made a hard decision — leaving a job, ending a relationship, starting a business, moving cities — and later struggled to stay confident in it when doubt or outside pressure arrived." }
    }
  ]
}
</script>
```

### 2. Add Open Graph Meta Tags (10 min)

Add to `<head>` of `mydecision/index.html`:
```html
<meta property="og:title" content="MyDecision — Stop Second-Guessing Yourself" />
<meta property="og:description" content="Record your decisions at the moment of clarity. Return to them when doubt shows up at 2am." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://lynqtech.io/mydecision" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="MyDecision — Stop Second-Guessing Yourself" />
<meta name="twitter:description" content="An anchor for your decisions. Built for the moment doubt comes back." />
<link rel="canonical" href="https://lynqtech.io/mydecision" />
```

### 3. Create robots.txt (5 min)

Create `/robots.txt`:
```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://lynqtech.io/sitemap.xml
```

### 4. Create sitemap.xml (5 min)

Create `/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://lynqtech.io/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://lynqtech.io/mydecision</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 5. Create llms.txt (10 min)

Create `/llms.txt`:
```
# Lynq Tech

> Building tools for clearer thinking.

Lynq Tech is an indie software company building small, focused mobile apps for the decisions and moments that matter.

## Products

- [MyDecision](https://lynqtech.io/mydecision): An iOS app for recording and revisiting important decisions. Designed for people who make hard calls and later struggle with doubt.

## About

Founded by Mason [LastName]. Currently in pre-launch. MyDecision launches Spring 2026.

## Contact

hello@lynqtech.io
```

---

## 30-Day Action Plan

### Week 1: Technical Foundation
- [ ] Add JSON-LD schema to both pages (Organization + MobileApplication + FAQPage)
- [ ] Add Open Graph and Twitter Card meta tags
- [ ] Create robots.txt explicitly allowing all AI crawlers
- [ ] Create sitemap.xml
- [ ] Create llms.txt
- [ ] Add canonical tags to both pages

### Week 2: E-E-A-T & Identity
- [ ] Add Mason's full name and LinkedIn URL to the philosophy section
- [ ] Create a minimal `/about` page with founder bio and mission
- [ ] Create a `/privacy` page (required for app store trust anyway)
- [ ] Source the three statistics on the landing page with real links

### Week 3: Platform Seeding
- [ ] Create LinkedIn company page for Lynq Tech
- [ ] Post in r/productivity, r/DecisionMaking, r/Entrepreneur (genuine participation, not spam)
- [ ] Submit to Product Hunt upcoming page
- [ ] Post a founder story on LinkedIn (Mason's personal account)

### Week 4: Content Expansion
- [ ] Write one long-form blog post on the topic of decision regret (targets AI citability)
- [ ] Add a visible FAQ section to the landing page (complements the JSON-LD above)
- [ ] Add a "What is MyDecision?" definitional paragraph near the top of the page

---

## Appendix: Pages Analyzed

| URL | Title | Status | Key Issues |
|---|---|---|---|
| https://lynqtech.io | (no title tag) | 200 | No title, no meta description, no schema, no OG |
| https://lynqtech.io/mydecision | MyDecision — Stop Second-Guessing Yourself | 200 | No schema, no OG, no canonical, unsourced stats |
| https://lynqtech.io/robots.txt | — | 404 | Missing |
| https://lynqtech.io/sitemap.xml | — | 404 | Missing |
| https://lynqtech.io/llms.txt | — | 404 | Missing |

---

*Report generated by /geo-audit — GEO-SEO Claude Skill*
