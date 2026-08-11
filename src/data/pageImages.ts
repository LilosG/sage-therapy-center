// Centralized image assignments for interior-page heroes and top-level hubs.
// Keep first-party editorial images as ESM-imported Astro assets so they are
// emitted, fingerprinted, and optimized by Astro rather than fetched at runtime.
import homeCoastalPath from '../assets/images/home/hero-coastal-path.webp';
import courtyardRetreat from '../assets/images/editorial/serene-courtyard-retreat.webp';
import eucalyptusTrail from '../assets/images/editorial/misty-eucalyptus-coastal-trail.webp';
import meadowTree from '../assets/images/editorial/misty-meadow-spreading-tree.webp';
import windowNook from '../assets/images/editorial/serene-sunlit-window-nook.webp';

// The courtyard, eucalyptus, and window-nook assets are intentionally kept out
// of hero rotation. At wide card crops they can read as nearly blank fields,
// which is exactly the failure mode we want to prevent. They remain available
// for lower-page editorial use. The coastal and meadow assets have enough
// visual structure to remain legible at the shared hero aspect ratio.
export const hubHeroImages = {
  services: meadowTree,
  areas: homeCoastalPath,
  telehealth: meadowTree,
  schedule: homeCoastalPath,
} as const;

const serviceHeroOverrides = {
  'individual-therapy': homeCoastalPath,
  'couples-counseling': meadowTree,
  'family-therapy': homeCoastalPath,
  'teen-counseling': meadowTree,
  'premarital-marriage-counseling': homeCoastalPath,
  'emdr-therapy': meadowTree,
  'anxiety-therapy': homeCoastalPath,
  'trauma-ptsd-therapy': meadowTree,
} as const;

const cityHeroOverrides = {
  carlsbad: homeCoastalPath,
  encinitas: meadowTree,
  oceanside: homeCoastalPath,
  'san-marcos': meadowTree,
  vista: homeCoastalPath,
  'del-mar': meadowTree,
  'solana-beach': homeCoastalPath,
  'rancho-santa-fe': meadowTree,
} as const;

const moneyServiceOverrides = {
  'individual-therapy': homeCoastalPath,
  'couples-counseling': meadowTree,
  'family-therapy': homeCoastalPath,
  'teen-counseling': meadowTree,
  'premarital-marriage-counseling': homeCoastalPath,
  'emdr-therapy': meadowTree,
  'anxiety-therapy': homeCoastalPath,
  'trauma-ptsd-therapy': meadowTree,
} as const;

const readableHeroPool = [homeCoastalPath, meadowTree] as const;

function stableIndex(key: string, length: number) {
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  return hash % length;
}

export function getServiceHero(slug: string) {
  return serviceHeroOverrides[slug as keyof typeof serviceHeroOverrides] ?? readableHeroPool[stableIndex(slug, readableHeroPool.length)];
}

export function getCityHero(slug: string) {
  return cityHeroOverrides[slug as keyof typeof cityHeroOverrides] ?? readableHeroPool[stableIndex(slug, readableHeroPool.length)];
}

export function getCityServiceHero(citySlug: string, serviceSlug: string) {
  return (
    moneyServiceOverrides[serviceSlug as keyof typeof moneyServiceOverrides] ??
    readableHeroPool[stableIndex(`${citySlug}:${serviceSlug}`, readableHeroPool.length)]
  );
}

export function getHeroImageAlt(image: { src: string }) {
  if (image.src === homeCoastalPath.src) {
    return 'A quiet Southern California coastal path in soft marine-layer light';
  }
  if (image.src === meadowTree.src) {
    return 'A mature tree in a quiet Southern California meadow under soft morning haze';
  }
  if (image.src === courtyardRetreat.src) {
    return 'A calm Southern California courtyard with restrained natural landscaping';
  }
  if (image.src === eucalyptusTrail.src) {
    return 'A quiet eucalyptus-lined Southern California trail in soft coastal haze';
  }
  if (image.src === windowNook.src) {
    return 'A softly lit neutral interior window nook';
  }
  return 'A quiet Southern California setting';
}

export const editorialImages = {
  coastalPath: homeCoastalPath,
  courtyardRetreat,
  eucalyptusTrail,
  meadowTree,
  windowNook,
} as const;
