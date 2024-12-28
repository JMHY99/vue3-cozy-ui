<template>
  <div>
    <c-mentions
      v-model="value"
      :options="options"
      :prefix="['@', '#']"
      placeholder="输入 @ 提及用户，输入 # 提及话题"
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
    value: 'vue',
    label: 'Vue'
  },
  {
    value: 'typescript',
    label: 'TypeScript'
  },
  {
    value: 'javascript',
    label: 'JavaScript'
  }
]
</script> 