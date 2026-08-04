# S.A.G.E. Therapy Center — Technical Build Spec (Astro)
Companion to: `SAGE_Local_SEO_Site_Architecture_Complete.pdf`
Prepared: August 4, 2026 — Lilos Growth

This document is the source of truth for **how** the site gets coded. The SEO Architecture
doc is the source of truth for **what pages exist and how they link**. Neither document
overrides the other's domain. If a coding agent or contributor is unsure how to implement
something, it references this doc — not its own defaults.

No hardcoded values. No copy-pasted page templates with inline edits. No shortcuts around
the content/component split below. If a page's content changes, it should only ever require
editing a data entry — never touching a `.astro` template.

---

## 1. Stack Decisions

| Decision | Value | Rationale |
|---|---|---|
| Framework | Astro (latest stable) | Matches existing Lilos Growth stack |
| Styling | Tailwind CSS v4 + `@tailwindcss/vite` | Current Astro default as of `astro add tailwind`. Deliberate deviation from your other repos (which run v3 + `@astrojs/tailwind`) — this is a fresh build with nothing to migrate, so it takes the current-best-practice path rather than matching legacy convention. v4's native Vite plugin avoids the `@astrojs/tailwind`/v3 peer-dep conflict you hit on lilos-growth, so the `.npmrc` legacy-peer-deps line is likely unnecessary here (keep it anyway — harmless, and cheap insurance) |
| Package manager | npm | Confirmed pattern across your repos (`package-lock.json`) |
| **Known accepted risk** | `path-to-regexp@6.1.0` (high severity, ReDoS via backtracking regex, [GHSA-9wv6-86v2-598j](https://github.com/advisories/GHSA-9wv6-86v2-598j)) | Transitive dependency via `@vercel/routing-utils@5.3.3` → `@astrojs/vercel@11.0.4`, the only adapter version compatible with `astro@^7.0.0`. Verified Aug 2026: no published version of `@vercel/routing-utils` (checked through `6.4.1`) resolves this — it still pins `path-to-regexp@6.1.0` directly. `npm overrides` was evaluated and rejected — forcing the version doesn't change what's actually loaded. Risk is confined to Vercel's internal request-routing layer (ReDoS on request parsing), not exploitable through site content, Keystatic admin, or user input on this site. Re-check `npm audit` when `@astrojs/vercel` or `@vercel/routing-utils` next release, and when the project eventually upgrades to Astro 8+ (which may unlock a newer adapter major). Do not re-attempt the same `npm audit fix --force` → check → override chain without new upstream releases — this was already run to ground. |
| Hosting | Vercel | Auto-deploy from `main` |
| Repo | GitHub, org `LilosG`, repo `sage-therapy-center` (confirm) | Matches org convention |
| CMS | Keystatic | Matches your standardized pattern across all 6 GPH sites + BET — do not introduce Tina or another CMS for this client. Requires `@astrojs/react` (Keystatic's admin UI is React-based) and `@astrojs/vercel` as adapter (Keystatic injects on-demand `/keystatic/**` admin routes, which need an adapter present even though all public content pages still prerender statically — confirmed via Phase B build: `output` stays unset/`static` by default, only Keystatic's internally-injected routes go server-rendered, nothing in `src/pages` opts out of prerendering) |
| Content modeling | Astro Content Collections (`src/content/`) + Keystatic schema bound to those collections | Collections give you type-safe frontmatter; Keystatic gives Kristin a real editing UI without touching code |
| Image handling | Astro's built-in `<Image />` / `astro:assets`, WebP/AVIF output | Matches doc's image optimization requirement |
| Node | LTS matching Vercel's default | Avoid pinning unless a dependency forces it |

**.npmrc** (known necessary for this stack on Vercel):
```
legacy-peer-deps=true
```

---

## 2. Design Tokens (extracted from V4 visual)

**Tailwind v4 note:** there is no `tailwind.config.mjs` by default. Tokens are defined
CSS-first, in an `@theme` block inside `src/styles/global.css`. This is the correct v4
convention — do not add back a JS config file to force the old pattern. Example shape:

```css
@import "tailwindcss";

@theme {
  --color-sage-900: #...;
  --color-sage-600: #...;
  --color-sage-100: #...;
  --color-cream: #...;
  --color-charcoal: #...;
  --font-display: "...", serif;
  --font-body: "...", sans-serif;
}
```

These need to be real theme tokens, not ad hoc utility classes scattered through templates.

**Color roles** (exact hex to be sampled from final assets, these are close reads):
- `sage-900` — deep sage/olive, used for dark full-bleed sections (quote block, footer)
- `sage-600` — mid sage, accents/icons/labels
- `sage-100` — pale sage-tinted background for secondary sections ("You're in the right place," "What we offer")
- `cream` — warm off-white base background
- `charcoal` — primary text color (not pure black)
- `rose-dust` — accent tone pulled from the hero photography, used sparingly (not a UI color, more a photography treatment note)
- `gold-hairline` — thin accent rule under eyebrow labels

**Typography:**
- Display/headline: serif (e.g., a text-forward serif — confirm exact family with client's brand assets), italic used selectively for emphasis words within headlines (see hero: "*anxiety, trauma*")
- Body: clean sans-serif
- Eyebrow labels: small-caps or uppercase, letter-spaced, small size, sage-600

**Component-level patterns to encode as reusable Tailwind component classes or Astro components, not repeated utility strings:**
- `.eyebrow-label` — uppercase, tracked, small
- `.section-card` — rounded, soft border, generous padding, icon-in-circle header
- `.quote-block` — full-bleed dark sage, centered serif italic quote
- `.trust-strip` — thin horizontal strip under hero (license / years / areas / availability)

Build the token set and 2-3 component classes *first*, before any page markup, so every
page pulls from the same system instead of each page inventing its own spacing/radius/color
choices.

---

## 3. Folder Structure

```
src/
  components/
    layout/         Header, Footer, Breadcrumbs, TrustStrip
    sections/        Hero, ReassuranceGrid, MeetKristin, ProcessSteps,
                     ServiceGrid, SpecialtyTags, ApproachList, QuoteBlock,
                     TestimonialGrid, FAQAccordion, LocationBlock, CTASection
    ui/              Card, IconCircle, Button, Accordion (primitives)
    seo/             SchemaOrg.astro (JSON-LD emitter, see Section 8)
  content.config.ts   collection schemas (Section 5) — NOTE: Astro 7 requires this
                       file at src/content.config.ts, NOT src/content/config.ts as
                       older Astro docs/examples show. Verified during Phase B build.
  content/
    services/         20 markdown/mdx entries
    cities/            8 entries
    city-services/     launch-matrix entries only (see Section 6 — gated pages
                        must NOT have content entries yet)
    testimonials/
    faq/
    blog/
  data/
    site.ts          NAP, phone, email, hours, social — single source, imported everywhere
    nav.ts           header/footer nav structure
    redirects.ts     mirrors vercel.json redirects for reference/testing
  layouts/
    BaseLayout.astro
    ServiceLayout.astro
    CityLayout.astro
    CityServiceLayout.astro
  pages/
    index.astro
    services/index.astro
    services/[service].astro          -> generated from content collection
    [city]/index.astro                -> generated from content collection
    [city]/[service].astro            -> generated ONLY for launch-matrix entries
    about.astro / faq.astro / contact.astro / schedule-a-session.astro
    areas-we-serve.astro
    blog/index.astro
    blog/[slug].astro
    resources/[slug].astro
  styles/
    global.css
public/
```

---

## 4. Content Collections — Schemas

Define in `src/content/config.ts`. This is the actual enforcement mechanism for "no
hardcoded values" — if a field isn't in the schema, it doesn't get invented in a template.

**`services`**
```ts
{
  title, slug, category: 'core' | 'concern-led',
  primaryTarget: string,          // from Page Target Map in SEO doc
  mustNotCompeteFor: string,      // guardrail note, not rendered — dev reference only
  relatedServices: string[],      // 2-4 slugs, enforces internal link plan
  description, body,
  faq: { q: string, a: string }[] // optional, page-specific FAQ subset
}
```

**`cities`**
```ts
{
  name, slug, hasOffice: boolean,        // false for all except Carlsbad
  primaryTarget, secondaryTargets: string[],
  approvedCityServices: string[],        // slugs — controls what CityLayout links to
  nearbyCities: string[],                // slugs — controls "nearby city" links per SEO doc adjacency list
  neighborhoods: { name, blurb }[],      // Carlsbad/Encinitas only, per doc — sections not pages
  body
}
```

**`city-services`** (launch-matrix entries only — see Section 6 for the gating rule)
```ts
{
  city: string, service: string,        // reference slugs
  minWordCount: 600,                     // enforced at build/CI, not just convention
  uniqueContentPercent: 35,              // documented requirement, manual QA gate
  body, faq: { q, a }[]
}
```

**`testimonials`**
```ts
{ quote, attribution, city?: string, permissioned: boolean }
```
Build-time check: refuse to render any testimonial where `permissioned !== true`.

**`faq`** — global FAQ pool (cost, process, fit) referenced by `/faq/` and pulled selectively
into service/city pages.
```ts
{ q: string, a: string }
```
(Same shape as the inline `faq` arrays on `services` and `city-services` — this is the only
FAQ field vocabulary defined anywhere in project docs, confirmed during Phase B.)

**Keystatic binding note (Phase B finding):** Keystatic's `collection()` requires a
`slugField` built with `fields.slug()`, which stores `{ name, slug }` — a shape none of the
Zod schemas above define. Fix: add a Keystatic-only `entryId` field (`fields.slug()`) to
each collection purely to drive the admin UI's filename/slug behavior. Since the Zod
schemas use plain `z.object()` (not `.strict()`), the extra frontmatter key is silently
dropped on parse and never reaches validated content data — Keystatic and the content
layer stay decoupled. One side effect: Keystatic writes `entryId: {name, slug}` into the
actual `.md` frontmatter on disk, so raw files will show that extra field — harmless, but
expected, not a bug if you see it.

**`blog`**
```ts
{ title, slug, publishDate, primaryService: string, primaryLocalPage: string,
  conversionPage: string, body }
```
Matches the doc's link quota rule: every blog post links one service, one local page, one
conversion page — model it as required frontmatter, not something the writer remembers.

---

## 5. Routing & the Gated Matrix — Critical Guardrail

The SEO doc is explicit: **do not build all 160 possible city × service combinations.**
Only the approved launch matrix gets a live route. The research-gated pages (Del Mar
couples, Solana Beach couples, Rancho Santa Fe couples, Encinitas EMDR, Oceanside teen,
Vista teen) must not exist as routes or content entries until explicitly ungated.

Implementation rule: `[city]/[service].astro` uses `getStaticPaths()` sourced **only** from
existing `city-services` content entries — never from a cross-product of all cities × all
services. This makes the gating enforced by content existing or not existing, not by a
comment saying "don't build this yet." Adding a gated page later = adding one content file,
nothing else.

Same logic applies to neighborhoods: they render as sections within `CityLayout` from the
`neighborhoods` array on the city entry — they never get their own route file.

---

## 6. Component Inventory (build these once, reuse everywhere)

Layout: `Header`, `Footer`, `Breadcrumbs`, `TrustStrip`
Sections: `Hero`, `ReassuranceGrid` (the "feeling anxious / stuck in patterns" 4-card grid),
`MeetKristin`, `ProcessSteps` (3-step "how therapy works"), `ServiceGrid`, `SpecialtyTags`,
`ApproachList`, `QuoteBlock`, `TestimonialGrid`, `FAQAccordion`, `LocationBlock`,
`CTASection`
Primitives: `Card`, `IconCircle`, `Button`, `Accordion`

Every section component takes typed props — no component reaches into `site.ts` or content
collections directly except layout-level components. This keeps components portable and
testable, and matches the "centralized data files, shared components" pattern from your
other builds.

---

## 7. JSON-LD / Schema Implementation

Single `SchemaOrg.astro` component that accepts a `type` prop (`organization`,
`localBusiness`, `service`, `city`, `faqPage`, `person`) and pulls from `src/data/site.ts`
for the shared business `@id` — every page referencing the business uses the *same* `@id`,
never a new node per page (explicit requirement in the SEO doc).

`offers` schema stays disabled until payment/insurance policy is confirmed (Wave 0 blocker
in the SEO doc). Build the field into the component now, gate it behind a `site.ts` flag
(`offersConfirmed: false`) so turning it on later is a one-line change, not a re-implementation.

Review/rating schema: do not implement until real, permissioned reviews exist. Don't stub
it with placeholder data.

---

## 8. Redirects

Implement via `vercel.json` `redirects` array — mirror the `legacy_redirects` block from
Section E of the SEO doc exactly, including status codes. Keep `src/data/redirects.ts` as
a typed mirror so a build-time script can diff the two and fail CI if they drift apart.

Do not implement redirects via Astro middleware — `vercel.json` redirects happen at the
edge before Astro even runs, which is correct for a full-replacement migration with no
fallback server.

---

## 9. Build Phase Sequence

Mirrors the SEO doc's publish waves — build in this order, not all at once:

1. **Scaffold** — Astro init, Tailwind config with tokens, folder structure, `site.ts`,
   Keystatic install, base layout, empty content collections with schema validation passing
2. **Wave 1 core** — Header/Footer, Hero, homepage, services hub, areas-we-serve hub,
   Carlsbad/Encinitas/San Marcos hubs, individual-therapy + couples-counseling pillars,
   schedule page, about, contact, FAQ, full redirect set live and tested in staging
3. **Wave 2** — remaining core service pillars, Carlsbad city/service cluster, Encinitas +
   San Marcos couples/individual pages
4. **Wave 3** — Oceanside/Vista hubs + pages, Del Mar/Solana Beach/Rancho Santa Fe hubs
5. **Wave 4** — remaining concern-led service pages, blog, resources

Each phase should be a reviewable checkpoint, not a single mega-commit.

---

## 10. Non-Negotiables (carried from project standards)

- No inline content in `.astro` files where a content collection entry belongs
- No new CMS, no duplicate business `@id` in schema, no city page implying an office that
  doesn't exist, no `offers` schema before confirmation, no hardcoded phone/email/address
  anywhere except `site.ts`
- No route files for gated city/service pages
- Validate `getStaticPaths()` output against the approved launch matrix before every deploy
- Every command run against the real repo state — check current file/branch status before
  writing, no assumptions about what already exists

---

## 11. Open Items Before/During Build (from SEO doc Wave 0 — content-side, not blocking scaffolding)

License number confirmation, GBP primary category, payment/insurance policy, current
review count, resolution of the duplicate Squarespace "(Copy)" instance, and the Jefferson
St address conflict are all **content/business verification items**, not engineering
blockers — the site can be scaffolded and built in parallel, but none of the flagged fields
(license schema, offers schema, review count copy) go live until confirmed.
