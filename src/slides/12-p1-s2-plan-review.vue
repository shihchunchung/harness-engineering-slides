<script setup lang="ts">
import SlideFrame from '../components/SlideFrame.vue'
import StickyPipeline from '../components/StickyPipeline.vue'
import { meta } from '../slides'
import { pipelines } from '../pipelines'
</script>

<template>
  <SlideFrame v-bind="meta['12']">
    <div class="layout">
      <div class="col-left">
        <div class="inline-pipeline">
          <StickyPipeline :config="pipelines['12']" />
        </div>
      </div>

      <div class="col-right">
        <p>
          Plan 的結構粒度每次不同，難以被穩定審查；而審查又只剩人工一條路。把「產出 plan」獨立成 plan agent，固定 prompt 讓輸出格式穩定；再加 plan review agent 做第一輪機械審查。人工審查仍在，但不再是唯一關卡。
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
              <td><code>plan agent</code></td>
              <td>固定 prompt 產出 plan 格式</td>
            </tr>
            <tr>
              <td><code>plan review</code></td>
              <td>第一輪機械審查 plan</td>
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
  grid-template-columns: minmax(0, 220px) minmax(0, 1fr);
  gap: 56px;
  align-items: start;
}
.col-left,
.col-right {
  min-width: 0;
}
.col-right p {
  margin: 0 0 12px;
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
  width: 180px;
  color: var(--text);
}

@media (max-width: 1100px) {
  .layout {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}
</style>
