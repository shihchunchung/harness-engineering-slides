import type { Component } from 'vue'

import Slide01 from './slides/01-cover.vue'
import Slide02 from './slides/02-intro.vue'
import Slide03 from './slides/03-consensus-themes.vue'
import Slide04 from './slides/04-theme-context.vue'
import Slide05 from './slides/05-theme-guides-sensors.vue'
import Slide06 from './slides/06-theme-separation.vue'
import Slide07 from './slides/07-theme-artifact.vue'
import Slide08 from './slides/08-theme-steering.vue'
import Slide09 from './slides/09-theme-convention.vue'
import Slide10 from './slides/10-evolution-intro.vue'
import Slide11 from './slides/11-p1-s1-baseline.vue'
import Slide12 from './slides/12-p1-s2-plan-review.vue'
import Slide13 from './slides/13-p1-s3-sdd-tdd.vue'
import Slide15 from './slides/15-p2-s1-split.vue'
import Slide16 from './slides/16-p2-s2-challenger.vue'
import Slide17 from './slides/17-p2-s3-conventions.vue'
import Slide18 from './slides/18-p2-s4-review-pipeline.vue'
import Slide19 from './slides/19-p2-s5a-testcases-independence.vue'
import Slide20 from './slides/20-p2-s5b-testcases-reviewer.vue'
import Slide21 from './slides/21-p2-s6a-tdd-composer.vue'
import Slide22 from './slides/22-p2-s6b-green-rounds.vue'
import Slide23 from './slides/23-p3-s1-spec-explorer.vue'
import Slide24 from './slides/24-p3-s2-brief.vue'
import Slide25 from './slides/25-p3-s3-domain.vue'
import Slide26 from './slides/26-decision-log.vue'
import Slide27 from './slides/27-finale.vue'

export type DotState = 'done' | 'cur' | 'todo'

export interface SlideMeta {
  id: string
  title: string
  group: string
  component: Component

  eyebrow?: string
  heading?: string
  lede?: string
  footerLabel?: string
  dots?: DotState[]
  bare?: boolean
}

const partDots = (total: number, current: number): DotState[] =>
  Array.from({ length: total }, (_, i) => {
    const step = i + 1
    if (step < current) return 'done'
    if (step === current) return 'cur'
    return 'todo'
  })

const P1_TOTAL = 3
const P2_TOTAL = 6
const P3_TOTAL = 3

const p1 = (step: number) => partDots(P1_TOTAL, step)
const p2 = (step: number) => partDots(P2_TOTAL, step)
const p3 = (step: number) => partDots(P3_TOTAL, step)

const FOOTER_P1 = "<span class='part'>Part 1</span> · Evolution"
const FOOTER_P2 = "<span class='part'>Part 2</span> · Evolution"
const FOOTER_P3 = "<span class='part'>Part 3</span> · Evolution"

export const slides: SlideMeta[] = [
  {
    id: '01',
    title: 'Harness Engineering',
    group: '開場',
    component: Slide01,
    bare: true,
  },
  {
    id: '02',
    title: '介紹：harness engineering 是什麼',
    group: '背景',
    component: Slide02,
    eyebrow: '介紹',
    heading: 'harness engineering 是什麼',
    footerLabel: '背景',
  },
  {
    id: '03',
    title: '各家的共識與討論',
    group: '背景',
    component: Slide03,
    eyebrow: '背景 · 各家共識 + 六主題',
    heading: '各家的共識與討論',
    footerLabel: '背景',
  },
  {
    id: '04',
    title: '主題 1：Context 管理',
    group: '六個主題',
    component: Slide04,
    eyebrow: '主題 1 · CONTEXT',
    heading: 'Context 管理',
    footerLabel: '六個主題',
  },
  {
    id: '05',
    title: '主題 2：Guides × Sensors',
    group: '六個主題',
    component: Slide05,
    eyebrow: '主題 2 · GUIDES × SENSORS',
    heading: 'Guides × Sensors 的控制迴路',
    footerLabel: '六個主題',
  },
  {
    id: '06',
    title: '主題 3：規劃 / 執行 / 驗證分離',
    group: '六個主題',
    component: Slide06,
    eyebrow: '主題 3 · SEPARATION',
    heading: '規劃 / 執行 / 驗證分離',
    footerLabel: '六個主題',
  },
  {
    id: '07',
    title: '主題 4：Artifact 外部化',
    group: '六個主題',
    component: Slide07,
    eyebrow: '主題 4 · ARTIFACT',
    heading: 'Artifact 外部化與跨 session 交接',
    footerLabel: '六個主題',
  },
  {
    id: '08',
    title: '主題 5：Steering Loop',
    group: '六個主題',
    component: Slide08,
    eyebrow: '主題 5 · STEERING',
    heading: 'Steering Loop / harness 作為演進系統',
    footerLabel: '六個主題',
  },
  {
    id: '09',
    title: '主題 6：機械化品味',
    group: '六個主題',
    component: Slide09,
    eyebrow: '主題 6 · CONVENTION',
    heading: '機械化品味 / 硬化 convention',
    footerLabel: '六個主題',
  },
  {
    id: '10',
    title: 'harness 在實作中演進',
    group: '實作演進',
    component: Slide10,
    eyebrow: '實作演進 · 概覽',
    heading: 'harness 在實作中演進',
    footerLabel: '實作演進',
  },
  {
    id: '11',
    title: 'Part 1 / Step 1：baseline',
    group: 'Part 1',
    component: Slide11,
    eyebrow: 'PART 1 · STEP 1 · BASELINE',
    heading: 'baseline',
    footerLabel: FOOTER_P1,
    dots: p1(1),
  },
  {
    id: '12',
    title: 'Part 1 / Step 2：plan agent + plan review',
    group: 'Part 1',
    component: Slide12,
    eyebrow: 'PART 1 · STEP 2 · 加入審查',
    heading: '加入 plan agent + plan review agent',
    footerLabel: FOOTER_P1,
    dots: p1(2),
  },
  {
    id: '13',
    title: 'Part 1 / Step 3：SDD + TDD',
    group: 'Part 1',
    component: Slide13,
    eyebrow: 'PART 1 · STEP 3 · SDD + TDD',
    heading: '引入 SDD + TDD',
    footerLabel: FOOTER_P1,
    dots: p1(3),
  },
  {
    id: '15',
    title: 'Part 2 / Step 1：plan agent 拆分 + reviewer 拆分',
    group: 'Part 2',
    component: Slide15,
    eyebrow: 'PART 2 · STEP 1 · 拆分',
    heading: 'plan agent 拆分 + reviewer 拆分',
    footerLabel: FOOTER_P2,
    dots: p2(1),
  },
  {
    id: '16',
    title: 'Part 2 / Step 2：plan-challenger',
    group: 'Part 2',
    component: Slide16,
    eyebrow: 'PART 2 · STEP 2 · CHALLENGER',
    heading: '新增 plan-challenger',
    footerLabel: FOOTER_P2,
    dots: p2(2),
  },
  {
    id: '17',
    title: 'Part 2 / Step 3：plan-conventions',
    group: 'Part 2',
    component: Slide17,
    eyebrow: 'PART 2 · STEP 3 · CONVENTIONS',
    heading: '抽出 plan-conventions',
    footerLabel: FOOTER_P2,
    dots: p2(3),
  },
  {
    id: '18',
    title: 'Part 2 / Step 4：Review Pipeline 重新設計',
    group: 'Part 2',
    component: Slide18,
    eyebrow: 'PART 2 · STEP 4 · REVIEW PIPELINE',
    heading: 'Review Pipeline 重新設計',
    footerLabel: FOOTER_P2,
    dots: p2(4),
  },
  {
    id: '19',
    title: 'Part 2 / Step 5a：testcases 獨立性',
    group: 'Part 2',
    component: Slide19,
    eyebrow: 'PART 2 · STEP 5 · TESTCASES 獨立性',
    heading: 'testcases 的獨立性',
    footerLabel: FOOTER_P2,
    dots: p2(5),
  },
  {
    id: '20',
    title: 'Part 2 / Step 5b：testcases-reviewer',
    group: 'Part 2',
    component: Slide20,
    eyebrow: 'PART 2 · STEP 5 · TESTCASES-REVIEWER',
    heading: 'testcases-reviewer 與覆蓋完整',
    footerLabel: FOOTER_P2,
    dots: p2(5),
  },
  {
    id: '21',
    title: 'Part 2 / Step 6a：tdd-composer',
    group: 'Part 2',
    component: Slide21,
    eyebrow: 'PART 2 · STEP 6 · TDD-COMPOSER',
    heading: 'tdd-composer 與 TDD 執行結構',
    footerLabel: FOOTER_P2,
    dots: p2(6),
  },
  {
    id: '22',
    title: 'Part 2 / Step 6b：GREEN 分 round 的理由',
    group: 'Part 2',
    component: Slide22,
    eyebrow: 'PART 2 · STEP 6 · GREEN ROUNDS',
    heading: 'GREEN 分成多個 round 的理由',
    footerLabel: FOOTER_P2,
    dots: p2(6),
  },
  {
    id: '23',
    title: 'Part 3 / Step 1：spec-explorer + spec-reviewer',
    group: 'Part 3',
    component: Slide23,
    eyebrow: 'PART 3 · STEP 1 · SPEC 側拆分',
    heading: 'spec-explorer 獨立 + spec-reviewer',
    footerLabel: FOOTER_P3,
    dots: p3(1),
  },
  {
    id: '24',
    title: 'Part 3 / Step 2：brief-from-task + spec-from-brief',
    group: 'Part 3',
    component: Slide24,
    eyebrow: 'PART 3 · STEP 2 · BRIEF → SPEC',
    heading: 'spec agent 拆分',
    footerLabel: FOOTER_P3,
    dots: p3(2),
  },
  {
    id: '25',
    title: 'Part 3 / Step 3：domain-extractor',
    group: 'Part 3',
    component: Slide25,
    eyebrow: 'PART 3 · STEP 3 · DOMAIN',
    heading: '加入 domain-extractor',
    footerLabel: FOOTER_P3,
    dots: p3(3),
  },
  {
    id: '26',
    title: '橫切議題：決策日誌與 observability',
    group: '橫切',
    component: Slide26,
    eyebrow: '橫切議題',
    heading: '決策日誌與 observability',
    footerLabel: '橫切議題',
  },
  {
    id: '27',
    title: '回顧與結語',
    group: '結尾',
    component: Slide27,
    bare: true,
  },
]

export const meta: Record<string, SlideMeta> = Object.fromEntries(
  slides.map((s) => [s.id, s]),
)
