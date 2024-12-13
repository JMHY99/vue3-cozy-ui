<template>
  <c-date-picker v-model="date" disabled />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const date = ref<Date | null>(null)
</script> 