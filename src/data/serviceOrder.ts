// Canonical presentation order for the six core therapy services. Route
// eligibility for secondary city/service pages remains controlled separately
// by explicit city-service content entries.
export const coreServiceOrder = [
  'individual-therapy',
  'couples-counseling',
  'family-therapy',
  'teen-counseling',
  'premarital-marriage-counseling',
  'emdr-therapy',
] as const;

const orderIndex = new Map<string, number>(coreServiceOrder.map((slug, index) => [slug, index]));

export function sortCoreServices<T extends { data: { slug: string } }>(services: T[]): T[] {
  return [...services].sort((a, b) => {
    const aIndex = orderIndex.get(a.data.slug) ?? Number.MAX_SAFE_INTEGER;
    const bIndex = orderIndex.get(b.data.slug) ?? Number.MAX_SAFE_INTEGER;
    return aIndex - bIndex || a.data.slug.localeCompare(b.data.slug);
  });
}
