<script setup lang="ts">
import SlideFrame from '../components/SlideFrame.vue'
import { meta } from '../slides'
</script>

<template>
  <SlideFrame v-bind="meta['26']">
    <p>
      前面講的多數 agent（尤其是做判斷的 reviewer 和 challenger）除了主要輸出（plan、testcases、review finding、challenge 等）之外，還會同步寫一份結構化的 decision log 到獨立檔案。
    </p>

    <p>
      log 記錄 agent 在這次執行裡讀了哪些檔案、探索了哪些 codebase 位置、考慮過哪些可能的 finding、哪些被判定為 governed 而交給其他 agent、哪些被 dismiss（例如 self-check 沒過、evidence 不足）、哪些最終被提升成正式輸出。這份 log 不回傳給 parent agent，只寫到檔案系統作為事後檢視用。
    </p>

    <h2 class="s">log 的三個用途</h2>
    <div class="uses">
      <div class="use">
        <div class="use-head">Audit</div>
        <p>
          驗證 agent 是否遵守自己的 suppression list 和 self-check 規則。如果 plan-challenger 挑戰了一個其實屬於 plan-spec-reviewer 管轄的 finding，log 會讓這個越界可見。
        </p>
      </div>
      <div class="use">
        <div class="use-head">Debug</div>
        <p>
          agent 產出奇怪時（挑錯方向、漏掉明顯問題、重複抱怨同一件事），log 還原它的推理路徑，不用靠猜。
        </p>
      </div>
      <div class="use">
        <div class="use-head">Steering loop 的燃料</div>
        <p>
          跨多次執行的 log patterns 揭示系統性問題：同一類 finding 反覆被某個 reviewer 漏掉、某個 prompt 規則頻繁被誤解、某個 agent 的 dismiss 比例異常高。這些是改進 harness 本身的訊號，單看單次輸出看不出來。
        </p>
      </div>
    </div>

    <div class="pull">
      <p>
        這三個用途共用一個手段：把原本只存在於 agent context 裡的東西寫成檔案。
      </p>
      <p class="conclusion">
        <strong>TDD 處理 code state</strong>（實作是否完成），<strong>decision log 處理 reasoning state</strong>（agent 怎麼做決策）。兩者讓 agent 的行為可以在事後被檢視。
      </p>
    </div>
  </SlideFrame>
</template>

<style scoped>
.uses {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 10px 0 18px;
}
.use {
  padding: 14px 18px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
.use-head {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 12.5px;
  letter-spacing: 0.08em;
  color: var(--accent);
  font-weight: 500;
  margin-bottom: 6px;
  text-transform: uppercase;
}
.use p {
  color: #cfd3db;
  font-size: 13.5px;
  line-height: 1.65;
  margin: 0;
}

.pull {
  padding: 16px 20px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent);
  border-radius: var(--radius);
}
.pull p {
  margin: 0 0 8px;
}
.conclusion {
  color: var(--text-muted);
  font-size: 14.5px;
  margin: 0 !important;
}

@media (max-width: 1100px) {
  .uses {
    grid-template-columns: 1fr;
  }
}
</style>
