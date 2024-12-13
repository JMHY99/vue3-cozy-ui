<template>
  <c-time-picker v-model="time" @change="handleChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const time = ref<Date | null>(null)

const handleChange = (val: Date) => {
  console.log('选择的时间：', val)
}
</script> 