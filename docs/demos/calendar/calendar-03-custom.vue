<template>
  <c-calendar v-model="value">
    <template #dateCell="{ date }">
      <div class="date-cell">
        <div v-if="isWeekend(date)" class="weekend">周末</div>
      </div>
    </template>
  </c-calendar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(new Date())

const isWeekend = (date: Date) => {
  const day = date.getDay()
  return day === 0 || day === 6
}
</script>

<style scoped>
.date-cell {
  position: relative;
  height: 100%;
}
.weekend {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 12px;
  color: #1677ff;
}
</style>
