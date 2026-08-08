// Centralized editorial image assignments for service, city, and money-page templates.
// Keep image selection here so shared Astro layouts stay reusable and individual routes
// can retain unique copy without one-off visual wiring.
import homeCoastalPath from '../assets/images/home/hero-coastal-path.webp';
import courtyardRetreat from '../assets/images/editorial/serene-courtyard-retreat.webp';
import eucalyptusTrail from '../assets/images/editorial/misty-eucalyptus-coastal-trail.webp';
import meadowTree from '../assets/images/editorial/misty-meadow-spreading-tree.webp';
import windowNook from '../assets/images/editorial/serene-sunlit-window-nook.webp';

const serviceHeroOverrides = {
  'individual-therapy': windowNook,
  'couples-counseling': meadowTree,
  'family-therapy': courtyardRetreat,
  'teen-counseling': eucalyptusTrail,
  'premarital-marriage-counseling': courtyardRetreat,
  'emdr-therapy': eucalyptusTrail,
  'anxiety-therapy': meadowTree,
  'trauma-ptsd-therapy': eucalyptusTrail,
} as const;

const cityHeroOverrides = {
  carlsbad: eucalyptusTrail,
  encinitas: homeCoastalPath,
  oceanside: homeCoastalPath,
  'san-marcos': meadowTree,
  vista: meadowTree,
  'del-mar': homeCoastalPath,
  'solana-beach': homeCoastalPath,
  'rancho-santa-fe': meadowTree,
} as const;

const servicePool = [windowNook, courtyardRetreat, eucalyptusTrail, meadowTree, homeCoastalPath] as const;
const cityPool = [eucalyptusTrail, meadowTree, homeCoastalPath] as const;
const moneyPool = [eucalyptusTrail, meadowTree, windowNook, courtyardRetreat, homeCoastalPath] as const;

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
  return moneyPool[stableIndex(`${citySlug}:${serviceSlug}`, moneyPool.length)];
}

export const editorialImages = {
  coastalPath: homeCoastalPath,
  courtyardRetreat,
  eucalyptusTrail,
  meadowTree,
  windowNook,
} as const;
