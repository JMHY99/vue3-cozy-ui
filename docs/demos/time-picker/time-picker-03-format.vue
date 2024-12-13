<template>
  <div>
    <c-time-picker v-model="time1" format="HH:mm" :showSecond="false" />
    <br><br>
    <c-time-picker v-model="time2" format="HH时mm分ss秒" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const time1 = ref<Date | null>(null)
const time2 = ref<Date | null>(null)
</script> 