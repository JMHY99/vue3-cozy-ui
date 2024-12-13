<template>
  <c-radio-group v-model="radio">
    <c-radio label="1">选项1</c-radio>
    <c-radio label="2">选项2</c-radio>
    <c-radio label="3">选项3</c-radio>
  </c-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radio = ref('1')
</script>
