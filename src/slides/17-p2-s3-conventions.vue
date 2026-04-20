<script setup lang="ts">
import SlideFrame from '../components/SlideFrame.vue'
import { meta } from '../slides'
</script>

<template>
  <SlideFrame v-bind="meta['17']">
    <div class="layout">
      <div class="col-right">
        <p>
          「plan 應該長什麼樣」的規則散落在四個 prompt 裡：plan agent 知道 plan 該有哪些 section，plan-reviewer 知道怎麼檢查結構，plan-challenger 知道可以挑戰什麼面向，spec-compliance-reviewer 知道 spec 到 plan 的 mapping。這些規則彼此相關，卻各自寫在自己的 prompt 裡，改一條要翻四個檔案，不同 agent 對同一條規則的表達還會微妙漂移。
        </p>

        <h2 class="s">guide 外部化</h2>
        <p>
          把共用規則抽出來成 <code>plan-conventions.md</code>：plan 的 section 結構、粒度要求、格式慣例、常見反模式。四個 agent 共同引用這份文件，產出端以它為產出標準，審查端以它為檢查基準。這是 <strong>guide 的外部化</strong>，把散落在 prompt 裡的隱性規則變成可版本化、可追溯、可單點更新的顯性文件。
        </p>

        <h2 class="s">guide 層級化</h2>
        <p>
          CLAUDE.md 也順勢收斂：原本混在裡面的 plan 相關規則搬到 plan-conventions.md，CLAUDE.md 回到「repo 通用、所有 agent 啟動就該讀」的定位。這是 <strong>guide 的層級化</strong>，plan-conventions 只在 plan 相關 agent 載入，不讓無關規則消耗 agent 有限的 instruction budget。
        </p>

        <div class="diagram">
          <div class="center">plan-conventions.md</div>
          <div class="fans">
            <span>plan agent</span>
            <span>plan-challenger</span>
            <span>plan-reviewer</span>
            <span>spec-compliance-reviewer</span>
          </div>
        </div>
      </div>
    </div>
  </SlideFrame>
</template>

<style scoped>
.layout {
  max-width: 900px;
}
.col-right {
  min-width: 0;
}
.col-right p {
  margin: 0 0 10px;
}

.diagram {
  margin: 16px 0 0;
  padding: 18px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.center {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 13px;
  padding: 6px 14px;
  border: 1.5px solid var(--accent);
  color: var(--text);
  border-radius: 3px;
}
.fans {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}
.fans span {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 12px;
  padding: 4px 10px;
  border: 1px solid var(--border-strong);
  color: var(--text);
  border-radius: 3px;
}

</style>
