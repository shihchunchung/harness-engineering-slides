<script setup lang="ts">
const props = defineProps<{
  current: number
  total: number
}>()

const emit = defineEmits<{
  (e: 'jump', index: number): void
}>()

const handleClick = (event: MouseEvent) => {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  const ratio = (event.clientX - rect.left) / rect.width
  const target = Math.min(props.total - 1, Math.max(0, Math.floor(ratio * props.total)))
  emit('jump', target)
}
</script>

<template>
  <div class="progress-wrap">
    <div class="pagenum">
      <span class="cur">{{ String(current + 1).padStart(2, '0') }}</span>
      <span class="sep">/</span>
      <span class="tot">{{ String(total).padStart(2, '0') }}</span>
    </div>
    <div class="bar" @click="handleClick">
      <div
        class="fill"
        :style="{ width: `${((current + 1) / total) * 100}%` }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.progress-wrap {
  position: fixed;
  bottom: 18px;
  left: 72px;
  right: 72px;
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 10;
  pointer-events: none;
}

.pagenum {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 12px;
  color: var(--text-subtle);
  letter-spacing: 0.05em;
  min-width: 64px;
  pointer-events: auto;
}

.cur {
  color: var(--text);
}
.sep {
  margin: 0 4px;
  color: var(--text-subtle);
}

.bar {
  flex: 1;
  height: 2px;
  background: var(--border);
  border-radius: 2px;
  cursor: pointer;
  pointer-events: auto;
  position: relative;
  overflow: hidden;
}

.bar:hover {
  height: 4px;
  transition: height 120ms ease;
}

.fill {
  height: 100%;
  background: var(--text-muted);
  transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

@media (max-width: 1100px) {
  .progress-wrap {
    left: 48px;
    right: 48px;
  }
}

@media (max-width: 720px) {
  .progress-wrap {
    left: 28px;
    right: 28px;
    bottom: 14px;
  }
}
</style>
