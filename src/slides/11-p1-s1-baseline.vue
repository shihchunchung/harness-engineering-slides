<script setup lang="ts">
import SlideFrame from '../components/SlideFrame.vue'
import StickyPipeline from '../components/StickyPipeline.vue'
import { meta } from '../slides'
import { pipelines } from '../pipelines'
</script>

<template>
  <SlideFrame v-bind="meta['11']">
    <div class="layout">
      <div class="col-left">
        <div class="inline-pipeline">
          <StickyPipeline :config="pipelines['11']" />
        </div>
      </div>

      <div class="col-right">
        <p>
          大多數人用 coding agent 的起點：開 plan mode，輸入 task，agent 產出 plan，人工審查，通過後進入實作。搭配一份 CLAUDE.md 提供 repo 層級規則。
        </p>

        <p>
          單一 agent 從頭做到尾，需求理解、規劃、實作、驗證共用同一條 context；沒有中間 artifact，狀態只存在於對話裡；品質控制完全靠人工，CLAUDE.md 是唯一的 guide 卻沒機制驗證是否被遵守。
        </p>

        <div class="problems">
          <div class="problems-head">這樣的狀態下，幾類固定問題會反覆出現</div>
          <ul>
            <li>Task 表達不精確時，agent 用自己的假設補齊，方向歪掉但看起來合理</li>
            <li>Plan 的結構與粒度每次不同，難以比較與審查</li>
            <li>規劃、實作、驗證共享推理鏈，前段盲點後段繼承且無法被抓到</li>
            <li>Context 後期膨脹失焦，甚至開始 hallucinate</li>
          </ul>
        </div>

        <p class="foot">後續 step 是為了回應這些問題。</p>
      </div>
    </div>
  </SlideFrame>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: minmax(0, 220px) minmax(0, 1fr);
  gap: 56px;
  align-items: start;
}
.col-left,
.col-right {
  min-width: 0;
}
.col-right {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.col-right p {
  margin: 0 0 12px;
}
.problems {
  padding: 14px 18px;
  border: 1px solid var(--border);
  background: var(--bg-elevated);
  border-radius: var(--radius);
  margin: 6px 0 12px;
}
.problems-head {
  color: var(--text);
  margin-bottom: 6px;
  font-weight: 500;
}
.problems ul {
  margin: 0;
  padding-left: 1.4em;
  color: #cfd3db;
}
.foot {
  color: var(--text-muted);
  margin-top: 4px !important;
}

@media (max-width: 1100px) {
  .layout {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}
</style>
