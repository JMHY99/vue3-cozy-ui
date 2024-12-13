<template>
  <c-slider
    v-model="value"
    :format-tooltip="formatTooltip"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(30)

const formatTooltip = (val: number) => `${val}%`
</script>
