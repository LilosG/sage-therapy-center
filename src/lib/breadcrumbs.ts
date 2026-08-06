// One function per page-type breadcrumb shape, so layouts and static
// pages stop hand-building the {name, url} arrays fed into Breadcrumbs.astro
// (called directly on some pages, via PageHero on others — both take the
// same shape). Built from nav.ts's static constants and routes.ts's
// dynamic-route builders rather than path literals.
import { AREAS_WE_SERVE_URL, BLOG_URL, HOME_URL, RESOURCES_URL, SERVICES_URL } from '../data/nav';
import { blogUrl, cityServiceUrl, cityUrl, serviceUrl } from './routes';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

const HOME_CRUMB: BreadcrumbItem = { name: 'Home', url: HOME_URL };

// Simple two-level "Home > X" breadcrumb used by every hand-written
// static page (About, FAQ, Contact, Schedule a Session, Areas We Serve,
// Services index, Blog index).
export function staticBreadcrumbs(name: string, url: string): BreadcrumbItem[] {
  return [HOME_CRUMB, { name, url }];
}

// Three-level "Home > Resources > X" breadcrumb for resource pages.
export function resourceBreadcrumbs(name: string, url: string): BreadcrumbItem[] {
  return [HOME_CRUMB, { name: 'Resources', url: RESOURCES_URL }, { name, url }];
}

export function serviceBreadcrumbs(title: string, slug: string): BreadcrumbItem[] {
  return [HOME_CRUMB, { name: 'Services', url: SERVICES_URL }, { name: title, url: serviceUrl(slug) }];
}

export function cityBreadcrumbs(name: string, slug: string): BreadcrumbItem[] {
  return [HOME_CRUMB, { name: 'Areas We Serve', url: AREAS_WE_SERVE_URL }, { name, url: cityUrl(slug) }];
}

export function cityServiceBreadcrumbs(
  cityName: string,
  citySlug: string,
  serviceTitle: string,
  serviceSlug: string
): BreadcrumbItem[] {
  return [
    HOME_CRUMB,
    { name: cityName, url: cityUrl(citySlug) },
    { name: serviceTitle, url: cityServiceUrl(citySlug, serviceSlug) },
  ];
}

export function blogPostBreadcrumbs(title: string, slug: string): BreadcrumbItem[] {
  return [HOME_CRUMB, { name: 'Blog', url: BLOG_URL }, { name: title, url: blogUrl(slug) }];
}

// [city]/index.astro's SchemaOrg breadcrumb prop is a distinct shape from
// CityLayout's PageHero breadcrumb above: the first two crumbs stay
// relative but the final crumb intentionally uses the page's absolute
// canonical URL (schema.org convention for the current page). Preserved
// as-is rather than unified with cityBreadcrumbs() to avoid a behavior
// change.
export function citySchemaBreadcrumbs(name: string, absoluteUrl: string): BreadcrumbItem[] {
  return [HOME_CRUMB, { name: 'Areas We Serve', url: AREAS_WE_SERVE_URL }, { name, url: absoluteUrl }];
}
