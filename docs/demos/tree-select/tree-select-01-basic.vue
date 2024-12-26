::: demo 基础用法：最简单的用法，展示可选择的树形数据。

```vue
<template>
  <div>
    <c-tree-select
      v-model="value"
      :tree-data="treeData"
      placeholder="请选择"
      style="width: 300px"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<string>()

const treeData = [
  {
    title: '节点1',
    key: '1',
    children: [
      {
        title: '节点1.1',
        key: '1-1',
        children: [
          { title: '节点1.1.1', key: '1-1-1' },
          { title: '节点1.1.2', key: '1-1-2' }
        ]
      },
      { title: '节点1.2', key: '1-2' }
    ]
  },
  {
    title: '节点2',
    key: '2',
    children: [
      { title: '节点2.1', key: '2-1' },
      { title: '节点2.2', key: '2-2' }
    ]
  }
]
</script>
```

::: 