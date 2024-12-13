<template>
  <div>
    <c-date-picker v-model="date1" format="YYYY/MM/DD" />
    <br><br>
    <c-date-picker v-model="date2" format="MM-DD-YYYY" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const date1 = ref<Date | null>(null)
const date2 = ref<Date | null>(null)
</script> 