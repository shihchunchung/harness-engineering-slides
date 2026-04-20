<script setup lang="ts">
import SlideFrame from '../components/SlideFrame.vue'
import { meta } from '../slides'
</script>

<template>
  <SlideFrame v-bind="meta['06']">
    <p>
      同一個 agent 不該同時決定「做什麼」「怎麼做」「做對沒」。這裡有兩層問題常被混在一起。一層是誰有資格宣告「做完了」——是 agent 自述，還是外部訊號。另一層是規劃、實作、審查的推理過程會不會沿同一條鏈把盲點往下傳。
    </p>

    <p>
      兩者常一起出現，也可以各自成立。單 agent 加上嚴格的 test + lint 能攔到前者，但解決不了後者；多 agent 若共用同一個 oracle 和判準，形式上分工卻沒真正隔離推理鏈。
    </p>

    <h2 class="s">具體做法</h2>
    <ul class="approaches">
      <li>
        <strong>兩階段 workflow（Red Hat）</strong>
        <span>先分析 repo 產出規劃 artifact，再執行，人類在 artifact 層級 review 而非事後看 diff</span>
      </li>
      <li>
        <strong>Planner / Generator / Evaluator 三 agent 架構（Anthropic）</strong>
        <span>從結構上隔離驗證，Evaluator 用 Playwright 黑箱操作、不讀 Generator 的程式碼</span>
      </li>
    </ul>

    <p>
      分離的 ROI 會隨模型能力衰減。Anthropic 在 Opus 4.6 之後發現 Evaluator 在簡單任務變多餘——Generator 本身已經能接住那些原本要靠獨立驗證才能抓到的錯誤。分離的設計是為了回應 agent 的具體弱點（自我驗證不嚴、盲點沿推理鏈傳遞），弱點弱化後，分離本身也要被重新評估。
    </p>
  </SlideFrame>
</template>

<style scoped>
.approaches {
  list-style: none;
  padding: 0;
  margin: 0 0 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.approaches li {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
.approaches strong {
  color: var(--accent);
  font-weight: 500;
  font-size: 14.5px;
}
.approaches span {
  color: #cfd3db;
  font-size: 14.5px;
  line-height: 1.7;
}
</style>
