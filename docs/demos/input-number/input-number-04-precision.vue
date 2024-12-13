<template>
  <div>
    <c-input-number v-model="num" :precision="2" :step="0.1" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const num = ref(1)
</script>
