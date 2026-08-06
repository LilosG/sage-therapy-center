// Single source of truth for Kristin's bio, modalities, process steps, and
// canonical quote — the real copy that was previously typed inline into
// index.astro only. MeetKristin/ProcessSteps/QuoteBlock are generic,
// props-driven components (see src/components/sections/); this file is
// the one place their content lives so every consumer (homepage, service
// pillars, city/service combo pages) imports the same data instead of
// each page re-typing the bio and risking drift.
//
// Mirrors the site.ts pattern already established in this repo: import
// this everywhere the practitioner bio/process/quote is needed, never
// retype the copy in a component or page.
import { site } from './site';
import { ABOUT_URL } from './nav';
import kristinPhoto from '../assets/images/kristin-moorehead-malley.webp';

export const practitioner = {
  name: site.practitioner.name,
  credential: site.practitioner.credential,
  image: kristinPhoto,

  bio: [
    `${site.practitioner.name} is a Licensed Marriage and Family Therapist based in ${site.address.city}, ${site.address.region}, offering individual and couples therapy at ${site.name}.`,
    'Sessions draw on a range of approaches, matched to what fits each person or couple rather than a one-size-fits-all method.',
  ],

  modalities: ['EMDR', 'Lifespan Integration', 'CBT', 'IMAGO', 'Psychodynamic', 'Attachment-Based'],

  ctaLabel: 'Learn More About Kristin',
  ctaHref: ABOUT_URL,
} as const;

export const processSteps = {
  eyebrow: 'How It Works',
  heading: 'How therapy works',
  steps: [
    { title: 'Reach out', body: 'Request a session to discuss fit and availability, by phone or email.' },
    {
      title: 'First session',
      body: 'Meet with Kristin to talk through what brought you in and what you\u2019re hoping for.',
    },
    { title: 'Ongoing sessions', body: 'Continue at a pace and with an approach that fits your goals.' },
  ],
} as const;

export const canonicalQuote = {
  quote: 'Therapy is a lot like climbing Everest.',
  attribution: `${site.practitioner.name}, ${site.practitioner.credential}`,
} as const;
