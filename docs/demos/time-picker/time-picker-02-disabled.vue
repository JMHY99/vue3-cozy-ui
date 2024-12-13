<template>
  <c-time-picker v-model="time" disabled />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const time = ref<Date | null>(null)
</script> 