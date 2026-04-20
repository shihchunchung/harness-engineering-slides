<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { slides } from './slides'
import { pipelines } from './pipelines'
import ProgressBar from './components/ProgressBar.vue'
import TOC from './components/TOC.vue'
import StickyPipeline from './components/StickyPipeline.vue'

const readInitialIndex = (): number => {
  if (typeof window === 'undefined') return 0
  const hash = window.location.hash.replace(/^#\/?/, '')
  const parsed = parseInt(hash, 10)
  if (!Number.isNaN(parsed) && parsed >= 1 && parsed <= slides.length) {
    return parsed - 1
  }
  return 0
}

const current = ref(readInitialIndex())
const tocOpen = ref(false)
const total = slides.length

const next = () => {
  if (current.value < total - 1) current.value += 1
}
const prev = () => {
  if (current.value > 0) current.value -= 1
}
const jump = (i: number) => {
  const clamped = Math.max(0, Math.min(total - 1, i))
  current.value = clamped
}

const onKey = (e: KeyboardEvent) => {
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
  switch (e.key) {
    case 'ArrowRight':
    case 'PageDown':
    case ' ':
      e.preventDefault()
      next()
      break
    case 'ArrowLeft':
    case 'PageUp':
      e.preventDefault()
      prev()
      break
    case 'Home':
      e.preventDefault()
      jump(0)
      break
    case 'End':
      e.preventDefault()
      jump(total - 1)
      break
    case 'Escape':
      tocOpen.value = false
      break
    case 't':
    case 'T':
      tocOpen.value = !tocOpen.value
      break
  }
}

const onHashChange = () => {
  current.value = readInitialIndex()
}

const syncHash = () => {
  if (typeof window === 'undefined') return
  const target = `#/${current.value + 1}`
  if (window.location.hash !== target) {
    history.replaceState(null, '', target)
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKey)
  window.addEventListener('hashchange', onHashChange)
  window.addEventListener('resize', measureActiveBody)
  syncHash()
  scheduleMeasure()
  if (document.fonts?.ready) {
    document.fonts.ready.then(measureActiveBody)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('hashchange', onHashChange)
  window.removeEventListener('resize', measureActiveBody)
  resizeObserver?.disconnect()
  resizeObserver = null
  observedBody = null
})

const translate = computed(() => `translateX(-${current.value * 100}vw)`)

const activeMeta = computed(() => slides[current.value])
const activePipeline = computed(() => pipelines[activeMeta.value.id] ?? null)

const trackEl = ref<HTMLElement | null>(null)
const bodyTop = ref(0)
const bodyHeight = ref(0)

let resizeObserver: ResizeObserver | null = null
let observedBody: HTMLElement | null = null

const measureActiveBody = () => {
  const track = trackEl.value
  if (!track) return
  const slide = track.children[current.value] as HTMLElement | undefined
  const body = slide?.querySelector('.slide-body') as HTMLElement | null
  if (!body) {
    bodyTop.value = 0
    bodyHeight.value = 0
    return
  }
  const rect = body.getBoundingClientRect()
  bodyTop.value = rect.top
  bodyHeight.value = rect.height

  if (observedBody !== body) {
    if (resizeObserver && observedBody) resizeObserver.unobserve(observedBody)
    observedBody = body
    if (!resizeObserver && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => measureActiveBody())
    }
    resizeObserver?.observe(body)
  }
}

const scheduleMeasure = () => {
  if (typeof requestAnimationFrame === 'undefined') {
    measureActiveBody()
    return
  }
  requestAnimationFrame(() => requestAnimationFrame(measureActiveBody))
}

const pipelineColWidth = computed(() => activePipeline.value?.colWidth ?? 0)

watch(current, () => {
  syncHash()
  scheduleMeasure()
})
</script>

<template>
  <div class="app">
    <button
      class="toc-toggle"
      :aria-label="tocOpen ? 'Close menu' : 'Open menu'"
      @click="tocOpen = !tocOpen"
    >
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>

    <div class="brand">
      <span class="brand-label">{{ activeMeta.group }}</span>
    </div>

    <div class="track-viewport">
      <div class="track" ref="trackEl" :style="{ transform: translate }">
        <component
          :is="slide.component"
          v-for="slide in slides"
          :key="slide.id"
        />
      </div>
    </div>

    <div
      class="pipeline-mount"
      :class="{ active: !!activePipeline }"
      :style="{ top: bodyTop + 'px', height: bodyHeight + 'px' }"
    >
      <div class="pipeline-inner">
        <div
          class="pipeline-slot"
          :style="{ width: pipelineColWidth + 'px' }"
        >
          <StickyPipeline :config="activePipeline" />
        </div>
      </div>
    </div>

    <ProgressBar :current="current" :total="total" @jump="jump" />

    <TOC
      :slides="slides"
      :current="current"
      :open="tocOpen"
      @close="tocOpen = false"
      @jump="jump"
    />
  </div>
</template>

<style scoped>
.app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.track-viewport {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.track {
  display: flex;
  height: 100%;
  transition: transform 420ms cubic-bezier(0.22, 0.61, 0.36, 1);
  will-change: transform;
}

.pipeline-mount {
  position: absolute;
  left: 0;
  right: 0;
  pointer-events: none;
  z-index: 5;
  display: flex;
  justify-content: center;
  opacity: 0;
  transition: opacity 280ms ease, top 360ms cubic-bezier(0.22, 0.61, 0.36, 1);
}
.pipeline-mount.active {
  opacity: 1;
}

.pipeline-inner {
  width: 100%;
  max-width: var(--slide-max-w);
  padding: 0 var(--slide-pad-x);
  box-sizing: border-box;
  height: 100%;
}

.pipeline-slot {
  height: 100%;
  pointer-events: auto;
  transition: width 360ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

@media (max-width: 1400px) {
  .pipeline-inner {
    padding: 0 56px;
  }
}
@media (max-width: 1100px) {
  .pipeline-inner {
    padding: 0 48px;
  }
  .pipeline-mount {
    display: none;
  }
}

.toc-toggle {
  position: fixed;
  top: 22px;
  left: 24px;
  width: 36px;
  height: 36px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 20;
  transition: background 120ms ease;
}
.toc-toggle:hover {
  background: var(--bg-elevated);
}
.bar {
  display: block;
  width: 16px;
  height: 1.5px;
  background: var(--text-muted);
  border-radius: 2px;
}

.brand {
  position: fixed;
  top: 28px;
  right: 72px;
  z-index: 10;
  pointer-events: none;
}

.brand-label {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  color: var(--text-subtle);
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

@media (max-width: 1100px) {
  .brand {
    right: 48px;
  }
}

@media (max-width: 720px) {
  .brand {
    right: 28px;
  }
  .toc-toggle {
    top: 16px;
    left: 14px;
  }
}
</style>
