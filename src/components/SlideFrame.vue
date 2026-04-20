<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  /** 左上大頁碼，1-indexed */
  pageNumber?: number
  /** 總頁數 */
  totalPages?: number
  /** 小 eyebrow 標籤（e.g. "Part 2 · Step 1 · 拆分"） */
  eyebrow?: string
  /** 主標題 (新名字) */
  heading?: string
  /** 主標題 (舊名字，保留向後相容) */
  title?: string
  /** 標題下方的引言（粗體灰，可選） */
  lede?: string
  /** 底部 footer 的 part 標籤（e.g. "Part 2 · Evolution"） */
  footerLabel?: string
  /**
   * 底部 step dots 狀態序列：
   *   'done' | 'cur' | 'todo'
   * 若不傳則不顯示 dots
   */
  dots?: Array<'done' | 'cur' | 'todo'>
  /** 是否隱藏整個 header（封面等特殊頁用） */
  bare?: boolean
  /** 是否隱藏 footer */
  hideFooter?: boolean
  /* ── 以下欄位來自 slides.ts meta，v-bind 時會被一起帶進來，這裡宣告只是為了吞掉，不做任何事 ── */
  id?: string
  group?: string
  component?: unknown
}>()

defineOptions({ inheritAttrs: false })

const displayHeading = computed(() => props.heading ?? props.title)
</script>

<template>
  <section class="slide-frame">
    <div class="slide-inner">
      <header v-if="!bare && (pageNumber || eyebrow || displayHeading)" class="slide-head">
        <div v-if="pageNumber" class="pageno">
          <span class="num">{{ String(pageNumber).padStart(2, '0') }}</span>
          <span class="slash">/</span>
          <span class="total">{{ String(totalPages || 24).padStart(2, '0') }}</span>
        </div>
        <div class="meta-col">
          <div v-if="eyebrow" class="eyebrow">{{ eyebrow }}</div>
          <h1 v-if="displayHeading" class="title">{{ displayHeading }}</h1>
          <div v-if="displayHeading" class="title-rule"></div>
          <p v-if="lede" class="lede">{{ lede }}</p>
        </div>
      </header>

      <div class="slide-body" :class="{ 'slide-body-bare': bare }">
        <slot />
      </div>

      <footer v-if="!bare && !hideFooter && (footerLabel || dots)" class="slide-foot">
        <div v-if="footerLabel" class="foot-label" v-html="footerLabel"></div>
        <div v-if="dots && dots.length" class="foot-dots">
          <span
            v-for="(state, i) in dots"
            :key="i"
            class="dot"
            :class="state"
          ></span>
        </div>
        <div v-if="pageNumber" class="foot-pager">
          <span class="cur">{{ String(pageNumber).padStart(2, '0') }}</span>
          <span> / {{ String(totalPages || 24).padStart(2, '0') }}</span>
        </div>
      </footer>
    </div>
  </section>
</template>

<style scoped>
.slide-frame {
  width: 100vw;
  height: 100vh;
  flex: 0 0 100vw;
  display: flex;
  align-items: stretch;
  justify-content: center;
  overflow: hidden;
  background: var(--bg);
}

.slide-inner {
  width: 100%;
  max-width: var(--slide-max-w);
  height: 100%;
  padding: var(--slide-pad-y) var(--slide-pad-x) 28px;
  display: flex;
  flex-direction: column;
}

/* ===== Header: 大頁碼 + eyebrow + title + rule + lede ===== */
.slide-head {
  display: flex;
  align-items: flex-start;
  gap: 22px;
  margin-bottom: 28px;
  flex-shrink: 0;
}

.pageno {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 44px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--text);
  padding-top: 2px;
}
.pageno .slash {
  color: var(--divider);
  font-weight: 400;
  margin: 0 2px;
}
.pageno .total {
  color: var(--text-muted);
  font-size: 18px;
  font-weight: 400;
  vertical-align: 8px;
  margin-left: 2px;
}

.meta-col {
  flex: 1;
  min-width: 0;
  padding-top: 6px;
}

.eyebrow {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 6px;
}

.title {
  font-size: 34px;
  font-weight: 500;
  letter-spacing: -0.015em;
  line-height: 1.2;
  color: var(--text);
  margin: 0;
}

.title-rule {
  width: 80px;
  height: 1px;
  background: var(--divider);
  margin: 16px 0 0;
}

.lede {
  color: var(--text-muted);
  font-size: 16px;
  max-width: 900px;
  margin: 18px 0 0;
  line-height: 1.6;
}

/* ===== Body ===== */
.slide-body {
  flex: 1;
  min-height: 0;
  font-size: 15.5px;
  line-height: 1.75;
  color: var(--text);
  overflow-y: auto;
}

.slide-body-bare {
  height: 100%;
}

.slide-body :deep(p) {
  color: var(--text);
}

.slide-body :deep(strong) {
  color: var(--text);
  font-weight: 600;
}

/* h2.s — 段內小節標題（短橫線 + 文字） */
.slide-body :deep(h2.s),
.slide-body :deep(.s-head) {
  font-size: 16px;
  font-weight: 500;
  margin: 22px 0 8px;
  letter-spacing: -0.005em;
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text);
}
.slide-body :deep(h2.s::before),
.slide-body :deep(.s-head::before) {
  content: '';
  display: block;
  width: 18px;
  height: 1px;
  background: var(--accent);
}

/* 破折號列表 ul.k */
.slide-body :deep(ul.k) {
  margin: 4px 0 0;
  padding-left: 0;
  list-style: none;
}
.slide-body :deep(ul.k li) {
  padding: 4px 0 4px 18px;
  position: relative;
  color: var(--text);
  font-size: 15px;
}
.slide-body :deep(ul.k li::before) {
  content: '';
  position: absolute;
  left: 0;
  top: 15px;
  width: 10px;
  height: 1px;
  background: var(--text-muted);
}

/* ===== Footer: part label + dots + pager ===== */
.slide-foot {
  display: flex;
  align-items: center;
  gap: 20px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--text-muted);
  border-top: 1px solid var(--divider);
  padding-top: 12px;
  margin-top: 20px;
  flex-shrink: 0;
}

.foot-label {
  text-transform: uppercase;
  color: var(--text-muted);
}
.foot-label :deep(.part) {
  color: var(--text);
}

.foot-dots {
  display: flex;
  gap: 8px;
  align-items: center;
}
.foot-dots .dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: 1px solid var(--divider);
  background: transparent;
  box-sizing: border-box;
}
.foot-dots .dot.done {
  background: var(--divider);
  border-color: var(--divider);
}
.foot-dots .dot.cur {
  background: var(--text);
  border-color: var(--text);
  width: 9px;
  height: 9px;
}

.foot-pager {
  margin-left: auto;
  color: var(--text-muted);
}
.foot-pager .cur {
  color: var(--text);
}

/* ===== Responsive ===== */
@media (max-width: 1400px) {
  .slide-inner {
    padding: 48px 56px 24px;
  }
}

@media (max-width: 1100px) {
  .slide-inner {
    padding: 40px 48px 22px;
  }
  .pageno {
    font-size: 36px;
  }
  .title {
    font-size: 28px;
  }
}

@media (max-width: 720px) {
  .slide-inner {
    padding: 32px 28px 20px;
  }
  .slide-head {
    gap: 14px;
  }
  .pageno {
    font-size: 28px;
  }
  .title {
    font-size: 22px;
  }
  .lede {
    font-size: 14.5px;
  }
  .slide-body {
    font-size: 14.5px;
    line-height: 1.7;
  }
}
</style>
