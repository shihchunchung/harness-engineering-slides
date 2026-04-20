<script setup lang="ts">
import SlideFrame from '../components/SlideFrame.vue'
import StickyPipeline from '../components/StickyPipeline.vue'
import { meta } from '../slides'
import { pipelines } from '../pipelines'
</script>

<template>
  <SlideFrame v-bind="meta['15']">
    <div class="layout">
      <div class="col-left">
        <div class="inline-pipeline">
          <StickyPipeline :config="pipelines['15']" />
        </div>
      </div>

      <div class="col-right">
        <p>
          plan agent 同時做兩件事：探索 codebase、設計實作。探索會帶回大量原始搜尋結果，把 context 塞到失焦，反而傷害設計品質。
        </p>

        <h2 class="s">拆出 plan-explorer</h2>
        <p>
          把探索獨立成 plan-explorer，限制唯讀工具（<code>Read</code>、<code>Grep</code>、<code>Glob</code>），不做設計判斷，只回傳帶 <code>filepath:line</code> 引用的精簡摘要。原始探索內容留在它自己的 context，不污染 parent。這是 sub-agent 的本質用途：作為 <strong>context firewall</strong>，parent 只看到必要的結論，而不是過程中所有的嘗試與雜訊。
        </p>

        <h2 class="s">reviewer 拆成兩個並行</h2>
        <p>
          Plan review agent 有類似問題：要同時檢查慣例合規、spec 覆蓋、結構合理性。什麼都看的結果是什麼都看不深。拆成兩個並行的 reviewer：plan-reviewer 對照 convention 與 repo 既有 pattern 檢查慣例，spec-compliance-reviewer 對照 spec 檢查覆蓋率。兩個 reviewer 視角獨立、互不重疊，並行執行不增加等待時間。
        </p>

        <h2 class="s">Agents</h2>
        <table class="agents">
          <thead>
            <tr>
              <th>Agent</th>
              <th>職責</th>
              <th>備註</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>plan-explorer</code></td>
              <td>探索 codebase 並回傳摘要</td>
              <td>限唯讀工具，不做設計判斷</td>
            </tr>
            <tr>
              <td><code>plan agent</code></td>
              <td>純設計實作</td>
              <td>透過 plan-explorer 摘要看 codebase</td>
            </tr>
            <tr>
              <td><code>plan-reviewer</code></td>
              <td>檢查慣例合規</td>
              <td>不讀 spec</td>
            </tr>
            <tr>
              <td><code>spec-compliance-reviewer</code></td>
              <td>檢查 spec 覆蓋率</td>
              <td>範圍 plan + spec</td>
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
  grid-template-columns: minmax(0, 460px) minmax(0, 1fr);
  gap: 48px;
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
  font-size: 13.5px;
}
.agents th {
  text-align: left;
  padding: 8px 14px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-subtle);
  border-bottom: 1px solid var(--border);
  font-weight: 500;
}
.agents td {
  padding: 8px 14px;
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
}

@media (max-width: 1100px) {
  .layout {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}
</style>
