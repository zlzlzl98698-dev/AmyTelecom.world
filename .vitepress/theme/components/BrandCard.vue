<template>
  <div class="brand-card" :class="{ 'top-recommended': brand.isTop }">
    <div class="brand-header">
      <div class="brand-title-wrap">
        <span class="rank-badge">#{{ brand.rank }}</span>
        <h3 class="brand-name">
          <a :href="'/reviews/' + brand.slug">{{ brand.name }}</a>
        </h3>
        <span v-if="brand.isTop" class="top-tag">首选主推</span>
      </div>
      <div class="status-wrap">
        <span class="status-badge" :class="brand.dataStatus">
          <span class="status-dot"></span>
          {{ brand.dataStatus === 'measured' ? '实测验证' : (brand.dataStatus === 'vendor' ? '品牌资料' : '待核实') }}
        </span>
      </div>
    </div>

    <p class="brand-desc">{{ brand.description }}</p>

    <div class="brand-specs-grid">
      <div class="spec-item">
        <span class="spec-label">起步价格</span>
        <span class="spec-value price-highlight">{{ brand.startPrice }}</span>
      </div>
      <div class="spec-item">
        <span class="spec-label">线路架构</span>
        <span class="spec-value">{{ brand.lineType }}</span>
      </div>
      <div class="spec-item">
        <span class="spec-label">测速表现</span>
        <span class="spec-value text-accent">{{ brand.downloadSpeed }}</span>
      </div>
      <div class="spec-item">
        <span class="spec-label">优惠码</span>
        <span class="spec-value code-pill">{{ brand.coupon }}</span>
      </div>
    </div>

    <div class="brand-feature-row">
      <span class="feature-tag" v-for="(p, i) in brand.protocols" :key="i">{{ p }}</span>
      <span class="feature-tag">{{ brand.billingCycle }}</span>
      <span v-if="brand.speedtestImage" class="feature-tag measured-tag">含测速实测图</span>
    </div>

    <div class="brand-actions">
      <a :href="'/reviews/' + brand.slug" class="cta-button secondary">
        深度评测详情
      </a>
      <a 
        v-if="brand.affUrl && brand.affUrl !== '#'"
        :href="brand.affUrl" 
        target="_blank" 
        rel="nofollow sponsored noopener" 
        class="cta-button primary"
      >
        直达官网开通 &rarr;
      </a>
      <a 
        v-else
        :href="'/reviews/' + brand.slug" 
        class="cta-button primary"
      >
        查看专线评测 &rarr;
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BrandItem } from '../../data/brands'

defineProps<{
  brand: BrandItem
}>()
</script>

<style scoped>
.brand-card {
  background: var(--amy-bg-card);
  border: 1px solid var(--amy-border-card);
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1.25rem;
  transition: all 0.2s ease;
}

.brand-card:hover {
  border-color: var(--amy-primary);
  box-shadow: 0 8px 16px -4px rgba(37, 99, 235, 0.12);
}

.brand-card.top-recommended {
  border: 2px solid var(--amy-primary);
  background: linear-gradient(180deg, rgba(37, 99, 235, 0.03) 0%, transparent 100%);
}

.brand-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.brand-title-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.rank-badge {
  font-family: var(--amy-font-mono);
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--amy-text-muted);
  background: rgba(0, 0, 0, 0.05);
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
}

.brand-name {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
}

.brand-name a {
  color: inherit;
  text-decoration: none;
}

.brand-name a:hover {
  color: var(--amy-primary);
}

.top-tag {
  background: linear-gradient(135deg, #ef4444 0%, #f97316 100%);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}

.brand-desc {
  font-size: 0.875rem;
  color: var(--amy-text-muted);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.brand-specs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 0.75rem;
  background: rgba(0, 0, 0, 0.02);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.dark .brand-specs-grid {
  background: rgba(255, 255, 255, 0.02);
}

.spec-item {
  display: flex;
  flex-direction: column;
}

.spec-label {
  font-size: 0.75rem;
  color: var(--amy-text-muted);
  margin-bottom: 0.2rem;
}

.spec-value {
  font-size: 0.875rem;
  font-weight: 600;
  font-family: var(--amy-font-mono);
}

.price-highlight {
  color: #ef4444;
  font-weight: 700;
}

.text-accent {
  color: #10b981;
}

.code-pill {
  background: rgba(37, 99, 235, 0.1);
  color: var(--amy-primary);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  display: inline-block;
  font-size: 0.8rem;
}

.brand-feature-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.feature-tag {
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  color: var(--amy-text-muted);
}

.dark .feature-tag {
  background: rgba(255, 255, 255, 0.05);
}

.measured-tag {
  background: rgba(16, 185, 129, 0.12);
  color: #10b981;
  font-weight: 600;
}

.brand-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}
</style>
