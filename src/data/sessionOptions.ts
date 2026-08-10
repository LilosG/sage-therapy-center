import { site } from './site';
import { TELEHEALTH_URL } from './nav';

// Session format is intentionally modeled separately from therapy specialties.
// Telehealth can carry multiple services, so treating it as another clinical
// service category would create the wrong information architecture and make
// service relationships harder to reason about later.
export const telehealthOption = {
  title: 'Telehealth Therapy',
  pageTitle: 'Online Therapy & Telehealth in California',
  href: TELEHEALTH_URL,
  eyebrow: 'Featured Session Option',
  navDescription: `Online therapy available statewide in ${site.telehealth.coverageArea}.`,
  description:
    'Telehealth is a session format, not a separate clinical specialty. It allows S.A.G.E. clients to access therapy online when telehealth is an appropriate fit.',
  coverageLabel: site.telehealth.display,
  coverageArea: site.telehealth.coverageArea,
} as const;
