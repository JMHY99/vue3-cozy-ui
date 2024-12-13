<template>
  <c-date-picker 
    v-model="date" 
    :disabled-date="disabledDate"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const date = ref<Date | null>(null)

// 禁用今天之前的日期
const disabledDate = (date: Date) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date.getTime() < today.getTime()
}
</script> 