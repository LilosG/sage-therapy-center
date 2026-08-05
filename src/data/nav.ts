// Header nav structure per SEO doc Section B ("Internal Link Plan").
// Footer's city/service lists are data-driven off the content
// collections directly (see Footer.astro) rather than a static list here
// — a hardcoded list would 404 on any city/service that doesn't have a
// real content entry yet, which is most of them this wave. Legal nav
// (privacy/accessibility) isn't listed anywhere yet since neither page
// exists; add it here once a later wave builds them.

export const headerNav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/' },
  { label: 'Areas We Serve', href: '/areas-we-serve/' },
  { label: 'About', href: '/about/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'Schedule a Session', href: '/schedule-a-session/' },
] as const;
