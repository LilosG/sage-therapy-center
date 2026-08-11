# S.A.G.E. SEO Architecture

This document is the search-intent and technical-SEO contract for the Astro site. It exists to prevent route cannibalization, doorway-page expansion, generic page headings, duplicate business entities, and one-off SEO patches.

## Canonical intent ownership

| Route family | Primary intent | Rule |
| --- | --- | --- |
| `/` | S.A.G.E. brand + broad therapy center in Carlsbad | Do not target the exact `therapist in Carlsbad` phrase owned by the city hub. |
| `/carlsbad/` | Therapist / therapy practice in Carlsbad | Physical-office city hub and local practice proof. |
| `/services/{service}/` | `{Service} in Carlsbad, CA` | Canonical Carlsbad service landing page. |
| `/{secondary-city}/` | Therapist serving `{City}` | Service-area hub; never imply a physical office outside Carlsbad. |
| `/{secondary-city}/{service}/` | `{Service} for {City}, CA` | Generate only when an explicit, locally differentiated city-service content entry exists. |
| `/telehealth-therapy/` | Online therapy / telehealth in California | Telehealth is a delivery format, not a duplicate clinical-service taxonomy. |

## Route guardrails

- Never generate a Cartesian product of every city and every service.
- The physical-office city does not generate `/carlsbad/{service}/` pages. Those legacy URLs permanently redirect to `/services/{service}/`.
- Internal links must point directly to canonical URLs rather than through redirects.
- Secondary city-service pages must contain local/service-specific content, not only a city-name swap.
- No secondary city page may imply that S.A.G.E. has an office in that city.

## On-page intent rules

- Every indexable landing page has one descriptive H1 that matches its assigned intent.
- Page titles are unique, concise, and aligned with the H1.
- Important H2s describe the page's actual service/location topic, but headings should remain natural and should not repeat the same keyword mechanically.
- Related-service anchor text is descriptive and reflects the canonical destination.
- Reviews, FAQs, conversion sections, and process steps support the page; they do not replace the primary service/location topic.

## Astro technical SEO

- `site` in `astro.config.mjs` is the single canonical production origin.
- Public URL shape uses trailing slashes consistently.
- `@astrojs/sitemap` generates the sitemap from real Astro routes; admin and intentionally non-indexable placeholder resources are filtered out.
- `robots.txt` and `<link rel="sitemap">` point to the sitemap index.
- `BaseLayout.astro` owns canonical, robots, Open Graph, Twitter, and sitemap discovery metadata.
- Local hero images are imported from `src/assets` and rendered through `astro:assets` so Astro owns optimization, dimensions, and responsive output.
- Hero assignments live in `src/data/pageImages.ts`; low-contrast editorial assets that read as empty at hero crop sizes are not allowed in hero rotation.

## Structured data

- One stable business `@id` represents S.A.G.E. Therapy Center.
- One stable person `@id` represents Kristin Moorehead-Malley.
- Service pages emit `Service` + `WebPage` + breadcrumb data and resolve the real business/provider entity.
- City pages describe geographic coverage with `spatialCoverage`; they do not create fake business locations for secondary cities.
- Blog posts use `Article` data with the real practitioner/business entities.
- Do not emit self-serving `Review` or `AggregateRating` markup for S.A.G.E.'s own Google reviews.
- Do not emit unverified hours, fees, insurance/superbill claims, or license identifiers.

## Indexing guardrails

- Self-referential canonicals are emitted from the shared base layout.
- Permanent redirects consolidate retired duplicate URLs.
- Temporary/incomplete legacy resource pages are `noindex,follow` and excluded from the sitemap until real source content is restored.
- Preview/staging environments must not be treated as canonical production URLs.

## Release acceptance checks

Before merging an SEO/site-architecture change to `main`:

1. Run the Astro production build successfully.
2. Inspect representative rendered pages from every route family: home, service hub, service, area hub, city, city-service, telehealth, about/contact, blog.
3. Verify one H1, unique title/description, canonical URL, crawlable internal links, and expected structured data.
4. Verify that all intended hero cards visibly contain an image and that no directory/grid leaves accidental empty cells.
5. Verify that the sitemap contains only canonical indexable routes and that retired Carlsbad service URLs redirect to their `/services/` canonical.
6. Push one coherent checkpoint commit so Vercel produces one reviewable preview deployment rather than a build for every file edit.
