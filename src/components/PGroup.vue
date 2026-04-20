<script setup lang="ts">
defineProps<{
  state?: 'added' | 'removed' | 'changed' | 'muted'
}>()
</script>

<template>
  <span class="pgroup" :data-state="state">
    <span class="bracket">[</span>
    <span class="items">
      <slot />
    </span>
    <span class="bracket">]</span>
  </span>
</template>

<style scoped>
.pgroup {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.bracket {
  color: var(--text-muted);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 18px;
  line-height: 1;
}

.items {
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  padding: 2px 0;
}

.pgroup[data-state='added'] .bracket,
.pgroup[data-state='changed'] .bracket {
  color: var(--accent);
}
.pgroup[data-state='removed'] .bracket {
  color: var(--text-dim);
}
.pgroup[data-state='muted'] {
  opacity: 0.45;
}
</style>
