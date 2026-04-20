<script setup lang="ts">
import SlideFrame from '../components/SlideFrame.vue'
import StickyPipeline from '../components/StickyPipeline.vue'
import { meta } from '../slides'
import { pipelines } from '../pipelines'
</script>

<template>
  <SlideFrame v-bind="meta['23']">
    <div class="layout">
      <div class="col-left">
        <div class="inline-pipeline">
          <StickyPipeline :config="pipelines['23']" />
        </div>
      </div>

      <div class="col-right">
        <h2 class="s">第一件事：spec-explorer 獨立</h2>
        <p>
          把 spec agent 的探索職責拆出來，獨立成 spec-explorer。它和 plan-explorer 扮演同樣的 <strong>context firewall</strong> 角色：唯讀工具、不做生成判斷、只回傳帶 <code>filepath:line</code> 引用的摘要。Spec agent 從「邊探索邊寫 spec」變成「拿到乾淨的 codebase 摘要後再寫 spec」，context 不被搜尋結果污染，spec 品質更穩。
        </p>

        <h2 class="s">第二件事：引入 spec-reviewer</h2>
        <p>
          把 spec 的審查從純人工擴展為 agent + 人工。加入 spec-reviewer，對照 task 描述和 CLAUDE.md 檢查 spec 的完整性、結構、邏輯一致性。人工審查仍在但不再是唯一關卡。reviewer 先過濾明顯問題，人工聚焦在判斷性議題。
        </p>
        <p>
          spec → plan pipeline 的品質控制至此對稱，<strong>每個階段都有 agent reviewer + 人工 gate 的組合</strong>。
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
              <td><code>spec-explorer</code></td>
              <td>探索 codebase 並回傳摘要</td>
            </tr>
            <tr>
              <td><code>spec agent</code></td>
              <td>寫 spec</td>
            </tr>
            <tr>
              <td><code>spec-reviewer</code></td>
              <td>檢查 spec 完整性、結構、邏輯一致性</td>
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
