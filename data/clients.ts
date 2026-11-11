// 2026 机场代理客户端大全
export interface ClientItem {
  name: string;
  platform: 'Windows' | 'macOS' | 'iOS' | 'Android' | 'Linux' | 'OpenWrt';
  core: string;
  features: string;
  recommendedRole: string;
  downloadUrl: string;
  isPopular: boolean;
}

export const clientsList: ClientItem[] = [
  // Windows
  { name: 'Clash Verge Rev', platform: 'Windows', core: 'Mihomo (Clash Meta)', features: '现代图形界面、规则分流、TUN模式、配置覆写', recommendedRole: 'Windows 首选主力', downloadUrl: 'https://github.com/clash-verge-rev/clash-verge-rev', isPopular: true },
  { name: 'v2rayN', platform: 'Windows', core: 'Xray / sing-box', features: '多协议支持、批量节点测速、路由规则丰富', recommendedRole: '高阶多协议玩家首选', downloadUrl: 'https://github.com/2dust/v2rayN', isPopular: true },
  { name: 'FlClash', platform: 'Windows', core: 'Mihomo', features: '极简设计、多平台UI一致、内存占用极低', recommendedRole: '轻量化极简首选', downloadUrl: 'https://github.com/chen08209/FlClash', isPopular: false },
  
  // macOS
  { name: 'Clash Verge Rev (Mac)', platform: 'macOS', core: 'Mihomo', features: '完美适配 Apple Silicon M1-M4 与 Intel、系统代理、TUN 网卡', recommendedRole: 'macOS 首选免费客户端', downloadUrl: 'https://github.com/clash-verge-rev/clash-verge-rev', isPopular: true },
  { name: 'Surge Mac', platform: 'macOS', core: '自研专有核心', features: '企业级抓包网络调试、毫秒级调度、PONTE穿透', recommendedRole: '专业开发者顶配付费首选', downloadUrl: 'https://nssurge.com', isPopular: true },

  // iOS
  { name: 'Shadowrocket (小火箭)', platform: 'iOS', core: 'Shadowrocket 引擎', features: '规则代理、节点测速、URL测试组、美区App Store易购买', recommendedRole: 'iPhone/iPad 必备装机首选', downloadUrl: 'https://apps.apple.com/us/app/shadowrocket/id932747118', isPopular: true },
  { name: 'Stash', platform: 'iOS', core: 'Clash 规则引擎', features: 'Clash YAML 完美兼容、重写脚本、精美控制面板', recommendedRole: 'iOS 端 Clash 方案替代', downloadUrl: 'https://stash.ws', isPopular: true },
  { name: 'Quantumult X (圈X)', platform: 'iOS', core: 'QX 核心', features: '强大脚本引擎、MITM 解密、精细分流', recommendedRole: '进阶极客玩法首选', downloadUrl: 'https://apps.apple.com', isPopular: false },

  // Android
  { name: 'v2rayNG', platform: 'Android', core: 'Xray', features: '成熟稳定、分应用代理、绕过大陆局域网', recommendedRole: '安卓装机普及率第一', downloadUrl: 'https://github.com/2dust/v2rayNG', isPopular: true },
  { name: 'FlClash (Android)', platform: 'Android', core: 'Mihomo', features: '现代 Material Design 3、规则切换丝滑', recommendedRole: '颜值党主力首选', downloadUrl: 'https://github.com/chen08209/FlClash', isPopular: true },

  // OpenWrt
  { name: 'OpenClash', platform: 'OpenWrt', core: 'Mihomo / Clash', features: '家庭软路由全屋透明代理、防 DNS 污染、主机独立分流', recommendedRole: '家庭及公司软路由终极方案', downloadUrl: 'https://github.com/vernesong/OpenClash', isPopular: true },
  { name: 'PassWall2', platform: 'OpenWrt', core: 'Xray / sing-box', features: '轻量高效、多节点分流叠加、备用故障自动转移', recommendedRole: '稳定型路由网关优选', downloadUrl: 'https://github.com/xiaorouji/openwrt-passwall', isPopular: true }
];
