// Header nav structure per SEO doc Section B ("Internal Link Plan").
// Footer's city/service lists are data-driven off the content
// collections directly (see Footer.astro) rather than a static list here
// — a hardcoded list would 404 on any city/service that doesn't have a
// real content entry yet, which is most of them this wave. Legal nav
// (privacy/accessibility) isn't listed anywhere yet since neither page
// exists; add it here once a later wave builds them.
//
// Every static (non-slug) route in the site is named here so pages never
// retype a path literal. Dynamic slug-based routes (services/[slug]/,
// [city]/, etc.) live in ../lib/routes.ts instead. SCHEDULE_URL mirrors
// site.primaryConversionPath rather than duplicating the literal, since
// site.ts is already the source of truth for that path.
import { site } from './site';

export const HOME_URL = '/';
export const SERVICES_URL = '/services/';
export const AREAS_WE_SERVE_URL = '/areas-we-serve/';
export const ABOUT_URL = '/about/';
export const FAQ_URL = '/faq/';
export const CONTACT_URL = '/contact/';
export const BLOG_URL = '/blog/';
export const RESOURCES_URL = '/resources/';
export const SELF_LOVE_RESOURCE_URL = '/resources/28-days-of-self-love/';
export const SCHEDULE_URL = site.primaryConversionPath;

export const headerNav = [
  { label: 'Home', href: HOME_URL },
  { label: 'Services', href: SERVICES_URL },
  { label: 'Areas We Serve', href: AREAS_WE_SERVE_URL },
  { label: 'About', href: ABOUT_URL },
  { label: 'FAQ', href: FAQ_URL },
  { label: 'Schedule a Session', href: SCHEDULE_URL },
] as const;
