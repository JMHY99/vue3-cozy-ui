<template>
  <c-slider
    v-model="value"
    :marks="{
      0: '0°C',
      26: '26°C',
      37: '37°C',
      100: '100°C'
    }"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(37)
</script>
