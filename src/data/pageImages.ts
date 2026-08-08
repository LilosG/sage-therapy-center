import homeCoastalPath from '../assets/images/home/hero-coastal-path.webp';
import eucalyptusTrail from '../assets/images/editorial/misty-eucalyptus-coastal-trail.webp';
import hillsideTree from '../assets/images/editorial/misty-hillside-tree-at-dawn.webp';
import windowNook from '../assets/images/editorial/serene-sunlit-window-nook.webp';

const serviceHeroOverrides = {
  'individual-therapy': windowNook,
  'couples-counseling': hillsideTree,
  'family-therapy': hillsideTree,
  'teen-counseling': eucalyptusTrail,
  'premarital-marriage-counseling': windowNook,
  'emdr-therapy': eucalyptusTrail,
  'anxiety-therapy': hillsideTree,
  'trauma-ptsd-therapy': eucalyptusTrail,
} as const;

const cityHeroOverrides = {
  carlsbad: eucalyptusTrail,
  encinitas: homeCoastalPath,
  oceanside: homeCoastalPath,
  'san-marcos': hillsideTree,
  vista: hillsideTree,
  'del-mar': homeCoastalPath,
  'solana-beach': homeCoastalPath,
  'rancho-santa-fe': hillsideTree,
} as const;

const servicePool = [windowNook, hillsideTree, eucalyptusTrail] as const;
const cityPool = [eucalyptusTrail, homeCoastalPath, hillsideTree] as const;
const moneyPool = [hillsideTree, eucalyptusTrail, windowNook, homeCoastalPath] as const;

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
  eucalyptusTrail,
  hillsideTree,
  windowNook,
} as const;
