import { defineConfig } from 'astro/config';
import { rehypeShiki } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { resolve } from 'path';
import {
  transformerNotationDiff,
  transformerNotationHighlight,
} from '@shikijs/transformers';
import {
  remarkReadingTime,
  remarkModifiedTime,
} from './scripts/remark-plugins.mjs';
import react from '@astrojs/react';
const DIR = import.meta.dirname;

// https://astro.build/config
export default defineConfig({
  site: 'https://nazoya.github.io/',
  vite: {
    assetsInclude: '**/pagefind.js',
    build: {
      rollupOptions: {
        external: ['/pagefind/pagefind.js'],
        output: {
          manualChunks(id) {
            // A quick way to find the large files :
            //   if (id.includes('node_modules')) {
            //     return id.toString().split('node_modules/')[1].split('/')[0].toString();
            // }
            if (id.includes('node_modules/react')) {
              return 'react';
            }
            if (id.includes('node_modules/static-browser-server')) {
              return 'static-browser-server';
            }
            // Need to keep this one thunk for styles
            if (id.includes('node_modules/@codemirror')) {
              return 'codemirror';
            }
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(DIR, 'src'),
        '$': DIR,
      },
    },
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      transformers: [transformerNotationDiff(), transformerNotationHighlight()],
    },
    remarkPlugins: [remarkMath, remarkModifiedTime, remarkReadingTime],
    rehypePlugins: [rehypeKatex, rehypeShiki],
    syntaxHighlight: false,
    // gfm: true,
  },
  integrations: [
    mdx(),
    sitemap(),
    tailwind({
      applyBaseStyles: false,
      nesting: true,
    }),
    react(),
  ],
});
