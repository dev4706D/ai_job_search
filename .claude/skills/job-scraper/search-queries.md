# Search Queries for Job Scraper

<!-- SETUP: Customize these queries based on your skills, target roles, and location -->

## Installed portal CLIs (primary for `/scrape`)

`/scrape` discovers every portal skill under `.agents/skills/*/SKILL.md` and runs its CLI first. Shipped country-agnostic CLIs include `linkedin-search` and `freehire-search`; Danish demos and any skill you add with `/add-portal` are included the same way. You do **not** need a matching `site:` line below for those CLIs to run.

The `site:` query templates in this file are the **WebSearch fallback** — for portals without a CLI, company career pages, or when a CLI fails.

**Language scope:** write every query category in every language listed in your CLAUDE.md Languages table (typically 1-2, sometimes more). A posting requiring a language you have *not* declared, as a job condition, is excluded before scoring; a posting requiring a *higher level* than you declared in a language you *do* work in is flagged for your own judgment, not excluded — see `04-job-evaluation.md`'s Language Gate, the single source of truth for this rule. Translate each category's keywords rather than machine-translating word-for-word (e.g. "Frontend Developer" -> "Desarrollador Frontend", not a literal word-for-word translation) if you work in more than one language.

## Search Sites

Primary:
- **freehire.me** - tech job aggregator across 50 ATS platforms (covered by `freehire-search` CLI)
- **linkedin.com/jobs** - LinkedIn job listings (filter: India / Noida / Delhi NCR / Remote); covered by `linkedin-search` CLI
- **naukri.com** / **instahyre.com** - major job boards for the Indian tech market

Secondary (company career pages via Google):
- Direct Google searches with `site:` filters for known target tech companies

## Query Categories

### Priority 1: Full Stack Developer (Next.js / MERN / TypeScript)

These match your core engineering strength and extensive web production experience.

```
site:freehire.me "Full Stack Developer" Next.js
site:freehire.me "Full Stack Engineer" React Node.js
site:linkedin.com/jobs "Full Stack Developer" "Next.js" "Noida" OR "Delhi"
site:linkedin.com/jobs "Full Stack Engineer" "TypeScript" "Remote"
site:linkedin.com/jobs "MERN Stack Developer" "Noida" OR "Gurugram"
```

### Priority 2: AI Voice & LLM Application Engineer

These match your Weeber AI voice agent platform experience (real-time WebSockets, STT/TTS, LLM tool calling).

```
site:freehire.me "AI Engineer" "LLM"
site:freehire.me "Voice AI" OR "Conversational AI"
site:linkedin.com/jobs "AI Engineer" "Python" OR "TypeScript" "Remote"
site:linkedin.com/jobs "LLM Application Engineer" "Remote"
site:linkedin.com/jobs "AI Engineer" "India"
```

### Priority 3: Mobile Application Developer (React Native / Expo)

These leverage your production Android app on Google Play Store (`com.shobhnamofficial.app`).

```
site:freehire.me "React Native Developer"
site:linkedin.com/jobs "React Native Developer" "Noida" OR "Delhi NCR"
site:linkedin.com/jobs "Mobile Engineer" "React Native" "Remote"
```

### Priority 4: Backend & API Platform Engineer

Backend REST APIs, authentication, MongoDB/PostgreSQL, payments, and system design.

```
site:freehire.me "Node.js Developer"
site:linkedin.com/jobs "Node.js Developer" "Noida" OR "Gurgaon"
site:linkedin.com/jobs "Backend Developer" "TypeScript" "Remote"
```

## Location Filter

When evaluating results, verify the job location matches preferred commute or remote settings:
- Noida, Ghaziabad, and East Delhi (ideal commute)
- Gurugram and wider Delhi NCR (accessible commute / hybrid)
- Remote (India & Worldwide)
- Bengaluru, Hyderabad, Pune (acceptable if hybrid/remote or relocation provided)

## Language Filter

Your working languages and levels are in CLAUDE.md's Languages table. When filtering scraped results, apply `04-job-evaluation.md`'s Language Gate: a posting requiring a language you haven't declared at all is excluded; a posting requiring a higher level than you declared in a language you do work in is not excluded, flag it clearly instead (see `job-scraper/SKILL.md`'s Step 3 "Quick Fit Assessment" for how the flag surfaces in `/scrape` output). Postings simply *written* in a language you don't work in, that don't require it on the job, are fine.

## Date Filter

Only include jobs posted within the last 14 days, or with an application deadline that has not yet passed. If a posting date cannot be determined, include it but flag as "date unknown".

## Adapting Queries

If the user specifies a focus area, select queries from the matching category and also generate 2-3 custom queries for that focus. For example:
- "/scrape [focus_area]" -> relevant category queries + custom focus-specific queries
