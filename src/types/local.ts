import type { CollectionEntry } from 'astro:content';

type ICollectionScheme = {
  'blog': CollectionEntry<'blog'> & { link: string; originalSlug: string; }; 
}

type ICollectionSchemeKey = keyof ICollectionScheme;
type IContentCollection<C extends ICollectionSchemeKey> = ICollectionScheme[C]

interface IMenuItem {
  label: string;
  link?: string;
  open?: boolean;
  active?: boolean;
  items?: IMenuItem[];
}

export type { IMenuItem, IContentCollection };