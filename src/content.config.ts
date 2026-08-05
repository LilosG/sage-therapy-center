import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Field lists below mirror SAGE_Technical_Build_Spec.md Section 4 exactly.
// `body` in the spec's shorthand refers to the markdown/MDX content itself
// (accessed via `render(entry)`), not a frontmatter field — Astro's content
// layer does not model page body as part of the schema.

const services = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    category: z.enum(['core', 'concern-led']),
    primaryTarget: z.string(),
    mustNotCompeteFor: z.string(),
    // Build Spec: "2-4 slugs, enforces internal link plan." Left as
    // documentation rather than a hard min/max here — enforcing it at the
    // schema level would require 3+ real content entries to avoid
    // self-reference, which is a content-authoring concern outside this
    // scaffolding phase (one placeholder entry per collection is the goal
    // right now). Enforce the 2-4 count at content-QA/CI time instead.
    relatedServices: z.array(reference('services')),
    description: z.string(),
    faq: z
      .array(
        z.object({
          q: z.string(),
          a: z.string(),
        })
      )
      .optional(),
  }),
});

const cities = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/cities' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    hasOffice: z.boolean(),
    primaryTarget: z.string(),
    secondaryTargets: z.array(z.string()),
    approvedCityServices: z.array(reference('services')),
    nearbyCities: z.array(reference('cities')),
    neighborhoods: z.array(
      z.object({
        name: z.string(),
        blurb: z.string(),
      })
    ),
    faq: z
      .array(
        z.object({
          q: z.string(),
          a: z.string(),
        })
      )
      .optional(),
  }),
});

// Launch-matrix entries only. Do not add an entry here for any
// research-gated city/service combination (see SEO doc Section A,
// "Research-gated" list) — a missing entry is what keeps that route
// from being generated at all (see Build Spec Section 5).
const cityServices = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/city-services' }),
  schema: z.object({
    city: reference('cities'),
    service: reference('services'),
    // Revised from 600 after Wave 2 (see Build Spec Section 4) — 350-450
    // words is the realistic ceiling for genuine, non-overlapping
    // per-page content on a solo-practitioner site. Not a padding target.
    minWordCount: z.number().default(400),
    uniqueContentPercent: z.number().default(35),
    faq: z
      .array(
        z.object({
          q: z.string(),
          a: z.string(),
        })
      )
      .optional(),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/testimonials' }),
  schema: z.object({
    quote: z.string(),
    attribution: z.string(),
    city: reference('cities').optional(),
    permissioned: z.boolean(),
  }),
});

// The Build Spec describes this collection in prose only ("global FAQ pool
// ... referenced by /faq/ and pulled selectively into service/city pages")
// without an explicit field list. The q/a shape is reused from the inline
// faq arrays on `services`, `cities`, and `cityServices` since that's the
// only FAQ field vocabulary either source document defines.
const faq = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/faq' }),
  schema: z.object({
    q: z.string(),
    a: z.string(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    publishDate: z.date(),
    primaryService: reference('services'),
    primaryLocalPage: z.string(),
    conversionPage: z.string(),
  }),
});

export const collections = {
  services,
  cities,
  'city-services': cityServices,
  testimonials,
  faq,
  blog,
};
