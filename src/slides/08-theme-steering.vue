<script setup lang="ts">
import SlideFrame from '../components/SlideFrame.vue'
import { meta } from '../slides'
</script>

<template>
  <SlideFrame v-bind="meta['08']">
    <p>
      Harness 是持續演進的控制系統，會隨觀察到的失敗逐步調整。這個迴路常被稱為 <strong>steering loop</strong>（Böckeler）；更激進的做法是把它自動化：doc-gardening agent、constraint violation scanner、garbage collection agent 定期掃偏差開 refactor PR（OpenAI）。
    </p>

    <div class="directions">
      <div class="dir">
        <div class="dir-head plus">加法 · Böckeler</div>
        <div class="dir-body">犯錯就加規則</div>
      </div>
      <div class="dir">
        <div class="dir-head minus">減法 · Schmid</div>
        <div class="dir-body">
          呼應 Rich Sutton 的 Bitter Lesson——通用模型能力最終會勝過任務特定的工程累積，任務特定的部件能拆則拆
        </div>
      </div>
    </div>

    <p>
      Anthropic 的 <strong>sprint contracts</strong>（規劃／執行交接處設定一組硬門檻檢查，通過才能進實作）在 Opus 4.6 後被主動移除，是減法的實際案例。兩個方向都屬於 steering loop 的範圍；只做加法，harness 的部件會逐漸累積成維護成本。
    </p>
  </SlideFrame>
</template>

<style scoped>
.directions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 14px 0;
}
.dir {
  padding: 14px 18px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
.dir-head {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 12.5px;
  letter-spacing: 0.08em;
  font-weight: 500;
  margin-bottom: 6px;
  text-transform: uppercase;
}
.dir-head.plus {
  color: var(--accent);
}
.dir-head.minus {
  color: var(--text);
}
.dir-body {
  color: #cfd3db;
  font-size: 14.5px;
  line-height: 1.7;
}

@media (max-width: 720px) {
  .directions {
    grid-template-columns: 1fr;
  }
}
</style>
