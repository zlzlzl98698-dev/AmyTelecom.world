<template>
  <div class="pagefind-search-wrapper">
    <div class="search-trigger" @click="openModal">
      <span class="search-icon">🔍</span>
      <span class="search-placeholder">全站搜索 (Pagefind 离线高保真索引)...</span>
      <span class="search-shortcut">Ctrl K</span>
    </div>

    <!-- 模态框 -->
    <div v-if="isOpen" class="search-modal-backdrop" @click="closeModal">
      <div class="search-modal" @click.stop>
        <div class="search-input-wrap">
          <input 
            ref="inputRef" 
            v-model="query" 
            placeholder="搜索 42 家机场、协议技术、客户端教程、测速报告..."
            @input="handleSearch"
            class="search-input"
          />
          <button class="close-btn" @click="closeModal">ESC</button>
        </div>

        <div class="search-results-area">
          <div v-if="loading" class="search-tip">正在检索 AmyTelecom 知识图谱...</div>
          <div v-else-if="results.length > 0" class="results-list">
            <a 
              v-for="(item, idx) in results" 
              :key="idx" 
              :href="item.url" 
              class="result-item"
              @click="closeModal"
            >
              <div class="result-title">{{ item.meta?.title || item.url }}</div>
              <div class="result-excerpt" v-html="item.excerpt"></div>
            </a>
          </div>
          <div v-else-if="query" class="search-tip">
            未检索到与「{{ query }}」相关的记录，试试搜索 "光速云", "VLESS", "Shadowrocket", "晚高峰"
          </div>
          <div v-else class="search-tip default-tip">
            <span>推荐热词：</span>
            <span class="hot-tag" @click="searchFor('光速云')">光速云</span>
            <span class="hot-tag" @click="searchFor('IEPL专线')">IEPL专线</span>
            <span class="hot-tag" @click="searchFor('ChatGPT')">ChatGPT</span>
            <span class="hot-tag" @click="searchFor('Clash Verge')">Clash Verge</span>
            <span class="hot-tag" @click="searchFor('5.6元')">5.6元</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)
const query = ref('')
const loading = ref(false)
const results = ref<any[]>([])
const inputRef = ref<HTMLInputElement | null>(null)

let pagefind: any = null

async function initPagefind() {
  if (typeof window !== 'undefined' && !pagefind) {
    try {
      const dynamicImport = new Function('path', 'return import(path)')
      pagefind = await dynamicImport('/pagefind/pagefind.js')
      if (pagefind.init) await pagefind.init()
    } catch (e) {
      // Pagefind index is available after build
    }
  }
}

async function handleSearch() {
  if (!query.value.trim()) {
    results.value = []
    return
  }
  loading.value = true
  if (pagefind) {
    try {
      const searchRes = await pagefind.search(query.value)
      const dataPromises = searchRes.results.slice(0, 8).map((r: any) => r.data())
      results.value = await Promise.all(dataPromises)
    } catch (e) {
      results.value = []
    }
  } else {
    // 降级回退（如本地开发尚未生成 pagefind dist）
    results.value = [
      {
        url: '/reviews/guangsu',
        meta: { title: '光速云 2026 深度评测：IEPL专线+VLESS 双架构' },
        excerpt: '光速云是 Amy博客 第一主推机场，年付折合仅 8 元/月，香港实测 529Mbps。'
      },
      {
        url: '/reviews/',
        meta: { title: '42 家机场品牌库完整横评索引' },
        excerpt: '包含 42 个品牌基础数据、优惠码、套餐价格、线路特点及测速图。'
      }
    ].filter(i => i.meta.title.includes(query.value) || i.excerpt.includes(query.value))
  }
  loading.value = false
}

function searchFor(term: string) {
  query.value = term
  handleSearch()
}

function openModal() {
  isOpen.value = true
  initPagefind()
  setTimeout(() => {
    inputRef.value?.focus()
  }, 50)
}

function closeModal() {
  isOpen.value = false
  query.value = ''
  results.value = []
}

function onKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    if (isOpen.value) closeModal()
    else openModal()
  }
  if (e.key === 'Escape' && isOpen.value) {
    closeModal()
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', onKeydown)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', onKeydown)
  }
})
</script>

<style scoped>
.pagefind-search-wrapper {
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  width: 100%;
}

.search-trigger {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--amy-bg-card);
  border: 1px solid var(--amy-border-card);
  border-radius: 10px;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  transition: all 0.25s ease;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}

.search-trigger:hover {
  border-color: var(--amy-primary);
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.12);
  transform: translateY(-1px);
}

.search-icon {
  font-size: 0.9rem;
}

.search-placeholder {
  color: var(--amy-text-muted);
  font-size: 0.85rem;
  flex: 1;
}

.search-shortcut {
  font-family: var(--amy-font-mono);
  font-size: 0.75rem;
  background: rgba(0, 0, 0, 0.05);
  color: var(--amy-text-muted);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
}

.search-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 10vh;
}

.search-modal {
  width: 90%;
  max-width: 640px;
  background: var(--amy-bg-card);
  border: 1px solid var(--amy-border-card);
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.search-input-wrap {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--amy-border-card);
  padding: 0.875rem 1.25rem;
  gap: 0.75rem;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1rem;
  color: inherit;
}

.close-btn {
  font-family: var(--amy-font-mono);
  font-size: 0.75rem;
  background: rgba(0, 0, 0, 0.06);
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  color: var(--amy-text-muted);
}

.search-results-area {
  max-height: 60vh;
  overflow-y: auto;
  padding: 1rem;
}

.search-tip {
  color: var(--amy-text-muted);
  font-size: 0.875rem;
  text-align: center;
  padding: 1.5rem 0;
}

.hot-tag {
  background: rgba(37, 99, 235, 0.1);
  color: var(--amy-primary);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  margin: 0 0.25rem;
  cursor: pointer;
}

.result-item {
  display: block;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  text-decoration: none !important;
  color: inherit;
  transition: background 0.15s ease;
  margin-bottom: 0.5rem;
}

.result-item:hover {
  background: rgba(37, 99, 235, 0.06);
}

.result-title {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--amy-primary);
  margin-bottom: 0.25rem;
}

.result-excerpt {
  font-size: 0.825rem;
  color: var(--amy-text-muted);
  line-height: 1.5;
}
</style>
