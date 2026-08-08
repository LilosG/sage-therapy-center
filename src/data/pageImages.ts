import homeCoastalPath from '../assets/images/home/hero-coastal-path.webp';
import windowNook from '../assets/images/editorial/serene-sunlit-window-nook.webp';

const serviceHeroOverrides = {
  'individual-therapy': windowNook,
  'couples-counseling': homeCoastalPath,
  'family-therapy': windowNook,
  'teen-counseling': homeCoastalPath,
  'premarital-marriage-counseling': windowNook,
  'emdr-therapy': homeCoastalPath,
  'anxiety-therapy': windowNook,
  'trauma-ptsd-therapy': homeCoastalPath,
} as const;

const cityHeroOverrides = {
  carlsbad: homeCoastalPath,
  encinitas: homeCoastalPath,
  oceanside: homeCoastalPath,
  'san-marcos': homeCoastalPath,
  vista: homeCoastalPath,
  'del-mar': homeCoastalPath,
  'solana-beach': homeCoastalPath,
  'rancho-santa-fe': homeCoastalPath,
} as const;

const servicePool = [windowNook, homeCoastalPath] as const;
const cityPool = [homeCoastalPath] as const;
const moneyPool = [windowNook, homeCoastalPath] as const;

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
  windowNook,
} as const;
