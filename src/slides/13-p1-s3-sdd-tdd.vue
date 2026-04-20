<script setup lang="ts">
import SlideFrame from '../components/SlideFrame.vue'
import StickyPipeline from '../components/StickyPipeline.vue'
import { meta } from '../slides'
import { pipelines } from '../pipelines'
</script>

<template>
  <SlideFrame v-bind="meta['13']">
    <div class="layout">
      <div class="col-left">
        <div class="inline-pipeline">
          <StickyPipeline :config="pipelines['13']" />
        </div>
      </div>

      <div class="col-right">
        <p>
          讓 agent 寫對的前提有兩個：<strong>agent 真的理解要做什麼</strong>，以及 <strong>agent 的實作真的通過驗證</strong>。SDD 和 TDD 分別處理這兩件事。它們不是新概念（在傳統軟體工程裡已經存在幾十年），但套在 coding agent 上時，性質變了。
        </p>

        <h2 class="s">SDD 處理前者</h2>
        <p>
          Task 是自然語言，天生不精確。人類工程師會帶著領域知識把模糊處補完；agent 沒有這層過濾，會把歧義用自己的假設悄悄補齊，產出看起來結構完整、卻悄悄偏離行為契約的程式碼。
        </p>
        <p>
          把需求理解外部化成 spec 並由人工審查，agent 的理解和實作設計走兩條獨立推理鏈。上游錯誤在源頭就能被抓，不會被放大到下游。Spec 同時能跨 session 存活，對抗長期任務下的 intent drift。
        </p>

        <h2 class="s">TDD 處理後者</h2>
        <p>
          Agent 聲稱完成卻未必真通過測試：不是惰性，而是沒有機械式的「完成」判準。更糟的是，若 agent 可以同時改實作和改測試，它會傾向把測試寫成能通過（事後合理化），測試反而失去驗證力。把測試放在實作之前，測試結果就成為判斷實作完成的 <strong>computational sensor</strong>，不再靠 agent 自己說「做完了」。
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
              <td><code>spec agent</code></td>
              <td>把 task 寫成 spec</td>
            </tr>
          </tbody>
        </table>

        <p class="foot">
          TDD 的具體執行結構留到 <code>Part 2 / Step 6</code> 的 <code>tdd-composer</code> 展開：RED → GREEN（多輪）→ Simplify。
        </p>
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
  width: 180px;
  color: var(--text);
}

.foot {
  color: var(--text-muted);
  font-size: 14px;
  margin-top: 14px;
}

@media (max-width: 1100px) {
  .layout {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}
</style>
