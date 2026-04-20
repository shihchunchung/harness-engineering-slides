<script setup lang="ts">
defineProps<{
  state?: 'added' | 'removed' | 'changed' | 'muted'
}>()
</script>

<template>
  <span class="pnode" :data-state="state">
    <slot />
  </span>
</template>

<style scoped>
.pnode {
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  border: 1px solid var(--border-strong);
  border-radius: 3px;
  background: transparent;
  color: var(--text);
  white-space: nowrap;
  font-weight: 400;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 12px;
  line-height: 1.3;
  letter-spacing: 0.01em;
}

/* Terracotta accent for new nodes — solid colored border, no fill */
.pnode[data-state='added'] {
  border-color: var(--accent);
  border-width: 1.5px;
  padding: 4.5px 9.5px; /* keep visual size stable with thicker border */
  color: var(--text);
  font-weight: 500;
}

/* Changed: dashed neutral border, same text color, bold weight — no accent */
.pnode[data-state='changed'] {
  border-color: var(--divider);
  border-style: dashed;
  color: var(--text);
  font-weight: 500;
}

/* Removed: dim text with strikethrough, no special border */
.pnode[data-state='removed'] {
  border-color: var(--border-strong);
  color: var(--text-dim);
  text-decoration: line-through;
  text-decoration-color: var(--text-dim);
}

/* Muted: kept for ghosting of prior-step nodes */
.pnode[data-state='muted'] {
  opacity: 0.45;
  border-style: dashed;
  color: var(--text-muted);
}
</style>
