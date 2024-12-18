<template>
  <div>
    <c-steps v-model:current="current">
      <c-step title="第一步" description="这是一段描述文字" />
      <c-step title="第二步" description="这是一段描述文字" />
      <c-step title="第三步" description="这是一段描述文字" />
    </c-steps>
    <div style="margin-top: 24px">
      <c-button @click="prev" :disabled="current <= 0">上一步</c-button>
      <c-button @click="next" :disabled="current >= 2">下一步</c-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const current = ref(0);

const next = () => {
  current.value++;
};

const prev = () => {
  current.value--;
};
</script>

<style scoped>
.c-button {
  margin-right: 8px;
}
</style> 