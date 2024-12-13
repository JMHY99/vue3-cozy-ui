<template>
  <c-time-picker 
    v-model="time"
    :disabledHours="disabledHours"
    :disabledMinutes="disabledMinutes"
    :disabledSeconds="disabledSeconds"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const time = ref<Date | null>(null)

// 禁用部分小时
const disabledHours = () => {
  return [0, 1, 2, 3, 4, 5, 6, 7]  // 禁用0-7点
}

// 禁用部分分钟
const disabledMinutes = (hour: number) => {
  if (hour === 20) {  // 20点时禁用前30分钟
    return Array.from({ length: 30 }, (_, i) => i)
  }
  return []
}

// 禁用部分秒
const disabledSeconds = (hour: number, minute: number) => {
  if (hour === 20 && minute === 30) {  // 20:30时禁用前30秒
    return Array.from({ length: 30 }, (_, i) => i)
  }
  return []
}
</script> 