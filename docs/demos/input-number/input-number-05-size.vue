<template>
  <div>
    <c-input-number v-model="num1" size="large" />
    <c-input-number v-model="num2" />
    <c-input-number v-model="num3" size="small" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const num1 = ref(1)
const num2 = ref(1)
const num3 = ref(1)
</script>

<style scoped>
.cozy-input-number {
  margin-right: 10px;
}
</style>
