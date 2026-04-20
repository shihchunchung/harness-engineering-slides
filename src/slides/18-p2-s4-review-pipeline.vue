<script setup lang="ts">
import SlideFrame from '../components/SlideFrame.vue'
import StickyPipeline from '../components/StickyPipeline.vue'
import { meta } from '../slides'
import { pipelines } from '../pipelines'
</script>

<template>
  <SlideFrame v-bind="meta['18']">
    <div class="layout">
      <div class="col-left">
        <div class="inline-pipeline">
          <StickyPipeline :config="pipelines['18']" />
        </div>
      </div>

      <div class="col-right">
        <p>這一步改兩件事：reviewer 改按驗證基準分組，plan-challenger 改在 reviewer 與修正之後執行。</p>

        <h2 class="s">Reviewer 按「驗證基準」重新組織</h2>
        <p>
          每個 reviewer 嚴格綁定一個真理來源。原本按「角色」分的做法邊界模糊（有的 reviewer 同時做慣例和結構檢查，有的同時做覆蓋率、假設審計和架構適切性），導致重複偵測和漏洞並存：同一個問題被兩個 reviewer 各抱怨一次，另一類問題卻沒人覆蓋。
        </p>

        <table class="agents">
          <thead>
            <tr>
              <th>Reviewer</th>
              <th>綁定 oracle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>plan-spec-reviewer</code></td>
              <td>spec、CLAUDE.md、plan-conventions.md（明文規範）</td>
            </tr>
            <tr>
              <td><code>plan-assumption-reviewer</code></td>
              <td>spec 的空白與歧義（plan 填補的假設是否合理）</td>
            </tr>
            <tr>
              <td><code>plan-codebase-reviewer</code></td>
              <td>codebase 實際狀態（認知是否跟 repo 現況一致）</td>
            </tr>
          </tbody>
        </table>
        <p class="dim">
          每個 reviewer 有明確的 oracle，邊界不再模糊。這裡做的是隔離 reviewer 的判斷依據，每個 reviewer 只對一個 oracle 負責。和 Step 1 的 sub-agent firewall 同屬視野隔離：前者限制探索時的輸入，後者限制判斷時的依據。
        </p>

        <h2 class="s">偵測與修復分離</h2>
        <p>三個 reviewer 只回報 finding，不改 plan。每個 finding 被分類為：</p>
        <ul class="cats">
          <li><strong class="a">A 類</strong> · 規範有唯一正確答案，可自動修正</li>
          <li><strong class="b">B 類</strong> · 合理分歧，需使用者判斷</li>
        </ul>
        <p>
          使用者在集中的 decision gate 處理所有 B 類 finding 後，orchestrator 在一次 pass 裡統一執行修正。修正集中化後，plan 的狀態變化變得可追蹤。
        </p>

        <h2 class="s">plan-challenger 放在最後執行</h2>
        <p>
          它審查的是修正後的 plan，而不是 draft，避免浪費精力挑戰一個即將被 A 類 fix 修掉的設計選擇。它處理的是通過所有文件規範、假設審計、codebase 對齊之後仍然可能存在的設計錯誤。
        </p>

        <p class="foot">
          <strong>evidence 標準化</strong>：所有 finding 必須附帶 <code>filepath:line</code> 引用，沒有引用的不被接受；已通過的檢查不再列出；檢查範圍限縮到需要修改的檔案。
        </p>
      </div>
    </div>
  </SlideFrame>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: minmax(0, 300px) minmax(0, 1fr);
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

.agents {
  width: 100%;
  border-collapse: collapse;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  font-size: 13.5px;
  margin: 4px 0 10px;
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

.cats {
  list-style: none;
  padding: 0;
  margin: 4px 0 10px;
}
.cats li {
  padding: 4px 0;
  font-size: 14px;
}
.a {
  color: var(--accent);
}
.b {
  color: var(--text);
}

.dim {
  color: var(--text-muted);
  font-size: 14px;
}
.foot {
  color: var(--text-muted);
  font-size: 14px;
  margin-top: 8px !important;
}

@media (max-width: 1200px) {
  .layout {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}
</style>
