<script setup lang="ts">
defineProps<{
  /** Figure 編號，e.g. "15-1" */
  figure?: string
  /** Figure 說明文字 */
  caption?: string
}>()
</script>

<template>
  <figure class="pipeline">
    <div class="flow">
      <slot />
    </div>
    <figcaption v-if="figure || caption" class="figcap">
      <span v-if="figure" class="num">Figure {{ figure }}</span>
      <span v-if="figure && caption" class="sep"> · </span>
      <span v-if="caption" class="txt">{{ caption }}</span>
    </figcaption>
  </figure>
</template>

<style scoped>
.pipeline {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.flow {
  display: flex;
  flex-direction: column;
  gap: 14px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 13px;
  line-height: 1.5;
  padding: 20px 22px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.figcap {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  color: var(--text-muted);
  letter-spacing: 0.04em;
}
.figcap .num {
  color: var(--text);
}
.figcap .sep {
  color: var(--divider);
}
</style>
