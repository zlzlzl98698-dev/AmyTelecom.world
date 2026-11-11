<template>
  <div class="unlock-matrix-card">
    <div class="matrix-header">
      <div class="matrix-title">
        <span class="icon">🎬</span>
        <span>{{ brandName }} AI 生产力与流媒体服务可用性矩阵</span>
      </div>
      <span class="matrix-badge">Service Availability Matrix</span>
    </div>

    <div class="matrix-section-title">🤖 AI 生产力工具可用性</div>
    <div class="matrix-grid">
      <div class="service-box" :class="aiStatus.chatgpt ? 'available' : 'partial'">
        <div class="service-name">ChatGPT / OpenAI</div>
        <div class="service-status">{{ aiStatus.chatgpt ? '● 原生支持 / 无降级' : '▲ 需切换特定节点' }}</div>
      </div>
      <div class="service-box" :class="aiStatus.claude ? 'available' : 'partial'">
        <div class="service-name">Claude 3.5 Sonnet</div>
        <div class="service-status">{{ aiStatus.claude ? '● 原生支持 / 防封' : '▲ 部分支持' }}</div>
      </div>
      <div class="service-box" :class="aiStatus.gemini ? 'available' : 'partial'">
        <div class="service-name">Google Gemini</div>
        <div class="service-status">{{ aiStatus.gemini ? '● 原生支持' : '▲ 视节点地区而定' }}</div>
      </div>
    </div>

    <div class="matrix-section-title">🍿 海外流媒体串流解锁</div>
    <div class="matrix-grid">
      <div class="service-box" :class="streamStatus.netflix ? 'available' : 'partial'">
        <div class="service-name">Netflix 奈飞</div>
        <div class="service-status">{{ streamStatus.netflix ? '● 非自制剧全解锁' : '▲ 仅自制剧' }}</div>
      </div>
      <div class="service-box" :class="streamStatus.disney ? 'available' : 'partial'">
        <div class="service-name">Disney+ 迪士尼</div>
        <div class="service-status">{{ streamStatus.disney ? '● 全区 4K HDR' : '▲ 部分地区' }}</div>
      </div>
      <div class="service-box" :class="streamStatus.youtube ? 'available' : 'partial'">
        <div class="service-name">YouTube Premium</div>
        <div class="service-status">{{ streamStatus.youtube ? '● 4K60 极速秒开' : '▲ 1080P' }}</div>
      </div>
      <div class="service-box" :class="streamStatus.hbo ? 'available' : 'partial'">
        <div class="service-name">Max / HBO</div>
        <div class="service-status">{{ streamStatus.hbo ? '● 全区原生解锁' : '▲ 待核实' }}</div>
      </div>
      <div class="service-box" :class="streamStatus.tiktok ? 'available' : 'partial'">
        <div class="service-name">TikTok 国际版</div>
        <div class="service-status">{{ streamStatus.tiktok ? '● 跨区合规伪装' : '▲ 需拔卡' }}</div>
      </div>
      <div class="service-box" :class="streamStatus.spotify ? 'available' : 'partial'">
        <div class="service-name">Spotify 声飞</div>
        <div class="service-status">{{ streamStatus.spotify ? '● 全球免切区' : '▲ 受限' }}</div>
      </div>
    </div>

    <div class="matrix-footer">
      <span>测试工具: RegionRestrictionCheck & OpenAI Token Test</span>
      <span>数据状态: 实测/最新轮询确认</span>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  brandName: string
  aiStatus?: {
    chatgpt: boolean
    claude: boolean
    gemini: boolean
  }
  streamStatus?: {
    netflix: boolean
    disney: boolean
    youtube: boolean
    hbo: boolean
    tiktok: boolean
    spotify: boolean
  }
}>(), {
  aiStatus: () => ({ chatgpt: true, claude: true, gemini: false }),
  streamStatus: () => ({ netflix: true, disney: true, youtube: true, hbo: true, tiktok: true, spotify: true })
})
</script>

<style scoped>
.unlock-matrix-card {
  background: var(--amy-bg-card);
  border: 1px solid var(--amy-border-card);
  border-radius: 10px;
  padding: 1.25rem;
  margin: 1.5rem 0;
}

.matrix-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--amy-border-card);
  padding-bottom: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.matrix-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 0.95rem;
}

.matrix-badge {
  font-size: 0.75rem;
  font-family: var(--amy-font-mono);
  color: var(--amy-text-muted);
  background: rgba(0, 0, 0, 0.04);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.matrix-section-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--amy-text-muted);
  margin: 0.85rem 0 0.5rem;
}

.matrix-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
}

.service-box {
  border-radius: 8px;
  padding: 0.75rem;
  border: 1px solid var(--amy-border-card);
  background: rgba(0, 0, 0, 0.015);
  font-family: var(--amy-font-mono);
}

.service-box.available {
  border-color: rgba(16, 185, 129, 0.3);
  background: rgba(16, 185, 129, 0.03);
}

.service-box.partial {
  border-color: rgba(245, 158, 11, 0.3);
  background: rgba(245, 158, 11, 0.03);
}

.service-name {
  font-size: 0.825rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.service-status {
  font-size: 0.75rem;
}

.service-box.available .service-status {
  color: #10b981;
}

.service-box.partial .service-status {
  color: #f59e0b;
}

.matrix-footer {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--amy-text-muted);
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px dashed var(--amy-border-card);
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
