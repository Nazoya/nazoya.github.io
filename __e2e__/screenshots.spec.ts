/**
 * Only if you want to check each page's view,
 * so default !!disabled this test
 */

import { test } from '@playwright/test';
import { cwd } from 'node:process';
import { resolve } from 'node:path';
import { readFile } from 'node:fs/promises';
import { Parser } from 'xml2js';

const PROJECT_DIR = cwd();
const str = await readFile(resolve(PROJECT_DIR, 'dist/sitemap-0.xml'), { encoding: 'utf-8' });
const parser = new Parser({ normalize: false, valueProcessors: [v => { return decodeURI(v) }] });
const xml = await parser.parseStringPromise(str);

test.beforeEach(async ({ page }) => {
  const localURI = 'http://localhost:3000/';
  await page.goto(localURI);
});

test.describe('Sitemap pages', () => {
  const urls = xml.urlset.url.map((u: { loc: [string] }) => new URL(u.loc[0])) as URL[];
  test('should be available.', async ({
    page,
    browserName,
   }) => {
    for (const url of urls) {
      await page.goto(url.pathname);
      await page.screenshot({
        path: `__e2e__results__/screenshots/${browserName}/site${decodeURI(url.pathname.replaceAll('/', '-').slice(0, -1))}.png`,
        fullPage: false,
        timeout: 5000,
      });
    }
  });
});

