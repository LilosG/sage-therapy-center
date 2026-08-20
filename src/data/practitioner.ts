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
    `${site.practitioner.name} is a Licensed Marriage and Family Therapist and the founder of ${site.name}. She works with individuals, couples, families, and teens — and has built this practice around one core belief: therapy should come from someone who has actually done the work, not just studied it.`,
    'Kristin brings her own lived experience to this work. That shapes how she shows up — with warmth, honesty, and a genuine understanding of how hard the process can be. She believes that a good therapist is less a teacher and more a guide who has made the journey themselves.',
    'S.A.G.E. stands for Self-Awareness, Growth, and Enlightenment. Rather than applying a single fixed method, Kristin draws from multiple therapeutic approaches — adapting to what is most useful for the person, relationship, or family in front of her. Her training spans EMDR, Lifespan Integration, CBT, IMAGO, Psychodynamic, Attachment-Based, and art therapy techniques, and she considers the full picture: emotional, mental, physical, and relational well-being.',
    'People often come in carrying anxiety, grief, trauma, relationship strain, family stress, or a quiet sense that something is ready for attention. You do not need to have it all figured out before reaching out — a first conversation is simply about fit and what you are looking for.',
  ],
  modalities: ['EMDR', 'Lifespan Integration', 'CBT', 'IMAGO', 'Psychodynamic', 'Attachment-Based'],
  ctaLabel: 'Learn More About Kristin',
  ctaHref: ABOUT_URL,
} as const;
