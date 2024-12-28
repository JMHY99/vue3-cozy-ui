<template>
  <div>
    <c-mentions
      v-model="value"
      :options="options"
      placeholder="输入 @ 提及用户"
      @select="onSelect"
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

const onSelect = (option: any) => {
  console.log('选择用户：', option)
}
</script> 