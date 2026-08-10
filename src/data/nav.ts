// Header navigation and static route constants. The primary conversion CTA
// is intentionally separate from `headerNav` so desktop does not render
// "Schedule a Session" twice (once as navigation and again as the real CTA).
// Dynamic slug-based routes live in ../lib/routes.ts.
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
] as const;
