<template>
  <div>
    <c-auto-complete
      v-model="value"
      :options="options"
      @search="onSearch"
    >
      <template #default>
        <c-input
          v-model="value"
          placeholder="自定义输入组件"
          :rows="3"
        />
      </template>
    </c-auto-complete>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const options = ref<{ value: string }[]>([])

const onSearch = (searchText: string) => {
  // 模拟异步搜索
  setTimeout(() => {
    if (!searchText) {
      options.value = []
      return
    }
    options.value = ['gmail.com', '163.com', 'qq.com'].map(domain => ({
      value: `${searchText}@${domain}`
    }))
  }, 100)
}
</script> 