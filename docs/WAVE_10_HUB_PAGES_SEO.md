# Wave 10 — Hub Page Internal Linking + SEO Infrastructure

Confirmed by direct code review (not a guess): content.config.ts, the three page layouts,
and SchemaOrg.astro are genuinely solid and match the build spec — this wave does NOT
touch those. This wave closes specific, confirmed gaps between what the SEO doc requires
and what's actually implemented.

---

## 1. Nearby-city cross-links (data exists, nothing renders it)

`nearbyCities` is a real field in the `cities` schema and every city content file
(`carlsbad.md`, `encinitas.md`, etc.) already populates it with real slugs. No page
currently reads it. Per SEO doc Section B (Internal Link Plan): "City ↔ Nearby City
(selective, rationale-based)."

**Fix:** In `src/pages/[city]/index.astro`, resolve `entry.data.nearbyCities` via
`getEntries()` (same pattern already used for `approvedCityServices`) and render a
"Nearby areas" section/list linking to each, inside `CityLayout`'s slot. Keep it visually
modest — a simple linked list or pill row, not a full ServiceGrid-style card block, since
this is a supporting link, not primary content.

## 2. Lateral service links within the same city (currently zero)

`[city]/[service].astro` renders the page's own content and an FAQ, then nothing else.
No link to sibling services in the same city, no link back to the parent service pillar
page. SEO doc Section B requires both: "Service in City ↔ Service Pillar" and "Service in
City ↔ other services within same city."

**Fix:**
- Add a link back to the parent service pillar (`/services/{service.slug}/`) — clear,
  single link, doesn't need its own section, can sit near the FAQ or in a "Related"
  strip.
- Add a small "Other ways we can help in {city}" block linking to the other
  `approvedCityServices` for that same city (excluding the current one) — reuse
  `CityLayout`'s existing `approvedCityServices` resolution or fetch it fresh in this
  route. Same visual treatment as the "Related services" block already built on the
  service pillar page (`src/pages/services/[service].astro`) — that pattern already
  exists, reuse it rather than inventing a new one.

## 3. Sitemap + robots.txt (currently absent entirely)

```bash
npx astro add sitemap
```
- Set `site: 'https://sagetherapycenter.com'` (confirm exact production domain) in
  `astro.config.mjs` — required for the sitemap integration to emit absolute URLs, and
  good practice regardless since `Astro.site` should be a real fallback.
- Add `public/robots.txt` referencing the generated sitemap:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://sagetherapycenter.com/sitemap-index.xml
  ```
- Confirm gated/research-locked routes (any city/service combo NOT in the launch
  matrix) are simply absent from the build — since `getStaticPaths()` already only
  generates approved routes, the sitemap will automatically reflect only real pages,
  no extra filtering needed. Verify this assumption by checking the generated
  sitemap's URL count against the actual page count post-build.

## 4. Open Graph / Twitter meta tags (currently missing site-wide)

In `BaseLayout.astro`, add to `<head>`:
```html
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonicalURL} />
<meta property="og:site_name" content={site.name} />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
```
- `og:image` needs a real default image — use Kristin's headshot (already in
  `src/assets/images/`) as the site-wide fallback via `astro:assets` `getImage()` to
  produce a properly sized static OG asset, not the raw source file. Page-specific
  `og:image` overrides can come later; a real default now is the priority.

---

## Explicitly out of scope this wave
- No new content pages, no new services/cities.
- No visual/design changes (that's the still-open Wave 8 polish items).
- No changes to the reviews system (Wave 9, already verified working).

## Verification required
- Screenshot of a city page showing the new nearby-cities section, and a city/service
  page showing both the parent-pillar link and the sibling-services block.
- `curl` or browser check of `/sitemap-index.xml` post-build showing real URLs only
  (spot-check that no research-gated city/service URL appears).
- `robots.txt` reachable at the root and referencing the correct sitemap URL.
- View-source or a social-preview debugger check (e.g. paste the homepage URL into a
  Twitter/OG preview tool) confirming title/description/image render correctly.
