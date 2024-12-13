<template>
  <c-date-picker v-model="date" @change="handleChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const date = ref<Date | null>(null)

const handleChange = (val: Date) => {
  console.log('选择的日期：', val)
}
</script> 