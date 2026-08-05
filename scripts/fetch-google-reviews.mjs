#!/usr/bin/env node
// Build-time fetch for Wave 9 live reviews (docs/WAVE_9_LIVE_REVIEWS.md).
// Runs as an npm "prebuild" hook, before `astro build`. Writes a small,
// committed JSON snapshot that the reviews section and schema both read
// from — this snapshot IS the 30-day-ceiling-compliant cache the doc
// requires, refreshed by a scheduled rebuild (see docs/WAVE_9_LIVE_REVIEWS.md
// "Rebuild cadence").
//
// Failure handling is deliberately silent (never throws, never exits
// non-zero): per the doc's option (b), a Google API hiccup must not fail
// the whole site build. On any failure this leaves the last committed
// google-reviews.json untouched, so the site falls back to the last
// successfully-fetched data.
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, '../src/data/google-reviews.json');
const PLACE_ID = 'ChIJtc6aBhty3IARCI4Y0MK8Xsk';
const FIELD_MASK = 'id,displayName,rating,userRatingCount,reviews';

async function main() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    console.warn(
      '[fetch-google-reviews] GOOGLE_PLACES_API_KEY not set — keeping last committed google-reviews.json.'
    );
    return;
  }

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}`, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': FIELD_MASK,
      },
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Places API responded ${res.status}: ${body}`);
    }

    const data = await res.json();

    const normalized = {
      fetchedAt: new Date().toISOString(),
      placeId: data.id,
      name: data.displayName?.text ?? 'S.A.G.E. Therapy Center',
      rating: data.rating ?? null,
      userRatingCount: data.userRatingCount ?? null,
      // Places API hard-caps this at 5 regardless of slice — kept explicit
      // here so the data file's shape can't silently grow past what the
      // section is designed to display.
      reviews: (data.reviews ?? []).slice(0, 5).map((r) => ({
        authorName: r.authorAttribution?.displayName ?? 'Google user',
        authorPhotoUrl: r.authorAttribution?.photoUri ?? null,
        authorProfileUrl: r.authorAttribution?.uri ?? null,
        rating: r.rating ?? null,
        text: r.text?.text ?? '',
        relativeTime: r.relativePublishTimeDescription ?? '',
        googleMapsUri: r.googleMapsUri ?? null,
        publishTime: r.publishTime ?? null,
      })),
    };

    await writeFile(OUTPUT_PATH, `${JSON.stringify(normalized, null, 2)}\n`, 'utf-8');
    console.log(
      `[fetch-google-reviews] Success — rating=${normalized.rating}, userRatingCount=${normalized.userRatingCount}, reviews=${normalized.reviews.length}, fetchedAt=${normalized.fetchedAt}`
    );
  } catch (err) {
    console.warn(`[fetch-google-reviews] Fetch failed, keeping last committed data: ${err.message}`);
  }
}

await main();
