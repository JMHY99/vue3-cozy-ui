<template>
  <c-calendar v-model="value" mode="year" @panelChange="onPanelChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(new Date())

const onPanelChange = (date: Date, mode: string) => {
  console.log('日期变化：', date)
  console.log('视图模式：', mode)
}
</script>
