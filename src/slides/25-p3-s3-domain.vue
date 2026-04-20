<script setup lang="ts">
import SlideFrame from '../components/SlideFrame.vue'
import StickyPipeline from '../components/StickyPipeline.vue'
import { meta } from '../slides'
import { pipelines } from '../pipelines'
</script>

<template>
  <SlideFrame v-bind="meta['25']">
    <div class="layout">
      <div class="col-left">
        <div class="inline-pipeline">
          <StickyPipeline :config="pipelines['25']" />
        </div>
      </div>

      <div class="col-right">
        <p>
          brief 往往以 UI 或功能描述為主：「使用者可以在列表頁看到所有訂單，點擊後進入詳情頁」。spec-from-brief 若直接從這段描述推 API，很容易把 UI 結構當成領域模型：列表頁對應 <code>GET /orders</code>，詳情頁對應 <code>GET /orders/:id</code>，就結束了。
        </p>
        <p>
          但真實的 domain 可能更複雜（訂單有狀態機、和使用者/商品/付款有關聯、某些 query 是跨 entity 的），這些在 UI 為中心的思路下會被扁平化成一堆瑣碎 endpoint。
        </p>

        <h2 class="s">插入 domain-extractor 作為前置步驟</h2>
        <p>
          拿到 brief 和 codebase 摘要後，先識別 domain concepts：
        </p>
        <ul class="concepts">
          <li>核心 entity 是什麼</li>
          <li>它們的狀態怎麼轉移</li>
          <li>entity 之間有哪些關聯</li>
          <li>哪些操作是跨 entity 的</li>
        </ul>
        <p>
          把這些明確寫下來後，spec-from-brief 才從 domain 模型推導 API 和 resource schema。
        </p>

        <h2 class="s">性質與前幾步不同</h2>
        <p>
          前面幾個 step 主要在切分既有流程與隔離推理來源，這一步在 spec-from-brief 之前新增一個前置分析步驟。它決定 agent 應該先想什麼、再想什麼：「<strong>先想 domain，再想 API</strong>」。這個順序寫進 pipeline 結構，不需要 agent 自己記得遵守。
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
              <td><code>domain-extractor</code></td>
              <td>從 brief + codebase 摘要識別 domain concepts（entity、狀態、關聯）</td>
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

.concepts {
  margin: 6px 0 12px;
  padding: 12px 18px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.concepts li {
  padding-left: 18px;
  position: relative;
  color: #cfd3db;
  font-size: 14px;
  line-height: 1.6;
}
.concepts li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 12px;
  width: 10px;
  height: 1px;
  background: var(--accent);
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
}
</style>
