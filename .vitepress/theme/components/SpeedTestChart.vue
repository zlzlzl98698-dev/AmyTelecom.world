<template>
  <div class="speedtest-observatory">
    <div class="chart-header">
      <div class="chart-title">
        <span class="icon">🌐</span>
        <span>{{ brandName }} 节点测速基准报告</span>
      </div>
      <div class="chart-meta">
        <span class="meta-tag">{{ testEnv || 'MAI-TEST-BOT 2.0 / 晚高峰实测' }}</span>
        <span class="meta-date">{{ testDate || '2026-10-19' }}</span>
      </div>
    </div>

    <div class="chart-body">
      <div class="node-row" v-for="(node, idx) in nodes" :key="idx">
        <div class="node-info">
          <span class="node-status-dot" :class="node.status || 'good'"></span>
          <span class="node-name">{{ node.name }}</span>
          <span class="node-latency">延迟: {{ node.ping }}</span>
          <span class="node-speed">下载: {{ node.speed }}</span>
        </div>
        <div class="node-bar-track">
          <div 
            class="node-bar-fill" 
            :style="{ width: node.percentage + '%' }"
            :class="node.status || 'good'"
          ></div>
        </div>
      </div>
    </div>

    <div class="chart-footer">
      <div class="summary-line">
        <span>汇总指标：平均延迟 {{ avgLatency || '48ms' }}</span>
        <span>| 最高下载 {{ maxSpeed || '529 Mbps' }}</span>
        <span>| 丢包率 0%</span>
      </div>
      <div class="signature">[AmyTelecom Lab · Observatory]</div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface NodeItem {
  name: string
  ping: string
  speed: string
  percentage: number
  status?: 'good' | 'medium' | 'bad'
}

withDefaults(defineProps<{
  brandName: string
  testEnv?: string
  testDate?: string
  avgLatency?: string
  maxSpeed?: string
  nodes?: NodeItem[]
}>(), {
  nodes: () => [
    { name: '香港 IEPL 01 (优选专线)', ping: '22ms', speed: '529 Mbps', percentage: 95, status: 'good' },
    { name: '日本 东京 01 (BGP专线)', ping: '57ms', speed: '135 Mbps', percentage: 70, status: 'good' },
    { name: '新加坡 01 (亚太核心)', ping: '46ms', speed: '387 Mbps', percentage: 85, status: 'good' },
    { name: '台湾 01 (流媒体原生)', ping: '41ms', speed: '114 Mbps', percentage: 65, status: 'good' },
    { name: '美国 洛杉矶 (跨境优化)', ping: '143ms', speed: '18 Mbps', percentage: 35, status: 'medium' }
  ]
})
</script>

<style scoped>
.speedtest-observatory {
  background: #090d16;
  border: 1px solid #1e293b;
  border-radius: 10px;
  padding: 1.25rem;
  margin: 1.5rem 0;
  color: #e2e8f0;
  font-family: var(--amy-font-mono);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #1e293b;
  padding-bottom: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.chart-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 0.95rem;
  color: #38bdf8;
}

.chart-meta {
  font-size: 0.75rem;
  color: #94a3b8;
  display: flex;
  gap: 0.75rem;
}

.node-row {
  margin-bottom: 1rem;
}

.node-info {
  display: flex;
  align-items: center;
  font-size: 0.825rem;
  margin-bottom: 0.35rem;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.node-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.node-status-dot.good {
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
}

.node-status-dot.medium {
  background: #f59e0b;
  box-shadow: 0 0 8px #f59e0b;
}

.node-name {
  font-weight: 600;
  color: #f8fafc;
}

.node-latency {
  color: #94a3b8;
}

.node-speed {
  color: #38bdf8;
  font-weight: 600;
}

.node-bar-track {
  width: 100%;
  height: 6px;
  background: #1e293b;
  border-radius: 3px;
  overflow: hidden;
}

.node-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.8s ease;
}

.node-bar-fill.good {
  background: linear-gradient(90deg, #10b981, #06b6d4);
}

.node-bar-fill.medium {
  background: linear-gradient(90deg, #f59e0b, #fbbf24);
}

.chart-footer {
  border-top: 1px solid #1e293b;
  padding-top: 0.75rem;
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: #64748b;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.signature {
  color: #3b82f6;
  font-weight: 600;
}
</style>
