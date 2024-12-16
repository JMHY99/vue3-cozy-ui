<template>
  <c-calendar v-model="value" @select="onSelect" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(new Date())

const onSelect = (date: Date) => {
  console.log('选择的日期：', date)
}
</script>
