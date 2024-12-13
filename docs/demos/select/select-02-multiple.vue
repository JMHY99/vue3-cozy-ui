<template>
  <c-select
    v-model="value"
    style="width: 200px"
    placeholder="请选择"
    multiple
  >
    <c-option value="1" label="选项1" />
    <c-option value="2" label="选项2" />
    <c-option value="3" label="选项3" />
    <c-option value="4" label="选项4" />
  </c-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([])
</script>
