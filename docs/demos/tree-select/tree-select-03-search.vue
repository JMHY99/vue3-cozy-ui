::: demo 可搜索：通过搜索框快速查找节点。

```vue
<template>
  <c-tree-select
    v-model="value"
    :tree-data="treeData"
    show-search
    placeholder="请输入搜索内容"
    style="width: 300px"
    @search="onSearch"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<string>()

const treeData = [
  {
    title: '节点1',
    key: '0-0',
    children: [
      {
        title: '子节点1',
        key: '0-0-0',
        children: [
          { title: '子节点1.1', key: '0-0-0-0' },
          { title: '子节点1.2', key: '0-0-0-1' }
        ]
      },
      {
        title: '子节点2',
        key: '0-0-1'
      }
    ]
  },
  {
    title: '节点2',
    key: '0-1',
    children: [
      { title: '子节点2.1', key: '0-1-0' },
      { title: '子节点2.2', key: '0-1-1' }
    ]
  }
]

const onSearch = (value: string) => {
  console.log('search:', value)
}
</script>
```

::: 