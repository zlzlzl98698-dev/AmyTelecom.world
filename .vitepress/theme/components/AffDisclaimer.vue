<template>
  <div class="aff-disclaimer-box">
    <div class="disclaimer-header">
      <span class="icon">⚖️</span>
      <strong>Amy博客 · 透明推广与实测免责声明</strong>
    </div>
    <div class="disclaimer-content">
      本站部分链接包含服务商推广代码（Affiliate Link）。若您通过本站链接注册并购买，本站可能会获得少许维护佣金，但这<strong>绝不会增加您支付的实际价格</strong>，部分机场通过专属优惠码（如光速云优惠码 <code>AMM</code>）还可获得独家折上折优惠。
      本站所有测速与解锁评测基于客观实验数据（<code>dataStatus: measured</code>）或商家公开资料（<code>dataStatus: vendor</code>），不代表对服务商长期运营的绝对担保，建议新用户优先选择月付或小额周期试用。
    </div>
  </div>
</template>

<style scoped>
.aff-disclaimer-box {
  background: rgba(37, 99, 235, 0.04);
  border: 1px dashed rgba(37, 99, 235, 0.3);
  border-radius: 8px;
  padding: 1rem 1.25rem;
  margin: 1.5rem 0;
  font-size: 0.825rem;
  line-height: 1.6;
  color: var(--amy-text-muted);
}

.disclaimer-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  color: var(--amy-primary);
  margin-bottom: 0.5rem;
}

code {
  background: rgba(37, 99, 235, 0.1);
  color: var(--amy-primary);
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  font-family: var(--amy-font-mono);
}
</style>
