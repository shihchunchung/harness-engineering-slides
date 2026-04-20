<script setup lang="ts">
import { computed } from 'vue'

interface Node {
  id: string
  label: string
  row: number
  col?: number
  w?: number
  state?: 'base' | 'added' | 'changed' | 'removed' | 'muted'
}

interface Edge {
  from: string
  to: string
  state?: 'base' | 'added' | 'changed' | 'removed' | 'muted'
}

const props = withDefaults(
  defineProps<{
    nodes: Node[]
    edges: Edge[]
    /** row vertical spacing in px (default 54) */
    rowGap?: number
    /** column horizontal spacing (center-to-center) in px (default 150) */
    colGap?: number
    /** top padding in px (default 14) */
    padTop?: number
    /** horizontal padding inside the viewBox around content bbox (default 16) */
    padX?: number
    /** Render entire pipeline as muted (opacity + desaturated). */
    faded?: boolean
  }>(),
  {
    rowGap: 54,
    colGap: 150,
    padTop: 14,
    padX: 16,
    faded: false,
  },
)

const NODE_H = 28

interface PositionedNode {
  id: string
  label: string
  state?: Node['state']
  w: number
  cx: number
  cy: number
}

function estimateWidth(label: string): number {
  const base = label.length * 7.6 + 22
  return Math.max(60, Math.min(220, Math.round(base)))
}

const positioned = computed<Map<string, PositionedNode>>(() => {
  const map = new Map<string, PositionedNode>()
  for (const n of props.nodes) {
    if (n.state === 'removed') continue
    const w = n.w ?? estimateWidth(n.label)
    const col = n.col ?? 0
    const cx = col * props.colGap
    const cy = props.padTop + n.row * props.rowGap + NODE_H / 2
    map.set(n.id, {
      id: n.id,
      label: n.label,
      state: n.state,
      w,
      cx,
      cy,
    })
  }
  return map
})

const positionedList = computed(() => [...positioned.value.values()])

const bounds = computed(() => {
  let minX = 0
  let maxX = 0
  let first = true
  for (const n of positioned.value.values()) {
    const l = n.cx - n.w / 2
    const r = n.cx + n.w / 2
    if (first) {
      minX = l
      maxX = r
      first = false
    } else {
      if (l < minX) minX = l
      if (r > maxX) maxX = r
    }
  }
  return { minX: minX - props.padX, maxX: maxX + props.padX }
})

const viewBoxX = computed(() => bounds.value.minX)
const viewBoxWidth = computed(() => bounds.value.maxX - bounds.value.minX)

const height = computed(() => {
  const maxRow = Math.max(0, ...props.nodes.map((n) => n.row))
  return props.padTop * 2 + (maxRow + 1) * props.rowGap
})

interface EdgeGeom {
  key: string
  d: string
  state?: Edge['state']
}

const edgeGeoms = computed<EdgeGeom[]>(() => {
  const geoms: EdgeGeom[] = []
  for (const e of props.edges) {
    const a = positioned.value.get(e.from)
    const b = positioned.value.get(e.to)
    if (!a || !b) continue
    const fromY = a.cy + NODE_H / 2
    const toY = b.cy - NODE_H / 2
    geoms.push({
      key: `${e.from}->${e.to}`,
      d: buildPath(a.cx, fromY, b.cx, toY),
      state: e.state,
    })
  }
  return geoms
})

// Always emit a 4-point orthogonal path so d-string shape stays
// stable for CSS transitions, including the straight-vertical case.
function buildPath(x1: number, y1: number, x2: number, y2: number): string {
  const mid = (y1 + y2) / 2
  return `M ${x1} ${y1} L ${x1} ${mid} L ${x2} ${mid} L ${x2} ${y2}`
}

const arrowMarkerId = `pp-ah-${Math.random().toString(36).slice(2, 8)}`
const arrowAccentMarkerId = `pp-ahn-${Math.random().toString(36).slice(2, 8)}`
</script>

<template>
  <figure class="pipeline" :class="{ faded }">
    <div class="frame">
      <svg
        class="pp"
        :viewBox="`${viewBoxX} 0 ${viewBoxWidth} ${height}`"
        preserveAspectRatio="xMidYMid meet"
        :style="{ width: viewBoxWidth + 'px', height: height + 'px' }"
      >
        <defs>
          <marker
            :id="arrowMarkerId"
            viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="6" markerHeight="6"
            orient="auto-start-reverse"
          >
            <path class="ah" d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
          <marker
            :id="arrowAccentMarkerId"
            viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="6" markerHeight="6"
            orient="auto-start-reverse"
          >
            <path class="ah-new" d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        </defs>

        <TransitionGroup tag="g" name="pp-edge">
          <path
            v-for="e in edgeGeoms"
            :key="e.key"
            :class="['e', e.state === 'added' || e.state === 'changed' ? 'e-new' : '', e.state === 'muted' ? 'e-muted' : '']"
            :d="e.d"
            :marker-end="`url(#${e.state === 'added' || e.state === 'changed' ? arrowAccentMarkerId : arrowMarkerId})`"
          />
        </TransitionGroup>

        <TransitionGroup tag="g" name="pp-node">
          <g
            v-for="n in positionedList"
            :key="n.id"
            :class="['n', 'n-' + (n.state || 'base')]"
            :transform="`translate(${n.cx} ${n.cy})`"
          >
            <rect
              class="n-rect"
              :x="-n.w / 2" :y="-NODE_H / 2"
              :width="n.w" :height="NODE_H"
              rx="3"
            />
            <text y="4" text-anchor="middle">{{ n.label }}</text>
            <text
              v-if="n.state === 'added'"
              class="badge badge-add"
              :x="n.w / 2 + 4" :y="-NODE_H / 2 - 2"
            >+</text>
            <text
              v-else-if="n.state === 'changed'"
              class="badge badge-mod"
              :x="n.w / 2 + 4" :y="-NODE_H / 2 - 2"
            >~</text>
          </g>
        </TransitionGroup>
      </svg>
    </div>
  </figure>
</template>

<style scoped>
.pipeline {
  margin: 0;
  display: flex;
  flex-direction: column;
  transition: opacity 320ms ease;
}

.pipeline.faded {
  opacity: 0.5;
}

.frame {
  padding: 20px 22px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  display: inline-flex;
  justify-content: center;
  transition: background 320ms ease, border-color 320ms ease;
}

.pp {
  max-width: 100%;
  display: block;
  transition: width 360ms cubic-bezier(0.22, 0.61, 0.36, 1),
              height 360ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.pp text {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11.5px;
  fill: var(--text);
  letter-spacing: 0.01em;
}

.pp .n {
  transition: opacity 260ms ease;
}

.pp .n-rect {
  fill: transparent;
  stroke: var(--border-strong);
  stroke-width: 1;
  transition:
    stroke 280ms ease,
    stroke-width 280ms ease,
    stroke-dasharray 280ms ease;
}
.pp .n-added .n-rect {
  stroke: var(--accent);
  stroke-width: 1.5;
}
.pp .n-added text {
  font-weight: 500;
}
.pp .n-changed .n-rect {
  stroke: var(--divider);
  stroke-width: 1;
  stroke-dasharray: 3 2.5;
}
.pp .n-changed text {
  font-weight: 500;
}
.pp .n-muted .n-rect {
  stroke: var(--border-strong);
  stroke-dasharray: 2 2;
}
.pp .n-muted text {
  fill: var(--text-dim);
}
.pp .n-muted {
  opacity: 0.6;
}

.pp .badge {
  font-size: 10px;
  font-weight: 600;
  font-family: 'JetBrains Mono', monospace;
}
.pp .badge-add {
  fill: var(--accent);
}
.pp .badge-mod {
  fill: var(--text);
}

.pp .e {
  fill: none;
  stroke: var(--border-strong);
  stroke-width: 1;
  transition:
    d 380ms cubic-bezier(0.22, 0.61, 0.36, 1),
    stroke 280ms ease,
    stroke-width 280ms ease,
    opacity 260ms ease;
}
.pp .e-new {
  stroke: var(--accent);
  stroke-width: 1.4;
}
.pp .e-muted {
  stroke: var(--border);
  stroke-dasharray: 2 2;
  opacity: 0.5;
}

.pp .ah {
  fill: var(--border-strong);
}
.pp .ah-new {
  fill: var(--accent);
}

/* Enter/leave transitions for nodes & edges when panel content changes */
.pp-node-enter-from,
.pp-node-leave-to {
  opacity: 0;
}
.pp-node-enter-active {
  transition: opacity 320ms ease 80ms;
}
.pp-node-leave-active {
  transition: opacity 180ms ease;
}

.pp-edge-enter-from,
.pp-edge-leave-to {
  opacity: 0;
}
.pp-edge-enter-active {
  transition: opacity 260ms ease 120ms;
}
.pp-edge-leave-active {
  transition: opacity 160ms ease;
}
</style>
