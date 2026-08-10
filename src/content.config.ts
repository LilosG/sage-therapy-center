import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const faqItems = z
  .array(
    z.object({
      q: z.string(),
      a: z.string(),
    })
  )
  .optional();

const recognitionItems = z
  .array(
    z.object({
      title: z.string(),
      body: z.string(),
    })
  )
  .min(2)
  .max(4)
  .optional();

const overviewBlock = z
  .object({
    eyebrow: z.string().optional(),
    heading: z.string(),
    paragraphs: z.array(z.string()).min(1).max(4),
  })
  .optional();

const topicBlock = z
  .object({
    eyebrow: z.string().optional(),
    heading: z.string(),
    intro: z.string().optional(),
    items: z.array(z.string()).min(3).max(12),
  })
  .optional();

const approachBlock = z
  .object({
    eyebrow: z.string().optional(),
    heading: z.string(),
    body: z.string(),
    modalities: z.array(z.string()).max(7).optional(),
  })
  .optional();

const decisionItems = z
  .array(
    z.object({
      q: z.string(),
      a: z.string(),
    })
  )
  .min(2)
  .max(6)
  .optional();

const services = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    category: z.enum(['core', 'concern-led']),
    pageKind: z.enum(['audience', 'relationship', 'family', 'adolescent', 'modality', 'concern']).optional(),
    primaryTarget: z.string(),
    mustNotCompeteFor: z.string(),
    relatedServices: z.array(reference('services')),
    description: z.string(),

    // Structured conversion-page fields. These are optional so existing
    // service entries keep rendering while we migrate each pillar deliberately.
    // When populated, the service layout owns presentation rather than asking
    // an arbitrary Markdown body to determine the page composition.
    recognition: recognitionItems,
    overview: overviewBlock,
    topics: topicBlock,
    approach: approachBlock,
    decisionItems,
    faq: faqItems,
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
    faq: faqItems,
  }),
});

// Launch-matrix entries only. A missing city-service content entry is the
// intentional guardrail that prevents unapproved city x service routes.
const cityServices = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/city-services' }),
  schema: z.object({
    city: reference('cities'),
    service: reference('services'),
    slugOverride: z.string().optional(),
    minWordCount: z.number().default(400),
    uniqueContentPercent: z.number().default(35),

    // Money pages need the strongest structured uniqueness. These fields
    // allow a city-service entry to control its own recognition, local/service
    // overview, concerns, relevant approaches and decision-stage content while
    // the shared layout keeps the visual system and funnel centralized.
    recognition: recognitionItems,
    overview: overviewBlock,
    topics: topicBlock,
    approach: approachBlock,
    decisionItems,
    faq: faqItems,
    lateralLinks: z.array(reference('services')).optional(),
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
