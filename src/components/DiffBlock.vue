<script setup lang="ts">
interface DiffRow {
  /** 操作類型 */
  op: 'add' | 'mod' | 'del'
  /** 節點/元件名稱 */
  name: string
  /** 描述（理由、來源等） */
  desc?: string
}

defineProps<{
  rows: DiffRow[]
}>()

const symbolFor = (op: DiffRow['op']) => {
  if (op === 'add') return '+'
  if (op === 'del') return '−'
  return '~'
}
</script>

<template>
  <div class="diff">
    <div
      v-for="(r, i) in rows"
      :key="i"
      class="row"
      :data-op="r.op"
    >
      <span class="sym">{{ symbolFor(r.op) }}</span>
      <span class="name" :class="{ del: r.op === 'del' }">{{ r.name }}</span>
      <span v-if="r.desc" class="desc">{{ r.desc }}</span>
    </div>
  </div>
</template>

<style scoped>
.diff {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 12.5px;
  line-height: 1.9;
  background: var(--bg-elevated);
  border-left: 3px solid var(--accent);
  padding: 12px 18px;
  color: var(--text);
}

.row {
  display: grid;
  grid-template-columns: 14px 220px 1fr;
  gap: 12px;
  align-items: baseline;
}

.sym {
  font-weight: 600;
  color: var(--text);
}
.row[data-op='add'] .sym {
  color: var(--accent);
}
.row[data-op='del'] .sym {
  color: var(--text-dim);
}

.name {
  color: var(--text);
}
.name.del {
  color: var(--text-dim);
  text-decoration: line-through;
}

.desc {
  color: var(--text-muted);
}

@media (max-width: 900px) {
  .row {
    grid-template-columns: 14px 1fr;
  }
  .desc {
    grid-column: 2;
    font-size: 12px;
  }
}
</style>
