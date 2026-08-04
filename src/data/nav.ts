// Header/footer nav structure per SEO doc Section B ("Internal Link Plan").
// Contact details, social links, and the license disclosure come from
// site.ts directly inside the Footer layout component — this file only
// holds link structure, not NAP data, to avoid duplicating a single source
// of truth.

export const headerNav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/' },
  { label: 'Areas We Serve', href: '/areas-we-serve/' },
  { label: 'About', href: '/about/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'Schedule a Session', href: '/schedule-a-session/' },
] as const;

// All 8 city hubs, per SEO doc Section A Level 1.
export const footerCityNav = [
  { label: 'Carlsbad', href: '/carlsbad/' },
  { label: 'Encinitas', href: '/encinitas/' },
  { label: 'San Marcos', href: '/san-marcos/' },
  { label: 'Oceanside', href: '/oceanside/' },
  { label: 'Vista', href: '/vista/' },
  { label: 'Del Mar', href: '/del-mar/' },
  { label: 'Solana Beach', href: '/solana-beach/' },
  { label: 'Rancho Santa Fe', href: '/rancho-santa-fe/' },
] as const;

// The 6 "core services" (not concern-led), per SEO doc Section A Level 2.
export const footerCoreServiceNav = [
  { label: 'Individual Therapy', href: '/services/individual-therapy/' },
  { label: 'Couples Counseling', href: '/services/couples-counseling/' },
  { label: 'Family Therapy', href: '/services/family-therapy/' },
  { label: 'Teen Counseling', href: '/services/teen-counseling/' },
  { label: 'Premarital & Marriage Counseling', href: '/services/premarital-marriage-counseling/' },
  { label: 'EMDR Therapy', href: '/services/emdr-therapy/' },
] as const;

export const footerLegalNav = [
  { label: 'Privacy Policy', href: '/privacy-policy/' },
  { label: 'Accessibility', href: '/accessibility/' },
] as const;
