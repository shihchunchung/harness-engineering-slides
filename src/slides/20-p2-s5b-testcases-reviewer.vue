<script setup lang="ts">
import SlideFrame from '../components/SlideFrame.vue'
import StickyPipeline from '../components/StickyPipeline.vue'
import { meta } from '../slides'
import { pipelines } from '../pipelines'
</script>

<template>
  <SlideFrame v-bind="meta['20']">
    <div class="layout">
      <div class="col-left">
        <div class="inline-pipeline">
          <StickyPipeline :config="pipelines['20']" />
        </div>
      </div>

      <div class="col-right">
        <p>
          <strong>覆蓋完整受益於專門的 reviewer。</strong> testcases 寫出來後，若沒有外部審查，很難判斷「是不是漏了某個 spec 需求」或「這個測試是不是過度依賴 implementation detail」。加入 testcases-reviewer 對照 spec 檢查覆蓋率，對照 testcases-conventions 檢查測試品質。
        </p>
        <p>
          testcases-conventions.md 抽出作為共用 guide，testcases agent 和 testcases-reviewer 共同引用，和 plan 側的 plan-conventions 同樣邏輯。
        </p>

        <h2 class="s">反向品質閥：over-report 的防線</h2>
        <p>
          專門的 reviewer 有一個天生的風險：<strong>傾向 over-report</strong>，多提 finding 感覺比較「盡責」，實際上產生大量噪音。testcases-reviewer 在 prompt 裡明文列出「不該 flag 的項目」：
        </p>
        <ul class="no-flag">
          <li>不要 test framework 行為</li>
          <li>不要要求 per-field 組合測試</li>
          <li>一個 route group 一個 401 就夠</li>
          <li>不要 flag API 打不到的 DB scenario</li>
        </ul>
        <p>
          這是 inferential sensor 的反向品質閥，和 plan-challenger 的 self-check 三道門互相呼應：<strong>前者防止「不該 flag 的被 flag」，後者防止「該 dismiss 的被保留」</strong>。兩種機制一起撐住 inferential reviewer 的輸出可信度。
        </p>

        <h2 class="s">生產與審查分離</h2>
        <p>
          「獨立的 reviewer」做的是生產與審查分離，也避免了一個常見問題：讓 agent review 自己的產出通常不太有效，agent 在這種模式下容易合理化剛做過的選擇，難以捕捉生產時就存在的盲點。testcases-reviewer 和 testcases agent 讀的是同一份 spec 和 testcases-conventions，但關注面向不同：生產者想的是「怎麼寫出涵蓋需求的 testcases」，reviewer 想的是「這組 testcases 漏了什麼、有什麼問題」。差異來自 prompt 框架而不是資料差異，相當於強迫同樣的材料被兩種心智模式各看一遍。
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
              <td><code>testcases agent</code></td>
              <td>從 spec 推導 testcases</td>
              <td>禁讀 plan</td>
            </tr>
            <tr>
              <td><code>testcases-reviewer</code></td>
              <td>檢查 spec 覆蓋率與測試品質</td>
              <td>明列「不該 flag 的項目」</td>
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

.no-flag {
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
.no-flag li {
  padding-left: 18px;
  position: relative;
  color: #cfd3db;
  font-size: 14px;
  line-height: 1.6;
}
.no-flag li::before {
  content: '×';
  position: absolute;
  left: 0;
  top: 0;
  color: var(--text-dim);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
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
