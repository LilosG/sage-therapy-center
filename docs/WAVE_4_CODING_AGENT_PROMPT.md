# Wave 4 Handoff — S.A.G.E. Therapy Center

You're continuing work in `LilosG/sage-therapy-center`. Waves 1-3 are complete and pushed
to `origin/main` (verify with `git log origin/main..HEAD` before starting — should be
empty). Read `docs/SAGE_Technical_Build_Spec.md` and
`docs/SAGE_Local_SEO_Site_Architecture_Complete.pdf` in full before starting. Note the
build spec was revised after Wave 2 (word-count minimum dropped from 600-900 to 350-450,
driven by real content, not padding) — read the current version.

## Scope — build spec Section 9, "Wave 4"

1. **Remaining concern-led service pages** (14 total, per SEO doc's service pillar list):
   `abuse-support`, `addiction-counseling`, `anger-management`, `anxiety-therapy`,
   `grief-counseling`, `depression-therapy`, `divorce-separation-counseling`,
   `eating-disorder-support`, `holistic-therapy`, `lgbtq-affirming-therapy`,
   `personal-growth-therapy`, `sex-therapy`, `stress-management`, `trauma-ptsd-therapy`.
2. **Blog** — set up `/blog/` index and at least the two posts needed to close the
   remaining unresolved redirects (`/sage-therapy-center-blog` → `/blog/`,
   `/28daysofselflove` → `/resources/28-days-of-self-love/`). Build spec Section 4's
   `blog` schema requires `primaryService`, `primaryLocalPage`, `conversionPage` on every
   post — don't skip these fields.
3. **Resources** — `/resources/` index and the `28-days-of-self-love` resource page
   specifically, since a legacy redirect depends on it existing.

## Content sourcing — same discipline as every prior wave

- Do not fabricate clinical claims, credentials, outcomes, or specifics not in the two
  source docs.
- **Trauma/PTSD, abuse, addiction, and eating-disorder pages carry extra requirements** —
  the SEO doc's "Vulnerable-topic page requirements" (Content Safety Rules section)
  applies directly: include an emergency disclaimer where appropriate, avoid blame/shame/
  diagnostic assumptions, explain scope and boundaries (this is psychotherapy, not
  emergency/medical/legal/detox/nutritional treatment), use person-first language, no
  fear-based CTAs. Follow the doc's approved language patterns
  ("offers support for," "works with people navigating," etc.) and avoid every pattern
  in its prohibited list ("cures," "guaranteed results," "treats" implying unverified
  scope, diagnostic statements about the reader).
- If old-site scraping would help ground any of these 14 pages in real practice specifics
  (the way individual-therapy and family-therapy content was sourced in the word-count
  fix), you don't have web access this session — flag which pages would benefit from that
  research rather than guessing, and I'll pull it the way it was done for the earlier fix.
- Blog posts: real, complete posts are not required this wave if there's no real source
  content — a placeholder-quality post that satisfies the redirect and schema requirements
  is acceptable ONLY if clearly labeled as needing real content before launch. Do not
  invent blog content that reads as finished when it isn't.

## Required cross-links — close these out, don't defer again

- **EMDR ↔ trauma-ptsd-therapy**: every EMDR CONFIRM comment from Waves 1-3 was pending
  this page's existence. Add the real cross-link now on the EMDR pillar and all EMDR
  combo pages, and remove the CONFIRM comments.
- Apply the SEO doc's cannibalization table (Section D) and "Duplicate blog content"
  guidance if any of the 14 new pages overlap with existing content — check before
  writing, not after.
- Update `relatedServices` on existing pillars where these new pages create genuinely
  relevant lateral links (e.g. anxiety-therapy ↔ individual-therapy, trauma-ptsd-therapy
  ↔ emdr-therapy), per the internal link plan's lateral-link guidance.

## Hard constraints (unchanged from every prior wave)

- No hardcoded NAP — everything through `site.ts`.
- Money-page CTA structural via layout, not per-page — same pattern as
  Wave 1/2's Footer/CityLayout/CityServiceLayout fixes. Confirm `ServiceLayout.astro`
  already does this correctly for the existing 6 pillars before assuming these 14 need
  the same treatment (they use the same layout, so it should already apply — verify,
  don't assume).
- Commit in small, reviewable chunks.

## Verification before you report back

- `npm run build` and `npm run dev` clean.
- Keystatic/React JS leak check on all pages, not just new ones.
- Word counts on all 14 new pages, reported by name (same format as the Wave 2 word-count
  table), against the revised 350-450 target.
- Redirect check — confirm the blog/resources redirects now resolve; report final
  resolved count out of 29.
- Run a duplicate-phrase check across the 14 new pages the same way it was done for the
  10 combo pages in the word-count fix — don't let templated language creep back in
  across this batch.
- Spot-check that vulnerable-topic pages (abuse, addiction, trauma-ptsd, eating-disorder)
  actually follow the Content Safety Rules — this is the one category where "verified
  clean build" isn't the same as "compliant," so check it explicitly.

## When you're done

Report: what was built, final word counts, redirect count, cross-link closure
confirmation, and anything the vulnerable-topic content safety check surfaced. This is the
last wave per the build spec's phase sequence — after this, flag what's left before the
site is genuinely launch-ready (the accumulated CONFIRM list: license number, parking/
access, telehealth commitment, GBP category, payment/insurance policy, review count) so
there's one clean list rather than scattered comments across the codebase.
