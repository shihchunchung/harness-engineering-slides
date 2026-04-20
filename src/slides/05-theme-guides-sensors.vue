<script setup lang="ts">
import SlideFrame from '../components/SlideFrame.vue'
import { meta } from '../slides'
</script>

<template>
  <SlideFrame v-bind="meta['05']">
    <p>
      <strong>Guides / sensors × computational / inferential 四象限</strong>是目前最被引用的分類（Böckeler）：guides 是前饋（AGENTS.md、Skills、specs），sensors 是回饋（tests、linters、review agents）。單靠 guide 無法確認規則是否被遵守，單靠 sensor 又容易在錯誤擴散後才觸發，兩者共同構成控制迴路。
    </p>

    <div class="quadrant">
      <div class="cell">
        <div class="cell-head">Computational · Guide</div>
        <div class="cell-body">AGENTS.md、Skills、MCP tool spec</div>
      </div>
      <div class="cell">
        <div class="cell-head">Inferential · Guide</div>
        <div class="cell-body">spec、convention 文件</div>
      </div>
      <div class="cell">
        <div class="cell-head">Computational · Sensor</div>
        <div class="cell-body">linter-as-teacher、tests、hooks、CI gates</div>
      </div>
      <div class="cell">
        <div class="cell-head">Inferential · Sensor</div>
        <div class="cell-body">review / challenger agent</div>
      </div>
    </div>

    <p>
      <strong>Linter-as-teacher</strong>（OpenAI）是 computational sensor 的高效實例，error message 同時是違規標記和修復指引；inferential sensor 則由 review / challenger agent 擔任，沒有確定性規則可跑時，靠 LLM 對照 oracle（spec、convention 文件）做判斷。
    </p>

    <p>
      sensor 能穩定機械化的多半是可維護性、結構、風格類問題；行為正確性——需求對不對、整體功能有沒有符合預期——仍較難機械化。spec 對照、browser-driven evaluation、inferential reviewer 這些較重的做法因此仍有必要，綠燈測試之外還需要獨立的行為檢查。
    </p>
  </SlideFrame>
</template>

<style scoped>
.quadrant {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 14px 0;
}
.cell {
  padding: 12px 16px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
.cell-head {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--accent);
  font-weight: 500;
  margin-bottom: 4px;
  text-transform: uppercase;
}
.cell-body {
  color: #cfd3db;
  font-size: 14px;
}

@media (max-width: 720px) {
  .quadrant {
    grid-template-columns: 1fr;
  }
}
</style>
