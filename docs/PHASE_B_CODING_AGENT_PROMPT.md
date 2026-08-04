# Phase B Handoff — S.A.G.E. Therapy Center Scaffold

You are working in `~/sites/sage-therapy-center`, an Astro 7 project (Tailwind v4 via
`@tailwindcss/vite`, MDX) already scaffolded, git-initialized, and connected to
GitHub (`LilosG/sage-therapy-center`) and Vercel with auto-deploy on push to `main`.

Two reference documents govern this build. Read both in full before writing anything:

1. `SAGE_Local_SEO_Site_Architecture_Complete.pdf` — the source of truth for **what**
   pages/routes/content must exist, internal linking rules, redirects, and schema plan.
2. `SAGE_Technical_Build_Spec.md` — the source of truth for **how** it gets coded:
   folder structure, content collection schemas, component inventory, design tokens,
   routing/gating rules, CMS choice, redirect implementation.

## Scope of this task — STOP at the end of this list

Build ONLY the following. Do not create any page content, service copy, city copy, or
actual pages beyond the minimum needed to verify the build runs. This is a scaffolding
pass, not a content pass.

1. `src/content/config.ts` — implement the exact schemas from Build Spec Section 4
   (`services`, `cities`, `city-services`, `testimonials`, `faq`, `blog`). Use Zod. Do not
   add fields not listed in the spec, and do not omit any.
2. `src/data/site.ts` — NAP, phone, email, hours, social links, `offersConfirmed: false`
   flag — pull exact values from the SEO doc's `site` object in Section E (JSON block).
3. `src/data/nav.ts` — header/footer nav structure per the SEO doc's header/footer link
   plan (Section B).
4. `src/styles/global.css` — `@theme` block with color/typography tokens. Use your best
   read of the uploaded V4 screenshot for values, but mark every token with a `/* CONFIRM
   */` comment — these are placeholder reads, not final brand values.
5. `src/layouts/BaseLayout.astro`, `ServiceLayout.astro`, `CityLayout.astro`,
   `CityServiceLayout.astro` — structural only (head, meta, slot, breadcrumbs stub). No
   visual polish yet.
6. `src/components/seo/SchemaOrg.astro` — implement per Build Spec Section 8. Gate
   `offers` schema behind `site.ts`'s `offersConfirmed` flag.
7. One placeholder content entry in EACH collection (e.g. one dummy service, one dummy
   city) — enough to prove `getStaticPaths()` and the schemas actually validate and
   render. Label placeholder content clearly as placeholder in the frontmatter title.
8. Keystatic install, configured against these same collections (`npx keystatic init` or
   equivalent) so the admin UI at `/keystatic` reflects the real schema.
9. `vercel.json` with the full `legacy_redirects` array from SEO doc Section E, exact
   status codes preserved.

## Hard constraints

- No content collection field that isn't in the Build Spec schema. No inventing fields.
- No route file for any research-gated city/service page (see SEO doc's gated list). If
  you're unsure whether a page is gated, treat it as gated.
- No hardcoded phone/email/address/NAP anywhere outside `site.ts`.
- No new CMS other than Keystatic.
- No `tailwind.config.mjs` — this project uses Tailwind v4's CSS-first `@theme` convention.
- Every component takes typed props; section-level components do not import from
  `site.ts` or content collections directly (only layouts do).
- Commit in small, reviewable chunks (schemas, then data files, then layouts, then
  Keystatic, then redirects) — not one giant commit.

## When you're done

Stop. Do not proceed to building Wave 1 pages (homepage, services hub, city hubs,
schedule page) even though the Build Spec's Section 9 phase sequence lists them next.
Report back: what you built, what placeholder/CONFIRM markers exist, whether
`npm run dev` and `npm run build` both succeed cleanly, and any schema ambiguities you
hit that the two source docs didn't resolve. Wait for explicit go-ahead before Wave 1.
