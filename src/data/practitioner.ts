// Kristin's bio/modalities copy, extracted from index.astro so MeetKristin
// can be reused across interior pages (service/city/city-service layouts)
// without duplicating this content on every page.
import { site } from './site';
import { ABOUT_URL } from './nav';

export const practitioner = {
  name: site.practitioner.name,
  credential: site.practitioner.credential,
  bio: [
    `${site.practitioner.name} is a Licensed Marriage and Family Therapist based in ${site.address.city}, ${site.address.region}, offering individual and couples therapy at ${site.name}.`,
    'Sessions draw on a range of approaches, matched to what fits each person or couple rather than a one-size-fits-all method.',
  ],
  modalities: ['EMDR', 'Lifespan Integration', 'CBT', 'IMAGO', 'Psychodynamic', 'Attachment-Based'],
  ctaLabel: 'Learn More About Kristin',
  ctaHref: ABOUT_URL,
} as const;
