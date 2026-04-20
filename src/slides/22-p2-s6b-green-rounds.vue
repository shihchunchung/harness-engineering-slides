<script setup lang="ts">
import SlideFrame from '../components/SlideFrame.vue'
import { meta } from '../slides'

const reasons = [
  {
    head: 'Bounded context',
    body:
      '每個 round 聚焦在 plan 裡的一小片實作，按依賴順序切分，agent 不需要把整個 plan 都抓在 context 裡；長任務後期容易失焦，分段執行讓每段都在 agent 可靠的認知範圍內。',
  },
  {
    head: '每個 round 是一個 verified checkpoint',
    body:
      'round 結束時相關 tests 全部 pass，git commit 把這個狀態釘住。進度不再是 agent 聲稱的，而是 test result + commit 共同證明的。',
  },
  {
    head: 'Rollback point',
    body:
      '若某個 round 出問題，前一個 round 的 commit 是乾淨的回滾點，不會把整個實作全部歸零。',
  },
  {
    head: 'Regression 自然被 catch',
    body:
      '前面 round 的 tests 進入 always-green 狀態，後面 round 寫新實作時若破壞了前面的行為，會在當前 round 就被測試抓到，不需要手動 re-verify 前面已經做好的部分。',
  },
]
</script>

<template>
  <SlideFrame v-bind="meta['22']">
    <p>
      GREEN 階段之所以分成數個 round 而不是一次實作所有 tests，有幾個考量：
    </p>

    <div class="rounds">
      <div class="round" v-for="(r, i) in reasons" :key="i">
        <span class="idx">{{ String(i + 1).padStart(2, '0') }}</span>
        <div class="r-body">
          <div class="r-head">{{ r.head }}</div>
          <p>{{ r.body }}</p>
        </div>
      </div>
    </div>

    <div class="timeline">
      <div class="tl-head">GREEN 的時間軸</div>
      <div class="tl-flow">
        <span class="tl-node">RED（all tests 失敗）</span>
        <span class="tl-arrow">→</span>
        <span class="tl-node green">R1 · commit</span>
        <span class="tl-arrow">→</span>
        <span class="tl-node green">R2 · commit</span>
        <span class="tl-arrow">→</span>
        <span class="tl-node green">R3 · commit</span>
        <span class="tl-arrow">→</span>
        <span class="tl-node">Simplify</span>
      </div>
      <div class="tl-note">
        每個 round 結束 = tests pass + commit 釘住狀態 + 前面 rounds 的 tests 持續 always-green
      </div>
    </div>
  </SlideFrame>
</template>

<style scoped>
.rounds {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 14px 0 20px;
}
.round {
  display: grid;
  grid-template-columns: 36px 1fr;
  gap: 14px;
  padding: 14px 18px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
.idx {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 15px;
  color: var(--accent);
  padding-top: 2px;
}
.r-head {
  color: var(--text);
  font-weight: 500;
  font-size: 14.5px;
  margin-bottom: 4px;
}
.r-body p {
  color: #cfd3db;
  font-size: 13.5px;
  line-height: 1.65;
  margin: 0;
}

.timeline {
  padding: 14px 18px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  border-left: 3px solid var(--accent);
}
.tl-head {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 10px;
}
.tl-flow {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 12px;
  margin-bottom: 8px;
}
.tl-node {
  display: inline-flex;
  padding: 4px 10px;
  border: 1px solid var(--border-strong);
  border-radius: 3px;
  color: var(--text);
}
.tl-node.green {
  border-color: var(--accent);
}
.tl-arrow {
  color: var(--text-muted);
}
.tl-note {
  color: var(--text-muted);
  font-size: 13px;
}

@media (max-width: 900px) {
  .rounds {
    grid-template-columns: 1fr;
  }
}
</style>
