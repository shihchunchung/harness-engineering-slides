<script setup lang="ts">
import { computed } from 'vue'
import type { SlideMeta } from '../slides'

const props = defineProps<{
  slides: SlideMeta[]
  current: number
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'jump', index: number): void
}>()

interface Group {
  label: string
  items: { index: number; meta: SlideMeta }[]
}

const groups = computed<Group[]>(() => {
  const out: Group[] = []
  props.slides.forEach((meta, index) => {
    const last = out[out.length - 1]
    if (!last || last.label !== meta.group) {
      out.push({ label: meta.group, items: [{ index, meta }] })
    } else {
      last.items.push({ index, meta })
    }
  })
  return out
})

const handleJump = (index: number) => {
  emit('jump', index)
  emit('close')
}
</script>

<template>
  <Transition name="toc">
    <aside v-if="open" class="toc" @click.self="emit('close')">
      <div class="panel">
        <header class="head">
          <span class="label">目錄</span>
          <button class="close" @click="emit('close')" aria-label="Close">×</button>
        </header>
        <div class="groups">
          <div v-for="group in groups" :key="group.label" class="group">
            <div class="group-label">{{ group.label }}</div>
            <ul>
              <li
                v-for="item in group.items"
                :key="item.index"
                :class="{ active: item.index === current }"
              >
                <button @click="handleJump(item.index)">
                  <span class="num">{{ String(item.index + 1).padStart(2, '0') }}</span>
                  <span class="title">{{ item.meta.title }}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  </Transition>
</template>

<style scoped>
.toc {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 50;
  display: flex;
  justify-content: flex-start;
}

.panel {
  width: 360px;
  max-width: 86vw;
  height: 100%;
  background: var(--bg-elevated);
  border-right: 1px solid var(--border);
  padding: 32px 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.label {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 12px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-subtle);
}

.close {
  background: none;
  border: 0;
  color: var(--text-muted);
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
}
.close:hover {
  background: var(--bg-inset);
  color: var(--text);
}

.groups {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.group-label {
  font-size: 12px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-subtle);
  margin-bottom: 8px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--border);
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  margin: 0;
}

li button {
  display: flex;
  align-items: baseline;
  gap: 12px;
  width: 100%;
  padding: 7px 10px;
  background: none;
  border: 0;
  border-radius: 4px;
  color: var(--text-muted);
  text-align: left;
  font: inherit;
  font-size: 14px;
  line-height: 1.5;
  cursor: pointer;
}

li button:hover {
  background: var(--bg-inset);
  color: var(--text);
}

li.active button {
  background: var(--accent-dim);
  color: var(--text);
}

.num {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  color: var(--text-subtle);
  min-width: 22px;
}

li.active .num {
  color: var(--accent);
}

.title {
  flex: 1;
}

.toc-enter-active,
.toc-leave-active {
  transition: opacity 180ms ease;
}
.toc-enter-active .panel,
.toc-leave-active .panel {
  transition: transform 220ms cubic-bezier(0.4, 0, 0.2, 1);
}
.toc-enter-from,
.toc-leave-to {
  opacity: 0;
}
.toc-enter-from .panel,
.toc-leave-to .panel {
  transform: translateX(-100%);
}
</style>
