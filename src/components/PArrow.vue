<script setup lang="ts">
defineProps<{
  direction?: 'right' | 'left' | 'down' | 'up'
  state?: 'added' | 'removed' | 'changed' | 'muted'
}>()
</script>

<template>
  <span class="parrow" :data-state="state" :data-dir="direction || 'right'">
    <template v-if="(direction || 'right') === 'right'">→</template>
    <template v-else-if="direction === 'left'">←</template>
    <template v-else-if="direction === 'down'">↓</template>
    <template v-else-if="direction === 'up'">↑</template>
  </span>
</template>

<style scoped>
.parrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 14px;
  padding: 0 4px;
  line-height: 1;
  user-select: none;
}

.parrow[data-state='added'] {
  color: var(--accent);
}
.parrow[data-state='changed'] {
  color: var(--text-muted);
}
.parrow[data-state='removed'] {
  color: var(--text-dim);
  text-decoration: line-through;
}
.parrow[data-state='muted'] {
  opacity: 0.45;
}
</style>
