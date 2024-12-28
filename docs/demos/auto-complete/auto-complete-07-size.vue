<template>
  <div>
    <c-space direction="vertical">
      <c-auto-complete
        v-model="value1"
        :options="options"
        size="large"
        placeholder="大尺寸"
      />
      <c-auto-complete
        v-model="value2"
        :options="options"
        placeholder="默认尺寸"
      />
      <c-auto-complete
        v-model="value3"
        :options="options"
        size="small"
        placeholder="小尺寸"
      />
    </c-space>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')

const options = [
  { value: 'Burns Bay Road' },
  { value: 'Downing Street' },
  { value: 'Wall Street' }
]
</script> 