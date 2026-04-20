<script setup lang="ts">
import SlideFrame from '../components/SlideFrame.vue'
import { meta } from '../slides'
</script>

<template>
  <SlideFrame v-bind="meta['09']">
    <p>
      品味和 convention 不能靠 prompt 和人腦記憶，必須機械化成確定性規則（linter、structural tests、hooks、CI gates）。
    </p>

    <p>
      把「好程式碼長什麼樣」編碼成 linter + structural tests，人類品味只需捕捉一次，之後每次提交都會持續執行（OpenAI）。
    </p>

    <p class="pull">
      約束解題空間反而讓 agent 更快收斂，這和「更多自由 = 更好產出」的直覺相反。
    </p>
  </SlideFrame>
</template>

<style scoped>
.pull {
  margin-top: 18px;
  padding: 16px 20px;
  border-left: 3px solid var(--accent);
  background: var(--bg-elevated);
  border-radius: var(--radius);
  color: var(--text);
  font-size: 16px;
  line-height: 1.7;
}
</style>
