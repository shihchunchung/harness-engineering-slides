<script setup lang="ts">
import SlideFrame from '../components/SlideFrame.vue'
import { meta } from '../slides'
</script>

<template>
  <SlideFrame v-bind="meta['04']">
    <p>
      Context 是有限且會劣化的資源，如何管理它，比塞更多內容更能決定 agent 的產出：
    </p>

    <ul class="concepts">
      <li>
        <strong>Context firewall</strong>
        <span class="body">
          sub-agent 的本質是讓 parent 只收到最終結果，而非角色扮演
        </span>
      </li>
      <li>
        <strong>Progressive disclosure / instruction budget</strong>
        <span class="body">
          AGENTS.md、Skills、MCP 都會消耗 agent 有限的 context 額度，規則不是越多越好，超過閾值 agent 反而進入「dumb zone」
        </span>
      </li>
    </ul>

    <p>
      更大的 context window 沒有讓這組問題消失，只是把爆發點往後推。跨 session 的狀態交接、長任務中段累積的污染、多來源規則之間的干擾，這些都不會因為 window 變大就解決。reset、compaction、sub-agent、artifact handoff 不是取代長 context，而是補上長 context 處理不了的那部分。
    </p>
  </SlideFrame>
</template>

<style scoped>
.concepts {
  list-style: none;
  padding: 0;
  margin: 0 0 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.concepts li {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
.concepts strong {
  color: var(--accent);
  font-weight: 500;
  font-size: 14.5px;
}
.concepts .body {
  color: #cfd3db;
  font-size: 14.5px;
  line-height: 1.7;
}
</style>
