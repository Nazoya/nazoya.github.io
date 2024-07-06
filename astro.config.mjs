import { defineConfig } from 'astro/config';
import { rehypeShiki } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import remarkMath from 'remark-math'; 
import rehypeKatex from 'rehype-katex';
import { resolve } from 'path';
import {
  transformerNotationDiff,
  transformerNotationHighlight,
} from '@shikijs/transformers'
import {
  remarkReadingTime,
  remarkModifiedTime,
} from './scripts/remark-plugins.mjs';


const DIR = import.meta.dirname;
console.info(resolve(DIR, './src/styles/mermaid.css'))

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
    remarkPlugins: [
      remarkMath,
      remarkModifiedTime,
      remarkReadingTime,
    ],
    rehypePlugins: [
      rehypeKatex,
      rehypeShiki,
    ],
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
  ],
});
