<template>
  <div>
    <c-radio v-model="radio" disabled label="1">禁用</c-radio>
    <c-radio v-model="radio" disabled label="2">选中且禁用</c-radio>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radio = ref('2')
</script>
