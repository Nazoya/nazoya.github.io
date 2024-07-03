import { stat, readFile } from 'fs/promises';

// 用于劫持本地开发服务器进行重定向
const pagefindPlugin = () => ({
  name: 'pagefind-plugin',
  enforce: 'pre',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      console.info(req.url, !req.url.endsWith('.pf_fragment') && !req.url.endsWith('.pf_index'));
      if (!req.url.endsWith('.pf_fragment') && !req.url.endsWith('.pf_index')) {
        next();
        return;
      }
      try {
        const fStat = await stat(`${DIR}/public/${req.url}`);
        if (fStat.isDirectory) {
          return;
        }
        const file = await readFile(`${DIR}/public/${req.url}`);
        console.info(res.send, res.sendFile, res);
        for (const k in res) {
          if (res[k] instanceof Function) {
            console.info(k, res[k]);
          }
        }
        // error to repair
        file.createReadStream().pipe(res);
      } catch (err) {
        console.error(err);
        next();
      }
    });
  },
});

export { pagefindPlugin };