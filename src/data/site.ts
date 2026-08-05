// Single source of truth for NAP and business identity. Import this
// everywhere a phone/email/address/name is needed — never hardcode these
// values in a component, layout, or page.
//
// Values sourced from SAGE_Local_SEO_Site_Architecture_Complete.pdf,
// Section E ("Developer Handoff JSON" -> site object) and the NAP/GBP
// Alignment Checklist.

export const site = {
  name: 'S.A.G.E. Therapy Center',
  locale: 'en-US',
  canonicalOrigin: 'https://sagetherapycenter.com',

  // Doc requires the phone displayed consistently as (760) 703-2188 while
  // schema.org markup uses the E.164-ish +1-760-703-2188 form.
  phone: {
    display: '(760) 703-2188',
    tel: '+1-760-703-2188',
  },

  email: 'sagetherapycenter@gmail.com',

  address: {
    street: '5055 Avenida Encinas, Suite 100',
    city: 'Carlsbad',
    region: 'CA',
    postalCode: '92008',
    country: 'US',
  },

  // CONFIRM: no hours were provided in either source document. The SEO
  // doc's NAP checklist only says "Hours match GBP, rechecked immediately
  // before launch" — populate from the live Google Business Profile before
  // this goes into any schema or on-page display.
  hours: null as null | { day: string; open: string; close: string }[],

  social: {
    facebook: 'https://facebook.com/sagetherapy',
    instagram: 'https://instagram.com/sagetherapycenter',
  },

  practitioner: {
    name: 'Kristin Moorehead-Malley',
    credential: 'LMFT',
    // CONFIRM: sourced from Kristin's own existing bio copy per the SEO doc.
    // Needs final confirmation from Kristin (or CA BBS license lookup)
    // before this goes live in schema — see SEO doc Section F, blocker 7.
    licenseNumber: 'MFC 39586',
    licenseConfirmRequired: true,
  },

  // Confirmed: telehealth is offered alongside in-person sessions, available
  // to clients anywhere in California (V4 source doc, Areas Served section).
  // Single source for TrustStrip and the FAQ so they can't drift out of sync.
  telehealth: {
    coverageArea: 'All of California',
  },

  primaryConversionPath: '/schedule-a-session/',

  // Gates the `offers` schema in SchemaOrg.astro. Do not flip to true until
  // payment/insurance policy is confirmed (SEO doc Wave 0 blocker).
  offersConfirmed: false,
} as const;
