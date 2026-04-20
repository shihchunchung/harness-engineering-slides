<script setup lang="ts">
import { computed } from 'vue'
import SvgPipeline from './SvgPipeline.vue'
import type { PipelineConfig } from '../pipelines'

const props = defineProps<{
  config: PipelineConfig | null
}>()

const panels = computed(() => props.config?.panels ?? [])
const layoutClass = computed(() => `layout-${props.config?.layout ?? 'stack'}`)
</script>

<template>
  <div class="sticky-pipeline" :class="layoutClass">
    <TransitionGroup tag="div" class="panels" name="panel">
      <div
        v-for="panel in panels"
        :key="panel.key"
        class="panel"
      >
        <div v-if="panel.label" class="panel-label">{{ panel.label }}</div>
        <SvgPipeline
          :nodes="panel.nodes"
          :edges="panel.edges"
          :row-gap="panel.rowGap"
          :col-gap="panel.colGap"
          :faded="panel.faded"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.sticky-pipeline {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  pointer-events: auto;
}

.panels {
  display: flex;
  gap: 14px;
}
.layout-stack .panels {
  flex-direction: column;
  align-items: center;
}
.layout-row .panels {
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transition: opacity 260ms ease;
}

.panel-label {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  color: var(--text-muted);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding-left: 2px;
}

.panel-enter-from,
.panel-leave-to {
  opacity: 0;
}
.panel-enter-active {
  transition: opacity 320ms ease 140ms;
}
.panel-leave-active {
  transition: opacity 180ms ease;
  position: absolute;
}
</style>
