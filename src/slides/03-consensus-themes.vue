<script setup lang="ts">
import SlideFrame from '../components/SlideFrame.vue'
import { meta } from '../slides'

const experiments = [
  {
    name: 'LangChain',
    claim: 'Terminal Bench 2.0（程式代理 benchmark）',
    metric: '52.8% → 66.5%',
    delta: '+13.7 分 · Top 30 → Top 5',
    setup: '固定 gpt-5.2-codex，只改 harness',
  },
  {
    name: 'Matsuoka',
    claim: 'blind review（品質 / 完成時間）',
    metric: '3.93 → 4.75',
    delta: '45 分 vs 313 分 · 7× 差距',
    setup: '四個用同款 Claude Sonnet 4.6 的 agent',
  },
  {
    name: 'HumanLayer',
    claim: '某 coding agent benchmark',
    metric: '#33 → #5',
    delta: '原生 harness → 自家 harness',
    setup: '同款 Claude Opus 4.6',
  },
]

const themes = [
  { n: 1, title: 'Context 管理', desc: '有限資源、劣化、防止污染' },
  { n: 2, title: 'Guides × Sensors 的控制迴路', desc: '前饋（guide）＋ 回饋（sensor）共構' },
  { n: 3, title: '規劃 / 執行 / 驗證分離', desc: '不讓同一 agent 既判斷又驗證' },
  { n: 4, title: 'Artifact 外部化與跨 session 交接', desc: '把瞬時推理寫成持久檔案' },
  { n: 5, title: 'Steering Loop / harness 作為演進系統', desc: '持續調整的控制系統，加法 vs 減法' },
  { n: 6, title: '機械化品味 / 硬化 convention', desc: '把判斷編碼成確定性規則' },
]
</script>

<template>
  <SlideFrame v-bind="meta['03']">
    <div class="top">
      <h2 class="s">各家的共識</h2>
      <p>
        各家對 harness 的切法不同，但底下在講同一件事：工程投入放在模型外的結構上，例如工具邊界、驗證機制與持久化 artifact。這個方向有具體的經驗支撐：
      </p>

      <ul class="experiments">
        <li v-for="e in experiments" :key="e.name">
          <div class="row-1">
            <span class="author">{{ e.name }}</span>
            <span class="metric">{{ e.metric }}</span>
          </div>
          <div class="row-2">
            <span class="setup">{{ e.setup }}</span>
            <span class="claim">{{ e.claim }}</span>
          </div>
          <div class="row-3">
            <span class="delta">{{ e.delta }}</span>
          </div>
        </li>
      </ul>

      <p class="foot">
        這不是說模型不重要，而是在固定模型下，harness 設計仍能顯著影響結果。
      </p>
    </div>

    <div class="bottom">
      <h2 class="s">各家的討論與重點</h2>
      <p>
        Harness engineering 沒有統一框架，不同作者採不同軸線切分。但橫跨各家的討論裡，有幾組主題反覆出現，以下是六個。
      </p>

      <ol class="themes">
        <li v-for="t in themes" :key="t.n">
          <span class="num">{{ String(t.n).padStart(2, '0') }}</span>
          <span class="t-title">{{ t.title }}</span>
          <span class="t-desc">{{ t.desc }}</span>
        </li>
      </ol>
    </div>
  </SlideFrame>
</template>

<style scoped>
.top,
.bottom {
  display: flex;
  flex-direction: column;
}

.bottom {
  margin-top: 24px;
}

.top p,
.bottom p {
  margin: 0 0 12px;
}

.foot {
  color: var(--text-muted);
  font-size: 14px;
  margin: 0 !important;
}

.experiments {
  list-style: none;
  padding: 0;
  margin: 0 0 12px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.experiments li {
  padding: 12px 16px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.row-1 {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.author {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 13px;
  color: var(--accent);
  font-weight: 500;
  letter-spacing: 0.02em;
}
.metric {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 13px;
  color: var(--text);
  font-weight: 500;
}
.row-2 {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.setup {
  color: var(--text-muted);
  font-size: 12.5px;
}
.claim {
  color: #cfd3db;
  font-size: 13px;
}
.delta {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11.5px;
  color: var(--text-subtle);
  letter-spacing: 0.03em;
}

.themes {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 10px 12px;
}
.themes li {
  display: grid;
  grid-template-columns: 30px 1fr;
  grid-template-rows: auto auto;
  column-gap: 10px;
  align-items: baseline;
  padding: 10px 14px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
.num {
  grid-row: 1 / 3;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 15px;
  color: var(--accent);
  align-self: start;
  padding-top: 2px;
}
.t-title {
  color: #f5f6f8;
  font-weight: 500;
  font-size: 14px;
}
.t-desc {
  color: var(--text-muted);
  font-size: 12.5px;
  line-height: 1.5;
}

@media (max-width: 1100px) {
  .experiments,
  .themes {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 720px) {
  .experiments,
  .themes {
    grid-template-columns: 1fr;
  }
}
</style>
