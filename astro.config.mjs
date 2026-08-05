// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';
import icon from 'astro-icon';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Confirmed production domain (matches site.canonicalOrigin in
  // src/data/site.ts) — required for the sitemap integration to emit
  // absolute URLs, and a real fallback for Astro.site elsewhere.
  site: 'https://sagetherapycenter.com',

  vite: {
    plugins: [tailwindcss()]
  },

  // Required because Keystatic's Astro integration injects on-demand admin
  // routes (/keystatic/**) — Astro needs an adapter present to support
  // those even though every content page here still prerenders statically.
  // Vercel is the confirmed hosting target (Build Spec Section 1).
  adapter: vercel(),

  integrations: [mdx(), react(), keystatic(), icon(), sitemap()]
});