<script setup lang="ts">
import SlideFrame from '../components/SlideFrame.vue'
import StickyPipeline from '../components/StickyPipeline.vue'
import { meta } from '../slides'
import { pipelines } from '../pipelines'
</script>

<template>
  <SlideFrame v-bind="meta['19']">
    <div class="layout">
      <div class="col-left">
        <div class="inline-pipeline">
          <StickyPipeline :config="pipelines['19']" />
        </div>
      </div>

      <div class="col-right">
        <p>
          好的 testcases 大致圍繞兩件事：<strong>獨立於被驗證的對象</strong>、<strong>覆蓋 spec 的完整行為</strong>。這兩個性質形塑了 testcase 側的設計。
        </p>

        <h2 class="s">獨立性的真理來源是 spec，不是 plan</h2>
        <p>
          若 testcases 從 plan 推導，一旦 plan 誤解某個需求，testcases 容易跟著這個誤解走。測試通過了、需求卻沒滿足。testcases agent 因此直接從 spec 推導，不讀 plan；plan 和 testcases 成為 spec 的兩個獨立衍生物，任一方有盲點時另一方有機會捕捉。驗證獨立性從 prompt-level 的期待升級到 <strong>pipeline-level 的結構強制</strong>。
        </p>

        <h2 class="s">「不讀 plan」寫成絕對禁令</h2>
        <p>
          這個區別很重要：若只是「建議不讀」，agent 在探索 codebase 時會繞回去讀 plan「參考一下」，獨立性就破了。允許讀 exploration 摘要但禁止讀 plan。
        </p>

        <div class="contrast">
          <div class="side allow">
            <div class="side-head">允許</div>
            <div class="side-body">exploration 摘要（codebase facts，中性）</div>
          </div>
          <div class="side deny">
            <div class="side-head">禁止</div>
            <div class="side-body">plan（design decisions，會污染獨立判斷）</div>
          </div>
        </div>
      </div>
    </div>
  </SlideFrame>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: minmax(0, 240px) minmax(0, 1fr);
  gap: 56px;
  align-items: start;
}
.col-left,
.col-right {
  min-width: 0;
}
.col-right p {
  margin: 0 0 10px;
}

.contrast {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 14px;
}
.side {
  padding: 14px 18px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
.side.allow {
  border-left: 3px solid var(--accent);
}
.side.deny {
  border-left: 3px solid var(--text-dim);
}
.side-head {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 6px;
  font-weight: 500;
}
.side.allow .side-head {
  color: var(--accent);
}
.side.deny .side-head {
  color: var(--text-muted);
}
.side-body {
  color: #cfd3db;
  font-size: 14px;
  line-height: 1.6;
}

@media (max-width: 1100px) {
  .layout {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .contrast {
    grid-template-columns: 1fr;
  }
}
</style>
