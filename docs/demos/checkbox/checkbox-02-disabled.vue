<template>
  <c-space>
    <c-checkbox v-model="checked1" disabled>禁用</c-checkbox>
    <c-checkbox v-model="checked2" disabled>禁用且选中</c-checkbox>
  </c-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked1 = ref(false)
const checked2 = ref(true)
</script>
