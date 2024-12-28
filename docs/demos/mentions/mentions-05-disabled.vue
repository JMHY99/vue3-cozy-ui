<template>
  <div>
    <c-space direction="vertical">
      <c-mentions
        v-model="value1"
        :options="options"
        disabled
        placeholder="禁用状态"
      />
      <c-mentions
        v-model="value2"
        :options="options"
        :rows="3"
        disabled
        placeholder="禁用状态（多行）"
      />
    </c-space>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')

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