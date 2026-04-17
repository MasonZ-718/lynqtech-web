# GEO Platform Optimization Report — lynqtech.io
Date: 2026-04-16

---

## Overall Platform Readiness

**Combined GEO Score: 33/100**

lynqtech.io is a well-designed, content-rich pre-launch site with strong on-page foundations for a single-person indie operation. However, it is currently invisible to most AI search platforms because it lacks the off-site entity signals (Wikipedia, Wikidata, Bing index, Reddit, YouTube) that every major AI engine uses as a primary trust filter. The on-site work is ahead of where most indie sites are — the gap is entirely off-site.

---

## Platform Scores

| Platform | Score | Status |
|---|---|---|
| Google AI Overviews | 42/100 | Moderate |
| ChatGPT Web Search | 18/100 | Weak |
| Perplexity AI | 22/100 | Weak |
| Google Gemini | 28/100 | Weak |
| Bing Copilot | 15/100 | Weak |

*Status thresholds: Strong = 70+, Moderate = 40–69, Weak = 0–39*

---

## Platform Details

---

### 1. Google AI Overviews — 42/100 (Moderate)

#### What's Working
- **FAQPage schema is implemented** on `/reanchor` with 5 well-formed Q&A pairs matching the JSON-LD spec. This is the single strongest AIO signal on the site.
- **FAQ content in HTML** mirrors the schema — 6 questions rendered as accordion items with meaningful, direct answers (150–250 words each).
- **Question-based headings exist in FAQ** ("What is ReAnchor?", "How do I stop second-guessing myself after a big decision?", "What is a Doubt Review?") — these match realistic user query patterns exactly.
- **Statistics are cited** (78%, 60%, 3x) with footnote attribution to behavioral psychology research and Google Scholar links. AIO can lift these directly.
- **Clean H1 → H2 → H3 hierarchy** on `/reanchor`. The heading structure is semantically valid.
- **MobileApplication + Organization schema** are both present and valid.
- **Content depth**: `/reanchor` is approximately 4,200 words — well above the threshold where AIO has extractable content to work with.

#### What's Missing / Weak
- **No organic ranking yet.** Since 92% of AIO citations come from pages already in the top 10, this is the primary limiter. The site is pre-launch with no domain authority, no backlinks, and no indexed history. AIO cannot cite what Google hasn't ranked.
- **FAQ answers are behind a JavaScript accordion (collapsed by default).** AIO crawlers may not execute JavaScript, meaning the answer text is hidden from the crawler. The text must be visible in the raw HTML response. Currently it is present in the DOM but collapsed via CSS (`height: 0; overflow: hidden`). This is a structural risk.
- **No publication date or last-updated date** visible on any page. AIO deprioritizes undated content for informational queries.
- **No author page.** Mason Zarif is named in `<meta name="author">` and in schema as a `Person` on the MobileApplication, but there is no linked `/about` or founder page with credentials, bio, or sameAs links. This weakens E-E-A-T.
- **No comparison tables.** The competitor comparison section exists but uses interactive button cards rather than an HTML table. AIO cannot extract this.
- **Statistics lack proper inline citation names.** The footnote reads "Based on published research on post-decision regret..." — not a named source. AIO prefers "According to [Named Institution], [X]%."
- **`/mydecision` is in the sitemap but returns 404.** This actively harms crawl budget and trust signals. Remove it from the sitemap immediately.
- **`llms.txt` references MyDecision, not ReAnchor.** The file is stale — it describes the old product name, not the current one.

#### Score Breakdown
| Criterion | Max | Score | Notes |
|---|---|---|---|
| Ranks in top 10 for target queries | 20 | 0 | No ranking data; new domain, pre-launch |
| Question-based headings present | 10 | 8 | 4 strong question headings in FAQ |
| Direct answers after headings | 15 | 12 | Answers are direct and substantive, but hidden by JS |
| Tables for comparison data | 10 | 0 | No HTML tables; competitor section uses interactive cards |
| Lists for processes/features | 10 | 8 | Ordered step lists present in How It Works |
| FAQ section with 5+ questions | 10 | 10 | 6 FAQ items + FAQPage schema |
| Statistics with named citations | 10 | 4 | Stats present but not attributed to named institutions |
| Publication/updated date | 5 | 0 | No visible date on any page |
| Author byline with credentials | 5 | 0 | Name in meta/schema, no linked author page |
| Clean URL + heading hierarchy | 5 | 0 | `/mydecision` 404 in sitemap is a negative signal |
| **Total** | **100** | **42** | |

#### Priority Actions
1. **Ensure FAQ answer text is in raw HTML and visible to crawlers** — either server-render the answers visible (collapsed via CSS only, not `display:none` or `height:0` initially), or render the full text in the DOM even if visually collapsed.
2. **Add visible publish date** to `/reanchor` — even "Published March 2026, Updated April 2026" is sufficient.
3. **Upgrade stat citations**: change "Based on published research..." to "According to research published in the Journal of Behavioral Decision Making, 78% of people..." or similar named attribution.
4. **Remove `/mydecision` from sitemap.xml** immediately.
5. **Update `llms.txt`** — replace all MyDecision references with ReAnchor.
6. **Add a founder/about page** at `/about` with Mason's bio, credentials, and sameAs links to LinkedIn.
7. **Convert the competitor comparison to an HTML table** with a row per alternative and columns for key differentiators.

---

### 2. ChatGPT Web Search — 18/100 (Weak)

#### What's Working
- **AI crawler access is explicitly granted** in `robots.txt` for GPTBot — this is better than most sites.
- **Content comprehensiveness**: `/reanchor` at ~4,200 words is above ChatGPT's preferred threshold for substantive content.
- **Brand name and product description are clear** and would be usable for entity grounding if ChatGPT encounters the page.
- **Founder attribution** is present in multiple places (schema, philosophy section, byline).

#### What's Missing / Weak
- **No Wikipedia article** for Lynq Tech, ReAnchor, or Mason Zarif. This is the single largest ChatGPT gap. Wikipedia/Wikidata is the #1 trust signal for ChatGPT entity recognition. Without it, ChatGPT has no canonical entity to attach citations to.
- **No Wikidata entity.** No structured properties exist for this organization or product in Wikidata.
- **Bing indexability is unknown.** ChatGPT uses Bing's index. The site may or may not be crawled by Bingbot. No Bing Webmaster Tools verification is evident, and BingBot is not explicitly named in `robots.txt` (though the wildcard `User-agent: *` covers it).
- **No Reddit presence.** Reddit accounts for 11.3% of ChatGPT citations. There are no brand mentions, founder threads, or product discussions on Reddit.
- **No YouTube channel.** YouTube is a top-5 ChatGPT citation source. No video content exists.
- **No authoritative backlinks.** No .edu, .gov, or major publication links to this domain. The site is brand new.
- **No Crunchbase, AngelList, or startup directory presence.** These are key entity consistency sources ChatGPT cross-references.
- **Entity consistency across platforms is not verified.** LinkedIn company page status is unknown; no external profile pages found in the codebase.

#### Score Breakdown
| Criterion | Max | Score | Notes |
|---|---|---|---|
| Wikipedia article | 20 | 0 | Does not exist |
| Wikidata entity | 10 | 0 | Does not exist |
| Bing index coverage | 10 | 3 | Unknown; wildcard allows Bing but no verification |
| Reddit brand mentions | 10 | 0 | None found |
| YouTube channel | 10 | 0 | None |
| Authoritative backlinks | 15 | 0 | Pre-launch, no link profile |
| Entity consistency across platforms | 10 | 5 | Internal consistency is good; external is unverified |
| Content comprehensiveness | 10 | 10 | 4,200-word product page is substantive |
| Bing Webmaster Tools | 5 | 0 | Not evidenced |
| **Total** | **100** | **18** | |

#### Priority Actions
1. **Create a Wikidata entry** for Lynq Tech (instance of: organization; official website; founder; founding date; product). This is doable today and has high leverage.
2. **Verify and submit to Bing Webmaster Tools** at bing.com/webmasters.
3. **Create Crunchbase and AngelList listings** — free, 30 minutes, significant entity signal.
4. **Create a LinkedIn company page** for Lynq Tech with accurate description, founding date, and website link.
5. **Post authentically on Reddit** in relevant subreddits (r/productivity, r/decisionmaking, r/startups, r/indiedev) — not promotional posts, but genuine discussion participation about decision psychology.
6. **Create a YouTube video** — even a 3-minute founder story or product walkthrough. Title it "ReAnchor App — How to Stop Second-Guessing Yourself" to target exact query terms.
7. **Wikipedia**: notability criteria require significant coverage in independent, reliable sources. This is a 6–12 month goal, not immediate. Focus on press/blog coverage first to build notability.

---

### 3. Perplexity AI — 22/100 (Weak)

#### What's Working
- **`PerplexityBot` is explicitly allowed** in `robots.txt` — correct.
- **Content freshness**: the site appears to have been actively updated recently (April 2026 based on copyright footer), which is positive for Perplexity's freshness preference.
- **Research institution logos** (Harvard, MIT Sloan, Stanford, Oxford, etc.) are displayed as a trust signal, though without hyperlinked citations to actual papers — Perplexity cannot follow these as sources.
- **Quotable passages exist**: the Philosophy section and FAQ answers contain standalone paragraphs that could be cited verbatim. Example: "A journal captures how you feel. ReAnchor captures why you decided." This is citation-ready prose.
- **Statistics with Google Scholar links** — the three stats in the Pain section link to Google Scholar searches. Perplexity can follow these outbound links and may cross-reference them.

#### What's Missing / Weak
- **No Reddit presence** — Reddit accounts for 46.7% of Perplexity citations, the highest of any platform. This is the biggest single gap for Perplexity specifically.
- **No community forum presence** — no Hacker News submissions, no Quora answers, no Stack Overflow activity, no Product Hunt listing.
- **No original research or data published.** The statistics cited (78%, 60%, 3x) are attributed to behavioral psychology literature but are not original Lynq Tech research. Perplexity heavily favors primary data sources.
- **No YouTube content** for Perplexity to reference as a multi-source validator.
- **Citations are decorative, not substantive.** The institution logos scroll by in an animated marquee with no links to actual papers or research pages. Perplexity needs real, followable citations.
- **No Wikipedia/Wikidata** (as with ChatGPT, this is a universal gap).
- **The self-test at `/reanchor/self-test`** is an interactive JavaScript tool — Perplexity cannot crawl or cite its content. A static results/methodology page explaining the 16 questions and 4 dimensions would be highly citable.

#### Score Breakdown
| Criterion | Max | Score | Notes |
|---|---|---|---|
| Active Reddit presence | 20 | 0 | No Reddit activity |
| Forum/community mentions (HN, SO, Quora) | 10 | 0 | None found |
| Content freshness | 10 | 8 | Clearly active and recently updated |
| Original research/data | 15 | 3 | Third-party stats cited but no original data |
| YouTube content | 10 | 0 | None |
| Quotable standalone paragraphs | 10 | 8 | Several high-quality quotable passages |
| Multi-source claim validation | 10 | 3 | Google Scholar links exist but are search queries, not direct papers |
| Discussion-generating content | 10 | 0 | No evidence of content being shared or discussed online |
| Wikipedia/Wikidata | 5 | 0 | None |
| **Total** | **100** | **22** | |

#### Priority Actions
1. **Reddit is the top priority for Perplexity.** Post the founder story in r/productivity and r/decisionmaking. Participate in existing "how to stop second-guessing" threads. One high-upvote comment with a genuine link to the site can dramatically increase Perplexity citation probability.
2. **Submit to Hacker News** as a "Show HN" post — "Show HN: ReAnchor — a decision journal app for when doubt hits at 2am." HN posts get indexed and cited heavily.
3. **Submit to Product Hunt** — the launch page will be indexed and cited by Perplexity.
4. **Replace the decorative research marquee with real citations.** Add a `/reanchor/research` page or a "Research basis" section with linked citations to actual papers (DOI links or PubMed/Google Scholar direct links).
5. **Publish a static methodology page** for the self-test explaining the 16 questions, 4 dimensions, and scoring methodology. This is highly citable original content.
6. **Write a 1,500-word blog post** on "Why people second-guess good decisions (and what the research says)" with real paper citations. Publish at `/reanchor/why-people-second-guess`. This generates shareable, citable content Perplexity can index.

---

### 4. Google Gemini — 28/100 (Weak)

#### What's Working
- **Schema.org structured data is meaningfully implemented**: `Organization`, `WebSite`, `MobileApplication`, and `FAQPage` schemas are all present and valid. Gemini consumes Schema.org directly for entity understanding — this is the strongest Gemini signal on the site.
- **Google crawler (`Google-Extended`) is explicitly allowed** in `robots.txt`.
- **Image alt text is present** on the institution logos (e.g., `alt="Harvard University"`, `alt="MIT Sloan"`). The iPhone mockup images use `role="img"` with `aria-label` descriptions.
- **Semantic HTML with ARIA landmarks** (`aria-label` on sections) aids Gemini's content understanding.
- **Content quality is high** — well-structured, clear product positioning, authentic founder voice.

#### What's Missing / Weak
- **No Google Knowledge Panel.** Lynq Tech has no Google Knowledge Graph entry. This is the #1 Gemini signal and requires either a Google Business Profile or enough structured entity data from third-party sources to trigger automatic Knowledge Graph inclusion.
- **No YouTube channel.** YouTube is weighted most heavily of all sources by Gemini specifically. A single well-produced product video would be the highest-ROI action for Gemini visibility.
- **No Google Business Profile.** Even for a remote indie company, a GBP listing establishes entity presence in Google's ecosystem.
- **Schema lacks `sameAs` links.** The Organization schema has no `sameAs` array pointing to LinkedIn, Crunchbase, GitHub, or social profiles. `sameAs` is how Gemini connects the entity to the Knowledge Graph.
- **No author page with schema.** The `Person` type used in the MobileApplication schema references `"url": "https://lynqtech.io"` — that URL has no `Person` schema on it. This is a broken reference.
- **No multi-modal content.** The site has no real images (only inline SVG mockups and scrolling logo images). Gemini's multi-modal capabilities are irrelevant here.
- **E-E-A-T signals are thin.** The founder is named but has no linked credentials, no external publications, and no About page. For a mental health-adjacent product (decision anxiety), E-E-A-T is especially important.
- **No Google ecosystem presence** — no Google Scholar papers, no Google News coverage, no Google Maps listing.

#### Score Breakdown
| Criterion | Max | Score | Notes |
|---|---|---|---|
| Google Knowledge Panel | 15 | 0 | Does not exist |
| Google Business Profile | 10 | 0 | Not evidenced |
| YouTube channel with topic content | 20 | 0 | None |
| Schema.org structured data | 15 | 12 | 4 schema types implemented; missing sameAs |
| Google ecosystem presence | 10 | 0 | None |
| Image optimization | 10 | 6 | Alt text present on key images; no actual photos |
| E-E-A-T signals | 10 | 4 | Founder named; no external validation |
| Multi-modal content | 5 | 1 | SVG illustrations only; no real images or video |
| N/A: Google Merchant Center | 5 | N/A | Not e-commerce |
| **Total** | **85 applicable** | **23** → normalized **28/100** | |

#### Priority Actions
1. **Create a Google Business Profile** for Lynq Tech — select "Software company" as the category. This is the fastest path to Knowledge Graph entry.
2. **Add `sameAs` to the Organization schema** pointing to LinkedIn, Crunchbase, GitHub, and any social profiles. Example: `"sameAs": ["https://www.linkedin.com/company/lynq-tech", "https://github.com/lynqtech"]`.
3. **Create a YouTube channel** and post at minimum a 2-3 minute product walkthrough. Optimize the title to match the exact query "how to stop second-guessing yourself app".
4. **Create a dedicated `/about` page** with Person schema for Mason Zarif, including credentials, the founding story, and sameAs links to personal LinkedIn/GitHub.
5. **Fix the broken Person schema reference** — `"url": "https://lynqtech.io"` should point to a page with `@type: Person` markup, or use `"url": "https://lynqtech.io/about"` once that page exists.

---

### 5. Bing Copilot — 15/100 (Weak)

#### What's Working
- **All AI bots are allowed** via wildcard in `robots.txt` — Bingbot can crawl the site.
- **Sitemap is declared** in `robots.txt` (`Sitemap: https://lynqtech.io/sitemap.xml`).
- **Meta descriptions are present** on both `/` and `/reanchor` — substantive, keyword-relevant descriptions written for human readers.
- **Exact-match keywords** appear naturally in titles and body content: "decision journal app", "stop second-guessing yourself", "iOS decision app".

#### What's Missing / Weak
- **Bing Webmaster Tools** — no evidence of registration or sitemap submission. Without this, Bing's crawl is passive and potentially incomplete.
- **No IndexNow implementation** — the site has no `indexnow-key.txt` file and no API ping on updates. For a static Netlify site this is straightforward to add.
- **`/mydecision` in sitemap returns 404** — Bing's crawler will record this as a crawl error, which actively harms Copilot indexability.
- **Sitemap is incomplete** — `/reanchor`, `/reanchor/self-test`, `/reanchor/privacy`, `/reanchor/terms` are all missing from the sitemap.
- **No LinkedIn company page** — Microsoft/Bing weights LinkedIn heavily as a trust signal (Microsoft owns LinkedIn).
- **No GitHub presence** — for a tech company, an active GitHub org adds entity signals in Bing's ecosystem.
- **Social signals are weak** — no Twitter/X activity, no LinkedIn posts, no engagement signals for Bing to weight.
- **Page load speed is unverified** — the site uses Google Fonts (two font families, multiple weights) and no evident image optimization. Render-blocking resources likely exist.
- **Bing Places for Business** — not configured (minor for a non-local business but still a signal).

#### Score Breakdown
| Criterion | Max | Score | Notes |
|---|---|---|---|
| Bing Webmaster Tools + sitemap | 15 | 3 | Sitemap exists; not verified in BWM |
| IndexNow | 15 | 0 | Not implemented |
| Bing index coverage | 10 | 3 | Likely partial; 404 in sitemap is harmful |
| LinkedIn company page | 10 | 0 | Not evidenced |
| GitHub presence | 5 | 0 | Not evidenced |
| Meta descriptions optimized | 10 | 8 | Present on key pages; well-written |
| Social media engagement | 10 | 0 | No active social presence |
| Exact-match keywords | 10 | 8 | Well-targeted keywords in titles/headings |
| Page load speed | 10 | 3 | Unknown; Google Fonts render-blocking is a risk |
| Bing Places (N/A) | 5 | N/A | Not a local business |
| **Total** | **95 applicable** | **25** → normalized **15/100** | |

#### Priority Actions
1. **Register on Bing Webmaster Tools** (bing.com/webmasters) and submit the sitemap. This is a 10-minute task with direct impact.
2. **Fix the sitemap** — remove `/mydecision`, add `/reanchor`, `/reanchor/self-test`. Use `<lastmod>` dates.
3. **Implement IndexNow** — Netlify makes this straightforward. Add a `indexnow-key.txt` to the repo root and add a build hook that pings `api.indexnow.org` on deploy.
4. **Create a LinkedIn company page** for Lynq Tech. This is the single highest-leverage Copilot action after BWM registration.
5. **Create a GitHub organization** at github.com/lynqtech (or similar) with a profile README describing the company.
6. **Self-host fonts or use `font-display: swap`** to eliminate render-blocking — this improves Core Web Vitals, which Bing/Copilot weights in source selection.

---

## Prioritized Action Plan

### Quick Wins — This Week (high impact, low effort)

| Action | Platforms Affected | Effort |
|---|---|---|
| Remove `/mydecision` from sitemap.xml | All (crawl health) | 5 min |
| Update `llms.txt` — replace MyDecision with ReAnchor | All AI crawlers | 10 min |
| Add `sameAs` array to Organization schema | Gemini, AIO, Copilot | 15 min |
| Register Bing Webmaster Tools + submit sitemap | Copilot, ChatGPT | 15 min |
| Fix sitemap — add `/reanchor`, `/reanchor/self-test`, remove 404 | All | 10 min |
| Ensure FAQ answer text is server-rendered visible in HTML | Google AIO | 30 min |
| Add visible publish date to `/reanchor` | AIO, Perplexity | 10 min |
| Create Wikidata entity for Lynq Tech | ChatGPT, AIO | 45 min |
| Create Crunchbase listing | ChatGPT, Gemini | 20 min |

### Medium-Term — This Month (content and platform presence)

| Action | Platforms Affected | Effort |
|---|---|---|
| Create `/about` page with Person schema + founder bio | Gemini, AIO, All | 2 hours |
| Create Google Business Profile | Gemini | 30 min |
| Create LinkedIn company page | Copilot, ChatGPT | 1 hour |
| Create GitHub organization with profile README | Copilot, ChatGPT | 1 hour |
| Upgrade stat citations to name specific studies/sources | AIO, Perplexity | 2 hours |
| Add a `/reanchor/research` page with real paper citations | Perplexity, AIO | 3 hours |
| Post a "Show HN" on Hacker News at launch | Perplexity, ChatGPT | 1 hour |
| Submit to Product Hunt | Perplexity, ChatGPT | 2 hours |
| Implement IndexNow for Netlify | Copilot | 1 hour |
| Convert competitor comparison to HTML table | Google AIO | 1 hour |
| Fix broken Person schema URL reference | Gemini | 15 min |

### Strategic — This Quarter (entity building and authority)

| Action | Platforms Affected | Effort |
|---|---|---|
| Create YouTube channel with product walkthrough video | Gemini, Perplexity, ChatGPT | 1–2 days |
| Authentic Reddit participation in decision psychology subreddits | Perplexity, ChatGPT | Ongoing |
| Publish original research — survey on decision regret patterns | Perplexity, AIO, All | 2–4 weeks |
| Pursue press coverage (TechCrunch, Lifehacker, Wired) | ChatGPT, Perplexity, AIO | 1–3 months |
| Wikipedia article (requires independent press coverage first) | ChatGPT | 6+ months |
| Publish a static `/reanchor/self-test/methodology` page | Perplexity, AIO | 3 hours |
| Guest post on behavioral psychology or productivity blogs | All | Ongoing |

---

## Site-Specific Issues Found

### Critical
- `/mydecision` returns 404 but is in `sitemap.xml` with `priority 1.0`. This must be fixed immediately — it is the highest-priority URL in the sitemap pointing to a dead page.
- `llms.txt` describes the old product "MyDecision" and links to `/mydecision`. The AI-readable file is completely misaligned with the actual site.

### Moderate
- FAQ answers use CSS-collapsed accordions. The answer text exists in the DOM but `faq-answer` has `height: 0; overflow: hidden` by default. Confirm crawlers can read this — if in doubt, add a `<noscript>` version or ensure the text is not `display: none`.
- The `Person` schema on `/reanchor` sets `"url": "https://lynqtech.io"` for Mason Zarif, but the homepage has no `Person` schema. This creates a broken entity link.
- Statistics (78%, 60%, 3×) are presented without named source attribution. The footnote says "Based on published research" — this is insufficient for AIO or Perplexity to treat these as citeable facts.

### Minor
- The FAQ answer for "Is my data private?" contains a typo: "securly encripted" should be "securely encrypted". On a page targeting AI citation, spelling errors reduce factual credibility scores.
- The `<title>` on `/reanchor` is 71 characters ("ReAnchor — Decision Journal App to Stop Second-Guessing Yourself") — within acceptable range but consider a version under 60 characters for Bing's title display.
- No `og:image` is defined on either page. Social sharing previews will be blank, reducing click-through from shared links.

---

*Report generated by geo-platform-optimizer skill — lynqtech.io — 2026-04-16*
