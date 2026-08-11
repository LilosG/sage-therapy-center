// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

const nonIndexablePaths = ['/keystatic', '/resources/'];

// https://astro.build/config
export default defineConfig({
  // One canonical production origin for canonical URLs, sitemap generation,
  // Open Graph URLs, and structured data.
  site: 'https://sagetherapycenter.com',
  trailingSlash: 'always',

  vite: {
    plugins: [tailwindcss()]
  },

  // Keystatic injects on-demand admin routes, so the Vercel adapter remains
  // present even though public content pages are prerendered/static routes.
  adapter: vercel(),

  integrations: [
    mdx(),
    react(),
    keystatic(),
    icon(),
    sitemap({
      // Admin/editor routes and the temporarily incomplete legacy resource
      // section are intentionally excluded from the public search sitemap.
      filter: (page) => !nonIndexablePaths.some((path) => page.includes(path)),
      namespaces: {
        news: false,
        xhtml: false,
        video: false,
      },
    }),
  ]
});
