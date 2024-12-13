<template>
  <c-select
    v-model="value"
    style="width: 200px"
    placeholder="请选择"
    show-search
    @search="handleSearch"
  >
    <c-option value="1" label="选项1" />
    <c-option value="2" label="选项2" />
    <c-option value="3" label="选项3" />
  </c-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')

const handleSearch = (value: string) => {
  console.log('搜索:', value)
}
</script>
