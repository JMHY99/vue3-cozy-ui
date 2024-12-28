<template>
  <div>
    <c-auto-complete
      v-model="value"
      :options="options"
      :filter-option="filterOption"
      placeholder="试试输入 BURNS"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const options = ref([
  { value: 'Burns Bay Road' },
  { value: 'Downing Street' },
  { value: 'Wall Street' }
])

const filterOption = (input: string, option: any) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
}
</script> 