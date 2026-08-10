// Central practitioner content used across page families so biography,
// credentials, modalities, and profile CTAs stay synchronized.
import { site } from './site';
import { ABOUT_URL } from './nav';

export const practitioner = {
  name: site.practitioner.name,
  credential: site.practitioner.credential,
  bio: [
    `${site.practitioner.name} is a Licensed Marriage and Family Therapist based in ${site.address.city}, ${site.address.region}, offering individual and couples therapy at ${site.name}.`,
    'Sessions draw on a range of approaches, matched to what fits each person or couple rather than a one-size-fits-all method.',
  ],
  aboutBio: [
    `${site.practitioner.name} is a Licensed Marriage and Family Therapist based in ${site.address.city}, ${site.address.region}, working with individuals, couples, families, and teens through ${site.name}.`,
    'S.A.G.E. stands for Self-Awareness, Growth, and Enlightenment. The practice is built around individualized therapy rather than requiring every person or relationship to fit one fixed method.',
    'Kristin draws from several therapeutic approaches and adapts the work to what is most relevant to the person, relationship, family, and goals in front of her. The focus can evolve as therapy develops and new priorities become clearer.',
    'Clients may begin with anxiety, grief, trauma-related concerns, relationship patterns, family stress, a life transition, or simply a sense that something is ready for more attention. A first conversation is used to discuss fit and availability without requiring you to have everything defined in advance.',
  ],
  modalities: ['EMDR', 'Lifespan Integration', 'CBT', 'IMAGO', 'Psychodynamic', 'Attachment-Based'],
  ctaLabel: 'Learn More About Kristin',
  ctaHref: ABOUT_URL,
} as const;
