# Wave 9 — Live Google Reviews (Places API, New)

Replaces the "Google reviews coming soon" placeholder with real, live-pulled reviews.
This is a real integration with real constraints — read this in full before writing code.

## Why this can't be a simple "fetch and display"

Google's Maps Platform terms prohibit caching/storing review content beyond temporary,
performance-only caching (hard 30-day ceiling), forbid redistribution, and require
Google attribution to stay intact. The Places API also hard-caps responses at 5 reviews
per place regardless of how many the business actually has — there is no "get all
reviews" option in the official API. Any tool claiming otherwise is scraping, which is
explicitly against Google's terms and not something to put a client's site on.

This means the correct architecture is: **fetch at build time, rebuild on a schedule
well under 30 days, display up to 5 real reviews + the real aggregate rating.**

## Implementation

**1. API:** Places API (New) — Place Details endpoint, not the legacy API. Use a
FieldMask to request only what's needed (billing scales with fields requested):
```
fields=id,displayName,rating,userRatingCount,reviews
```
Place ID is already confirmed: `ChIJtc6aBhty3IARCI4Y0MK8Xsk`

**2. Where the fetch happens:** Server-side, at build time only (a top-level `await
fetch()` in the relevant `.astro` page's frontmatter, or a small build script that
writes the result to a local data file consumed by the page). Never client-side — that
would expose the API key in the browser bundle.

**3. API key handling:**
- Store as `GOOGLE_PLACES_API_KEY` in Vercel's environment variables — never in a
  committed file.
- Restrict the key in Google Cloud Console to the Places API only. Since it's called
  server-side during build (not from a browser), there's no referrer to restrict by —
  API restriction is what actually matters here.
- Billing must be enabled on the Google Cloud project for this API — cost is
  negligible at this call volume (one build-time call per rebuild, not per visitor).

**4. Rebuild cadence (this is the compliance-critical part):** Since the reviews get
baked into static HTML at build time, that's functionally a cache — it must refresh
well inside Google's 30-day ceiling. Set up a scheduled rebuild:
- A Vercel Cron Job (or a GitHub Action on a schedule) hitting a Vercel Deploy Hook
  daily or every few days. Daily is simplest and keeps this nowhere near the 30-day
  limit.
- Document this schedule in `docs/` so it's not a silent dependency nobody remembers.

**5. Failure handling — needs your call, not a guess:** If the build-time fetch fails
(quota, network, key issue), two real options:
- (a) Fail the build loudly, same pattern as the homepage-grid guard from Wave 7 — safest
  for data integrity, but a Google API hiccup could block an unrelated deploy.
  Or —
  (b) Fall back to the last successfully-fetched data (committed as a small JSON file,
  overwritten each successful build) and display a quiet "reviews last updated [date]"
  note — keeps the site deployable even if Google's API has a bad day, and is still
  honest since it's real past data, not fabricated.

  My recommendation is (b) — a client site shouldn't go down because of an unrelated
  third-party API blip — but this is a real decision, not something to default silently.
  Tell the agent which one before it builds this.

**6. Display requirements:**
- Show the real aggregate rating + review count, and up to 5 real reviews with
  reviewer name/photo (Google requires author attribution to stay attached).
- Include Google's required attribution treatment (not just a small link — check
  current Places API attribution requirements in the docs before finalizing).
- `AggregateRating`/`Review` schema (already scaffolded per the build spec) gets
  populated from this same live data at build time — this is exactly the case the SEO
  doc allows ("only if every underlying review is genuine and currently live"), since
  it now is.

## Verification required
- Build log showing the live API call succeeding and real review count/rating pulled.
- Screenshot of the rendered reviews section with real data (not placeholder).
- Confirmation the API key is not present anywhere in client-side bundle output
  (`grep -r "GOOGLE_PLACES_API_KEY" dist/` should return nothing outside build logs).
- The scheduled rebuild (Cron Job or Action) actually configured and documented, not
  just described.

## Implementation (as built)

- **Fetch:** `scripts/fetch-google-reviews.mjs`, run via the `prebuild` npm script
  (`package.json`) so it runs automatically before every `astro build` — including
  Vercel's default `npm run build`. Writes `src/data/google-reviews.json`.
- **Failure handling:** option (b) — the script never throws and never exits non-zero.
  On any fetch failure (missing key, network error, non-2xx response) it logs a warning
  and leaves the last committed `google-reviews.json` untouched, so the site falls back
  to the last successfully-fetched data rather than failing the build.
- **Display:** `src/components/sections/ReviewsSection.astro`, fed from
  `google-reviews.json` via `src/pages/index.astro`. Shows the real aggregate
  rating/count, up to 5 reviews (author avatar/name/profile link, star rating, text,
  relative time, and a "View on Google" link to the individual source review via
  `googleMapsUri`), a "Reviews last updated [date]" note from the JSON's `fetchedAt`,
  and a "Reviews via Google Maps" attribution link to the place page — text attribution
  per the Places API policy's "text 'Google Maps' is acceptable when space is limited"
  allowance, rather than shipping Google's logo asset as a binary dependency.
- **Schema:** `src/components/seo/SchemaOrg.astro`'s `organization` builder accepts an
  optional `reviewsData` prop (rating/reviewCount/reviews) and emits `aggregateRating`
  + `review` nodes from the same JSON — passed in from `index.astro`.
- **Rebuild cadence — GitHub Action, not a Vercel Cron Job:** a Vercel Cron Job invokes
  a path within the deployed app itself, which would have meant adding a serverless API
  route just to relay the trigger. A GitHub Action can hit the Deploy Hook directly on a
  schedule with no extra app surface, so that's what's configured:
  - Deploy Hook `wave9-daily-reviews-rebuild` (id `7Yo5LSSurr`), created via
    `vercel deploy-hooks create wave9-daily-reviews-rebuild --ref main`, targeting the
    `main` branch.
  - The hook URL is stored as the `VERCEL_DEPLOY_HOOK_URL` secret on the
    `LilosG/sage-therapy-center` GitHub repo (`gh secret set`) — never committed in
    plaintext.
  - `.github/workflows/daily-reviews-rebuild.yml` runs daily at `17 13 * * *` (13:17
    UTC) plus `workflow_dispatch` for manual triggers, and `curl -X POST`s the hook.
  - This is comfortably inside Google's 30-day ceiling; if the daily schedule is ever
    changed, keep it well under 30 days and update this section.
