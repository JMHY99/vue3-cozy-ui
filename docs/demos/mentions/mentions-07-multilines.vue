<template>
  <div>
    <c-mentions
      v-model="value"
      :options="options"
      :rows="3"
      placeholder="输入 @ 提及用户"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')

const options = [
  {
    value: 'afc163',
    label: 'afc163'
  },
  {
    value: 'zombieJ',
    label: 'zombieJ'
  },
  {
    value: 'yesmeck',
    label: 'yesmeck'
  }
]
</script> 