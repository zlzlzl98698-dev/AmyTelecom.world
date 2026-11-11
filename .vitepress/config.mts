import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Amy博客',
  description: 'AmyTelecom.world - 专业跨境网络加速、IEPL专线节点实测与 42 家机场万字深度测评知识图谱',
  lang: 'zh-CN',
  cleanUrls: true,
  sitemap: {
    hostname: 'https://amytelecom.world'
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['meta', { name: 'keywords', content: '机场推荐, 42家机场测评, 光速云, 免费节点, 免费试用机场, 机场跑路预警, 机场FAQ, IEPL专线, Clash Verge Rev, Shadowrocket小火箭, 便宜机场, 晚高峰测速' }],
    ['meta', { name: 'author', content: 'AmyTelecom Network Lab' }],
    ['meta', { property: 'og:site_name', content: 'Amy博客 (AmyTelecom.world)' }],
    ['meta', { property: 'og:image', content: 'https://amytelecom.world/images/avatar.jpg' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://amytelecom.world/images/avatar.jpg' }],
    // 搜索引擎站长平台所有权验证预留槽位 (支持通过环境变量注入或上线后填入真实代码)
    ...(process.env.GOOGLE_SITE_VERIFICATION ? [['meta', { name: 'google-site-verification', content: process.env.GOOGLE_SITE_VERIFICATION }]] : []),
    ...(process.env.BING_SITE_VERIFICATION ? [['meta', { name: 'msvalidate.01', content: process.env.BING_SITE_VERIFICATION }]] : []),
    ...(process.env.BAIDU_SITE_VERIFICATION ? [['meta', { name: 'baidu-site-verification', content: process.env.BAIDU_SITE_VERIFICATION }]] : []),
    ...(process.env.SHENMA_SITE_VERIFICATION ? [['meta', { name: 'shenma-site-verification', content: process.env.SHENMA_SITE_VERIFICATION }]] : [])
  ],
  transformHead(context) {
    const { pageData } = context
    const relativePath = pageData.relativePath || ''
    if (relativePath === '404.md') return []

    const cleanPath = relativePath.replace(/index\.md$/, '').replace(/\.md$/, '')
    const canonicalUrl = cleanPath ? `https://amytelecom.world/${cleanPath}` : 'https://amytelecom.world/'

    const pageTitle = pageData.title ? `${pageData.title} | Amy博客` : 'Amy博客 - 专业跨境网络加速与 42 家机场评测知识图谱'
    const pageDesc = pageData.description || 'AmyTelecom.world 是专业级网络可观测性平台，提供 42 家机场万字深度测评、IEPL专线节点实测与全平台客户端教程。'

    const headConfigs: [string, Record<string, string>, string?][] = [
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:title', content: pageTitle }],
      ['meta', { property: 'og:description', content: pageDesc }],
      ['meta', { name: 'twitter:title', content: pageTitle }],
      ['meta', { name: 'twitter:description', content: pageDesc }]
    ]

    if (cleanPath) {
      headConfigs.push(
        ['meta', { property: 'og:type', content: 'article' }],
        ['meta', { property: 'article:published_time', content: '2026-03-01T08:00:00+08:00' }],
        ['meta', { property: 'article:modified_time', content: '2026-03-15T08:00:00+08:00' }],
        ['meta', { property: 'article:author', content: 'AmyTelecom Network Lab' }]
      )
    } else {
      headConfigs.push(
        ['meta', { property: 'og:type', content: 'website' }]
      )
    }

    // 构建符合 Google 与 GEO (Perplexity/ChatGPT) 标准的动态 Schema.org 知识图谱
    const graph: any[] = [
      {
        '@type': 'WebSite',
        '@id': 'https://amytelecom.world/#website',
        'url': 'https://amytelecom.world/',
        'name': 'Amy博客 - 跨境网络加速与机场测评中心',
        'description': '专业网络基础设施可观测性平台、42家机场深度权威测评与六大专题SEO/GEO知识矩阵',
        'publisher': {
          '@id': 'https://amytelecom.world/#organization'
        },
        'potentialAction': {
          '@type': 'SearchAction',
          'target': 'https://amytelecom.world/?s={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'Organization',
        '@id': 'https://amytelecom.world/#organization',
        'name': 'Amy博客 (AmyTelecom.world)',
        'url': 'https://amytelecom.world/',
        'logo': 'https://amytelecom.world/images/avatar.jpg',
        'sameAs': [
          'https://github.com/AmyTelecom'
        ]
      }
    ]

    if (cleanPath) {
      const parts = cleanPath.split('/').filter(Boolean)
      const partNames: Record<string, string> = {
        'recommendations': '机场推荐',
        'reviews': '深度评测',
        'trials': '免费试用',
        'free-nodes': '免费节点',
        'warning': '跑路预警',
        'faq': '常见问答',
        'clients': '客户端配置',
        'protocols': '代理协议',
        'scenarios': '场景选型',
        'observatory': '网络观测台',
        'guides': '防坑指南'
      }

      const breadcrumbItems: any[] = [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': '首页',
          'item': 'https://amytelecom.world/'
        }
      ]

      let currentPath = ''
      parts.forEach((part, index) => {
        currentPath += (currentPath ? '/' : '') + part
        const isLast = index === parts.length - 1
        const name = isLast ? (pageData.title || part) : (partNames[part] || part)
        breadcrumbItems.push({
          '@type': 'ListItem',
          'position': index + 2,
          'name': name,
          'item': `https://amytelecom.world/${currentPath}`
        })
      })

      graph.push({
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        'itemListElement': breadcrumbItems
      })

      // 区分栏目集合页、权威信任页与专著技术文章
      const isIndexPage = relativePath.endsWith('/index.md') || relativePath.endsWith('\\index.md')
      const isAboutPage = cleanPath === 'about' || cleanPath === 'editorial-standards' || cleanPath === 'affiliate-disclosure'

      if (isAboutPage) {
        graph.push({
          '@type': cleanPath === 'about' ? 'AboutPage' : 'WebPage',
          '@id': `${canonicalUrl}#page`,
          'headline': pageData.title,
          'description': pageData.description,
          'inLanguage': 'zh-CN',
          'mainEntityOfPage': canonicalUrl,
          'publisher': { '@id': 'https://amytelecom.world/#organization' }
        })
      } else if (isIndexPage) {
        graph.push({
          '@type': 'CollectionPage',
          '@id': `${canonicalUrl}#collection`,
          'headline': pageData.title,
          'description': pageData.description,
          'inLanguage': 'zh-CN',
          'mainEntityOfPage': canonicalUrl,
          'publisher': { '@id': 'https://amytelecom.world/#organization' }
        })
      } else {
        graph.push({
          '@type': 'TechArticle',
          '@id': `${canonicalUrl}#article`,
          'headline': pageData.title || 'Amy博客技术专著',
          'description': pageData.description || '专业网络基础设施可观测性评测与配置指南',
          'inLanguage': 'zh-CN',
          'mainEntityOfPage': canonicalUrl,
          'author': {
            '@type': 'Organization',
            'name': 'AmyTelecom Network Lab',
            'url': 'https://amytelecom.world/'
          },
          'publisher': {
            '@id': 'https://amytelecom.world/#organization'
          },
          'datePublished': '2026-03-01T08:00:00+08:00',
          'dateModified': '2026-03-15T08:00:00+08:00'
        })
      }

      // FAQ / 评测问答页注入 FAQPage Schema
      if (cleanPath.startsWith('faq') || cleanPath.startsWith('reviews')) {
        graph.push({
          '@type': 'FAQPage',
          '@id': `${canonicalUrl}#faq`,
          'mainEntity': [
            {
              '@type': 'Question',
              'name': `${pageData.title || '该节点服务'}的核心选型与稳定性指标如何？`,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': '本站基于多地真实宽带压测数据评判，重点考核晚高峰丢包抖动率、BGP/IEPL专线冗余及商家退款策略，建议按需月付实测。'
              }
            },
            {
              '@type': 'Question',
              'name': '遇到节点连接中断或异常时如何排查？',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': '检查本地客户端系统代理模式与系统时间同步（误差须<30秒），并备有第二备用通道以确保业务不间断。'
              }
            }
          ]
        })
      }
    }

    headConfigs.push([
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': graph
      })
    ])

    return headConfigs
  },
  markdown: {
    config: (md) => {
      const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options)
      }

      md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
        const aIndex = tokens[idx].attrIndex('href')
        if (aIndex >= 0) {
          const href = tokens[idx].attrs[aIndex][1]
          if (/^https?:\/\//i.test(href) && !href.includes('amytelecom.world') && !href.includes('localhost')) {
            tokens[idx].attrSet('target', '_blank')
            tokens[idx].attrSet('rel', 'nofollow sponsored noopener')
          }
        }
        return defaultRender(tokens, idx, options, env, self)
      }
    }
  },
  themeConfig: {
    logo: { src: '/images/avatar.jpg', alt: 'Amy博客 · 网络观测台' },
    siteTitle: 'Amy博客 · 网络观测台',
    nav: [
      { text: '首页', link: '/' },
      {
        text: '机场推荐',
        items: [
          { text: '42 家机场综合选型天梯总览', link: '/recommendations/' },
          { text: '企业级 IEPL/IPLC 专线榜', link: '/recommendations/iepl-ranking' },
          { text: '5.6 元平价高性价比学生榜', link: '/recommendations/budget-ranking' },
          { text: 'ChatGPT / Claude 原生解封榜', link: '/recommendations/ai-ranking' }
        ]
      },
      {
        text: '深度评测',
        items: [
          { text: '42 家品牌库评测总览', link: '/reviews/' },
          { text: '★ 第一主推：光速云深度实测', link: '/reviews/guangsu' },
          { text: '第一梯队：微风 / 速界 / 极连云', link: '/reviews/weifeng' },
          { text: '平价专区：5.6元档标准横评', link: '/reviews/shandianshu' },
          { text: '自动化压测实测图库', link: '/observatory/speedtest-reports' }
        ]
      },
      {
        text: '免费与试用',
        items: [
          { text: '42 家机场免费试用全景白名单', link: '/trials/' },
          { text: '1 元及小额体验包防坑指南', link: '/trials/low-cost-trial' },
          { text: '试用期 MTR 专线验真 SOP', link: '/trials/verification-sop' },
          { text: '免费节点全景与安全边界', link: '/free-nodes/' },
          { text: '免费公共代理三大致命陷阱', link: '/free-nodes/risks' },
          { text: '应急节点提取与平替方案', link: '/free-nodes/emergency' }
        ]
      },
      {
        text: '跑路预警',
        items: [
          { text: '机场跑路预警中心总览', link: '/warning/' },
          { text: '机场跑路前兆 10 大红线检测', link: '/warning/danger-signals' },
          { text: '主备双梯 1 秒避难容灾守则', link: '/warning/disaster-recovery' },
          { text: '商家不退款条款机理解密', link: '/guides/refund-privacy' }
        ]
      },
      {
        text: '常见问答 FAQ',
        items: [
          { text: '机场权威问答知识库 (GEO/AEO 图谱)', link: '/faq/' },
          { text: '节点报错与连通性排错 FAQ', link: '/faq/errors-troubleshooting' },
          { text: '协议与专线原理解惑 FAQ', link: '/faq/protocols-lines' },
          { text: '客户端与全平台配置 FAQ', link: '/faq/clients-configs' }
        ]
      },
      {
        text: '客户端与技术',
        items: [
          { text: '2026 全平台客户端导航', link: '/clients/' },
          { text: 'Windows (Clash Verge Rev)', link: '/clients/windows' },
          { text: 'macOS (Apple Silicon 专属)', link: '/clients/macos' },
          { text: 'iOS (Shadowrocket 小火箭)', link: '/clients/ios' },
          { text: 'Android (v2rayNG / FlClash)', link: '/clients/android' },
          { text: '软路由 (OpenClash 透明网关)', link: '/clients/openwrt' },
          { text: '代理协议全景技术解构', link: '/protocols/' },
          { text: 'VLESS XTLS-Reality 终极伪装', link: '/protocols/vless-reality' },
          { text: 'IEPL vs IPLC 专线内网解密', link: '/protocols/iepl-iplc' }
        ]
      }
    ],
    sidebar: {
      '/recommendations/': [
        {
          text: '42 家机场推荐矩阵',
          items: [
            { text: '42 家机场综合选型天梯总览', link: '/recommendations/' },
            { text: '企业级 IEPL/IPLC 专线榜', link: '/recommendations/iepl-ranking' },
            { text: '5.6 元平价高性价比榜', link: '/recommendations/budget-ranking' },
            { text: 'ChatGPT & Claude 原生纯净榜', link: '/recommendations/ai-ranking' }
          ]
        }
      ],
      '/reviews/': [
        {
          text: '42 家机场品牌评测矩阵',
          collapsed: false,
          items: [
            { text: '42 家品牌库筛选与索引', link: '/reviews/' },
            { text: '★ 光速云 (第一主推·万字实测)', link: '/reviews/guangsu' },
            { text: '微风网络 (BGP专线·高性价)', link: '/reviews/weifeng' },
            { text: '速界 (AI专项优化·长连接)', link: '/reviews/sujie' },
            { text: '极连云 (高铁级专线·低延迟)', link: '/reviews/jilian' },
            { text: '二猫云 (20元130G·主力稳定型)', link: '/reviews/ermao' },
            { text: '暮光加速 (BGP专线·在线客服)', link: '/reviews/muguang' },
            { text: '飞猫云 (7元档·专属免配客户端)', link: '/reviews/feimao' },
            { text: '星岛梦 (2020老牌·不限设备专线)', link: '/reviews/xingdaomeng' },
            { text: '无忧链接 (6元起·原生免订阅转换)', link: '/reviews/wuyou' },
            { text: '唯兔云 (60+节点·三网优化调度)', link: '/reviews/weitu' },
            { text: 'Firefly (纯IPLC专线·国内直连)', link: '/reviews/firefly' },
            { text: '宇宙云 (IEPL+VLESS+自研端)', link: '/reviews/yuzhou' },
            { text: 'U1S1 (20元120G·标准平衡组)', link: '/reviews/u1s1' },
            { text: '灵猫网络 (19元150G·不限时套餐)', link: '/reviews/lingmao' },
            { text: '光年梯 (18元110G·亚太均衡型)', link: '/reviews/guangnian' },
            { text: '一翻云 (20元150G·大带宽串流)', link: '/reviews/yifan' },
            { text: 'SOGO云 (2026全新架构·大冗余)', link: '/reviews/sogo' },
            { text: '可信云 (诚实数据缺口·务实运营)', link: '/reviews/kexin' },
            { text: '闪跃 (24元150G·商业出海专线)', link: '/reviews/shanyue' },
            { text: '全球云 (全新骨干拓扑·低负载)', link: '/reviews/quanqiu' },
            { text: '闪电鼠 (5.6元档平价IEPL专线)', link: '/reviews/shandianshu' },
            { text: '大佬云 (5.6元档平价方案)', link: '/reviews/dalaoyun' },
            { text: '云界线 (5.6元档备用方案)', link: '/reviews/yunjiexian' },
            { text: '榴莲云 (5.6元档轻量日常)', link: '/reviews/liulianyun' },
            { text: '神行加速 (14元120G·三网优化)', link: '/reviews/shenxing' },
            { text: '环球梯 (5.6元档备选方案)', link: '/reviews/huanqiuti' },
            { text: '隐形人 (60+节点·1小时修复承诺)', link: '/reviews/yinxingren' },
            { text: '梯子云 (自研端+通用订阅双模)', link: '/reviews/tiziyun' },
            { text: 'WgetCloud (高端专线·历史记录)', link: '/reviews/wgetcloud' },
            { text: '白月光 (79国小众节点·季付66元)', link: '/reviews/baiyueguang' },
            { text: 'FlyingBird (全专线IPLC·无倍率)', link: '/reviews/flyingbird' },
            { text: 'CyberGuard (32元350G·欧美高速)', link: '/reviews/cyberguard' },
            { text: '龙猫云 / FATCAT / TNTCloud', link: '/reviews/longmaoyun' },
            { text: '青云梯 / 山水云 / 灵动云', link: '/reviews/qingyunti' },
            { text: '浪网 / EdgeNova / 萤火虫 / sslar', link: '/reviews/langwang' }
          ]
        }
      ],
      '/free-nodes/': [
        {
          text: '免费节点专题矩阵',
          items: [
            { text: '2026 免费节点全景与安全边界', link: '/free-nodes/' },
            { text: '免费公共代理三大致命陷阱', link: '/free-nodes/risks' },
            { text: '应急订阅提取与平替方案', link: '/free-nodes/emergency' }
          ]
        }
      ],
      '/trials/': [
        {
          text: '免费试用与尝鲜矩阵',
          items: [
            { text: '42 家机场免费试用白名单', link: '/trials/' },
            { text: '1 元及小额体验包防坑指南', link: '/trials/low-cost-trial' },
            { text: '试用期 MTR 专线验真 SOP', link: '/trials/verification-sop' }
          ]
        }
      ],
      '/warning/': [
        {
          text: '跑路预警与防失联矩阵',
          items: [
            { text: '机场跑路预警中心总览', link: '/warning/' },
            { text: '机场跑路前兆 10 大红线检测', link: '/warning/danger-signals' },
            { text: '主备双梯 1 秒避难容灾守则', link: '/warning/disaster-recovery' }
          ]
        }
      ],
      '/faq/': [
        {
          text: '机场权威问答知识库',
          items: [
            { text: '机场问答知识库 (GEO/AEO 图谱)', link: '/faq/' },
            { text: '节点报错与连通性排错 FAQ', link: '/faq/errors-troubleshooting' },
            { text: '协议与专线原理解惑 FAQ', link: '/faq/protocols-lines' },
            { text: '客户端与全平台配置 FAQ', link: '/faq/clients-configs' }
          ]
        }
      ],
      '/clients/': [
        {
          text: '客户端下载与配置中心',
          items: [
            { text: '2026 全平台客户端导航', link: '/clients/' },
            { text: 'Windows (Clash Verge Rev)', link: '/clients/windows' },
            { text: 'macOS (Apple Silicon 专属)', link: '/clients/macos' },
            { text: 'iOS (Shadowrocket 小火箭)', link: '/clients/ios' },
            { text: 'Android (v2rayNG / FlClash)', link: '/clients/android' },
            { text: '软路由 (OpenClash 透明网关)', link: '/clients/openwrt' }
          ]
        }
      ],
      '/protocols/': [
        {
          text: '代理协议与抗封锁技术',
          items: [
            { text: '代理协议全景技术解构', link: '/protocols/' },
            { text: 'VLESS XTLS-Reality 终极伪装', link: '/protocols/vless-reality' },
            { text: 'IEPL vs IPLC 专线内网原理解密', link: '/protocols/iepl-iplc' },
            { text: 'Shadowsocks / Trojan 演进史', link: '/protocols/shadowsocks-trojan' }
          ]
        }
      ],
      '/scenarios/': [
        {
          text: '场景选型知识库',
          items: [
            { text: '场景选型总览', link: '/scenarios/' },
            { text: 'ChatGPT / Claude 原生 IP 选型', link: '/scenarios/ai-tools' },
            { text: 'Netflix / Disney+ 4K 串流解锁', link: '/scenarios/streaming' },
            { text: '晚高峰稳定性与抗拥堵压测', link: '/scenarios/peak-hours' }
          ]
        }
      ],
      '/observatory/': [
        {
          text: '知识图谱与网络观测台',
          items: [
            { text: '网络观测台首页', link: '/observatory/' },
            { text: '16+ 机场实测测速报告汇编', link: '/observatory/speedtest-reports' },
            { text: '跨境网络核心术语字典 (Glossary)', link: '/observatory/network-glossary' }
          ]
        }
      ]
    },
    footer: {
      message: 'Amy博客 (AmyTelecom.world) · 专业跨境网络可观测性平台 | <a href="/about">关于我们</a> · <a href="/editorial-standards">评测方法论 (E-E-A-T)</a> · <a href="/affiliate-disclosure">推广披露声明</a>',
      copyright: 'Copyright © 2026 AmyTelecom Lab. All rights reserved. 六大专题 SEO/GEO 权威知识矩阵'
    }
  }
})
