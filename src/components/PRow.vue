<script setup lang="ts">
defineProps<{
  label?: string
}>()
</script>

<template>
  <div class="prow">
    <span v-if="label" class="label">{{ label }}</span>
    <div class="items">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.prow {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  flex-wrap: wrap;
}

.label {
  flex: 0 0 auto;
  color: var(--text-subtle);
  font-size: 12px;
  font-weight: 500;
  padding-top: 6px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  min-width: 70px;
}

.items {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px 4px;
  flex: 1;
  min-width: 0;
}
</style>
