import fs from 'fs/promises';
import path from 'path';
const DIRNAME = import.meta.dirname;
const PROJECT_DIR = path.resolve(DIRNAME, '..');
// console.debug(DIRNAME, PROJECT_DIR);

/**
 * @name prepare
 * @description 由于 pagefind 不支持通过 vite 等捆绑器导入，所以需要构建后手动导入以方便编辑
 */
async function prepare() {
  try {
    const files = await fs.readdir(`${PROJECT_DIR}/dist/pagefind`, {
      recursive: true,
    });
    // console.debug(files);
    if (!files.length) {
      return;
    }

    for (const filename of files) {
      const sourcePath = `${PROJECT_DIR}/dist/pagefind/${filename}`;
      const targetPath = `${PROJECT_DIR}/public/pagefind/${filename}`;
      try {
        await fs.access(targetPath);
      } catch {
        await fs.mkdir(path.dirname(targetPath), { recursive: true });
      }

      const handle = await fs.stat(sourcePath);
      if (handle.isDirectory()) {
        continue;
      }
      fs.copyFile(sourcePath, targetPath);
    }
  } catch (err) {
    throw err;
  }
}

prepare();
