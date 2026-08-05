# Wave 6 Handoff — S.A.G.E. Therapy Center: Structure & Information Architecture

You're continuing work in `LilosG/sage-therapy-center`. This wave replaces the previously
planned "Wave 6 = photography" — that's now Wave 7. This wave fixes real structural/IA
problems found reviewing the live deployed site, not visual polish. Read
`docs/SAGE_Technical_Build_Spec.md` before starting, particularly Section 2 (design
tokens) and the component inventory.

## Why this wave exists

The deployed site was reviewed directly and six structural problems were identified —
these are information architecture failures, not cosmetic issues:

1. Homepage "How we can help" renders all 20 services as same-size cards, 7 rows deep,
   with no hierarchy — reads as an undifferentiated wall, not a curated homepage section.
2. Footer's Services column lists all 20 services stacked in a single column — unusable.
3. No trust/reviews section exists anywhere on the site.
4. No Google Business Profile map embed exists, despite the Build Spec's own "Location
   Asset Requirements" calling for one on the Carlsbad hub.
5. No hero/page-header treatment exists on any page except the homepage — city hubs,
   service pillars, and combo pages render a bare heading with breadcrumb only. (Note:
   the Lovable typography spec captured earlier in this project explicitly references
   "every PageHero H1" as an established pattern — this component should already exist
   and doesn't.)
6. Sections have no visual rhythm — everything sits on the same background with no
   alternating bands or clear separation, so the page reads as one long undifferentiated
   scroll below the hero.

## Scope

### 1. Homepage service grid — curate, don't dump
Homepage's "How we can help" section shows only the 6 core services (individual-therapy,
couples-counseling, family-therapy, teen-counseling, premarital-marriage-counseling,
emdr-therapy) — same 2-3 column card grid as now, just 6 cards instead of 20. Add a
"View all services →" link/button below the grid pointing to `/services/`.

### 2. `/services/` page — grouped, not flat
Restructure `/services/index.astro` into two visually distinct sections: "Core Services"
(the 6, same card treatment as homepage) and "Areas of Focus" (the remaining 14) —
give "Areas of Focus" a lighter-weight treatment appropriate to its length (e.g. a denser
grid, smaller cards, or a tag/pill list rather than full cards with descriptions) so 14
items doesn't read as another wall. Use judgment on the exact visual pattern, but the two
categories must be clearly separated with a heading each.

### 3. Footer reorganization
Services column: 6 core services + "View all services →" link, not all 20. If the Areas
We Serve column is also long enough to feel unwieldy, apply the same treatment (core
cities + "See all areas we serve →").

### 4. Trust/reviews section — structural, not fabricated
Build a new `TrustBar` or `ReviewsSection` component for the homepage (and optionally
city hubs). Do NOT fabricate a star rating, review count, or review quotes — the SEO doc
explicitly forbids unverified review claims and hardcoded review counts. Build the
component to display real data once available (e.g. props for `rating`, `reviewCount`,
`platformName`), and for now render a clear, honest placeholder state — something like
"Google reviews coming soon" or simply omit the numeric claim while keeping the section
structurally present — rather than inventing numbers. Flag in your report exactly what
real data this needs before it can go live.

### 5. GBP map embed
Add a real Google Maps embed (standard `<iframe>` embed, no API key required for the
basic embed) for the confirmed practice address (5055 Avenida Encinas, Suite 100,
Carlsbad, CA 92008) on the Carlsbad city hub, and consider the homepage/contact page too
if it fits the layout. This uses only already-confirmed real data — no placeholder needed
here, build it for real.

### 6. `PageHero` component
Build a `PageHero` component (referenced but never built — see the Lovable typography
spec's mention of "every PageHero H1") and apply it to every page type that currently
lacks hero treatment: city hubs, service pillars, city/service combo pages, about,
contact, FAQ, schedule-a-session. Lighter-weight than the homepage's full hero (no
two-column layout needed here — this was already flagged as a separate issue to fix
under photography/Wave 7) but should include: eyebrow label, H1 in the serif display
font, a tinted background band (not the same flat background as the page body), and
breadcrumbs integrated into the treatment rather than sitting alone above it.

### 7. Section rhythm
Audit every page template and alternate section backgrounds (`bg-background` /
`bg-secondary` or the lavender-soft tone from the theme) so sections are visually
distinct from their neighbors — no two adjacent sections should share the exact same
background. Add appropriate padding/visual breaks so the page doesn't read as one
continuous scroll.

## Constraints

- No fabricated review data, ratings, or counts — this is a hard compliance requirement,
  not a style preference.
- Map embed uses only the already-confirmed real address — don't add anything requiring
  business hours, GBP category, or other still-unconfirmed data.
- Don't touch content/copy this wave — this is layout and IA. Same discipline as Wave 5:
  if you spot a content issue, flag it, don't fix it inline.
- Commit in small chunks matching the 7 numbered items above.

## Verification before you report back

- `npm run build` / `npm run dev` clean.
- Keystatic/React JS leak check still clean.
- Confirm homepage service grid shows exactly 6 cards + view-all link.
- Confirm `/services/` shows two clearly separated groups.
- Confirm footer services column is short (6 + link), not 20 items.
- Confirm PageHero renders on at least one example of every affected page type (city hub,
  service pillar, combo page, and one static page like /about/).
- Confirm no fabricated rating/review numbers appear anywhere in the trust section.
- Describe the rendered state of the homepage and one city hub in your report, the same
  way Wave 5 did, since you can't attach a screenshot.

## When you're done

Report what was built, and flag anything you're uncertain about rather than guessing —
same discipline as every prior wave. Wave 7 (real photography) is next.
