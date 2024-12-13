<template>
  <div>
    <c-radio v-model="radio" label="1">选项1</c-radio>
    <c-radio v-model="radio" label="2">选项2</c-radio>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radio = ref('1')
</script>
