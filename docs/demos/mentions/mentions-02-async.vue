<template>
  <div>
    <c-mentions
      v-model="value"
      :options="options"
      placeholder="输入 @ 提及用户"
      @search="onSearch"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const options = ref<{ value: string; label: string }[]>([])

const onSearch = (searchValue: string) => {
  // 模拟异步搜索
  setTimeout(() => {
    if (searchValue) {
      options.value = ['afc163', 'zombieJ', 'yesmeck']
        .filter(name => name.includes(searchValue))
        .map(name => ({
          value: name,
          label: name
        }))
    } else {
      options.value = []
    }
  }, 500)
}
</script> 