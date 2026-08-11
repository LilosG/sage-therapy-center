import { site } from './site';
import type { PageFaqItem } from '../lib/pageFaqs';

// Dedicated FAQ-hub supplements. These guarantee that the FAQ index itself
// remains useful even if the editable global FAQ collection is temporarily
// sparse; authored collection entries still render first.
export const faqHubSupplemental: PageFaqItem[] = [
  {
    q: 'Where is S.A.G.E. Therapy Center located?',
    a: `S.A.G.E. Therapy Center's only physical office is at ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}.`,
  },
  {
    q: 'What therapy services are available through S.A.G.E.?',
    a: 'S.A.G.E. offers individual therapy, couples counseling, family therapy, teen counseling, premarital and marriage counseling, EMDR therapy, and concern-focused support for anxiety and trauma-related needs.',
  },
  {
    q: 'Who provides therapy at S.A.G.E. Therapy Center?',
    a: `${site.practitioner.name}, ${site.practitioner.credential}, provides therapy through S.A.G.E. Therapy Center in Carlsbad.`,
  },
  {
    q: 'Is telehealth available?',
    a: `Yes. Telehealth is available across ${site.telehealth.coverageArea}, while in-person sessions are based at the Carlsbad office.`,
  },
  {
    q: 'Do I need to know exactly which therapy service I need before reaching out?',
    a: 'No. You can start with the concern, relationship, transition, or goal that feels most important and discuss the best service fit during follow-up.',
  },
  {
    q: 'How do I request a therapy session with S.A.G.E.?',
    a: `Use the online request form or call ${site.phone.display} to discuss fit, current availability, and whether you prefer in-person or telehealth sessions.`,
  },
];
