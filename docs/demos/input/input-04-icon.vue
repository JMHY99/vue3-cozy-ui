<template>
  <div class="demo-input-icon">
    <c-input v-model="value1" prefix-icon="c-search-outlined" placeholder="搜索内容" />
    <c-input v-model="value2" suffix-icon="c-application-outlined" placeholder="选择日期" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
</script>

<style>
.demo-input-icon {
  width: 100%;
  display: flex;
  gap: 16px;
}
</style>
