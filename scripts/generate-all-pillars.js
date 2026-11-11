const fs = require('fs');
const path = require('path');

const brandsCode = fs.readFileSync('c:/Users/Pro User/Desktop/AmyTelecom.world/data/brands.ts', 'utf8');
const brandsJsonMatch = brandsCode.match(/export const brandsData: BrandItem\[\] = (\[[\s\S]*?\]);/);
const brandsData = JSON.parse(brandsJsonMatch[1]);

const baseDir = 'c:/Users/Pro User/Desktop/AmyTelecom.world';

// 1. 生成 reviews/index.md (42 家机场品牌库总览)
const reviewsIndexMd = `---
title: "42 家机场品牌库与综合横评中心 (2026 最新版)"
description: "Amy博客全网收录的 42 家机场品牌库。涵盖 IEPL/IPLC 专线、低至 5.6 元平价机场、自研客户端、AI 工具与 4K 流媒体解锁实测与专属优惠码。"
keywords: "42家机场推荐, 机场品牌库, 科学上网梯子, 翻墙机场, 便宜机场, 光速云"
---

# 42 家机场品牌库与综合横评中心 (2026 知识图谱)

<div class="hero-badge">AmyTelecom Observatory · 42 家全覆盖权威数据库</div>

本页面汇聚了 AmyTelecom 网络实验室持续监测与深度评测的 **42 家机场品牌**。所有数据严格遵循 \`dataStatus: measured\`（实测数据）与 \`dataStatus: vendor\`（品牌资料）区分原则，不夸大、不造假，为您提供真实可靠的选型依据。

<PagefindSearch />

---

## 42 家机场梯队全景天梯表

| 序号 | 品牌名称 | 核心线路架构 | 起步门槛 | 专属优惠码 | 测速与特征 | 详情评测 | 官网入口 |
|---|---|---|---|---|---|---|---|
${brandsData.map(b => `| **#${b.rank}** | **${b.name}** | \`${b.lineType}\` | ${b.startPrice} | \`${b.coupon}\` | ${b.features.split('、')[0]} | [深度评测](/reviews/${b.slug}) | [直达官网](${b.affUrl}) |`).join('\n')}

---

## 第一梯队：核心主力与专线优选推荐

对于将机场作为生产力工具、追求长时在线不卡顿的用户，强烈建议优先从第一梯队中进行选择：

<div style="margin: 2rem 0;">
${brandsData.slice(0, 10).map(b => `<BrandCard :brand="${JSON.stringify(b).replace(/"/g, '&quot;')}" />`).join('\n')}
</div>

---

## 第二梯队：高性价比与均衡平价选择 (含 5.6 元档)

如果您的预算较为有限，或者需要寻找副梯子以防失联，第二梯队提供了极为丰富的差异化方案：

<div style="margin: 2rem 0;">
${brandsData.slice(10, 28).map(b => `<BrandCard :brand="${JSON.stringify(b).replace(/"/g, '&quot;')}" />`).join('\n')}
</div>

---

## 第三梯队：历史资料与待核实观察品牌

以下 14 家品牌由本站保留历史项目记录，参数以官网当前公布信息为准：

<div style="margin: 2rem 0;">
${brandsData.slice(28).map(b => `<BrandCard :brand="${JSON.stringify(b).replace(/"/g, '&quot;')}" />`).join('\n')}
</div>

<AffDisclaimer />
`;

fs.writeFileSync(path.join(baseDir, 'reviews/index.md'), reviewsIndexMd, 'utf8');

// 2. 生成首页 index.md
const homeIndexMd = `---
layout: home
title: "Amy博客 - 专业跨境网络加速与 42 家机场评测知识图谱"
description: "AmyTelecom.world 是专业级网络可观测性平台，提供 42 家机场万字深度测评、IEPL专线节点实测、ChatGPT/流媒体解锁指南与全平台客户端教程。"

hero:
  name: "专业跨境网络加速"
  text: "42 家机场万字深度测评中心"
  tagline: "以真实可观测数据为基石 · 严苛执行 IEPL 专线晚高峰压测\\n涵盖 ChatGPT 原生解锁评测 · 汇聚全平台客户端配置指南"
  actions:
    - theme: brand
      text: "浏览 42 家机场品牌库 →"
      link: "#top-flagship"
    - theme: alt
      text: "★ 头牌首选：光速云万字评测"
      link: "/reviews/guangsu"

features:
  - icon: "⚡"
    title: "第一主推：光速云 (GuangSu)"
    details: "2020老牌运营，IEPL+企业内网双架构，年付折合仅 8 元/月，香港实测 529Mbps，致敬斯诺克147永久套餐不过期。"
    link: "/reviews/guangsu"
  - icon: "📊"
    title: "42 家品牌全景测评矩阵"
    details: "拒绝千篇一律的广告词。涵盖 42 家机场实测测速图、真实套餐价格折算、流媒体解锁矩阵与优缺点客观剖析。"
    link: "/reviews/"
  - icon: "🤖"
    title: "AI 生产力与 4K 流媒体"
    details: "精准定位 ChatGPT、Claude 3.5 Sonnet 原生 IP 解锁，Netflix 非自制剧与 YouTube 4K HDR 串流不卡顿方案。"
    link: "/scenarios/"
  - icon: "💻"
    title: "全平台客户端配置中心"
    details: "Windows (Clash Verge Rev)、macOS (M系列架构)、iOS (Shadowrocket 小火箭)、安卓与软路由 OpenClash 完整指南。"
    link: "/clients/"
  - icon: "🛡️"
    title: "防跑路与避坑守则"
    details: "揭秘机场运营黑幕、资金盘跑路前兆、不退款条款辨析与个人数字隐私保护实操。"
    link: "/guides/"
  - icon: "🌐"
    title: "网络可观测性实验室"
    details: "自动化压测机器人连续数据记录、全球骨干网海底光缆分布与网络工程专业术语词典。"
    link: "/observatory/"
---

<div style="max-width: 1152px; margin: 2rem auto; padding: 0 1.5rem;">

<PagefindSearch />

---

<div style="text-align: center; margin: 1.5rem 0;">
  <span class="hero-badge">42 家机场全收录 · 拒绝信息差</span>
  <h2 style="font-size: 2rem; font-weight: 800; margin-top: 0.5rem;">42 家机场品牌库完整全景矩阵展示</h2>
  <p style="color: var(--amy-text-muted); max-width: 680px; margin: 0.5rem auto 1.5rem;">
    本站收录的全部 42 家机场品牌已全部在此展示，涵盖从 5.6 元平价轻量梯子到企业级全 IPLC/IEPL 专线，每家均配有专属优惠码与深度实测数据。
  </p>
  <div style="display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 2rem;">
    <a href="#top-flagship" class="cta-button secondary" style="font-size: 0.8rem; padding: 0.4rem 0.85rem;">★ 第一主推：光速云</a>
    <a href="#tier-1" class="cta-button secondary" style="font-size: 0.8rem; padding: 0.4rem 0.85rem;">🏆 第一梯队 (10家主力)</a>
    <a href="#tier-2" class="cta-button secondary" style="font-size: 0.8rem; padding: 0.4rem 0.85rem;">⚡ 第二梯队 (18家平价/特色)</a>
    <a href="#tier-3" class="cta-button secondary" style="font-size: 0.8rem; padding: 0.4rem 0.85rem;">📋 第三梯队 (14家历史观测)</a>
  </div>
</div>

<h3 id="top-flagship" style="font-size: 1.5rem; font-weight: 800; margin: 2rem 0 1rem; color: #ef4444; display: flex; align-items: center; gap: 0.5rem;">
  <span>🌟</span> 第一首选主推：光速云 (GuangSu)
</h3>

<BrandCard :brand="${JSON.stringify(brandsData[0]).replace(/"/g, '&quot;')}" />

---

<h3 id="tier-1" style="font-size: 1.5rem; font-weight: 800; margin: 2.5rem 0 1rem; display: flex; align-items: center; gap: 0.5rem;">
  <span>🏆</span> 第一梯队：核心主力与优质专线推荐 (10 家)
</h3>
<p style="color: var(--amy-text-muted); font-size: 0.9rem; margin-bottom: 1rem;">
  适合作为个人或团队生产力主力翻墙工具，主打 IEPL/IPLC 专线或优质 BGP 中转，晚高峰低延迟不拥堵，流媒体与 AI 解锁表现优异。
</p>

<div style="margin: 1.5rem 0;">
${brandsData.slice(0, 10).map(b => `<BrandCard :brand="${JSON.stringify(b).replace(/"/g, '&quot;')}" />`).join('\n')}
</div>

---

<h3 id="tier-2" style="font-size: 1.5rem; font-weight: 800; margin: 2.5rem 0 1rem; display: flex; align-items: center; gap: 0.5rem;">
  <span>⚡</span> 第二梯队：高性价比与均衡平价推荐 (18 家，含 5.6 元档)
</h3>
<p style="color: var(--amy-text-muted); font-size: 0.9rem; margin-bottom: 1rem;">
  包含 5.6 元/月平价方案（闪电鼠、大佬云等）、自研客户端品牌及高性价比大容量套餐，适合学生党日常查资料或作为防失联副梯子。
</p>

<div style="margin: 1.5rem 0;">
${brandsData.slice(10, 28).map(b => `<BrandCard :brand="${JSON.stringify(b).replace(/"/g, '&quot;')}" />`).join('\n')}
</div>

---

<h3 id="tier-3" style="font-size: 1.5rem; font-weight: 800; margin: 2.5rem 0 1rem; display: flex; align-items: center; gap: 0.5rem;">
  <span>📋</span> 第三梯队：特色与历史观测品牌 (14 家)
</h3>
<p style="color: var(--amy-text-muted); font-size: 0.9rem; margin-bottom: 1rem;">
  包含拥有 79 个冷门国家的白月光、高端专线 WgetCloud、全专线 FlyingBird 及历史测试品牌，数据以官网实时公示为准。
</p>

<div style="margin: 1.5rem 0;">
${brandsData.slice(28).map(b => `<BrandCard :brand="${JSON.stringify(b).replace(/"/g, '&quot;')}" />`).join('\n')}
</div>

<AffDisclaimer />

</div>
`;

fs.writeFileSync(path.join(baseDir, 'index.md'), homeIndexMd, 'utf8');

console.log('Successfully updated reviews/index.md and home index.md without overwriting specialized pillar guides!');
