# 谜言的 Github Pages

此项目使用 Astro 构建，以内容展示为核心的完全静态网站。
站点开发的核心理念：
1. 不使用 JavaScript 也可使用正常的功能
2. 尽量少使用 JavaScript
3. 每次尽量小加载文件大小（也许长期总体上来讲会比较多）
4. 核心功能不使用后端接口，主体展示的内容以纯静态实现（如，按标签筛选文章的功能）
5. 尽量不使用 SPA 解决方案

## 快速开始

```sh
# 先安装依赖
npm install
# 然后进行一次构建
npm run build
# 之后进行开发
npm run dev
```

由于使用的全站搜索需要通过构建步骤生成索引和依赖，故最好进行一次构建。否则全站搜索不能在开发中使用。

## 项目结构

```text
├── public/
│   scripts/
├── src/
│   ├── components/
│   ├── content/
│   │   └── config.ts
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   ├── types/
│   └── utils/
├── astro.config.mjs
├── package.json
├── README.md
├── tailwind.config.msj
└── tsconfig.json
```

页面文件后缀为 `.astro` 、`.html`、`.ts/.js`、`.mdx` 或 `.md`，分布在 `src/pages/` 或是 `src/contents/` 之中。

`src/pages` 中的页面直接生成路由，映射到实际的应用。

`src/contents` 中的页面称为内容，按照 `src/contents/config.ts` 归类为不同的[内容集合](https://docs.astro.build/zh-cn/guides/content-collections/)。通过使用动态路由，可以[从内容集合生成路由](https://docs.astro.build/zh-cn/guides/content-collections/#%E4%BB%8E%E5%86%85%E5%AE%B9%E7%94%9F%E6%88%90%E8%B7%AF%E7%94%B1)。

`src/components/` 中存放组件，包含且不限于 Astro、Vue、React 组件。

`public/` 目录存放任意的长期不变的静态文件。经常改变的资源文件，请放置于 `src/assets/` 目录中。

`script/` 目录中存放构建或是工具脚本。


## 项目命令

All commands are run from the root of the project, from a terminal:

| 命令                      | 说明                                              |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | 安装依赖                                          |
| `npm run dev`             | 启动本地开发服务器，地址 `localhost:4321`          |
| `npm run build:pagefind`  | 构建 `pagefind` 全站搜索索引和依赖                 |
| `npm run build:astro`     | 构建 `astro` 应用部分内容                         |
| `npm run build`           | 构建生产包，输出到 `./dist/`                      |
| `npm run preview`         | 进行部署前的预览                                  |
| `npm run astro ...`       | 运行 CLI 命令，如： `astro add`, `astro check`    |
| `npm run astro -- --help` | 获取使用 Astro CLI 的帮助                         |

## 自适应布局规范

| 尺寸                      | 说明                                              |
| :------------------------ | :----------------------------------------------- |
| `sm`                      | 小尺寸，640px，两侧 padding: 1rem                 |
| `md`                      | 中等尺寸，768px，两侧 padding: 1rem               |
| `lg`                      | 大尺寸，1024px，两侧 padding: 2rem                |
| `xl`                      | xl 尺寸，1280px，两侧 padding: 2rem               |
| `2xl`                     | 2xl 尺寸，1536px，两侧 padding: 2rem              |

## 待办清单

* [ ] 部分样式优化
* [ ] 单元测试
* [ ] 全站搜索
* [ ] 首页模块
* [ ] 明暗模式
* [ ] 工具模块
* [ ] 文档模块
* [ ] 代码支持
* [ ] i18n 支持