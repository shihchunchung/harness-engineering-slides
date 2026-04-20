<script setup lang="ts">
import SlideFrame from '../components/SlideFrame.vue'
import StickyPipeline from '../components/StickyPipeline.vue'
import { meta } from '../slides'
import { pipelines } from '../pipelines'
</script>

<template>
  <SlideFrame v-bind="meta['21']">
    <div class="layout">
      <div class="col-left">
        <div class="inline-pipeline">
          <StickyPipeline :config="pipelines['21']" />
        </div>
      </div>

      <div class="col-right">
        <p>
          plan 和 testcases 要靠執行結構才能發揮 sensor 作用。implement 若仍由 agent 自由寫、寫完後聲稱完成，testcases 的存在意義就被繞過；換成由測試結果機械地判定「做到哪了」，每個 pass 或 fail 都是可驗證的事實，而不是推論性的描述。
        </p>

        <p>
          tdd-composer 把 plan 和 testcases 組合成 <strong>RED → GREEN（分成數個 round）→ Simplify</strong> 的結構，把執行順序塑形成 pipeline，而不是讓 agent 自由決定先做什麼。
        </p>

        <h2 class="s">RED 和 Simplify 各自的存在理由</h2>
        <div class="stages">
          <div class="stage">
            <div class="stage-head">RED</div>
            <p>
              先把所有 tests 寫出來，確認新增或目標測試在預期原因下失敗——失敗來自缺失的實作，而非測試本身有誤。這一步確保 tests 真的在測該測的東西，否則「GREEN 階段 tests pass」這個訊號本身就不可信（可能是 test 因其他原因已經過了，而非實作正確）。
            </p>
          </div>
          <div class="stage">
            <div class="stage-head">Simplify</div>
            <p>
              在所有 tests 通過後、保持綠的前提下做品質清理；沒有它，agent 容易停在「tests pass」的 local minimum，留下重複、過長、抽象錯位的 code。
            </p>
          </div>
        </div>

        <p>
          在這個結構下，implement 的進度由測試結果判定。每個 checkpoint 是一個 <strong>computational sensor</strong>，狀態由 test result 驗證，而不是 agent 自述。
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
              <td><code>tdd-composer</code></td>
              <td>把 plan + testcases 編成 RED → GREEN（多輪）→ Simplify 的執行結構</td>
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
  grid-template-columns: minmax(0, 440px) minmax(0, 1fr);
  gap: 56px;
  align-items: start;
}
.col-left,
.col-right {
  min-width: 0;
}
.col-right p {
  margin: 0 0 10px;
}

.stages {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 6px 0 12px;
}
.stage {
  padding: 14px 18px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
.stage-head {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 13px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 500;
  margin-bottom: 6px;
}
.stage p {
  font-size: 14px;
  color: #cfd3db;
  margin: 0;
  line-height: 1.65;
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
  .stages {
    grid-template-columns: 1fr;
  }
}
</style>
