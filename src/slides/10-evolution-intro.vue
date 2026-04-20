<script setup lang="ts">
import SlideFrame from '../components/SlideFrame.vue'
import { meta } from '../slides'
</script>

<template>
  <SlideFrame v-bind="meta['10']">
    <p>
      Harness 很難一次設計對。每個部件都內含一個「agent 在這件事上做不好」的假設，這個假設只有在實際操作中才顯現是真是假。太早下判斷容易做錯方向，太晚又讓錯誤擴散。實際的演進流程大致是：觀察什麼在使用中反覆出問題，把問題工程化成結構，問題退場；下一層新問題浮現，再做一輪。
    </p>

    <div class="loop">
      <div class="step"><span class="n">01</span><span class="txt">觀察反覆出問題的地方</span></div>
      <div class="arrow">↓</div>
      <div class="step"><span class="n">02</span><span class="txt">把問題工程化成結構</span></div>
      <div class="arrow">↓</div>
      <div class="step"><span class="n">03</span><span class="txt">問題退場</span></div>
      <div class="arrow">↓</div>
      <div class="step"><span class="n">04</span><span class="txt">下一層新問題浮現，再做一輪</span></div>
    </div>

    <div class="preview">
      <div class="pv">
        <span class="pn">P1</span>
        <span class="pl">基礎管線：baseline → SDD + TDD</span>
      </div>
      <div class="pv">
        <span class="pn">P2</span>
        <span class="pl">spec → plan 側的深化</span>
      </div>
      <div class="pv">
        <span class="pn">P3</span>
        <span class="pl">task → spec 側的深化</span>
      </div>
    </div>
  </SlideFrame>
</template>

<style scoped>
.loop {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  margin: 22px 0 28px;
  padding: 18px 22px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
.step {
  display: flex;
  align-items: baseline;
  gap: 14px;
}
.step .n {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 13px;
  color: var(--accent);
  letter-spacing: 0.04em;
}
.step .txt {
  color: var(--text);
  font-size: 15px;
}
.arrow {
  color: var(--divider);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  padding-left: 28px;
  font-size: 14px;
}

.preview {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.pv {
  display: grid;
  grid-template-columns: 40px 1fr;
  align-items: baseline;
  gap: 16px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 13px;
  padding: 6px 0;
  border-top: 1px solid var(--divider);
  color: var(--text-muted);
}
.pv:last-child {
  border-bottom: 1px solid var(--divider);
}
.pn {
  color: var(--accent);
  letter-spacing: 0.08em;
  font-weight: 500;
}
.pl {
  color: #cfd3db;
}
</style>
