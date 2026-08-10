// Centralized image assignments for interior-page heroes and top-level hubs.
// Keep first-party editorial images as ESM-imported Astro assets so they are
// emitted, fingerprinted, and optimized by the build rather than fetched at
// runtime from an external source.
import homeCoastalPath from '../assets/images/home/hero-coastal-path.webp';
import courtyardRetreat from '../assets/images/editorial/serene-courtyard-retreat.webp';
import eucalyptusTrail from '../assets/images/editorial/misty-eucalyptus-coastal-trail.webp';
import meadowTree from '../assets/images/editorial/misty-meadow-spreading-tree.webp';
import windowNook from '../assets/images/editorial/serene-sunlit-window-nook.webp';

// Top-level hub assignments belong here rather than inside route files. That
// keeps visual direction centralized and avoids one-off hero choices.
export const hubHeroImages = {
  services: courtyardRetreat,
  areas: eucalyptusTrail,
} as const;

// Hero imagery needs enough visual structure to read immediately at card size.
// Keep the very low-contrast window-nook asset available for editorial use,
// but do not use it as a hero where it can read like an empty placeholder.
const serviceHeroOverrides = {
  'individual-therapy': meadowTree,
  'couples-counseling': meadowTree,
  'family-therapy': courtyardRetreat,
  'teen-counseling': eucalyptusTrail,
  'premarital-marriage-counseling': courtyardRetreat,
  'emdr-therapy': eucalyptusTrail,
  'anxiety-therapy': meadowTree,
  'trauma-ptsd-therapy': eucalyptusTrail,
} as const;

const cityHeroOverrides = {
  // Carlsbad is the actual practice location, so use the strongest coastal
  // image rather than the softer eucalyptus image that read too much like a
  // placeholder in the hero card.
  carlsbad: homeCoastalPath,
  encinitas: eucalyptusTrail,
  oceanside: homeCoastalPath,
  'san-marcos': meadowTree,
  vista: meadowTree,
  'del-mar': homeCoastalPath,
  'solana-beach': eucalyptusTrail,
  'rancho-santa-fe': meadowTree,
} as const;

// City/service money pages should not feel like a random image lottery.
// Use a complementary image by service intent first, then a deterministic
// fallback only for services that have not received a deliberate assignment.
const moneyServiceOverrides = {
  'individual-therapy': eucalyptusTrail,
  'couples-counseling': courtyardRetreat,
  'family-therapy': meadowTree,
  'teen-counseling': homeCoastalPath,
  'premarital-marriage-counseling': meadowTree,
  'emdr-therapy': courtyardRetreat,
  'anxiety-therapy': eucalyptusTrail,
  'trauma-ptsd-therapy': meadowTree,
} as const;

const servicePool = [courtyardRetreat, eucalyptusTrail, meadowTree, homeCoastalPath] as const;
const cityPool = [eucalyptusTrail, meadowTree, homeCoastalPath] as const;
const moneyPool = [eucalyptusTrail, meadowTree, courtyardRetreat, homeCoastalPath] as const;

function stableIndex(key: string, length: number) {
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  return hash % length;
}

export function getServiceHero(slug: string) {
  return serviceHeroOverrides[slug as keyof typeof serviceHeroOverrides] ?? servicePool[stableIndex(slug, servicePool.length)];
}

export function getCityHero(slug: string) {
  return cityHeroOverrides[slug as keyof typeof cityHeroOverrides] ?? cityPool[stableIndex(slug, cityPool.length)];
}

export function getCityServiceHero(citySlug: string, serviceSlug: string) {
  return (
    moneyServiceOverrides[serviceSlug as keyof typeof moneyServiceOverrides] ??
    moneyPool[stableIndex(`${citySlug}:${serviceSlug}`, moneyPool.length)]
  );
}

export const editorialImages = {
  coastalPath: homeCoastalPath,
  courtyardRetreat,
  eucalyptusTrail,
  meadowTree,
  windowNook,
} as const;
