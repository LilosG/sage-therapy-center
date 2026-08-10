import heroCoastalPath from '../assets/images/home/hero-coastal-path.webp';
import philosophyMeadow from '../assets/images/editorial/misty-meadow-spreading-tree.webp';

// The former botanical-shadow approach image was intentionally retired from
// the project and should not be reintroduced. Homepage image choices live here
// so future visual swaps remain centralized rather than page-specific patches.
export const homeImages = {
  hero: heroCoastalPath,
  philosophy: philosophyMeadow,
} as const;
