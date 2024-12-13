<template>
  <c-space direction="vertical">
    <c-rate v-model="value1" :count="10" />
    <c-rate v-model="value2" active-color="#f5222d" />
  </c-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(5)
const value2 = ref(3)
</script>
