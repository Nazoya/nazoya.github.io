import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';
import { execSync } from "child_process";

function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    // readingTime.text 会以友好的字符串形式给出阅读时间，例如 "3 min read"。
    data.astro.frontmatter.msForReading = readingTime.time;
    data.astro.frontmatter.words = readingTime.words;
  };
}

function remarkModifiedTime() {
  return function (_, file) {
    const filepath = file.history[0];
    const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
    file.data.astro.frontmatter.lastModified = result.toString();
  };
}

export { remarkReadingTime, remarkModifiedTime };