<template>
  <div>
    <c-auto-complete
      v-model="value"
      :options="options"
      placeholder="输入 b"
      @select="onSelect"
      @search="onSearch"
    >
      <template #option="{ option }">
        <div style="display: flex; justify-content: space-between">
          <span>{{ option.value }}</span>
          <span style="color: #999">{{ option.count }} 次</span>
        </div>
      </template>
    </c-auto-complete>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const options = ref([
  { value: 'Burns Bay Road', count: 12 },
  { value: 'Downing Street', count: 8 },
  { value: 'Wall Street', count: 16 }
])

const onSelect = (option: any) => {
  console.log('选中: ', option)
}

const onSearch = (searchText: string) => {
  options.value = !searchText ? [] : [
    { value: searchText, count: Math.floor(Math.random() * 100) },
    { value: searchText + searchText, count: Math.floor(Math.random() * 100) },
    { value: searchText + searchText + searchText, count: Math.floor(Math.random() * 100) }
  ]
}
</script> 