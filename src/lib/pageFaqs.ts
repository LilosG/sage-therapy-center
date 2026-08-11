import { site } from '../data/site';

export interface PageFaqItem {
  q: string;
  a: string;
}

export const MIN_LANDING_PAGE_FAQS = 5;
export const TARGET_LANDING_PAGE_FAQS = 6;

interface TopicBlock {
  items: string[];
}

interface ApproachBlock {
  modalities?: string[];
}

function normalizeQuestion(question: string) {
  return question.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function dedupeFaqs(items: PageFaqItem[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = normalizeQuestion(item.q);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function takeLandingFaqs(items: PageFaqItem[]) {
  const faqs = dedupeFaqs(items).slice(0, TARGET_LANDING_PAGE_FAQS);
  if (faqs.length < MIN_LANDING_PAGE_FAQS) {
    throw new Error(`Landing page resolved to ${faqs.length} FAQs; minimum is ${MIN_LANDING_PAGE_FAQS}.`);
  }
  return faqs;
}

function naturalList(items: string[]) {
  const clean = items.map((item) => item.trim()).filter(Boolean);
  if (clean.length <= 1) return clean[0] ?? '';
  if (clean.length === 2) return `${clean[0]} and ${clean[1]}`;
  return `${clean.slice(0, -1).join(', ')}, and ${clean.at(-1)}`;
}

function topicSummary(topics?: TopicBlock) {
  const items = topics?.items?.slice(0, 6) ?? [];
  return items.length ? naturalList(items) : 'stress, transitions, relationships, recurring patterns, and personal growth goals';
}

function modalitySummary(approach?: ApproachBlock) {
  const modalities = approach?.modalities?.slice(0, 5) ?? [];
  return modalities.length ? naturalList(modalities) : 'more than one therapeutic approach depending on the client and goals';
}

export function buildServiceFaqs(input: {
  title: string;
  existing?: PageFaqItem[];
  topics?: TopicBlock;
  approach?: ApproachBlock;
}) {
  const { title, existing = [], topics, approach } = input;
  const lowerTitle = title.toLowerCase();

  return takeLandingFaqs([
    ...existing,
    {
      q: `Who provides ${lowerTitle} at S.A.G.E. Therapy Center?`,
      a: `${site.practitioner.name}, ${site.practitioner.credential}, provides ${lowerTitle} through S.A.G.E. Therapy Center in ${site.address.city}.`,
    },
    {
      q: `What concerns can ${lowerTitle} in ${site.address.city} help address?`,
      a: `${title} may make room for concerns such as ${topicSummary(topics)}. The focus is individualized rather than limited to a single diagnosis or fixed program.`,
    },
    {
      q: `Is telehealth available for ${lowerTitle}?`,
      a: `Telehealth is available across ${site.telehealth.coverageArea}. You can discuss whether online or in-person sessions are the better fit when you request a session.`,
    },
    {
      q: `What therapy approaches may be used in ${lowerTitle}?`,
      a: `Kristin may draw from ${modalitySummary(approach)}. The approach can change as the work develops and as different concerns become more relevant.`,
    },
    {
      q: `Where do in-person ${lowerTitle} sessions take place?`,
      a: `In-person sessions take place at S.A.G.E. Therapy Center's office at ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}.`,
    },
    {
      q: `How do I start ${lowerTitle} in ${site.address.city}?`,
      a: `Start by requesting a session to discuss fit, current availability, what you are looking for, and whether you prefer the Carlsbad office or telehealth.`,
    },
  ]);
}

export function buildCityFaqs(input: {
  cityName: string;
  hasOffice: boolean;
  existing?: PageFaqItem[];
  serviceTitles: string[];
}) {
  const { cityName, hasOffice, existing = [], serviceTitles } = input;
  const services = naturalList(serviceTitles);

  // City content already carries the most locally specific questions first.
  // Supplements prioritize distinct access/provider/start questions so a city
  // with two authored FAQs does not get near-duplicate location/service FAQs.
  return takeLandingFaqs([
    ...existing,
    {
      q: `Can ${cityName} clients use telehealth?`,
      a: `Yes. Telehealth is available across ${site.telehealth.coverageArea}, including for clients in ${cityName}.`,
    },
    {
      q: `Who provides therapy for ${cityName} clients?`,
      a: `${site.practitioner.name}, ${site.practitioner.credential}, provides therapy through S.A.G.E. Therapy Center's Carlsbad practice and by telehealth across California.`,
    },
    {
      q: `Where do ${cityName} clients attend in-person therapy?`,
      a: `In-person sessions are held at S.A.G.E. Therapy Center's Carlsbad office at ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}.`,
    },
    {
      q: `How can a ${cityName} client get started with S.A.G.E.?`,
      a: `Request a session to discuss fit, current availability, the kind of therapy you are looking for, and whether in-person or telehealth sessions make sense.`,
    },
    {
      q: hasOffice ? `Where is S.A.G.E. Therapy Center located in ${cityName}?` : `How is S.A.G.E. Therapy Center connected to ${cityName}?`,
      a: hasOffice
        ? `S.A.G.E. Therapy Center's physical office is at ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}.`
        : `S.A.G.E. serves ${cityName} clients from its only physical office in ${site.address.city}, with telehealth available across ${site.telehealth.coverageArea}.`,
    },
    {
      q: `Which core therapy services can ${cityName} clients explore?`,
      a: `Core therapy options available through S.A.G.E. include ${services}. Dedicated ${cityName} service pages are used only where locally differentiated content exists.`,
    },
  ]);
}

export function buildCityServiceFaqs(input: {
  cityName: string;
  serviceTitle: string;
  hasOffice: boolean;
  existing?: PageFaqItem[];
  topics?: TopicBlock;
  approach?: ApproachBlock;
}) {
  const { cityName, serviceTitle, hasOffice, existing = [], topics, approach } = input;
  const lowerTitle = serviceTitle.toLowerCase();

  return takeLandingFaqs([
    ...existing,
    {
      q: `Who provides ${lowerTitle} for ${cityName} clients?`,
      a: `${site.practitioner.name}, ${site.practitioner.credential}, provides ${lowerTitle} through S.A.G.E. Therapy Center.`,
    },
    {
      q: `Is telehealth available for ${lowerTitle} if I live in ${cityName}?`,
      a: `Yes. Telehealth is available across ${site.telehealth.coverageArea}. ${cityName} clients can also discuss in-person sessions at the Carlsbad office.`,
    },
    {
      q: `What approaches may be part of ${lowerTitle} for ${cityName} clients?`,
      a: `Kristin may draw from ${modalitySummary(approach)} depending on what is most relevant to the work.`,
    },
    {
      q: `How do I start ${lowerTitle} as a ${cityName} client?`,
      a: `Request a session to discuss fit, availability, what you want support with, and whether you prefer in-person sessions in Carlsbad or telehealth.`,
    },
    {
      q: `What concerns can ${lowerTitle} for ${cityName} clients address?`,
      a: `${serviceTitle} may explore concerns such as ${topicSummary(topics)}. The focus can evolve as priorities and goals become clearer.`,
    },
    {
      q: hasOffice
        ? `Where do ${lowerTitle} sessions take place in ${cityName}?`
        : `Where do ${cityName} clients attend in-person ${lowerTitle}?`,
      a: `In-person sessions take place at S.A.G.E. Therapy Center's Carlsbad office at ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}.`,
    },
  ]);
}

export function buildHomeFaqs(serviceTitles: string[]) {
  return takeLandingFaqs([
    {
      q: 'Where is S.A.G.E. Therapy Center located?',
      a: `S.A.G.E. Therapy Center's physical office is at ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}.`,
    },
    {
      q: 'What types of therapy does S.A.G.E. Therapy Center offer?',
      a: `Core therapy services include ${naturalList(serviceTitles)}, with additional concern-focused pages for anxiety and trauma-related support.`,
    },
    {
      q: 'Who provides therapy at S.A.G.E. Therapy Center?',
      a: `${site.practitioner.name}, ${site.practitioner.credential}, provides therapy through S.A.G.E. Therapy Center in Carlsbad.`,
    },
    {
      q: 'Does S.A.G.E. offer online therapy or telehealth?',
      a: `Yes. Telehealth is available across ${site.telehealth.coverageArea}, while in-person sessions are based at the Carlsbad office.`,
    },
    {
      q: 'Do I need a diagnosis or know exactly which therapy service I need?',
      a: 'No. You can begin with what is bringing you in and use the first conversation to discuss fit, priorities, and which service or session format makes the most sense.',
    },
    {
      q: 'How do I start therapy with S.A.G.E.?',
      a: `Request a session online or call ${site.phone.display} to discuss fit, current availability, and whether you prefer in-person or telehealth sessions.`,
    },
  ]);
}

export function buildServicesHubFaqs(serviceTitles: string[]) {
  return takeLandingFaqs([
    {
      q: 'What therapy services are available at S.A.G.E. Therapy Center in Carlsbad?',
      a: `Core services include ${naturalList(serviceTitles)}. S.A.G.E. also has dedicated pages for anxiety and trauma-related concerns.`,
    },
    {
      q: 'How do I know which therapy service is the right place to start?',
      a: 'You do not need to choose perfectly before reaching out. Start with the concern, relationship, transition, or goal that feels most important, and use the initial conversation to discuss fit.',
    },
    {
      q: 'Is telehealth a separate therapy service?',
      a: 'No. Telehealth is a session-delivery format. The clinical focus can still be individual, couples, family, teen, EMDR, or another therapy service.',
    },
    {
      q: 'Where are in-person therapy sessions held?',
      a: `In-person sessions are held at S.A.G.E. Therapy Center's office at ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}.`,
    },
    {
      q: 'Are S.A.G.E. therapy services available by telehealth?',
      a: `Telehealth is available across ${site.telehealth.coverageArea}. Whether telehealth is the right format for the work can be discussed when you request a session.`,
    },
    {
      q: 'How do I request a therapy session in Carlsbad?',
      a: `Use the online request form or call ${site.phone.display} to discuss fit, availability, and session options.`,
    },
  ]);
}

export function buildAreasHubFaqs(cityNames: string[], serviceTitles: string[]) {
  return takeLandingFaqs([
    {
      q: 'Where is S.A.G.E. Therapy Center physically located?',
      a: `S.A.G.E.'s only physical office is at ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}.`,
    },
    {
      q: 'Which North County communities does S.A.G.E. serve?',
      a: `The site includes service-area information for ${naturalList(cityNames)}. In-person sessions remain based at the Carlsbad office.`,
    },
    {
      q: 'Does S.A.G.E. have offices in every city listed on the site?',
      a: 'No. Carlsbad is the only physical office location. Other city pages describe communities served through the Carlsbad practice and telehealth.',
    },
    {
      q: 'Can clients outside Carlsbad use telehealth?',
      a: `Yes. Telehealth is available across ${site.telehealth.coverageArea}, including throughout North County San Diego.`,
    },
    {
      q: 'What therapy services are available to North County clients?',
      a: `Core options include ${naturalList(serviceTitles)}. Dedicated city-service pages are used only where the site has locally differentiated content.`,
    },
    {
      q: 'How do I find the right location or session option?',
      a: 'Choose your community page for local access information, or request a session to discuss in-person availability in Carlsbad and telehealth options.',
    },
  ]);
}

export const aboutPageFaqs = takeLandingFaqs([
  {
    q: `Who is ${site.practitioner.name}?`,
    a: `${site.practitioner.name}, ${site.practitioner.credential}, is the therapist behind S.A.G.E. Therapy Center in Carlsbad, California.`,
  },
  {
    q: 'Where does Kristin see clients in person?',
    a: `In-person sessions are based at S.A.G.E. Therapy Center's office at ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}.`,
  },
  {
    q: 'What therapeutic approaches does Kristin draw from?',
    a: 'Kristin draws from multiple approaches, including EMDR, CBT, IMAGO, attachment-based work, Lifespan Integration, and psychodynamic therapy, depending on what is relevant to the client and goals.',
  },
  {
    q: 'Who does S.A.G.E. Therapy Center work with?',
    a: 'S.A.G.E. offers individual therapy, couples counseling, family therapy, teen counseling, premarital and marriage counseling, and additional concern-focused support.',
  },
  {
    q: 'Does Kristin offer telehealth?',
    a: `Yes. Telehealth is available across ${site.telehealth.coverageArea} in addition to in-person sessions in Carlsbad.`,
  },
  {
    q: 'How can I find out whether working with Kristin may be a fit?',
    a: 'Request a session to discuss what you are looking for, current availability, and whether in-person or telehealth sessions make sense.',
  },
]);

export const contactPageFaqs = takeLandingFaqs([
  {
    q: 'How can I contact S.A.G.E. Therapy Center?',
    a: `You can use the online request form, call ${site.phone.display}, or email ${site.email}.`,
  },
  {
    q: 'Where is the S.A.G.E. Therapy Center office?',
    a: `The office is at ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}.`,
  },
  {
    q: 'Can I contact S.A.G.E. about telehealth?',
    a: `Yes. Telehealth is available across ${site.telehealth.coverageArea}, and you can indicate your session preference in the request form.`,
  },
  {
    q: 'How much information should I include in the online request form?',
    a: 'Keep the request focused on contact, scheduling, general service interest, and session preference. You do not need to include sensitive clinical or medical details in the web form.',
  },
  {
    q: 'What happens after I send a therapy inquiry?',
    a: 'The request is used to follow up about fit, current availability, the kind of support you are looking for, and possible session options.',
  },
  {
    q: 'Can I call instead of using the online form?',
    a: `Yes. You can call S.A.G.E. Therapy Center directly at ${site.phone.display}.`,
  },
]);

export const schedulePageFaqs = takeLandingFaqs([
  {
    q: 'What happens after I request a therapy session?',
    a: 'Your request is used to discuss fit, current availability, and the session option that makes the most sense before anything is scheduled.',
  },
  {
    q: 'Where are S.A.G.E. therapy sessions available?',
    a: 'In-person sessions are based at the Carlsbad office, with telehealth available to clients across California.',
  },
  {
    q: 'How much do I need to explain in the request form?',
    a: 'Only enough for scheduling and fit. The form is intentionally brief and asks you not to include sensitive clinical or medical details.',
  },
  {
    q: 'Can I call S.A.G.E. instead of submitting the form?',
    a: `Yes. Call ${site.phone.display} if you would rather start by phone.`,
  },
  {
    q: 'Do I need to know which therapy service I want before requesting a session?',
    a: 'No. You can indicate the general kind of support you are looking for and discuss the most relevant therapy service during follow-up.',
  },
  {
    q: 'Can I choose between in-person therapy and telehealth when I reach out?',
    a: 'Yes. The request form lets you indicate a session preference, and you can discuss in-person Carlsbad sessions, telehealth, or both during follow-up.',
  },
]);

export const telehealthPageFaqs = takeLandingFaqs([
  {
    q: 'Is telehealth a different kind of therapy?',
    a: 'No. Telehealth describes how the session is delivered. The therapeutic focus can still be individual, couples, family, teen, EMDR, anxiety, trauma-focused, or another service that fits your needs.',
  },
  {
    q: 'Where is S.A.G.E. telehealth available?',
    a: `S.A.G.E. offers telehealth to clients across ${site.telehealth.coverageArea}.`,
  },
  {
    q: 'Which S.A.G.E. therapy services can be discussed as telehealth options?',
    a: 'Individual therapy, couples counseling, family therapy, teen counseling, EMDR, anxiety therapy, trauma-focused therapy, and other areas of support can be discussed as telehealth options when appropriate for the work.',
  },
  {
    q: 'Can I choose between in-person and online sessions?',
    a: 'S.A.G.E. is based in Carlsbad for in-person sessions, while telehealth provides a remote option across California. You can discuss which format makes sense when you reach out.',
  },
  {
    q: 'Do I need to choose a therapy service before requesting telehealth?',
    a: 'No. You can start by describing the general kind of support you are looking for and select telehealth as your preferred session format.',
  },
  {
    q: 'How do I request an online therapy session with S.A.G.E.?',
    a: 'Use the inquiry form and select Telehealth as your session preference, then discuss fit, availability, and the therapy focus during follow-up.',
  },
]);
