<template>
  <div>
    <c-auto-complete
      v-model="value"
      :options="options"
      placeholder="输入 b"
      @select="onSelect"
      @search="onSearch"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const options = ref([
  { value: 'Burns Bay Road' },
  { value: 'Downing Street' },
  { value: 'Wall Street' }
])

const onSelect = (option: any) => {
  console.log('选中: ', option)
}

const onSearch = (searchText: string) => {
  options.value = !searchText ? [] : [
    { value: searchText },
    { value: searchText + searchText },
    { value: searchText + searchText + searchText }
  ]
}
</script> 