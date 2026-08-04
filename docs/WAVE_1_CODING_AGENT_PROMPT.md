# Wave 1 Handoff — S.A.G.E. Therapy Center

You're continuing work in `LilosG/sage-therapy-center`. Phase B (scaffold) is complete and
verified: content collections, `site.ts`, structural layouts, `SchemaOrg.astro`, Keystatic,
`vercel.json` redirects, and real design tokens (colors + Fraunces/Inter fonts, sourced
directly from the client's Lovable design project — not placeholders) are all in place and
committed. Read `docs/SAGE_Technical_Build_Spec.md` in full before starting — it now
reflects several corrections made after Phase B (file paths, Keystatic pattern, adapter
notes, accepted-risk security note). Do not work from an older cached understanding of it.

## Scope — build spec Section 9, "Wave 1"

1. **Section components** (in `src/components/sections/`): `Header`, `Footer`, `Hero`,
   `TrustStrip`, `ReassuranceGrid`, `MeetKristin`, `ProcessSteps`, `ServiceGrid`,
   `QuoteBlock`, `FAQAccordion`, `CTASection`, `Breadcrumbs`. Build only what Wave 1 pages
   actually use — don't build the full Section 6 component inventory yet (TestimonialGrid,
   SpecialtyTags, ApproachList, LocationBlock come in later waves with their pages).
2. **Homepage** (`/`)
3. **Services hub** (`/services/`)
4. **Areas-we-serve hub** (`/areas-we-serve/`)
5. **Three priority city hubs**: `/carlsbad/`, `/encinitas/`, `/san-marcos/` (real content
   collection entries, replacing the Phase B placeholder city entry)
6. **Two service pillars**: `/services/individual-therapy/`, `/services/couples-counseling/`
   (real entries, replacing the Phase B placeholder service entry)
7. **`/schedule-a-session/`, `/about/`, `/contact/`, `/faq/`**
8. Confirm the full redirect set from `vercel.json` actually resolves in a local/staging
   check (see Verification below) — it was written in Phase B but not live-tested against
   real routes yet.

## Content sourcing rules — read carefully, do not skip

This is a therapy practice. Fabricated claims here aren't just a QA issue, they're a real
compliance and trust problem. Follow these exactly:

- **Kristin's bio, credentials, modalities, years of experience** — pull only from what's
  explicitly stated in `docs/SAGE_Local_SEO_Site_Architecture_Complete.pdf` (Search
  Entities section, Person schema example, city page requirements). Do not invent
  additional credentials, awards, or specifics not in that document.
- **The "Therapy is a lot like climbing Everest" quote** — this is from the client's own
  approved V4 design (visible in the original screenshot), attributed to Kristin
  Moorehead-Malley, LMFT. Reuse it as-is in `QuoteBlock`. Do not alter the wording.
- **Testimonials** — the `testimonials` collection schema requires `permissioned: true`
  before anything renders (per Build Spec Section 4). There are currently zero real
  permissioned testimonials. Do NOT invent placeholder testimonials, even labeled ones —
  build the `TestimonialGrid` component to correctly render nothing / a graceful empty
  state when no permissioned entries exist, rather than shipping fake client quotes.
- **Service/city page body copy** — where the SEO doc gives you a clear brief (page
  target, must-not-compete-for, city uniqueness requirements), write real, complete copy
  meeting those specs. Where it doesn't (e.g. exact fee amounts, exact insurance
  policy), do NOT guess — use the doc's own "Content Safety Rules" approved language
  patterns, and leave a `<!-- CONFIRM: [what's missing] -->` comment in the markdown body
  rather than inventing a number or claim.
- **License number, GBP category, review counts** — these are explicitly Wave-0 blockers
  in the SEO doc's own "Remaining blockers" list. Do not surface them in rendered content
  or schema as if confirmed. `site.ts` already has `offersConfirmed: false` and a
  `licenseNumber` CONFIRM marker from Phase B — respect those flags, don't quietly resolve
  them by assumption.

## Hard constraints (same as Phase B, restated because they still apply)

- No hardcoded NAP/phone/email — everything through `site.ts`.
- City hub content must meet the SEO doc's "City uniqueness gate" (Section D): city-specific
  opening, relationship to the Carlsbad office stated explicitly for non-Carlsbad hubs,
  no implied office where none exists, 30-40% non-shared text minimum across city pages.
- Every money page (schedule, and any page with a service CTA) links to
  `/schedule-a-session/` and displays the phone number, per Build Spec link quotas.
- Follow the internal link plan's required links per page type (Build Spec / SEO doc
  Section B and C) — don't under-link or over-link relative to the specified quotas.
- Commit in small, reviewable chunks — components first, then homepage, then hubs, then
  pillars, then remaining pages, then redirect verification. Not one large commit.

## Verification before you report back

- `npm run build` and `npm run dev` both succeed cleanly.
- Confirm no public page ships Keystatic/React JS — check `dist/client/**/index.html` for
  any `<script src>` referencing `keystatic-page` or the Keystatic client bundle. This was
  verified clean after Phase B; don't let it regress.
- Spot-check 3-4 redirect entries from `vercel.json` against the built output to confirm
  they'd actually resolve (old path → real new route that exists in this build).
- Run through the internal link matrix once by hand for at least the homepage and one city
  hub — confirm required links (Section B/C) are actually present, not just intended.

## When you're done

Stop. Do not proceed to Wave 2 (remaining service pillars, Carlsbad city/service cluster,
Encinitas/San Marcos couples/individual pages). Report: what was built, any `CONFIRM`
markers left in content (and exactly what's needed to resolve each), whether the redirect
spot-check passed, and any doc ambiguities you hit that these two source documents didn't
resolve. Wait for explicit go-ahead before Wave 2.
