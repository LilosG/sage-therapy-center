// Centralized image assignments for interior-page heroes and top-level hubs.
// Keep first-party editorial images as ESM-imported Astro assets so they are
// emitted, fingerprinted, and optimized by Astro rather than fetched at runtime.
import homeCoastalPath from '../assets/images/home/hero-coastal-path.webp';
import courtyardRetreat from '../assets/images/editorial/serene-courtyard-retreat.webp';
import eucalyptusTrail from '../assets/images/editorial/misty-eucalyptus-coastal-trail.webp';
import meadowTree from '../assets/images/editorial/misty-meadow-spreading-tree.webp';
import windowNook from '../assets/images/editorial/serene-sunlit-window-nook.webp';

// Landscape hero images
import landscape01 from '../assets/images/services/sage-landscape-01.png';
import landscape02 from '../assets/images/services/sage-landscape-02.png';
import landscape03 from '../assets/images/services/sage-landscape-03.png';
import landscape04 from '../assets/images/services/sage-landscape-04.png';
import landscape05 from '../assets/images/services/sage-landscape-05.png';
import landscape06 from '../assets/images/services/sage-landscape-06.png';
import landscape07 from '../assets/images/services/sage-landscape-07.png';
import landscape08 from '../assets/images/services/sage-landscape-08.png';
import landscape09 from '../assets/images/services/sage-landscape-09.png';
import landscape10 from '../assets/images/services/sage-landscape-10.png';
import landscape11 from '../assets/images/services/sage-landscape-11.png';
import landscape12 from '../assets/images/services/sage-landscape-12.png';
import landscape13 from '../assets/images/services/sage-landscape-13.png';
import landscape14 from '../assets/images/services/sage-landscape-14.png';
import landscape15 from '../assets/images/services/sage-landscape-15.png';
import landscape16 from '../assets/images/services/sage-landscape-16.png';
import landscape17 from '../assets/images/services/sage-landscape-17.png';
import landscape18 from '../assets/images/services/sage-landscape-18.png';
import landscape19 from '../assets/images/services/sage-landscape-19.png';
import landscape20 from '../assets/images/services/sage-landscape-20.png';
import landscape21 from '../assets/images/services/sage-landscape-21.png';
import landscape22 from '../assets/images/services/sage-landscape-22.png';
import landscape23 from '../assets/images/services/sage-landscape-23.png';
import landscape24 from '../assets/images/services/sage-landscape-24.png';
import landscape25 from '../assets/images/services/sage-landscape-25.png';
import landscape26 from '../assets/images/services/sage-landscape-26.png';

// The courtyard, eucalyptus, and window-nook assets are intentionally kept out
// of hero rotation. At wide card crops they can read as nearly blank fields,
// which is exactly the failure mode we want to prevent. They remain available
// for lower-page editorial use.
export const hubHeroImages = {
  services: landscape03,
  areas: landscape21,
  telehealth: landscape05,
  schedule: landscape06,
} as const;

const serviceHeroOverrides = {
  'individual-therapy': landscape01,
  'couples-counseling': landscape02,
  'family-therapy': landscape03,
  'teen-counseling': landscape04,
  'premarital-marriage-counseling': landscape05,
  'emdr-therapy': landscape06,
  'anxiety-therapy': landscape07,
  'trauma-ptsd-therapy': landscape08,
  'stress-management': landscape09,
  'personal-growth-therapy': landscape10,
  'sex-therapy': landscape11,
  'abuse-support': landscape12,
  'addiction-counseling': landscape13,
  'anger-management': landscape14,
  'eating-disorder-support': landscape15,
  'holistic-therapy': landscape16,
  'lgbtq-affirming-therapy': landscape17,
  'divorce-separation-counseling': landscape18,
  'depression-therapy': landscape19,
  'grief-counseling': landscape20,
} as const;

const cityHeroOverrides = {
  carlsbad: landscape21,
  encinitas: landscape22,
  oceanside: landscape23,
  'san-marcos': landscape24,
  vista: landscape25,
  'del-mar': landscape26,
  'solana-beach': landscape01,
  'rancho-santa-fe': landscape02,
} as const;

const moneyServiceOverrides = serviceHeroOverrides;

const readableHeroPool = [
  landscape01, landscape02, landscape03, landscape04, landscape05,
  landscape06, landscape07, landscape08, landscape09, landscape10,
  landscape11, landscape12, landscape13, landscape14, landscape15,
  landscape16, landscape17, landscape18, landscape19, landscape20,
  landscape21, landscape22, landscape23, landscape24, landscape25,
  landscape26,
] as const;

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
  if (image.src === homeCoastalPath.src) return 'A quiet Southern California coastal path in soft marine-layer light';
  if (image.src === meadowTree.src) return 'A mature tree in a quiet Southern California meadow under soft morning haze';
  if (image.src === courtyardRetreat.src) return 'A calm Southern California courtyard with restrained natural landscaping';
  if (image.src === eucalyptusTrail.src) return 'A quiet eucalyptus-lined Southern California trail in soft coastal haze';
  if (image.src === windowNook.src) return 'A softly lit neutral interior window nook';
  if (image.src === landscape01.src) return 'A quiet Southern California coastal trail in soft morning light';
  if (image.src === landscape02.src) return 'A calm California shoreline at golden hour';
  if (image.src === landscape03.src) return 'A sunlit Southern California hillside in gentle coastal haze';
  if (image.src === landscape04.src) return 'A peaceful eucalyptus grove along the San Diego coast';
  if (image.src === landscape05.src) return 'A serene San Diego canyon at dawn with native vegetation';
  if (image.src === landscape06.src) return 'A misty Southern California bluff overlooking the Pacific';
  if (image.src === landscape07.src) return 'A tranquil California coastal sage scrub landscape at sunrise';
  if (image.src === landscape08.src) return 'A quiet North County San Diego vista in morning marine layer';
  if (image.src === landscape09.src) return 'A sunlit Southern California meadow with distant ocean views';
  if (image.src === landscape10.src) return 'A peaceful California chaparral hillside in early morning light';
  if (image.src === landscape11.src) return 'A serene Carlsbad coastal scene in soft afternoon light';
  if (image.src === landscape12.src) return 'A calm eucalyptus-lined path in coastal Southern California';
  if (image.src === landscape13.src) return 'A quiet Southern California lagoon at dawn';
  if (image.src === landscape14.src) return 'A sunlit California bluff with coastal sage and native wildflowers';
  if (image.src === landscape15.src) return 'A peaceful Southern California wetlands vista at sunrise';
  if (image.src === landscape16.src) return 'A tranquil California coastal overlook in warm afternoon light';
  if (image.src === landscape17.src) return 'A serene San Diego hillside in soft golden hour light';
  if (image.src === landscape18.src) return 'A calm Southern California canyon with native oak and sage';
  if (image.src === landscape19.src) return 'A quiet eucalyptus and coastal oak landscape in morning haze';
  if (image.src === landscape20.src) return 'A peaceful California sunrise over the Pacific coastline';
  if (image.src === landscape21.src) return 'A serene Carlsbad hillside in soft coastal morning light';
  if (image.src === landscape22.src) return 'A tranquil Encinitas coastal path at dawn';
  if (image.src === landscape23.src) return 'A calm North County coastal trail in golden hour light';
  if (image.src === landscape24.src) return 'A quiet California canyon landscape in soft morning light';
  if (image.src === landscape25.src) return 'A peaceful Southern California native plant hillside at sunrise';
  if (image.src === landscape26.src) return 'A sunlit California coastal vista with distant Pacific horizons';
  return 'A quiet Southern California landscape';
}

export const editorialImages = {
  coastalPath: homeCoastalPath,
  courtyardRetreat,
  eucalyptusTrail,
  meadowTree,
  windowNook,
} as const;
