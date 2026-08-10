// One function per page-type breadcrumb shape, so layouts and static
// pages stop hand-building the {name, url} arrays fed into Breadcrumbs.astro.
import { AREAS_WE_SERVE_URL, BLOG_URL, HOME_URL, RESOURCES_URL, SERVICES_URL } from '../data/nav';
import { blogUrl, canonicalUrl, cityServiceUrl, cityUrl, serviceUrl } from './routes';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

const HOME_CRUMB: BreadcrumbItem = { name: 'Home', url: HOME_URL };

export function staticBreadcrumbs(name: string, url: string): BreadcrumbItem[] {
  return [HOME_CRUMB, { name, url }];
}

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

// Structured data should use absolute item URLs even though the visible
// breadcrumb component correctly uses root-relative hrefs.
export function absoluteBreadcrumbs(items: BreadcrumbItem[]): BreadcrumbItem[] {
  return items.map((item) => ({
    ...item,
    url: item.url.startsWith('http') ? item.url : canonicalUrl(item.url),
  }));
}

export function citySchemaBreadcrumbs(name: string, absoluteUrl: string): BreadcrumbItem[] {
  return absoluteBreadcrumbs([
    HOME_CRUMB,
    { name: 'Areas We Serve', url: AREAS_WE_SERVE_URL },
    { name, url: absoluteUrl },
  ]);
}
