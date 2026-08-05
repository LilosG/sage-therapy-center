# Wave 5 Handoff — S.A.G.E. Therapy Center: Visual Polish

You're continuing work in `LilosG/sage-therapy-center`. Waves 1-4 are complete and pushed
— content, routing, schema, and compliance are all verified. This wave is different in
kind: it's a visual quality pass, not a content wave. The site currently builds and
functions correctly but looks like an unstyled template compared to the approved V4
design. Read `docs/SAGE_Technical_Build_Spec.md` (Section 2, design tokens) before
starting.

## Why this wave exists

A screenshot of the live deployed homepage was compared directly against the original V4
mockup and rejected. Specific gaps identified:

1. No photography anywhere (hero, Meet Kristin section) — flat color blocks instead
2. No icons — the "You're in the right place if..." and service grid cards show empty
   gray circles where icon glyphs belong in V4
3. No hero badge (V4 has a pill-shaped "NOW ACCEPTING NEW CLIENTS" badge above the
   headline)
4. Trust strip renders as plain text, not styled pills/badges
5. Overall spacing, shadows, and card treatment read as generic-template rather than the
   editorial feel of V4

The underlying architecture (real content, real tokens, real fonts) is sound — this is a
presentation-layer wave, not a rebuild.

## Scope

### 1. Icons — real, not placeholder
Install and wire up `astro-icon` with the Lucide icon set:
```
npm install astro-icon @iconify-json/lucide
```
Replace every empty gray circle placeholder (ReassuranceGrid cards, ServiceGrid cards,
any other icon-circle instance) with an actual Lucide icon appropriate to its content —
e.g. a sparkle/wind icon for "Feeling anxious or overwhelmed," a heart icon for couples
content, a users/family icon for family-related content, etc. Use judgment matched to
each card's actual subject; don't use the same icon everywhere.

### 2. Image placeholders (NOT final — real photos arrive in Wave 6)
The client is supplying real photography (hero image, Kristin's headshot, possibly office
photos) in Wave 6. For this wave, build proper `<img>`/`astro:assets`-ready placeholder
treatments — NOT empty divs, NOT broken image tags. Use styled gradient or solid-color
blocks in the site's actual palette (sage/lavender tones from the theme) with correct
aspect ratios and dimensions matching where real images will go, so the layout is
structurally ready for a straight image swap in Wave 6. Mark each with an HTML comment
noting what image belongs there (e.g. `<!-- PLACEHOLDER: hero image, coastal/Carlsbad
themed, arriving Wave 6 -->`).

Locations needing this treatment: Hero section background, Meet Kristin section
(headshot), any other section in the V4 mockup that shows a real photo.

### 3. Hero badge
Add the pill-shaped "Now Accepting New Clients" badge above the hero headline, styled to
match V4 — small, rounded-full, subtle background, sage-toned dot or icon accent.

### 4. Trust strip styling
Convert the current plain-text trust strip (license, years practicing, service area,
in-person note) into the pill/badge treatment shown in V4 — the `.trust-strip` component
class already exists in `global.css` per the Build Spec; confirm it's actually being used
correctly here, or fix it if the strip isn't picking up the intended styling.

### 5. General polish pass
- Card shadows, border treatment, hover states — compare against V4's soft-shadow,
  rounded-2xl card style and correct any cards that look flatter/plainer than the mockup.
- Section spacing/rhythm — V4 has generous, consistent vertical spacing between sections;
  audit and correct any cramped or inconsistent spacing.
- Confirm the eyebrow-label, section-card, and quote-block component classes from
  `global.css` are actually applied everywhere they should be, not just on some pages.

## Constraints

- No new npm packages beyond `astro-icon` + the Lucide icon set unless genuinely
  necessary — flag before adding anything else.
- Placeholder image blocks must be visually intentional (styled, correct proportions),
  not lazy gray boxes — they represent real client-facing polish today, not just a
  future TODO.
- Don't touch content, schema, or routing this wave — this is presentation-only. If you
  spot a content bug while doing this pass, note it in your report rather than fixing it
  inline (keeps this wave's diff reviewable as a pure visual change-set).
- Commit in small chunks (icons, then placeholders, then badge/trust-strip, then general
  polish).

## Verification before you report back

- `npm run build` / `npm run dev` clean.
- Keystatic/React JS leak check still clean.
- Screenshot (describe in your report, since you can't literally attach an image) the
  homepage, one city hub, and one service pillar's rendered state — confirm icons render,
  placeholders are styled (not broken/empty), badge and trust strip match the intended
  treatment.
- Confirm no image `alt` text is missing on the new placeholder blocks — even placeholders
  need accessible markup, since this becomes a real launch-blocking a11y gap if forgotten
  now and missed later.

## When you're done

Report what was built, and specifically flag any V4 visual detail you couldn't fully match
without more direction (e.g. exact icon choices you're unsure about, spacing values you
estimated rather than measured). Wave 6 will be real photography — nothing else should be
pending after that.
