::: demo 基础用法：最简单的用法，展示可选中，可展开收起的树形控件。

```vue
<template>
  <c-tree
    v-model:selectedKeys="selectedKeys"
    v-model:expandedKeys="expandedKeys"
    :tree-data="treeData"
    @select="onSelect"
    @expand="onExpand"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' }
        ]
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' }
        ]
      },
      {
        title: '0-0-2',
        key: '0-0-2'
      }
    ]
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0', key: '0-1-0' },
      { title: '0-1-1', key: '0-1-1' },
      { title: '0-1-2', key: '0-1-2' }
    ]
  },
  {
    title: '0-2',
    key: '0-2'
  }
]

const selectedKeys = ref<string[]>(['0-0-0'])
const expandedKeys = ref<string[]>(['0-0', '0-0-0'])

const onSelect = (keys: string[], { selected, selectedNodes }: any) => {
  console.log('selected:', selected)
  console.log('selectedNodes:', selectedNodes)
}

const onExpand = (keys: string[], { expanded, node }: any) => {
  console.log('expanded:', expanded)
  console.log('node:', node)
}
</script>
```

::: 