<template>
  <div class="demo-input-icon">
    <c-input v-model="value1" prefix-icon="search" placeholder="搜索内容" />
    <c-input v-model="value2" suffix-icon="calendar" placeholder="选择日期" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
</script>

<style>
.demo-input-icon {
  display: flex;
  gap: 16px;
}
</style>
