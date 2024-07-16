import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import IconSVG from '@/components/icon/IconSVG.astro';

describe('IconSVG with a slot', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(IconSVG, {
    props: {
      classname: 'svg-icon',
      'data-extra': 'true'
    },
    slots: {
      default: '...',
    },
  });

  it('should receive props', () => {
    expect(result).toContain('svg-icon');
    expect(result).toContain('data-extra="true"');
  });

  it('should receive slot', () => {
    expect(result).toContain('...');
  });
});