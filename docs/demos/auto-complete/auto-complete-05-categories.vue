<template>
  <div>
    <c-auto-complete
      v-model="value"
      :options="options"
      placeholder="输入关键词搜索"
      @search="onSearch"
    >
      <template #option="{ option }">
        <div>
          {{ option.category }}: {{ option.value }}
        </div>
      </template>
    </c-auto-complete>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const options = ref<{ value: string; category: string }[]>([])

const categories = ['前端', '后端', '运维']
const libraries = {
  '前端': ['Vue', 'React', 'Angular'],
  '后端': ['Node.js', 'Java', 'Python'],
  '运维': ['Docker', 'Kubernetes', 'Jenkins']
}

const onSearch = (searchText: string) => {
  // 模拟异步搜索
  setTimeout(() => {
    if (!searchText) {
      options.value = []
      return
    }
    const res: { value: string; category: string }[] = []
    categories.forEach(category => {
      libraries[category].forEach(lib => {
        if (lib.toLowerCase().includes(searchText.toLowerCase())) {
          res.push({
            value: lib,
            category
          })
        }
      })
    })
    options.value = res
  }, 100)
}
</script> 