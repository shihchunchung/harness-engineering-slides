<script setup lang="ts">
import SlideFrame from '../components/SlideFrame.vue'
import { meta } from '../slides'
</script>

<template>
  <SlideFrame v-bind="meta['02']">
    <div class="top">
      <p class="def">
        Harness engineering 是建立和持續演進 agent 系統外部控制層的工程實務，指模型之外那些讓 agent
        在任務裡可靠工作、可被治理的結構。
      </p>

      <p class="compare-intro">
        它和 prompt engineering、orchestration 容易混淆：prompt engineering 處理指令的措辭，orchestration
        處理步驟的流程，harness 處理讓指令和流程可靠運行的控制面：檢查機制、工具邊界、持久化產物怎麼接起來。
      </p>

      <ul class="defs">
        <li>
          <strong>prompt engineering</strong>
          <span>處理指令的措辭</span>
        </li>
        <li>
          <strong>orchestration</strong>
          <span>處理步驟的流程</span>
        </li>
        <li>
          <strong>harness</strong>
          <span>處理讓指令和流程可靠運行的控制面：檢查機制、工具邊界、持久化產物怎麼接起來</span>
        </li>
      </ul>
    </div>

    <div class="failures">
      <div class="fail-head">Agent 典型的失敗模式</div>
      <p>
        Agent 典型的失敗模式不是完全做錯，而是停在看起來像完成的地方。
      </p>
      <ul class="k">
        <li>需求有模糊處就自己補完</li>
        <li>長任務中段累積的 context 開始污染後段判斷</li>
        <li>產出一份不完整的結果卻認為已經完成</li>
      </ul>
      <p class="fail-foot">
        這類問題修幾句 prompt 難以穩定解決，多數時候要從外部結構著手——工具邊界、驗證機制、跨 session 的狀態交接。harness engineering 最近被反覆提起的原因大致在此。
      </p>
    </div>
  </SlideFrame>
</template>

<style scoped>
.top {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 22px;
}
.def {
  font-size: 16px;
  color: var(--text);
  margin: 0;
}
.compare-intro {
  color: var(--text-muted);
  font-size: 14.5px;
  margin: 0;
}

.defs {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.defs li {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px 18px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
.defs strong {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 13px;
  color: var(--accent);
  font-weight: 500;
  letter-spacing: 0.02em;
}
.defs span {
  color: #cfd3db;
  font-size: 14px;
  line-height: 1.6;
}

.failures {
  padding: 16px 20px;
  border: 1px solid var(--border);
  background: var(--bg-elevated);
  border-radius: var(--radius);
  border-left: 3px solid var(--accent);
}
.fail-head {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 10px;
}
.failures p {
  margin: 0 0 8px;
  font-size: 15px;
  color: var(--text);
}
.failures .fail-foot {
  color: var(--text-muted);
  font-size: 14px;
  margin: 10px 0 0;
}

@media (max-width: 900px) {
  .defs {
    grid-template-columns: 1fr;
  }
}
</style>
