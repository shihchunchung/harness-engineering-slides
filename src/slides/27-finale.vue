<script setup lang="ts"></script>

<template>
  <section class="slide-frame finale">
    <svg
      class="full-pipeline"
      viewBox="0 0 1100 620"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <marker id="fn-ah" viewBox="0 0 10 10" refX="9" refY="5"
          markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
      </defs>

      <g class="pl">
        <!-- spec side (top row) -->
        <g class="node"><rect x="30"  y="30"  width="70"  height="26" rx="3" /><text x="65"  y="47">task</text></g>
        <g class="node"><rect x="140" y="30"  width="130" height="26" rx="3" /><text x="205" y="47">brief-from-task</text></g>
        <g class="node"><rect x="310" y="30"  width="70"  height="26" rx="3" /><text x="345" y="47">brief</text></g>
        <g class="node"><rect x="420" y="30"  width="124" height="26" rx="3" /><text x="482" y="47">spec-explorer</text></g>
        <g class="node"><rect x="584" y="30"  width="142" height="26" rx="3" /><text x="655" y="47">domain-extractor</text></g>
        <g class="node"><rect x="766" y="30"  width="134" height="26" rx="3" /><text x="833" y="47">spec-from-brief</text></g>
        <g class="node"><rect x="940" y="30"  width="70"  height="26" rx="3" /><text x="975" y="47">spec</text></g>

        <path d="M 100 43 L 140 43" marker-end="url(#fn-ah)" />
        <path d="M 270 43 L 310 43" marker-end="url(#fn-ah)" />
        <path d="M 380 43 L 420 43" marker-end="url(#fn-ah)" />
        <path d="M 544 43 L 584 43" marker-end="url(#fn-ah)" />
        <path d="M 726 43 L 766 43" marker-end="url(#fn-ah)" />
        <path d="M 900 43 L 940 43" marker-end="url(#fn-ah)" />

        <!-- spec-reviewer -->
        <path d="M 975 56 L 975 94" marker-end="url(#fn-ah)" />
        <g class="node"><rect x="912" y="94" width="126" height="26" rx="3" /><text x="975" y="111">spec-reviewer</text></g>

        <!-- split: spec → plan side (left), testcases side (right) -->
        <path d="M 975 120 L 975 164 L 300 164 L 300 194" marker-end="url(#fn-ah)" />
        <path d="M 975 120 L 975 164 L 900 164 L 900 194" marker-end="url(#fn-ah)" />

        <!-- plan side (left column) -->
        <g class="node"><rect x="230" y="194" width="140" height="26" rx="3" /><text x="300" y="211">plan-explorer</text></g>
        <path d="M 300 220 L 300 254" marker-end="url(#fn-ah)" />
        <g class="node"><rect x="240" y="254" width="120" height="26" rx="3" /><text x="300" y="271">plan agent</text></g>
        <path d="M 300 280 L 300 314" marker-end="url(#fn-ah)" />
        <g class="node"><rect x="240" y="314" width="120" height="26" rx="3" /><text x="300" y="331">draft plan</text></g>

        <!-- 3 plan reviewers -->
        <path d="M 300 340 L 300 370 L 120 370 L 120 400" marker-end="url(#fn-ah)" />
        <path d="M 300 340 L 300 400" marker-end="url(#fn-ah)" />
        <path d="M 300 340 L 300 370 L 480 370 L 480 400" marker-end="url(#fn-ah)" />

        <g class="node"><rect x="50"  y="400" width="140" height="26" rx="3" /><text x="120" y="417">plan-spec-rv</text></g>
        <g class="node"><rect x="210" y="400" width="180" height="26" rx="3" /><text x="300" y="417">plan-assumption-rv</text></g>
        <g class="node"><rect x="410" y="400" width="140" height="26" rx="3" /><text x="480" y="417">plan-codebase-rv</text></g>

        <!-- decision gate + orchestrator fix + challenger -->
        <path d="M 120 426 L 120 450 L 300 450 L 300 470" marker-end="url(#fn-ah)" />
        <path d="M 300 426 L 300 470" marker-end="url(#fn-ah)" />
        <path d="M 480 426 L 480 450 L 300 450 L 300 470" />
        <g class="node"><rect x="234" y="470" width="132" height="26" rx="3" /><text x="300" y="487">decision gate</text></g>
        <path d="M 300 496 L 300 524" marker-end="url(#fn-ah)" />
        <g class="node"><rect x="230" y="524" width="140" height="26" rx="3" /><text x="300" y="541">plan-challenger</text></g>
        <path d="M 300 550 L 300 578" marker-end="url(#fn-ah)" />
        <g class="node"><rect x="230" y="578" width="140" height="26" rx="3" /><text x="300" y="595">reviewed plan</text></g>

        <!-- testcases side (right column) -->
        <g class="node"><rect x="830" y="194" width="140" height="26" rx="3" /><text x="900" y="211">testcases agent</text></g>
        <path d="M 900 220 L 900 254" marker-end="url(#fn-ah)" />
        <g class="node"><rect x="820" y="254" width="160" height="26" rx="3" /><text x="900" y="271">testcases-reviewer</text></g>
        <path d="M 900 280 L 900 314" marker-end="url(#fn-ah)" />
        <g class="node"><rect x="820" y="314" width="160" height="26" rx="3" /><text x="900" y="331">reviewed testcases</text></g>

        <!-- converge to tdd-composer -->
        <path d="M 300 604 L 300 614 L 600 614 L 600 498 L 650 498" />
        <path d="M 900 340 L 900 498 L 860 498" />
        <g class="node"><rect x="650" y="484" width="130" height="28" rx="3" /><text x="715" y="502">tdd-composer</text></g>

        <path d="M 715 512 L 715 544" marker-end="url(#fn-ah)" />
        <g class="node"><rect x="670" y="544" width="90" height="26" rx="3" /><text x="715" y="561">RED</text></g>
        <path d="M 770 557 L 812 557" marker-end="url(#fn-ah)" />
        <g class="node"><rect x="812" y="544" width="100" height="26" rx="3" /><text x="862" y="561">GREEN</text></g>
        <path d="M 912 557 L 954 557" marker-end="url(#fn-ah)" />
        <g class="node"><rect x="954" y="544" width="110" height="26" rx="3" /><text x="1009" y="561">Simplify</text></g>
      </g>
    </svg>

    <div class="inner">
      <div class="eyebrow">
        <span class="tag">HARNESS&nbsp;ENGINEERING</span>
        <span class="sep">·</span>
        <span class="sub">the full pipeline</span>
      </div>

      <h1 class="title">harness 是<br />持續演進的控制系統</h1>
      <div class="title-rule"></div>
      <p class="lede">
        每個部件都內含一個「agent 在這件事上做不好」的假設。<br />
        觀察什麼反覆出問題，把問題工程化成結構，問題退場；下一層新問題浮現，再做一輪。
      </p>
    </div>

    <div class="meta-strip">
      <span>END</span>
      <span class="dot">·</span>
      <span>27 / 27</span>
      <span class="dot">·</span>
      <span>THANK YOU</span>
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

.finale {
  background:
    radial-gradient(circle at 70% 50%, rgba(212, 120, 87, 0.05), transparent 60%),
    var(--bg);
}

.full-pipeline {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 92%;
  max-width: 1320px;
  height: auto;
  opacity: 0.12;
  color: var(--text-muted);
  pointer-events: none;
}
.full-pipeline .node rect {
  fill: transparent;
  stroke: currentColor;
  stroke-width: 1;
}
.full-pipeline .node text {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 10.5px;
  fill: currentColor;
  text-anchor: middle;
}
.full-pipeline .pl path {
  fill: none;
  stroke: currentColor;
  stroke-width: 1;
}

.inner {
  position: relative;
  z-index: 1;
  max-width: 780px;
  padding: 0 72px;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.eyebrow {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 12px;
  letter-spacing: 0.22em;
  color: var(--text-subtle);
  text-transform: uppercase;
  margin-bottom: 22px;
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
  font-size: 64px;
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text);
  margin: 0;
}

.title-rule {
  width: 96px;
  height: 1px;
  background: var(--accent);
  margin: 28px 0 22px;
}

.lede {
  color: var(--text-muted);
  font-size: 16px;
  line-height: 1.7;
  margin: 0;
  max-width: 560px;
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
  .title {
    font-size: 48px;
  }
  .inner {
    padding: 0 48px;
  }
  .meta-strip {
    left: 48px;
  }
}

@media (max-width: 720px) {
  .title {
    font-size: 34px;
  }
  .inner {
    padding: 0 28px;
  }
  .lede {
    font-size: 14px;
  }
  .meta-strip {
    left: 28px;
    bottom: 20px;
  }
}
</style>
