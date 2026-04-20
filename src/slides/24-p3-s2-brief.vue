<script setup lang="ts">
import SlideFrame from '../components/SlideFrame.vue'
import StickyPipeline from '../components/StickyPipeline.vue'
import { meta } from '../slides'
import { pipelines } from '../pipelines'
</script>

<template>
  <SlideFrame v-bind="meta['24']">
    <div class="layout">
      <div class="col-left">
        <div class="inline-pipeline">
          <StickyPipeline :config="pipelines['24']" />
        </div>
      </div>

      <div class="col-right">
        <p>
          spec agent 在這一步拆成兩個前後相接的 agent。Spec 生成前需要先和使用者對齊對 task 的理解：task 常有多處模糊或遺漏，若 agent 直接用自己的假設補齊後跳到完整 spec，使用者看到的是成品而不是「agent 理解到什麼」的中間狀態，審查時才發現方向偏掉就已經走了兩步回頭路。
        </p>

        <div class="split">
          <div class="side">
            <div class="side-head">brief-from-task · interactive</div>
            <p>
              主動追問 task 裡的模糊處（這個功能怎麼被使用、有哪些邊界條件、哪些 case 不需要支援），輸出一份確認過的 brief 送人工審查。
            </p>
          </div>
          <div class="side">
            <div class="side-head">spec-from-brief · generative</div>
            <p>
              拿到 brief 和 spec-explorer 的 codebase 摘要後一次產出完整 spec，不再需要猜任何事。
            </p>
          </div>
        </div>

        <p>
          這個拆分把「<strong>理解</strong>」和「<strong>設計</strong>」兩個階段明確分離：前者和人對話，後者從確認的輸入生成輸出。brief 也成為一份持久化的意圖記錄，跨 session 可以回看，減輕長期任務中的 intent drift。
        </p>

        <h2 class="s">Agents</h2>
        <table class="agents">
          <thead>
            <tr>
              <th>Agent</th>
              <th>職責</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>brief-from-task</code></td>
              <td>主動追問 task 模糊處，輸出 brief</td>
            </tr>
            <tr>
              <td><code>spec-from-brief</code></td>
              <td>從 brief + codebase 摘要產出 spec</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </SlideFrame>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: minmax(0, 260px) minmax(0, 1fr);
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

.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 6px 0 14px;
}
.side {
  padding: 14px 18px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  border-left: 3px solid var(--accent);
}
.side-head {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 12.5px;
  letter-spacing: 0.06em;
  color: var(--accent);
  font-weight: 500;
  margin-bottom: 6px;
}
.side p {
  margin: 0;
  color: #cfd3db;
  font-size: 14px;
  line-height: 1.65;
}

.agents {
  width: 100%;
  border-collapse: collapse;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  font-size: 14px;
}
.agents th {
  text-align: left;
  padding: 10px 16px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-subtle);
  border-bottom: 1px solid var(--border);
  font-weight: 500;
}
.agents td {
  padding: 10px 16px;
  border-bottom: 1px solid var(--border);
  color: #cfd3db;
  vertical-align: top;
}
.agents tr:last-child td {
  border-bottom: 0;
}
.agents td:first-child {
  color: var(--text);
  white-space: nowrap;
  width: 180px;
}

@media (max-width: 1100px) {
  .layout {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .split {
    grid-template-columns: 1fr;
  }
}
</style>
