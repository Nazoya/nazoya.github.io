import { readFile } from 'fs/promises';
import { resolve } from 'path';

const DIRNAME = resolve(import.meta.dirname);
function * range (start: number, end: number) {
  while (start <= end) {
    yield start++;
  }
}

function canonicalURL(path: URL | string, site?: URL | string) {
  return new URL(path, site);
}

async function fetchPackageJSON() {
  return JSON.parse(await readFile(resolve(DIRNAME, '../../package.json'), 'utf-8'));
}

export { range, canonicalURL, fetchPackageJSON };