::: demo 基础用法：最简单的用法，展示可选择的树形数据。

```vue
<template>
  <c-tree-select
    v-model="value"
    :tree-data="treeData"
    placeholder="请选择"
    style="width: 300px"
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
</script>
```

::: 