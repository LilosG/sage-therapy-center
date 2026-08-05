# Wave 11 — Complete the Approved City/Service Launch Matrix

Cross-checked directly against SAGE_Local_SEO_Site_Architecture_Complete.pdf's "Approved
City/Service Pages — Launch Matrix" (the authoritative source) against what's actually
built in src/content/city-services/. Four approved pages are missing — not extra pages
to remove, missing ones to add. This is NOT a scope expansion; every page below is
already explicitly approved in the source doc, just not yet authored.

## Missing pages

1. `/carlsbad/anxiety-therapy/` — approved, references `services/anxiety-therapy`
2. `/carlsbad/trauma-therapy/` (slug TBD — see decision below) — approved, references
   `services/trauma-ptsd-therapy`
3. `/encinitas/teen-counseling/` — approved, references `services/teen-counseling`
4. `/san-marcos/teen-counseling/` — approved, references `services/teen-counseling`

Do NOT add any other city/service combination — everything else remains research-gated
per the doc's explicit gated list (del-mar/couples, solana-beach/couples,
rancho-santa-fe/couples, encinitas/emdr-therapy, oceanside/teen-counseling,
vista/teen-counseling). Confirm this list is still respected before/after this wave.

## Decision needed before writing content (Mike's call)

The doc's launch matrix names the 8th Carlsbad page `/carlsbad/trauma-therapy/`, but the
canonical service pillar is `/services/trauma-ptsd-therapy/` — different slugs for the
same underlying service. The current `city-services` schema has no independent slug
field; `[city]/[service].astro` always derives the route from the referenced service
entry's own slug. Two real options:

- (a) Add an optional `slugOverride` field to the `city-services` schema, used by
  `getStaticPaths()` in place of the referenced service's slug when present. Keeps the
  doc's exact intended URL, small schema addition.
- (b) Treat "trauma-therapy" as informal doc shorthand and build it at
  `/carlsbad/trauma-ptsd-therapy/` to match the pillar slug exactly — simpler, no schema
  change, but deviates from the literal doc text.

Recommendation: (a) — the doc is the source of truth for URLs, and a slug override is a
small, reusable addition (useful if this situation recurs). But this is a real content/IA
decision, confirm before the agent builds it either way.

## Content requirements (same discipline as Wave 2/3, already proven to work)

- Real, specific content — no templated "first session" paragraphs reused across pages,
  same duplicate-content failure mode already caught and fixed once in this build.
- 350–450 words (the build spec's revised, realistic ceiling — not the doc's original
  600-900, which was already formally revised down after Wave 2).
- Each new page gets: real FAQ entries where genuinely city/service-specific content
  exists, correct breadcrumbs (already structural via CityServiceLayout, no extra work
  needed), and the lateral-link + parent-pillar-link blocks already built in Wave 10 —
  these are automatic once the content entry exists, nothing to build there.
- Confirm the new Carlsbad pages appear correctly in "Other ways we can help in
  Carlsbad" on the existing 6 Carlsbad combo pages (this should happen automatically via
  the Wave 10 logic, but verify — that logic reads `approvedCityServices` off the city
  entry, so the city's `approvedCityServices` array needs the two new service references
  added too).

## Verification required
- Build output showing 4 new routes generated (18 total city/service pages, matching
  the doc's full approved count of 8+3+3+2+2).
- Word count per new page, real numbers, not averaged.
- Grep confirming no duplicated sentence structures between the new pages and existing
  ones (same check used in Wave 2).
- Confirm the 6 existing Carlsbad combo pages now show the 2 new siblings in their
  "Other ways we can help" block.
- Confirm gated combinations are still absent from the build (spot-check
  `del-mar/couples-counseling` and `oceanside/teen-counseling` both 404).
