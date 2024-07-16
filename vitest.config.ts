/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    include: [
      './__tests__/**/*{test,spec}.?(c|m)[jt]s?(x)'
    ],
    coverage: {
      reportsDirectory: '__tests__coverage__',
      extension: ['.js', '.cjs', '.mjs', '.ts', '.tsx', '.jsx', '.vue', '.svelte', '.marko', '.astro'],
      include: [
        'src/**',
      ],
      exclude: [
        'src/content/**',
        'src/types/**',
        'env.d.ts',
        'consts.ts',
        'src/const.ts',
        'src/env.d.ts',
        'src/rss.xml.js',
      ],
    },
  },
})