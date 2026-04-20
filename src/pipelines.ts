export type NodeState = 'base' | 'added' | 'changed' | 'removed' | 'muted'
export type EdgeState = NodeState

export interface PipelineNode {
  id: string
  label: string
  row: number
  col?: number
  w?: number
  state?: NodeState
}

export interface PipelineEdge {
  from: string
  to: string
  state?: EdgeState
}

export interface PipelinePanel {
  key: string
  label?: string
  rowGap?: number
  colGap?: number
  faded?: boolean
  nodes: PipelineNode[]
  edges: PipelineEdge[]
}

export interface PipelineConfig {
  layout: 'stack' | 'row'
  /** Desktop overlay slot width in px — reserves horizontal space on the slide. */
  colWidth: number
  topOffset?: number
  panels: PipelinePanel[]
}

const s = <T extends string>(v: T): T => v

/**
 * Every pipeline is verbatim from harness-engineering.md. Do NOT add
 * upstream / downstream nodes that aren't in the md code blocks.
 *
 * Panels auto-fit their viewBox to node content — no canvas width needed.
 * `colGap` is center-to-center spacing between columns. `colWidth` only
 * controls the desktop overlay slot width.
 */
export const pipelines: Record<string, PipelineConfig> = {
  // Part 1 / Step 1
  //   task → plan mode → plan
  '11': {
    layout: 'stack',
    colWidth: 220,
    panels: [
      {
        key: 'main',
        rowGap: 56,
        nodes: [
          { id: 'task',      label: 'task',      row: 0, col: 0 },
          { id: 'plan-mode', label: 'plan mode', row: 1, col: 0 },
          { id: 'plan',      label: 'plan',      row: 2, col: 0 },
        ],
        edges: [
          { from: 'task',      to: 'plan-mode' },
          { from: 'plan-mode', to: 'plan' },
        ],
      },
    ],
  },

  // Part 1 / Step 2
  //   task → plan agent → plan review → plan
  '12': {
    layout: 'stack',
    colWidth: 220,
    panels: [
      {
        key: 'main',
        rowGap: 54,
        nodes: [
          { id: 'task',        label: 'task',        row: 0, col: 0 },
          { id: 'plan-agent',  label: 'plan agent',  row: 1, col: 0, state: s('added') },
          { id: 'plan-review', label: 'plan review', row: 2, col: 0, state: s('added') },
          { id: 'plan',        label: 'plan',        row: 3, col: 0 },
        ],
        edges: [
          { from: 'task',        to: 'plan-agent' },
          { from: 'plan-agent',  to: 'plan-review', state: s('added') },
          { from: 'plan-review', to: 'plan' },
        ],
      },
    ],
  },

  // Part 1 / Step 3 (SDD + TDD)
  //   task → spec agent → spec → plan agent → plan review → plan
  '13': {
    layout: 'stack',
    colWidth: 220,
    panels: [
      {
        key: 'main',
        rowGap: 48,
        nodes: [
          { id: 'task',        label: 'task',        row: 0, col: 0 },
          { id: 'spec-agent',  label: 'spec agent',  row: 1, col: 0, state: s('added') },
          { id: 'spec',        label: 'spec',        row: 2, col: 0, state: s('added') },
          { id: 'plan-agent',  label: 'plan agent',  row: 3, col: 0 },
          { id: 'plan-review', label: 'plan review', row: 4, col: 0 },
          { id: 'plan',        label: 'plan',        row: 5, col: 0 },
        ],
        edges: [
          { from: 'task',        to: 'spec-agent' },
          { from: 'spec-agent',  to: 'spec',       state: s('added') },
          { from: 'spec',        to: 'plan-agent' },
          { from: 'plan-agent',  to: 'plan-review' },
          { from: 'plan-review', to: 'plan' },
        ],
      },
    ],
  },

  // Part 2 / Step 1
  //   spec → plan-explorer → plan agent → [plan-reviewer + spec-compliance-reviewer] → plan
  '15': {
    layout: 'stack',
    colWidth: 460,
    panels: [
      {
        key: 'main',
        rowGap: 54,
        colGap: 100,
        nodes: [
          { id: 'spec',     label: 'spec',                     row: 0, col: 0 },
          { id: 'explorer', label: 'plan-explorer',            row: 1, col: 0, state: s('added'), w: 128 },
          { id: 'agent',    label: 'plan agent',               row: 2, col: 0, state: s('changed'), w: 112 },
          { id: 'rv-plan',  label: 'plan-reviewer',            row: 3, col: -1, state: s('added'), w: 128 },
          { id: 'rv-spec',  label: 'spec-compliance-reviewer', row: 3, col:  1, state: s('added'), w: 196 },
          { id: 'plan',     label: 'plan',                     row: 4, col: 0 },
        ],
        edges: [
          { from: 'spec',     to: 'explorer' },
          { from: 'explorer', to: 'agent' },
          { from: 'agent',    to: 'rv-plan' },
          { from: 'agent',    to: 'rv-spec' },
          { from: 'rv-plan',  to: 'plan' },
          { from: 'rv-spec',  to: 'plan' },
        ],
      },
    ],
  },

  // Part 2 / Step 2
  //   spec → plan-explorer → plan agent → plan-challenger → [plan-reviewer + spec-compliance-reviewer] → plan
  '16': {
    layout: 'stack',
    colWidth: 460,
    panels: [
      {
        key: 'main',
        rowGap: 50,
        colGap: 100,
        nodes: [
          { id: 'spec',       label: 'spec',                     row: 0, col: 0 },
          { id: 'explorer',   label: 'plan-explorer',            row: 1, col: 0, w: 128 },
          { id: 'agent',      label: 'plan agent',               row: 2, col: 0, w: 112 },
          { id: 'challenger', label: 'plan-challenger',          row: 3, col: 0, state: s('added'), w: 144 },
          { id: 'rv-plan',    label: 'plan-reviewer',            row: 4, col: -1, w: 128 },
          { id: 'rv-spec',    label: 'spec-compliance-reviewer', row: 4, col:  1, w: 196 },
          { id: 'plan',       label: 'plan',                     row: 5, col: 0 },
        ],
        edges: [
          { from: 'spec',       to: 'explorer' },
          { from: 'explorer',   to: 'agent' },
          { from: 'agent',      to: 'challenger' },
          { from: 'challenger', to: 'rv-plan' },
          { from: 'challenger', to: 'rv-spec' },
          { from: 'rv-plan',    to: 'plan' },
          { from: 'rv-spec',    to: 'plan' },
        ],
      },
    ],
  },

  // 17：no pipeline — concept slide about plan-conventions.md 外部化

  // Part 2 / Step 4：序列化 reviewer + challenger
  //   spec → plan-explorer → plan agent → plan-spec-reviewer → plan-assumption-reviewer
  //        → plan-codebase-reviewer → plan-challenger → plan
  '18': {
    layout: 'stack',
    colWidth: 300,
    panels: [
      {
        key: 'main',
        rowGap: 40,
        nodes: [
          { id: 'spec',          label: 'spec',                     row: 0, col: 0 },
          { id: 'explorer',      label: 'plan-explorer',            row: 1, col: 0, w: 128 },
          { id: 'agent',         label: 'plan agent',               row: 2, col: 0, w: 112 },
          { id: 'rv-spec',       label: 'plan-spec-reviewer',       row: 3, col: 0, state: s('added'), w: 152 },
          { id: 'rv-assumption', label: 'plan-assumption-reviewer', row: 4, col: 0, state: s('added'), w: 196 },
          { id: 'rv-codebase',   label: 'plan-codebase-reviewer',   row: 5, col: 0, state: s('added'), w: 176 },
          { id: 'challenger',    label: 'plan-challenger',          row: 6, col: 0, state: s('changed'), w: 144 },
          { id: 'plan',          label: 'plan',                     row: 7, col: 0 },
        ],
        edges: [
          { from: 'spec',          to: 'explorer' },
          { from: 'explorer',      to: 'agent' },
          { from: 'agent',         to: 'rv-spec' },
          { from: 'rv-spec',       to: 'rv-assumption', state: s('added') },
          { from: 'rv-assumption', to: 'rv-codebase',  state: s('added') },
          { from: 'rv-codebase',   to: 'challenger' },
          { from: 'challenger',    to: 'plan' },
        ],
      },
    ],
  },

  // Part 2 / Step 5a：testcases 獨立性（partial — reviewer 留給 5b）
  //   spec → testcases agent → testcases
  '19': {
    layout: 'stack',
    colWidth: 240,
    panels: [
      {
        key: 'testcase',
        rowGap: 56,
        nodes: [
          { id: 'spec',      label: 'spec',            row: 0, col: 0 },
          { id: 'tc-agent',  label: 'testcases agent', row: 1, col: 0, state: s('added'), w: 152 },
          { id: 'testcases', label: 'testcases',       row: 2, col: 0, state: s('added') },
        ],
        edges: [
          { from: 'spec',     to: 'tc-agent' },
          { from: 'tc-agent', to: 'testcases', state: s('added') },
        ],
      },
    ],
  },

  // Part 2 / Step 5b：+ testcases-reviewer
  //   spec → testcases agent → testcases-reviewer → testcases
  '20': {
    layout: 'stack',
    colWidth: 260,
    panels: [
      {
        key: 'testcase',
        rowGap: 52,
        nodes: [
          { id: 'spec',        label: 'spec',               row: 0, col: 0 },
          { id: 'tc-agent',    label: 'testcases agent',    row: 1, col: 0, w: 152 },
          { id: 'tc-reviewer', label: 'testcases-reviewer', row: 2, col: 0, state: s('added'), w: 172 },
          { id: 'testcases',   label: 'testcases',          row: 3, col: 0 },
        ],
        edges: [
          { from: 'spec',        to: 'tc-agent' },
          { from: 'tc-agent',    to: 'tc-reviewer' },
          { from: 'tc-reviewer', to: 'testcases' },
        ],
      },
    ],
  },

  // Part 2 / Step 6a：tdd-composer
  //   plan + testcases → tdd-composer → RED → GREEN → Simplify
  '21': {
    layout: 'stack',
    colWidth: 440,
    panels: [
      {
        key: 'tdd',
        rowGap: 54,
        colGap: 140,
        nodes: [
          { id: 'plan',     label: 'plan',         row: 0, col: -1 },
          { id: 'tc',       label: 'testcases',    row: 0, col:  1 },
          { id: 'composer', label: 'tdd-composer', row: 1, col:  0, state: s('added'), w: 132 },
          { id: 'red',      label: 'RED',          row: 2, col:  0, state: s('added'), w: 80 },
          { id: 'green',    label: 'GREEN',        row: 3, col:  0, state: s('added'), w: 80 },
          { id: 'simp',     label: 'Simplify',     row: 4, col:  0, state: s('added'), w: 96 },
        ],
        edges: [
          { from: 'plan',     to: 'composer' },
          { from: 'tc',       to: 'composer' },
          { from: 'composer', to: 'red',      state: s('added') },
          { from: 'red',      to: 'green',    state: s('added') },
          { from: 'green',    to: 'simp',     state: s('added') },
        ],
      },
    ],
  },

  // 22 (GREEN rounds)：no pipeline — concept slide

  // Part 3 / Step 1
  //   task → spec-explorer → spec agent → spec-reviewer → testcases agent → testcases-reviewer → testcases
  '23': {
    layout: 'stack',
    colWidth: 260,
    panels: [
      {
        key: 'spec',
        rowGap: 44,
        nodes: [
          { id: 'task',        label: 'task',               row: 0, col: 0 },
          { id: 'spec-ex',     label: 'spec-explorer',      row: 1, col: 0, state: s('added'), w: 128 },
          { id: 'spec-agent',  label: 'spec agent',         row: 2, col: 0 },
          { id: 'spec-rv',     label: 'spec-reviewer',      row: 3, col: 0, state: s('added'), w: 128 },
          { id: 'tc-agent',    label: 'testcases agent',    row: 4, col: 0, w: 152 },
          { id: 'tc-rv',       label: 'testcases-reviewer', row: 5, col: 0, w: 172 },
          { id: 'testcases',   label: 'testcases',          row: 6, col: 0 },
        ],
        edges: [
          { from: 'task',       to: 'spec-ex' },
          { from: 'spec-ex',    to: 'spec-agent' },
          { from: 'spec-agent', to: 'spec-rv' },
          { from: 'spec-rv',    to: 'tc-agent' },
          { from: 'tc-agent',   to: 'tc-rv' },
          { from: 'tc-rv',      to: 'testcases' },
        ],
      },
    ],
  },

  // Part 3 / Step 2
  //   task → brief-from-task → brief → spec-explorer → spec-from-brief → spec-reviewer
  //        → testcases agent → testcases-reviewer → testcases
  '24': {
    layout: 'stack',
    colWidth: 260,
    panels: [
      {
        key: 'spec',
        rowGap: 40,
        nodes: [
          { id: 'task',        label: 'task',               row: 0, col: 0 },
          { id: 'brief-agent', label: 'brief-from-task',    row: 1, col: 0, state: s('added'), w: 144 },
          { id: 'brief',       label: 'brief',              row: 2, col: 0, state: s('added') },
          { id: 'spec-ex',     label: 'spec-explorer',      row: 3, col: 0, w: 128 },
          { id: 'spec-agent',  label: 'spec-from-brief',    row: 4, col: 0, state: s('changed'), w: 140 },
          { id: 'spec-rv',     label: 'spec-reviewer',      row: 5, col: 0, w: 128 },
          { id: 'tc-agent',    label: 'testcases agent',    row: 6, col: 0, w: 152 },
          { id: 'tc-rv',       label: 'testcases-reviewer', row: 7, col: 0, w: 172 },
          { id: 'testcases',   label: 'testcases',          row: 8, col: 0 },
        ],
        edges: [
          { from: 'task',        to: 'brief-agent' },
          { from: 'brief-agent', to: 'brief',       state: s('added') },
          { from: 'brief',       to: 'spec-ex' },
          { from: 'spec-ex',     to: 'spec-agent' },
          { from: 'spec-agent',  to: 'spec-rv' },
          { from: 'spec-rv',     to: 'tc-agent' },
          { from: 'tc-agent',    to: 'tc-rv' },
          { from: 'tc-rv',       to: 'testcases' },
        ],
      },
    ],
  },

  // Part 3 / Step 3
  //   task → brief-from-task → brief → spec-explorer → domain-extractor → spec-from-brief
  //        → spec-reviewer → testcases agent → testcases-reviewer → testcases
  '25': {
    layout: 'stack',
    colWidth: 260,
    panels: [
      {
        key: 'spec',
        rowGap: 38,
        nodes: [
          { id: 'task',        label: 'task',               row: 0, col: 0 },
          { id: 'brief-agent', label: 'brief-from-task',    row: 1, col: 0, w: 144 },
          { id: 'brief',       label: 'brief',              row: 2, col: 0 },
          { id: 'spec-ex',     label: 'spec-explorer',      row: 3, col: 0, w: 128 },
          { id: 'domain',      label: 'domain-extractor',   row: 4, col: 0, state: s('added'), w: 148 },
          { id: 'spec-agent',  label: 'spec-from-brief',    row: 5, col: 0, w: 140 },
          { id: 'spec-rv',     label: 'spec-reviewer',      row: 6, col: 0, w: 128 },
          { id: 'tc-agent',    label: 'testcases agent',    row: 7, col: 0, w: 152 },
          { id: 'tc-rv',       label: 'testcases-reviewer', row: 8, col: 0, w: 172 },
          { id: 'testcases',   label: 'testcases',          row: 9, col: 0 },
        ],
        edges: [
          { from: 'task',        to: 'brief-agent' },
          { from: 'brief-agent', to: 'brief' },
          { from: 'brief',       to: 'spec-ex' },
          { from: 'spec-ex',     to: 'domain' },
          { from: 'domain',      to: 'spec-agent' },
          { from: 'spec-agent',  to: 'spec-rv' },
          { from: 'spec-rv',     to: 'tc-agent' },
          { from: 'tc-agent',    to: 'tc-rv' },
          { from: 'tc-rv',       to: 'testcases' },
        ],
      },
    ],
  },
}
