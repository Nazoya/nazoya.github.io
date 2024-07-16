import { range, canonicalURL, fetchPackageJSON } from '@/utils/tools';
import { describe, expect, it } from 'vitest';

describe('Tools: ', () => {
  it('range should work.', () => {
    expect(range(1, 3).next().value).toBe(1);
    expect(range(4, 3).next().value).toBe(undefined);
    expect(Array.from(range(3, 8))).toEqual([3, 4, 5, 6, 7, 8]);
    expect(Array.from(range(-1, 2))).toEqual([-1, 0, 1, 2]);
  });

  it('canonicalURL should  work.', () => {
    const path = 'http://localhost:3000/';
    expect(canonicalURL(path).toString()).toBe(path);
  });

  it('fetchPackageJSON should return specific properties.', async () => {
    expect(fetchPackageJSON()).resolves.toHaveResolved;
    expect(await fetchPackageJSON()).toHaveProperty('name');
    expect(await fetchPackageJSON()).toHaveProperty('repository');
  });
})