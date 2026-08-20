// Single source of truth for NAP and business identity. Import this
// everywhere a phone/email/address/name is needed — never hardcode these
// values in a component, layout, or page.
//
// Core values come from the S.A.G.E. SEO/build source material. Address,
// phone, rating context and primary GBP category were rechecked against the
// client-provided Google Business Profile screenshot on 2026-08-10.

export const site = {
  name: 'S.A.G.E. Therapy Center',
  locale: 'en-US',
  canonicalOrigin: 'https://sagetherapycenter.com',

  phone: {
    display: '(760) 703-2188',
    tel: '+1-760-703-2188',
  },

  email: 'sagetherapycenter@gmail.com',

  address: {
    // Match the current GBP presentation while keeping punctuation readable
    // on-page. Components construct the complete address from these fields.
    street: '5055 Avenida Encinas, Ste 100',
    city: 'Carlsbad',
    region: 'CA',
    postalCode: '92008',
    country: 'US',
    geo: { latitude: 33.1261, longitude: -117.3089 },
  },

  office: {
    // Keep this deliberately broad until real parking/building-access details
    // and office photography are supplied. Components may display this note,
    // but should never invent parking, entrance, elevator, or suite logistics.
    arrivalNote: 'Specific parking, building-access, and arrival details can be confirmed when scheduling.',
  },

  googleBusinessProfile: {
    primaryCategory: 'Marriage or relationship counselor',
  },

  // The supplied GBP screenshot confirms the business was open and closing
  // at 8 PM at that moment, but it does not expose the full weekly schedule.
  // Keep structured/on-page hours gated until the complete schedule is
  // verified rather than extrapolating a seven-day schedule from one day.
  hours: null as null | { day: string; open: string; close: string }[],

  social: {
    facebook: 'https://facebook.com/sagetherapy',
    instagram: 'https://instagram.com/sagetherapycenter',
  },

  practitioner: {
    name: 'Kristin Moorehead-Malley',
    credential: 'LMFT',
    // CONFIRM: sourced from Kristin's existing bio copy. Keep the license
    // identifier gated until it is directly confirmed or rechecked with BBS.
    licenseNumber: 'MFC 39586',
    licenseConfirmRequired: true,
  },

  telehealth: {
    // Sentence-ready geographic value for copy such as "across California",
    // plus a compact display label for trust strips and summary UI.
    coverageArea: 'California',
    display: 'Statewide in California',
  },

  primaryConversionPath: '/schedule-a-session/',

  // Do not emit fees/offers until payment and insurance policy are confirmed.
  offersConfirmed: false,
} as const;
