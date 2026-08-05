# S.A.G.E. Therapy Center — Wave 7: Audit & Remediation
Prepared: August 5, 2026 — Lilos Growth
Status: BLOCKING — no further waves (photography, blog expansion, etc.) until every item
in Section 1 is closed and independently verified per Section 4.

This document exists because the last several waves shipped "verified" work that wasn't.
That stops now. Nothing in this document gets marked done by a self-report — it gets
marked done by pasted, checkable output per the Verification Protocol in Section 4.

---

## 0. Non-negotiables (unchanged, restated because they were not fully honored)

- No hardcoded values outside `src/data/site.ts`.
- No patch that fixes a symptom without identifying and fixing the underlying cause.
- No claim of "verified" without pasted command output backing it.
- No new scope creep into this wave — this is a stabilization pass, not a features pass.

---

## 1. Confirmed Issues (in priority order — fix top to bottom, do not skip ahead)

### 1.1 CRITICAL: Homepage service grid and areas-we-serve grid render empty

**Symptom:** `/` shows "How we can help" and "Areas We Serve" as heading + "View all"
link only. Zero cards, zero city pills. Confirmed via screenshot dated 2026-08-05.

**Investigation required before any fix is written** (this is the point — find the real
cause, don't guess):

```bash
cd ~/sites/sage-therapy-center
rm -rf .astro dist
cat src/components/sections/ServiceGrid.astro
cat src/pages/index.astro
grep -rn "category" src/content.config.ts
grep -rln "category:" src/content/services/*.md | wc -l
find src/content/services -name "*.md" | xargs grep -L "category:"
find src/content/cities -name "*.md" | wc -l
npm run build 2>&1 | tail -50
```

Paste all of that back before writing a fix. The two live hypotheses:
(a) a filter predicate (e.g. `category === 'core'`) no longer matches what's actually in
the frontmatter after a schema edit, or (b) the homepage's `getCollection()` call is
querying the wrong collection or an empty one post-refactor. Confirm which with the
output above — do not patch both defensively without knowing which one it is.

**Required fix, once cause is known:**
- Correct the actual predicate/query, not a workaround that special-cases the homepage.
- Add a **build-time hard failure**: if the homepage's core-services array or cities
  array resolves to zero entries, fail the build. This is the guardrail that should have
  existed from Wave 1 — a page silently rendering zero results for its primary content
  block is a class of bug that must be structurally impossible to ship, not just visually
  caught by a human screenshotting the site.

```ts
// example shape, adapt to actual data source
if (coreServices.length === 0) {
  throw new Error('Homepage core services resolved to zero entries — check category filter/schema.');
}
if (cities.length === 0) {
  throw new Error('Homepage cities resolved to zero entries — check cities collection.');
}
```

### 1.2 Hero is still the boxed two-column placeholder, not full-bleed

This was pulled forward once (Wave 6 discussion) specifically so it wouldn't wait on
real photography. If it reverted, find out why (bad merge, wrong branch, cache) before
just re-applying the fix blind.

**Fix:** Full-width background container, text overlaid directly on top (gradient
standing in for the photo now), matching V4's actual composition — not a right-hand
boxed panel. MeetKristin's placeholder stays visually distinct (portrait aspect ratio,
not a repeated landscape block) so the two components don't read as the same box reused.

### 1.3 Reconcile FAQ telehealth answer with TrustStrip's "All of California" claim

Flagged once already and never confirmed closed. Check:
```bash
grep -rn "telehealth" src/content/faq/*.md src/data/site.ts
```
If the FAQ still hedges ("available in some cases," etc.) while TrustStrip asserts
blanket California coverage, make them consistent — pull both from the same `site.ts`
source of truth rather than one hardcoded FAQ answer and one component prop.

---

## 2. What I'm explicitly NOT asking for in this wave

- No photography (Phase 6/7 per your existing plan — do not pull it forward again).
- No new pages, no new services, no blog work.
- No revisiting the word-count decision (298–450 words, already accepted as final).

Scope discipline matters here specifically because scope creep is part of how the last
few waves drifted — a "quick fix" turning into touching five unrelated files is how the
trust-strip fix apparently broke the service grid in the first place.

---

## 3. Suggested instruction to send the coding agent

```
Continuing in LilosG/sage-therapy-center. Before writing any code, run and paste back:

  rm -rf .astro dist
  cat src/components/sections/ServiceGrid.astro
  cat src/pages/index.astro
  grep -rn "category" src/content.config.ts
  grep -rln "category:" src/content/services/*.md | wc -l
  find src/content/services -name "*.md" | xargs grep -L "category:"
  find src/content/cities -name "*.md" | wc -l
  npm run build 2>&1 | tail -50

Do not propose a fix until this output is reviewed and the actual cause (schema
mismatch, wrong collection query, or stale cache) is identified and stated explicitly.

Once the cause is confirmed:
1. Fix the homepage service grid and areas-we-serve grid at the root cause.
2. Add a build-time hard failure if either array resolves to zero entries (see spec
   Section 1.1 for example shape) — this must be a real thrown build error, not a console
   warning that can be ignored.
3. Restructure the hero to full-bleed (text overlaid on a full-width background,
   gradient as photo placeholder) — investigate why this reverted from the earlier fix
   before reapplying, don't just patch over it again blind.
4. Reconcile the FAQ telehealth answer with TrustStrip's California-coverage claim,
   both sourced from site.ts.

No other scope. No photography, no new pages, no revisiting word counts.

Verify and report with actual output, not summary:
- Screenshot (or described DOM check) confirming both grids render their full expected
  count on a fresh build with .astro/dist removed first.
- The build-failure guard demonstrated working (temporarily break the filter, confirm
  build actually fails, then restore).
- Hero screenshot showing full-bleed structure.
- grep output showing FAQ/TrustStrip now consistent.
```

---

## 4. Verification Protocol (going forward, not just this wave)

The recurring failure mode in this build has been "reports clean" treated as equivalent
to "is clean." Going forward, nothing is accepted without one of:
- Pasted command output (not paraphrased),
- A fresh screenshot taken after `rm -rf .astro dist && npm run build`, or
- A specific grep/diff showing the exact lines that changed.

If a report doesn't include one of those, the answer is "paste the actual output," not
"proceeding on the summary."
