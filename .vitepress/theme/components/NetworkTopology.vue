<template>
  <div class="topology-wrapper">
    <div class="topology-header">
      <span class="icon">🗺️</span>
      <span class="title">{{ brandName }} 专线网络传输拓扑示意</span>
      <span class="badge">Network Path Observatory</span>
    </div>
    <div class="topology-body">
      <div class="topo-node client-node">
        <div class="node-icon">💻 / 📱</div>
        <div class="node-text">用户本地终端</div>
        <div class="node-sub">Clash / 小火箭 / 软路由</div>
      </div>

      <div class="topo-line">
        <span class="line-label">加密隧道传输</span>
        <div class="arrow">&rarr;</div>
      </div>

      <div class="topo-node ingress-node">
        <div class="node-icon">🏢</div>
        <div class="node-text">国内入口 (BGP多线)</div>
        <div class="node-sub">上海/广州/深圳 优质调度</div>
      </div>

      <div class="topo-line premium-line">
        <span class="line-label highlight">★ {{ lineType || 'IEPL 专线直连' }} (不过GFW公网)</span>
        <div class="arrow">&DoubleRightArrow;</div>
      </div>

      <div class="topo-node egress-node">
        <div class="node-icon">🌐</div>
        <div class="node-text">海外落地出口</div>
        <div class="node-sub">香港/东京/新加坡/美西</div>
      </div>

      <div class="topo-line">
        <span class="line-label">原生住宅/商宽IP</span>
        <div class="arrow">&rarr;</div>
      </div>

      <div class="topo-node target-node">
        <div class="node-icon">🚀</div>
        <div class="node-text">目标互联网服务</div>
        <div class="node-sub">ChatGPT / 奈飞 / 4K 油管</div>
      </div>
    </div>
    <div class="topology-footer">
      <span>传输优势：全程内网专线封闭传输，杜绝公网 QoS 波动与高墙丢包</span>
      <span class="security-tag">[高可用 SLA 99.9%]</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  brandName: string
  lineType?: string
}>()
</script>

<style scoped>
.topology-wrapper {
  background: #090d16;
  border: 1px solid #1e293b;
  border-radius: 10px;
  padding: 1.25rem;
  margin: 1.5rem 0;
  color: #e2e8f0;
  font-family: var(--amy-font-mono);
}

.topology-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: #38bdf8;
  border-bottom: 1px solid #1e293b;
  padding-bottom: 0.75rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}

.badge {
  font-size: 0.75rem;
  color: #64748b;
  margin-left: auto;
}

.topology-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 1rem 0;
}

.topo-node {
  background: #111827;
  border: 1px solid #1f2937;
  border-radius: 8px;
  padding: 0.75rem 0.5rem;
  text-align: center;
  min-width: 110px;
  flex-shrink: 0;
}

.node-icon {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}

.node-text {
  font-size: 0.8rem;
  font-weight: 700;
  color: #f8fafc;
}

.node-sub {
  font-size: 0.675rem;
  color: #94a3b8;
  margin-top: 0.2rem;
}

.topo-line {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  padding: 0 0.25rem;
}

.line-label {
  font-size: 0.65rem;
  color: #64748b;
  margin-bottom: 0.2rem;
  white-space: nowrap;
}

.line-label.highlight {
  color: #10b981;
  font-weight: 700;
}

.arrow {
  font-size: 1.1rem;
  color: #38bdf8;
}

.premium-line .arrow {
  color: #10b981;
  font-weight: 900;
}

.topology-footer {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #1e293b;
  padding-top: 0.75rem;
  margin-top: 1rem;
  font-size: 0.75rem;
  color: #64748b;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.security-tag {
  color: #10b981;
}
</style>
