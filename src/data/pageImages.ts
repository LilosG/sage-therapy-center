// Centralized image assignments for interior-page heroes.
// These URLs intentionally point at the exact, pre-optimized WebP files already
// committed to this repository. Using stable direct image URLs keeps the hero
// system deterministic across Vercel deployments while preserving one central
// source of truth for service, city, and money-page image selection.

const RAW_BASE = 'https://raw.githubusercontent.com/LilosG/sage-therapy-center/main/src/assets/images';

const homeCoastalPath = `${RAW_BASE}/home/hero-coastal-path.webp`;
const courtyardRetreat = `${RAW_BASE}/editorial/serene-courtyard-retreat.webp`;
const eucalyptusTrail = `${RAW_BASE}/editorial/misty-eucalyptus-coastal-trail.webp`;
const meadowTree = `${RAW_BASE}/editorial/misty-meadow-spreading-tree.webp`;
const windowNook = `${RAW_BASE}/editorial/serene-sunlit-window-nook.webp`;

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
