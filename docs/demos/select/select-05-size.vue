<template>
  <c-space direction="vertical">
    <c-select v-model="value1" size="large" style="width: 200px" placeholder="大型选择器">
      <c-option value="1" label="选项1" />
      <c-option value="2" label="选项2" />
    </c-select>
    <c-select v-model="value2" style="width: 200px" placeholder="默认选择器">
      <c-option value="1" label="选项1" />
      <c-option value="2" label="选项2" />
    </c-select>
    <c-select v-model="value3" size="small" style="width: 200px" placeholder="小型选择器">
      <c-option value="1" label="选项1" />
      <c-option value="2" label="选项2" />
    </c-select>
  </c-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
</script>
