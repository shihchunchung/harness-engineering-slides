<script setup lang="ts">
import SlideFrame from '../components/SlideFrame.vue'
import { meta } from '../slides'
</script>

<template>
  <SlideFrame v-bind="meta['07']">
    <p>
      跨 context window 的持續工作必須靠模型外的持久檔案。若不把瞬時推理外部化，下個 session 就無法從 clean state 接手。具體做法：
    </p>

    <ul class="approaches">
      <li>
        <strong>Anthropic：feature list JSON + progress file + git 三件套</strong>
        <span>
          比較 canonical 的組合——JSON 限制 agent 只能改 <code>passes</code> 欄位，防止亂改結構
        </span>
      </li>
      <li>
        <strong>LangChain：Ralph Loop + filesystem-backed continuation</strong>
        <span>
          走得更激進，每次迭代清空 context、靠檔案系統重建連續性
        </span>
      </li>
      <li>
        <strong>Red Hat：Repository Impact Map</strong>
        <span>
          從分析側切入，從 codebase 實際產出 single source of truth，讓規劃和實作階段共用同一份事實基礎
        </span>
      </li>
    </ul>
  </SlideFrame>
</template>

<style scoped>
.approaches {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.approaches li {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
.approaches strong {
  color: var(--accent);
  font-weight: 500;
  font-size: 14.5px;
}
.approaches span {
  color: #cfd3db;
  font-size: 14.5px;
  line-height: 1.7;
}
</style>
