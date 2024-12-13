<template>
  <c-checkbox-group v-model="checkedList">
    <c-checkbox label="选项1">选项1</c-checkbox>
    <c-checkbox label="选项2">选项2</c-checkbox>
    <c-checkbox label="选项3">选项3</c-checkbox>
  </c-checkbox-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checkedList = ref(['选项1'])
</script>
