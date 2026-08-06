// Typed builders for dynamic route shapes, mirroring the getStaticPaths()
// params in the corresponding [service]/[city]/[city]/[service]/blog
// pages. Centralized so a route shape only has to change in one place —
// see nav.ts for the static (non-slug) route constants this complements.
import { site } from '../data/site';

export function serviceUrl(slug: string): string {
  return `/services/${slug}/`;
}

export function cityUrl(slug: string): string {
  return `/${slug}/`;
}

export function cityServiceUrl(citySlug: string, serviceSlug: string): string {
  return `/${citySlug}/${serviceSlug}/`;
}

export function blogUrl(slug: string): string {
  return `/blog/${slug}/`;
}

// Wraps site.canonicalOrigin for schema.org `url` fields and <link
// rel="canonical">, which need an absolute URL — a different shape from
// the relative hrefs the functions above produce. Pass a relative path
// built from one of those functions (or a literal like '/').
export function canonicalUrl(relativePath: string): string {
  return `${site.canonicalOrigin}${relativePath}`;
}
