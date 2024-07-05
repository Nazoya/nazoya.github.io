import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math'; 
import { resolve } from 'path';
import {
  transformerNotationDiff,
  transformerNotationHighlight,
} from '@shikijs/transformers'
import { remarkReadingTime, remarkModifiedTime } from './scripts/remark-plugins.mjs';

const DIR = import.meta.dirname;

// https://astro.build/config
export default defineConfig({
  site: 'https://nazoya.github.io/',
  build: {
    rollupOptions: {
      external: ['/pagefind/pagefind.js'],
    },
  },
  vite: {
    assetsInclude: '**/pagefind.js',
    resolve: {
      alias: {
        '@': resolve(DIR, 'src'),
      },
    },
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
      ]
    },
    remarkPlugins: [remarkMath, remarkModifiedTime, remarkReadingTime],
    rehypePlugins: [rehypeKatex],
    syntaxHighlight: 'shiki',
    // gfm: true,
  },
  integrations: [
    mdx(),
    sitemap(),
    tailwind({
      applyBaseStyles: false,
      nesting: true,
    }),
  ],
});
