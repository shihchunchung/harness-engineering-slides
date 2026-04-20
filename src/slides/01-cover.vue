<script setup lang="ts"></script>

<template>
  <section class="slide-frame cover">
    <svg
      class="bg-pipeline"
      viewBox="0 0 800 520"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <marker id="cover-ah" viewBox="0 0 10 10" refX="9" refY="5"
          markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
      </defs>
      <g class="pl">
        <g class="node"><rect x="60"  y="60"  width="78"  height="26" rx="3" /><text x="99"  y="77">task</text></g>
        <g class="node"><rect x="190" y="60"  width="110" height="26" rx="3" /><text x="245" y="77">brief-from-task</text></g>
        <g class="node"><rect x="352" y="60"  width="78"  height="26" rx="3" /><text x="391" y="77">brief</text></g>
        <g class="node"><rect x="482" y="60"  width="132" height="26" rx="3" /><text x="548" y="77">spec-explorer</text></g>
        <g class="node"><rect x="666" y="60"  width="110" height="26" rx="3" /><text x="721" y="77">spec-from-brief</text></g>

        <path d="M 138 73 L 190 73"  marker-end="url(#cover-ah)" />
        <path d="M 300 73 L 352 73"  marker-end="url(#cover-ah)" />
        <path d="M 430 73 L 482 73"  marker-end="url(#cover-ah)" />
        <path d="M 614 73 L 666 73"  marker-end="url(#cover-ah)" />

        <path d="M 721 86  L 721 170 L 200 170 L 200 210" marker-end="url(#cover-ah)" />
        <path d="M 721 86  L 721 170 L 420 170 L 420 210" marker-end="url(#cover-ah)" />
        <path d="M 721 86  L 721 170 L 640 170 L 640 210" marker-end="url(#cover-ah)" />

        <g class="node"><rect x="130" y="210" width="140" height="26" rx="3" /><text x="200" y="227">plan-spec-rv</text></g>
        <g class="node"><rect x="340" y="210" width="160" height="26" rx="3" /><text x="420" y="227">plan-assumption-rv</text></g>
        <g class="node"><rect x="560" y="210" width="160" height="26" rx="3" /><text x="640" y="227">plan-codebase-rv</text></g>

        <path d="M 200 236 L 200 290 L 420 290 L 420 320" marker-end="url(#cover-ah)" />
        <path d="M 420 236 L 420 320" marker-end="url(#cover-ah)" />
        <path d="M 640 236 L 640 290 L 420 290 L 420 320" />

        <g class="node"><rect x="350" y="320" width="140" height="26" rx="3" /><text x="420" y="337">decision gate</text></g>

        <path d="M 420 346 L 420 400" marker-end="url(#cover-ah)" />
        <g class="node"><rect x="352" y="400" width="136" height="26" rx="3" /><text x="420" y="417">reviewed plan</text></g>

        <path d="M 488 413 L 560 413" marker-end="url(#cover-ah)" />
        <g class="node"><rect x="560" y="400" width="100" height="26" rx="3" /><text x="610" y="417">tdd-composer</text></g>
      </g>
    </svg>

    <div class="inner">
      <div class="eyebrow">
        <span class="tag">HARNESS&nbsp;ENGINEERING</span>
        <span class="sep">·</span>
        <span class="sub">演進實錄</span>
      </div>

      <h1 class="title">Harness&nbsp;Engineering</h1>
      <div class="title-rule"></div>
      <p class="lede">agent 系統外部控制層的工程實務</p>
    </div>

    <div class="meta-strip">
      <span>26 SLIDES</span>
      <span class="dot">·</span>
      <span>3 PARTS</span>
      <span class="dot">·</span>
      <span>INTERNAL</span>
    </div>
  </section>
</template>

<style scoped>
.slide-frame {
  width: 100vw;
  height: 100vh;
  flex: 0 0 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.cover {
  background:
    radial-gradient(circle at 28% 28%, rgba(124, 197, 255, 0.055), transparent 58%),
    radial-gradient(circle at 82% 72%, rgba(109, 209, 154, 0.028), transparent 55%),
    var(--bg);
}

.bg-pipeline {
  position: absolute;
  top: 50%;
  right: -6%;
  transform: translateY(-50%);
  width: 62%;
  max-width: 960px;
  height: auto;
  opacity: 0.085;
  color: var(--text-muted);
  pointer-events: none;
}
.bg-pipeline .node rect {
  fill: transparent;
  stroke: currentColor;
  stroke-width: 1;
}
.bg-pipeline .node text {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  fill: currentColor;
  text-anchor: middle;
}
.bg-pipeline .pl path {
  fill: none;
  stroke: currentColor;
  stroke-width: 1;
}

.inner {
  position: relative;
  z-index: 1;
  max-width: 960px;
  padding: 0 72px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.eyebrow {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 12px;
  letter-spacing: 0.22em;
  color: var(--text-subtle);
  text-transform: uppercase;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.eyebrow .tag {
  color: var(--text-muted);
}
.eyebrow .sep {
  color: var(--divider);
}
.eyebrow .sub {
  color: var(--text-subtle);
  letter-spacing: 0.14em;
  text-transform: none;
  font-size: 12.5px;
}

.title {
  font-size: 80px;
  font-weight: 500;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: var(--text);
  margin: 0;
}

.title-rule {
  width: 96px;
  height: 1px;
  background: var(--divider);
  margin: 28px 0 22px;
}

.lede {
  color: var(--text-muted);
  font-size: 18px;
  line-height: 1.6;
  margin: 0;
  max-width: 640px;
}

.meta-strip {
  position: absolute;
  bottom: 28px;
  left: 72px;
  z-index: 1;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  color: var(--text-subtle);
  display: flex;
  gap: 10px;
  align-items: center;
}
.meta-strip .dot {
  color: var(--divider);
}

@media (max-width: 1100px) {
  .title { font-size: 64px; }
  .inner { padding: 0 48px; }
  .bg-pipeline { right: -12%; width: 72%; }
  .meta-strip { left: 48px; }
}

@media (max-width: 720px) {
  .title { font-size: 44px; }
  .inner { padding: 0 28px; }
  .bg-pipeline { display: none; }
  .meta-strip { left: 28px; bottom: 20px; }
  .eyebrow { font-size: 11px; letter-spacing: 0.16em; }
  .lede { font-size: 15px; }
}
</style>
