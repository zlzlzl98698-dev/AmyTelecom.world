# AmyTelecom.world · 网络观测台知识图谱

本仓库包含 **Amy博客 · 网络观测台（AmyTelecom.world）** 的完整站点源码。站点采用 VitePress 静态生成与 Pagefind 离线检索技术，提供跨境网络线路实测、品牌矩阵与客户端配置指南。

---

## 项目特色

- **多维度测评矩阵**：记录网络延迟、晚高峰吞吐与协议兼容性，区分实测记录与公开参数。
- **专题知识图谱**：涵盖专线原理、全平台客户端（Windows / macOS / iOS / Android / 软路由）配置与应急避坑指南。
- **离线全文检索**：集成 Pagefind 静态搜索引擎，实现无后端依赖的本地毫秒级分词搜索。
- **SEO / GEO 优化架构**：
  - 全站 100% 绝对 Canonical 规范化地址；
  - 外部商业跳转链接统一标记 `rel="nofollow sponsored noopener"`；
  - 动态生成 Schema.org 结构化数据（包含 BreadcrumbList、TechArticle、FAQPage）；
  - 自动生成合规 XML Sitemap 与 robots.txt。

---

## 项目目录

```text
AmyTelecom.world/
├── .vitepress/          # 站点核心配置、SEO Head 与自定义主题组件
├── data/                # 测评数据与品牌库结构化定义
├── public/              # 静态静态资源、头像、测速报告图库与 robots.txt
├── recommendations/     # 选型天梯榜单与推荐专题
├── reviews/             # 独立品牌测评专栏
├── clients/             # 客户端使用指南与配置专著
├── faq/                 # 常见问题解答与故障排查知识库
├── observatory/         # 网络观测台测速汇总与术语字典
├── .htaccess            # 服务器路由重写与缓存策略
└── package.json         # 项目构建与依赖声明
```

---

## 本地运行

### 运行环境
- Node.js >= 18.0.0
- npm / pnpm / yarn

### 安装与启动
```bash
# 安装依赖
npm install

# 启动本地开发服务 (默认 http://localhost:5173/)
npm run dev

# 生产环境编译打包 (含 Pagefind 离线搜索索引生成)
npm run build

# 预览编译后的静态页面 (默认 http://localhost:4173/)
npm run preview
```

---

## 生产部署说明

编译后的产物位于 `.vitepress/dist` 目录，可直接托管在任一静态 Web 平台（如 Cloudflare Pages、Vercel、Nginx 或 Apache）。
项目根目录自带 `.htaccess`，已配置 HTTPS 301 强制跳转、Clean URLs 与静态资源缓存控制。

---

## 声明

本项目测评基于实验节点在特定时间段的实测记录，仅供网络工程学术交流与技术研究参考。
使用相关网络工具时请自觉遵守当地相关法律法规。
