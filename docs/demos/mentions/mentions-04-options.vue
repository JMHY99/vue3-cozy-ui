<template>
  <div>
    <c-mentions
      v-model="value"
      :options="options"
      :field-names="{ label: 'name', value: 'id' }"
      placeholder="输入 @ 提及用户"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')

const options = [
  {
    id: '1',
    name: '张三',
    disabled: true
  },
  {
    id: '2',
    name: '李四'
  },
  {
    id: '3',
    name: '王五'
  }
]
</script> 