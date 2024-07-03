import type { IContentCollection } from '@/types/local';
import { getCollection } from 'astro:content';

const transformSlug = (slug: string) => slug.replaceAll(/[\\|/]/g, '-');

const blogs: IContentCollection<'blog'>[] = (await getCollection('blog'))
  .map(blog => {
    const slug = transformSlug(blog.slug);
    return {
      ...blog,
      slug,
      originalSlug: blog.slug,
      link: `/blog/${transformSlug(blog.slug)}`,
    } as IContentCollection<'blog'>;
  });

const blogsSortedByPubDate = blogs.sort(
  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);

const blogsSortedByUpdateAndPubDate = blogs
  .toSorted((a, b) => {
    const aDate = a.data.updatedDate ?? a.data.pubDate;
    const bDate = b.data.updatedDate ?? b.data.pubDate;
    return bDate.getTime() - aDate.getTime();
  });

// const pubDates = blogsSortedByPubDate.map(blog => blog.data.pubDate);

const tagsStatistics = new Map<string, IContentCollection<'blog'>[]>();
for (const blog of blogs) {
  const { tags } = blog.data;
  if (!tags || tags.length === 0) {
    // if (!tagsStatistics.has('其他')) {
    //   tagsStatistics.set('其他', []);
    // }
    // tagsStatistics.get('其他')?.push(blog);
    continue;
  }
  for (const tag of tags) {
    if (!tagsStatistics.has(tag)) {
      tagsStatistics.set(tag, []);
    }
    tagsStatistics.get(tag)?.push(blog);
  }
}

const tags = Array
  .from(tagsStatistics.keys())
  .sort((a, b) => a.localeCompare(b));

export {
  blogs,
  blogsSortedByPubDate,
  blogsSortedByUpdateAndPubDate,
  tags,
  tagsStatistics,
};