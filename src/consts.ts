// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.
import { resolve } from 'path';

export const SITE_TITLE = '谜言小站';
export const SITE_DESCRIPTION = '欢迎来到谜言的小站。这里将放一些整理的文档和博文，还可能不定期放一些好玩的作品（预计）！';
export const BLOG_PAGE_SIZE = 10;
export const BLOG_RECENT_SIZE = 8;
export const PROJECT_DIR = resolve(import.meta.dirname, '../');
export const CONTENT_BLOG_DIR = resolve(import.meta.dirname, '../', 'src/content/blog');
export const IS_PROD = import.meta.env.PROD;