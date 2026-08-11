import { site } from '../data/site';

export interface PageFaqItem {
  q: string;
  a: string;
}

// Commercial/local landing pages must carry a complete FAQ set. Six is the
// enforced minimum; up to two additional authored FAQs may be preserved when
// they add genuinely page-specific value.
export const MIN_LANDING_PAGE_FAQS = 6;
export const MAX_LANDING_PAGE_FAQS = 8;

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

function finalizeLandingFaqs(required: PageFaqItem[], authored: PageFaqItem[] = []) {
  const faqs = dedupeFaqs([...required, ...authored]).slice(0, MAX_LANDING_PAGE_FAQS);
  if (faqs.length < MIN_LANDING_PAGE_FAQS) {
    throw new Error(
      `Landing page resolved to ${faqs.length} FAQs; minimum is ${MIN_LANDING_PAGE_FAQS}.`
    );
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
  return items.length
    ? naturalList(items)
    : 'stress, transitions, relationships, recurring patterns, and personal growth goals';
}

function modalitySummary(approach?: ApproachBlock) {
  const modalities = approach?.modalities?.slice(0, 5) ?? [];
  return modalities.length
    ? naturalList(modalities)
    : 'more than one therapeutic approach depending on the client, concerns, and goals';
}

export function buildServiceFaqs(input: {
  title: string;
  existing?: PageFaqItem[];
  topics?: TopicBlock;
  approach?: ApproachBlock;
}) {
  const { title, existing = [], topics, approach } = input;
  const lowerTitle = title.toLowerCase();
  const city = site.address.city;

  return finalizeLandingFaqs(
    [
      {
        q: `Who provides ${lowerTitle} in ${city}, CA?`,
        a: `${site.practitioner.name}, ${site.practitioner.credential}, provides ${lowerTitle} through S.A.G.E. Therapy Center's ${city} practice.`,
      },
      {
        q: `What concerns do people bring to ${lowerTitle} in ${city}?`,
        a: `${title} may make room for concerns such as ${topicSummary(topics)}. The focus is individualized rather than limited to a single diagnosis or fixed program.`,
      },
      {
        q: `What therapy approaches may be used in ${lowerTitle}?`,
        a: `Kristin may draw from ${modalitySummary(approach)} depending on what is most relevant to the work. The approach can evolve as priorities and goals become clearer.`,
      },
      {
        q: `Where are in-person ${lowerTitle} sessions held in ${city}?`,
        a: `In-person sessions are held at S.A.G.E. Therapy Center, ${site.address.street}, ${city}, ${site.address.region} ${site.address.postalCode}.`,
      },
      {
        q: `Is ${lowerTitle} available by telehealth in California?`,
        a: `Yes. Telehealth is available across ${site.telehealth.coverageArea}. You can discuss whether online or in-person sessions are the better fit when you request a session.`,
      },
      {
        q: `How do I start ${lowerTitle} at S.A.G.E. Therapy Center?`,
        a: `Request a session to discuss fit, current availability, what you are looking for, and whether you prefer the ${city} office or telehealth.`,
      },
    ],
    existing
  );
}

export function buildCityFaqs(input: {
  cityName: string;
  hasOffice: boolean;
  existing?: PageFaqItem[];
  serviceTitles: string[];
  neighborhoodNames?: string[];
}) {
  const { cityName, hasOffice, existing = [], serviceTitles, neighborhoodNames = [] } = input;
  const services = naturalList(serviceTitles);
  const neighborhoods = naturalList(neighborhoodNames.slice(0, 6));

  const localCoverageFaq: PageFaqItem = neighborhoods
    ? {
        q: `Does S.A.G.E. serve clients from neighborhoods throughout ${cityName}?`,
        a: hasOffice
          ? `Yes. S.A.G.E.'s Carlsbad practice serves clients from neighborhoods throughout ${cityName}, including ${neighborhoods}, with in-person sessions at the Carlsbad office and telehealth across California.`
          : `Yes. S.A.G.E. serves clients from neighborhoods throughout ${cityName}, including ${neighborhoods}. In-person sessions are based at the Carlsbad office, with telehealth available across California.`,
      }
    : {
        q: `Where do ${cityName} clients attend in-person therapy?`,
        a: `In-person sessions are held at S.A.G.E. Therapy Center's Carlsbad office at ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}.`,
      };

  return finalizeLandingFaqs(
    [
      {
        q: hasOffice
          ? `Where is S.A.G.E. Therapy Center located in ${cityName}?`
          : `Does S.A.G.E. Therapy Center have an office in ${cityName}?`,
        a: hasOffice
          ? `S.A.G.E. Therapy Center's physical office is at ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}.`
          : `No. S.A.G.E.'s only physical office is in ${site.address.city} at ${site.address.street}. The ${cityName} page describes the community served, not a separate office location.`,
      },
      {
        q: `What therapy services are available to ${cityName} clients?`,
        a: `Core therapy options available through S.A.G.E. include ${services}. Individual service pages explain the therapy focus, relevant approaches, and available in-person or telehealth session options.`,
      },
      localCoverageFaq,
      {
        q: `Can ${cityName} clients use telehealth?`,
        a: `Yes. Telehealth is available across ${site.telehealth.coverageArea}, including for clients in ${cityName}.`,
      },
      {
        q: `Who provides therapy for ${cityName} clients?`,
        a: `${site.practitioner.name}, ${site.practitioner.credential}, provides therapy through S.A.G.E. Therapy Center's Carlsbad practice and by telehealth across California.`,
      },
      {
        q: `How can a ${cityName} client get started with S.A.G.E.?`,
        a: `Request a session to discuss fit, current availability, the kind of therapy you are looking for, and whether in-person or telehealth sessions make sense.`,
      },
    ],
    existing
  );
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

  return finalizeLandingFaqs(
    [
      {
        q: hasOffice
          ? `Where is ${lowerTitle} offered in ${cityName}?`
          : `Does S.A.G.E. have a ${cityName} office for ${lowerTitle}?`,
        a: hasOffice
          ? `In-person ${lowerTitle} is offered at S.A.G.E. Therapy Center, ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}.`
          : `No. S.A.G.E.'s only physical office is in Carlsbad. ${cityName} clients can explore ${lowerTitle} through the Carlsbad practice or by telehealth across California.`,
      },
      {
        q: `What concerns might ${cityName} clients bring to ${lowerTitle}?`,
        a: `${serviceTitle} may explore concerns such as ${topicSummary(topics)}. The focus can evolve as priorities and goals become clearer.`,
      },
      {
        q: `What approaches may be part of ${lowerTitle} for ${cityName} clients?`,
        a: `Kristin may draw from ${modalitySummary(approach)} depending on what is most relevant to the work.`,
      },
      {
        q: `Who provides ${lowerTitle} for ${cityName} clients?`,
        a: `${site.practitioner.name}, ${site.practitioner.credential}, provides ${lowerTitle} through S.A.G.E. Therapy Center.`,
      },
      {
        q: `Is telehealth available for ${lowerTitle} if I live in ${cityName}?`,
        a: `Yes. Telehealth is available across ${site.telehealth.coverageArea}. ${cityName} clients can also discuss in-person sessions at the Carlsbad office.`,
      },
      {
        q: `How do I start ${lowerTitle} as a ${cityName} client?`,
        a: `Request a session to discuss fit, availability, what you want support with, and whether you prefer in-person sessions in Carlsbad or telehealth.`,
      },
    ],
    existing
  );
}

export function buildHomeFaqs(serviceTitles: string[]) {
  return finalizeLandingFaqs([
    {
      q: 'Where is S.A.G.E. Therapy Center located in Carlsbad?',
      a: `S.A.G.E. Therapy Center's physical office is at ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}.`,
    },
    {
      q: 'What types of therapy does S.A.G.E. Therapy Center offer in Carlsbad?',
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
      q: 'How do I start therapy with S.A.G.E. in Carlsbad?',
      a: `Request a session online or call ${site.phone.display} to discuss fit, current availability, and whether you prefer in-person or telehealth sessions.`,
    },
  ]);
}

export function buildServicesHubFaqs(serviceTitles: string[]) {
  return finalizeLandingFaqs([
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
      q: 'Where are in-person therapy sessions held in Carlsbad?',
      a: `In-person sessions are held at S.A.G.E. Therapy Center, ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}.`,
    },
    {
      q: 'Are S.A.G.E. therapy services available by telehealth?',
      a: `Yes. Telehealth is available across ${site.telehealth.coverageArea}. Whether telehealth is the right format for the work can be discussed when you request a session.`,
    },
    {
      q: 'How do I request a therapy session in Carlsbad?',
      a: `Use the online request form or call ${site.phone.display} to discuss fit, availability, and session options.`,
    },
  ]);
}

export function buildAreasHubFaqs(cityNames: string[], serviceTitles: string[]) {
  return finalizeLandingFaqs([
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
      a: `Core options include ${naturalList(serviceTitles)}. Individual service pages explain each therapy focus and available session options.`,
    },
    {
      q: 'How do I find the right location or session option?',
      a: 'Choose your community page for local access information, or request a session to discuss in-person availability in Carlsbad and telehealth options.',
    },
  ]);
}

export const aboutPageFaqs = finalizeLandingFaqs([
  {
    q: `Who is ${site.practitioner.name}?`,
    a: `${site.practitioner.name}, ${site.practitioner.credential}, is the therapist behind S.A.G.E. Therapy Center in Carlsbad, California.`,
  },
  {
    q: 'Where does Kristin see clients in person?',
    a: `In-person sessions are based at S.A.G.E. Therapy Center, ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}.`,
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

export const contactPageFaqs = finalizeLandingFaqs([
  {
    q: 'How can I contact S.A.G.E. Therapy Center?',
    a: `You can use the online request form, call ${site.phone.display}, or email ${site.email}.`,
  },
  {
    q: 'Where is the S.A.G.E. Therapy Center office in Carlsbad?',
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

export const schedulePageFaqs = finalizeLandingFaqs([
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

export const telehealthPageFaqs = finalizeLandingFaqs([
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