# GEO Content Quality & E-E-A-T Analysis — lynqtech.io
Date: 2026-04-17
Analyst: geo-content subagent (Claude Sonnet 4.6)
Pages analyzed: /, /reanchor, /reanchor/self-test

---

## Content Score: 47/100

---

## E-E-A-T Breakdown

| Dimension | Score | Key Finding |
|---|---|---|
| Experience | 14/25 | Strong founder quote and personal origin story, but no case studies, no user outcomes, no screenshots of actual app use |
| Expertise | 15/25 | Instrument citations present, methodology described, but no author credentials visible on-page and stats cite Google Scholar search links rather than actual studies |
| Authoritativeness | 4/25 | Zero third-party mentions, zero media coverage, no backlinks, no Wikipedia entity, brand is 1 year old with no off-site presence |
| Trustworthiness | 14/25 | Privacy policy and terms exist, HTTPS assumed, pre-launch status transparent — but no contact information, pricing contradiction, and two spelling errors in trust-critical copy |

## Topical Authority Modifier: -5 (Thin)
3 pages total, 1 topic cluster, no blog, no articles, no supporting content.

---

## Final Score Calculation
Experience (14) + Expertise (15) + Authoritativeness (4) + Trustworthiness (14) = 47 raw
Topical Authority Modifier: -5
**Final: 42/100** (Below Average — significant E-E-A-T gaps reducing AI visibility)

---

## Pages Analyzed

| Page | Word Count (est.) | Readability | Heading Structure | Citability Rating |
|---|---|---|---|---|
| / (homepage) | ~80 words (visible body copy) | Very high — minimal copy | Single H1, no H2 | Very Low |
| /reanchor | ~4,200 words | Good — conversational, clear | H1 present, H2 for major sections, no skipped levels | Medium |
| /reanchor/self-test | ~3,000 words | Good — accessible | H1 present, H2 per dimension | Medium-Low |

---

## E-E-A-T Detailed Findings

### Experience (14/25)

**Strong signals found:**

The philosophy section (line 3237–3244 of /reanchor/index.html) contains the site's most citable content:

> "I thought the hardest part of leaving my consulting job was deciding to leave. I was wrong. The hard part was the weeks after — when I'd already decided, but my mind kept relitigating it. That loop is why ReAnchor exists."
> — followed by the blockquote: "I stopped doubting my decision. Not because the doubt went away — but because I stopped letting temporary emotions overwrite permanent decisions." — Mason, founder of ReAnchor

This is genuine first-person experience and the app's clearest E-E-A-T moment. The specific detail (consulting job, weeks of post-decision doubt) distinguishes it from generic copy.

The "Doubt Morph" rotating thought stream ("What if I quit and can't find a job like this again?", "What if I break up and realize I can't live without him?") demonstrates experiential knowledge of the problem space.

**Weak signals:**

- No case studies. No user with a named scenario who used ReAnchor and had a measurable outcome. "Sarah, who logged her job change and returned to it 3 weeks later" would add 4+ points here.
- No screenshots of actual app use. The CSS-rendered iPhone mockups are design mockups, not authentic product screenshots. AI systems cannot parse them as evidence.
- The founder bio ("Mason, founder of ReAnchor") appears only as a blockquote attribution. There is no About page, no founder page, no LinkedIn-style credential block anywhere in the codebase.
- The personal story (consulting job departure) is 2 sentences. It carries weight but does not go deep enough to be extractable as a standalone experience narrative.

**Score breakdown:** First-person account: 3/5 (specific but brief). Original research/data: 0/5 (none). Case studies: 0/4 (none). Authentic evidence: 1/3 (mockups, not real screenshots). Specific personal examples: 4/4 (consulting story is specific). Process demonstration: 6/8 (7-step process described but not shown from experience).

---

### Expertise (15/25)

**Strong signals found:**

The self-test page cites four validated academic instruments with publication years (Frost & Shows 1993, Schwartz 2002, Scott & Bruce 1995, Nolen-Hoeksema 1991). This is the site's strongest expertise signal and is correctly disclaimed as "an adapted screening tool, not a clinical diagnostic."

The Doubt Review's 7-question structure implies methodological thinking: separating "new fact" from "feeling," distinguishing "bad week" from "real pattern." The framing is psychologically literate.

The FAQ answers are substantively correct — the distinction between "A journal captures how you feel. ReAnchor captures why you decided" is an expert-level framing that maps to constructs in decision research.

**Weak signals:**

- The three headline statistics (78% doubt a decision within 3 weeks, 60% reverse good decisions, 3x more likely to regret backing out) are cited only with Google Scholar search URL links, not actual study citations. The footnote reads: "Based on published research on post-decision regret, omission bias, and decision reversal in behavioral psychology." This is the weakest possible attribution. AI platforms and human raters will treat these statistics as unverified.
- No author credentials appear anywhere on the product page. "Mason Zarif" appears in the `<meta name="author">` tag (invisible to users) and as "Mason, founder of ReAnchor" in the blockquote attribution. There is no professional background, no linked profile, no credentials that contextualize why this founder is qualified to build a decision psychology tool.
- The JSON-LD `MobileApplication` schema lists `"author": {"@type": "Person", "name": "Mason Zarif", "url": "https://lynqtech.io"}` — but the URL resolves to the company homepage, not a person page.
- The research trust marquee (Harvard, MIT Sloan, Stanford, Oxford, Princeton, INSEAD, IESE, BCG, Max Planck, Elsevier, APA, Chicago Booth, Wharton) is a visual element with logos. There are no inline citations linking to specific studies from these institutions. "Informed by research at" is not the same as "citing research from."

**Score breakdown:** Author credentials visible: 0/5 (none on-page). Technical depth: 4/5 (psychologically literate). Methodology explanation: 3/4 (partial). Data-backed claims: 2/4 (statistics present but weakly sourced). Terminology: 3/3 (accurate). Author page: 0/4 (does not exist).

---

### Authoritativeness (4/25)

This is the site's critical weakness and the dominant factor holding the overall score below 55.

**Signals present:**
- The research institution marquee establishes borrowed credibility visually, but no actual citations from those institutions appear in the text.
- The four instrument citations on the self-test page are the closest thing to scholarly grounding on the entire site.

**Signals absent:**
- No media coverage. No press mentions. No ProductHunt launch. No App Store listing (not yet launched). No Twitter/X account referenced. No LinkedIn company page referenced. No GitHub.
- No inbound links from authoritative sources (product does not yet exist in the App Store, so this is expected but must be noted).
- No industry recognition, awards, or speaking credentials for Mason Zarif.
- No Wikipedia entity for "Lynq Tech" or "ReAnchor."
- No publication in a respected outlet — no guest post, no interview, no mention in a productivity/decision-making newsletter.
- The llms.txt file contains a factual error: it refers to the product as "MyDecision" throughout rather than "ReAnchor," suggesting it was not updated after the product rename. This is an AI-facing document that would cause confusion for any LLM parsing it.

**Score breakdown:** Inbound citations: 0/5. Media mentions: 0/4. Awards: 0/3. Speaker credentials: 0/3. Published in respected outlets: 0/4. Topical coverage depth: 1/3 (limited). Wikipedia/encyclopedic reference: 0/3.

---

### Trustworthiness (14/25)

**Strong signals:**
- Privacy policy exists at /reanchor/privacy.html with an effective date (April 7, 2026).
- Terms of service exists at /reanchor/terms.html.
- Pre-launch status is transparently communicated ("Launching Spring 2026" appears multiple times).
- The local data storage claim is consistent across JSON-LD, FAQ, and success state copy.
- The self-test disclaimer ("not a clinical diagnostic") is present and visible.
- No undisclosed affiliate links or sponsored content.
- HTTPS is deployed (Netlify default).

**Weak signals and problems:**

1. **No contact information.** There is no email address, contact form, or physical address anywhere on the site. The llms.txt file lists "Available via waitlist at https://lynqtech.io/mydecision" as the contact method, which is outdated (wrong URL) and not a contact channel. AI platforms and trust evaluators treat missing contact information as a significant negative signal.

2. **Pricing contradiction.** The JSON-LD `MobileApplication` schema declares `"price": "0"` (free), but the FAQ answer states "Pricing will be announced at launch — waitlist members get first access and any early-adopter pricing." These two claims directly contradict each other. The schema markup will be parsed by AI crawlers and may cause the app to be described as free when that is not confirmed. This needs immediate resolution.

3. **Spelling errors in trust-critical copy.** Line 3214 of /reanchor/index.html (the privacy FAQ answer) contains: "your data is stored securly encripted." Two misspellings ("securly", "encripted") appear in the answer about data security — the highest-trust topic on the page. This visibly undermines the credibility of the trust claim.

4. **No verified reviews or testimonials.** The waitlist count ("247 people aren't waiting for doubt to win") is a social proof number but carries no individual voices. Three placeholder avatars (S, M, A) are not real testimonials.

5. **No editorial standards or corrections policy.** This would not be expected for an indie product at this stage, but its absence is noted.

**Score breakdown:** Contact information: 0/4 (none). Privacy policy: 2/2. Terms of service: 1/1. HTTPS: 2/2. Editorial standards: 0/3. Business model transparency: 2/3 (partial — pricing unclear). Reviews/testimonials: 0/3. Accurate claims: 4/4 (claims appear accurate except for the price contradiction, which is ambiguous rather than false). Affiliate disclosures: 3/3 (none present, none needed).

---

## Content Quality Issues

### Issue 1: Statistics Without Real Citations
**Location:** /reanchor/index.html, lines 2643–2655
**Current text:** "78% of people doubt a major decision within 3 weeks" with link to `https://scholar.google.com/scholar?q=post-decision+regret+doubt`
**Problem:** A Google Scholar search link is not a citation. It tells AI systems (and human readers) that the number may be approximate, invented, or selectively interpreted. This pattern — "stat + scholar search link" — is a known low-trust pattern.
**Fix:** Find the specific study (e.g., Gilovich & Medvec 1995 on regret, or Kahneman's omission bias research), cite author, year, journal, and link to the DOI or abstract. Format: `(Gilovich & Medvec, 1995, Journal of Personality and Social Psychology)`.

### Issue 2: Spelling Errors in Privacy FAQ
**Location:** /reanchor/index.html, line 3214
**Current text:** "your data is stored securly encripted"
**Fix:** "your data is stored securely encrypted"
**Impact:** Trust signal failure in the most read FAQ item. AI platforms extracting this sentence to answer "is ReAnchor private?" will reproduce the misspelling and it reads as unpolished.

### Issue 3: Pricing Schema vs. FAQ Contradiction
**Location:** JSON-LD (line 38: `"price": "0"`) vs. FAQ (line 3224: "Pricing will be announced at launch")
**Fix:** Either (a) update the JSON-LD to remove the price field until pricing is confirmed, or (b) update the FAQ to state "ReAnchor launches free, with optional paid features announced at launch." Pick one story and make it consistent.

### Issue 4: llms.txt Product Name Error
**Location:** /llms.txt, line 9–17
**Current text:** Refers to "MyDecision" throughout, not "ReAnchor"
**Fix:** Update llms.txt to reflect the correct product name, URL (/reanchor), and current feature set. This is the first document AI systems read when crawling the site.

### Issue 5: Sitemap Missing /reanchor and /reanchor/self-test
**Location:** /sitemap.xml
**Current state:** Lists `/` and `/mydecision` — neither the current product URL nor the self-test is indexed.
**Fix:** Update to list `/`, `/reanchor`, and `/reanchor/self-test`.

---

## AI Content Concerns

The copy on /reanchor is notably non-generic. The "2:47 AM" framing, the specific consulting job detail, and the "temporary emotions overwrite permanent decisions" quote read as human-written or heavily human-edited. The FAQ answers are concise and direct.

Patterns to watch:
- The Vision section ("Decision-making is a skill. We're building the gym. The world has tools for fitness, finances, and focus. Nothing exists yet for the quality of your choices") edges toward aspirational marketing abstraction, which is citable for brand positioning but not for factual extraction.
- "DecisionOS — Duolingo for your decisions" is a comparison that will be cited as a brand analogy by AI systems. This is intentional positioning and is high-value if the brand association is desired.

No significant AI-generation quality problems detected. The writing has a distinct voice.

---

## Freshness Assessment

| Page | Published | Last Updated | Status |
|---|---|---|---|
| / (homepage) | Unknown | Unknown | No Date — Critical |
| /reanchor | Unknown | Unknown | No Date — Critical |
| /reanchor/self-test | Unknown | Unknown | No Date — Critical |
| /reanchor/privacy.html | April 7, 2026 | April 7, 2026 | Current |

No `datePublished` or `dateModified` fields exist in any JSON-LD on the product pages. The privacy policy is the only dated document on the site. AI platforms (especially Google AI Overviews and Perplexity) treat undated content as less reliable for time-sensitive queries.

**Note on evergreen classification:** The core content (decision psychology, doubt management) is evergreen in concept. However, the Spring 2026 launch references throughout make the content time-dependent. Once launch passes, every page will need updated copy. Adding a `dateModified` field now and updating it post-launch will maintain freshness signals.

---

## Citability Assessment

### Most Citable Passages

**1. The founder origin story (highest citability)**
> "I thought the hardest part of leaving my consulting job was deciding to leave. I was wrong. The hard part was the weeks after — when I'd already decided, but my mind kept relitigating it. That loop is why ReAnchor exists."

Why: Specific, attributable, first-person, explains the product's origin. AI systems responding to "why was ReAnchor built" or "what is post-decision doubt" would plausibly extract this.

**2. Product definition paragraph (/reanchor, line 2702)**
> "ReAnchor is not a journal. It's an iOS app that captures your decisions at the moment of clarity — what you chose, why, what you feared, and what you believed. Not to help you reflect. To give you a record to return to when doubt makes you forget who you were when you made the call."

Why: Definitional, structured, distinguishes from competitors in a single extract. High probability of citation in response to "what is ReAnchor."

**3. Doubt Review FAQ answer (/reanchor, line 3204)**
> "The Doubt Review is a 10-minute guided process built into ReAnchor. When doubt hits, you open the app, open the relevant decision, and answer 7 structured questions: Is this a new fact or a feeling? Did the original reasoning change? Are you reacting to one bad week or a real pattern? By the end, you'll know whether you should hold the line — or whether something genuinely changed and a reconsideration is warranted."

Why: Procedural, specific, answers an obvious user query. The seven questions and decision tree format is highly extractable.

**4. Self-test instrument disclosure (/reanchor/self-test, line 906)**
> "This assessment is informed by four validated instruments: the Frost & Shows Indecisiveness Scale (1993), the Schwartz Maximization Scale (2002), the Scott & Bruce General Decision-Making Style Inventory (1995), and the Nolen-Hoeksema Response Styles Questionnaire (1991). It is an adapted screening tool, not a clinical diagnostic."

Why: Only passage on the site with formal academic grounding. Will be cited when AI answers questions about "decision anxiety assessment" or "indecisiveness scale."

**5. Journal differentiation FAQ (/reanchor, line 3194)**
> "A journal captures how you feel. ReAnchor captures why you decided. The structure matters: every entry answers the same questions — what changed, what you feared, what you believed, why you were willing to risk it."

Why: Crisp, binary distinction. High probability of citation in response to "how is ReAnchor different from a journal."

### Least Citable Pages

**Homepage (/):** ~80 words of visible body copy. "Building tools for clearer thinking" and "Small, focused products for the decisions and moments that matter" are taglines, not citable information. An AI asked about Lynq Tech would find almost nothing to extract from this page. No H2 sections, no structured information, no descriptions of what the company does beyond slogans.

**The "Why ReAnchor" competitor comparison section:** Competitor descriptions are vague ("You replay everything in your head, or read what you wrote in your journal, but it keeps getting messier") and hidden in modal popups triggered by JavaScript. AI crawlers cannot parse modal content — this entire section is invisible to citation systems.

---

## Improvement Recommendations

### Quick Wins (1-2 days each)

**QW1: Fix the two typos in the privacy FAQ (30 minutes)**
"securly encripted" → "securely encrypted" (line 3214, /reanchor/index.html)

**QW2: Add a contact email to the footer (1 hour)**
Add `hello@lynqtech.io` or `mason@lynqtech.io` to the /reanchor footer and homepage. This is the fastest path to improving Trustworthiness. Even a single email address moves the contact score from 0/4 to 2/4.

**QW3: Fix llms.txt — update product name and URLs (30 minutes)**
Replace all "MyDecision" references with "ReAnchor", update URL to `/reanchor`, and add /reanchor/self-test as a listed resource.

**QW4: Fix sitemap.xml — add /reanchor and /reanchor/self-test (15 minutes)**
Current sitemap indexes 0 current product pages. Both should be listed with `priority="1.0"` and `changefreq="weekly"`.

**QW5: Resolve pricing contradiction (1 hour)**
Remove `"price": "0"` from JSON-LD OR update FAQ and body copy to match. Pick a consistent pricing message.

**QW6: Add datePublished/dateModified to JSON-LD (30 minutes)**
Add `"datePublished": "2026-04-07"` and `"dateModified": "2026-04-17"` to both JSON-LD blocks on /reanchor/index.html.

**QW7: Add author Person schema with a founder URL (1 hour)**
Create `/about` or `/mason` as even a minimal page (200 words, background, the consulting job story, why decision psychology matters) and update the JSON-LD `"author"` field to point to it. This is the foundational E-E-A-T unlock — right now "Mason Zarif" has no web presence to validate the expertise claim.

### Content Gaps (1-2 weeks each)

**CG1: Replace Scholar search links with real study citations**
The three statistics (78%, 60%, 3x) need real attribution. The 3x regret statistic likely derives from Kahneman & Tversky's omission bias research or Gilovich & Medvec's regret studies. Find the source, link the DOI, and add a "Sources" section at the bottom of /reanchor. This alone would raise the Expertise score by 4-6 points.

**CG2: Add a founder/about page**
A 400-600 word page at `/about` or `/reanchor/about` covering: Mason's background (consulting role, specific company or industry if shareable), what triggered the insight, what research was done before building, and the vision for decision-making as a trainable skill. This creates the author credential anchor that all E-E-A-T signals currently lack.

**CG3: Add one real user story (even pre-launch)**
Even a beta tester or someone who workshopped the Doubt Review manually counts. "Alex, a product manager who logged a job offer decision in April 2026 and returned to it 10 days later, said..." — with a specific outcome — would be the highest-ROI content addition on the site. Without any user outcomes, the entire product page is describing a theory rather than a result.

**CG4: Write an article on post-decision doubt**
A 1,500-word piece titled "Why You Second-Guess Good Decisions (And How to Stop)" hosted at `/reanchor/post-decision-doubt` would: (a) target the exact search queries that reach the site's audience, (b) create a page that can include the real study citations, (c) establish topical authority, and (d) lift the site from "Thin" (-5) to "Emerging" (+0) on the topical authority modifier. One article is the minimum viable topical cluster.

**CG5: Publish the Doubt Review questions in full**
The 7 questions are referenced repeatedly but never listed. A page or section showing all 7 questions — visible to AI crawlers — would be cited by any AI asked "what questions does ReAnchor ask?" Currently the questions are only hinted at in the mockup UI (one visible: "Is what changed a new fact — or just a feeling?") and described abstractly in FAQs.

### Author / E-E-A-T Infrastructure

**EE1: Mason Zarif needs a web presence**
The most critical gap. The founder is named in meta tags and one blockquote but has no citable profile anywhere. Options: a personal site, a LinkedIn profile, a published piece anywhere (Medium, Substack, a guest post on a productivity newsletter), or at minimum a thorough `/about` page. Until Mason Zarif exists as an entity that AI systems can look up, the Authoritativeness dimension will remain near zero regardless of content quality.

**EE2: Product Hunt launch**
A Product Hunt listing creates an indexed, citable entity for "ReAnchor" outside of lynqtech.io. Even a pre-launch "upcoming" post establishes the product in a context that AI systems actively crawl. This is the fastest path to off-site brand presence.

**EE3: Schema upgrade for self-test**
/reanchor/self-test has no JSON-LD. Add a `Quiz` or `Assessment` schema, or at minimum a `WebPage` schema with `author` pointing to Mason Zarif and `datePublished`. The instrument citations in the intro are highly citable but are not marked up in any way that helps structured data parsers locate them.

---

## Score Projection

If the Quick Wins and CG1 (real citations) are implemented within 2 weeks, the projected score improvement:

| Dimension | Current | Projected |
|---|---|---|
| Experience | 14/25 | 14/25 (no change without user stories) |
| Expertise | 15/25 | 20/25 (real citations +4, author page +1) |
| Authoritativeness | 4/25 | 7/25 (Product Hunt +2, author page +1) |
| Trustworthiness | 14/25 | 20/25 (contact +4, fixed typos +1, pricing fix +1) |
| Topical Authority | -5 | -5 (no change until CG4 article) |
| **Total** | **42** | **57** |

Adding the founder article (CG4) and one real user story (CG3) would push the score to approximately 65-68, reaching the "Average → Good" threshold where AI citation probability begins to rise meaningfully.
