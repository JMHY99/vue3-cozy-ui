<template>
  <c-space direction="vertical">
    <c-rate v-model="value1" disabled />
    <c-rate v-model="value2" readonly />
  </c-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(2)
const value2 = ref(3)
</script>
