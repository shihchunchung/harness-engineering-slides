<script setup lang="ts">
import SlideFrame from '../components/SlideFrame.vue'
import StickyPipeline from '../components/StickyPipeline.vue'
import { meta } from '../slides'
import { pipelines } from '../pipelines'
</script>

<template>
  <SlideFrame v-bind="meta['16']">
    <div class="layout">
      <div class="col-left">
        <div class="inline-pipeline">
          <StickyPipeline :config="pipelines['16']" />
        </div>
      </div>

      <div class="col-right">
        <p>
          合規 reviewer 只能抓「plan 違反了某條規則」的錯誤，抓不到「plan 遵守了所有規則，設計卻是錯的」。例如選了過度工程的抽象層、或採用看似合理卻在此情境下不合適的 pattern。這些不觸發 rule violation，卻讓下游的 implement 帶著結構缺陷。plan-challenger 就是補這個盲點。
        </p>

        <h2 class="s">關鍵在方法</h2>
        <p>
          先把 plan 放一邊，獨立研究問題本身，形成自己對這個功能該怎麼做的理解，再回來比對 plan 的設計選擇。有了獨立的參照點，才有真正「挑戰」的基礎，不是在 plan 內部邏輯裡打轉。
        </p>
        <p>
          對抗式 reviewer 很容易退化成噪音產生器，所以每個挑戰在輸出前要通過 <strong>self-check</strong>，任一道過不了就丟棄。這是 inferential sensor 的品質閥。
        </p>
        <ul class="selfcheck">
          <li>是否已被規範管轄（屬於其他 reviewer 的工作）</li>
          <li>能否說清楚這個選擇錯了會出什麼事</li>
          <li>plan 能否據此修改</li>
        </ul>

        <h2 class="s">運作細節</h2>
        <p>
          plan-challenger 只處理「規範沒管到但選擇錯了會出事」的灰色地帶，屬於明文規範的問題交給其他 reviewer。
        </p>
        <ul class="rules">
          <li>輸出用疑問句形式保留 plan 作者的判斷空間</li>
          <li>附 <code>filepath:line</code> 引用作為 evidence</li>
          <li>
            分 <strong class="block">BLOCK</strong> 與 <strong class="note">NOTE</strong> 兩級：BLOCK 要求附上具體的 failure scenario（bug、security、test），不是「這樣比較好」的風格偏好
          </li>
          <li>單次執行最多 10 條 challenge，且沒有最低下限：乾淨的 review report 是合法結果，不需要為了「盡責」湊問題出來</li>
        </ul>
        <p class="dim">
          執行順序上先於其他 reviewer，因為它可能改變整個設計方向，合規審查的對象會跟著變。
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
              <td><code>plan-challenger</code></td>
              <td>對抗式審查規範外的設計缺陷</td>
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

.selfcheck,
.rules {
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
.selfcheck li,
.rules li {
  padding-left: 18px;
  position: relative;
  color: #cfd3db;
  font-size: 14px;
  line-height: 1.65;
}
.selfcheck li::before,
.rules li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 12px;
  width: 10px;
  height: 1px;
  background: var(--accent);
}

.block {
  color: var(--accent);
}
.note {
  color: var(--text);
}

.dim {
  color: var(--text-muted);
  font-size: 14px;
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
