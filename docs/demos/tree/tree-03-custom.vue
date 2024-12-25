::: demo 自定义图标：可以使用自定义图标展示树节点。

```vue
<template>
  <c-tree
    v-model:selectedKeys="selectedKeys"
    v-model:expandedKeys="expandedKeys"
    :tree-data="treeData"
    show-icon
    @select="onSelect"
    @expand="onExpand"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const treeData = [
  {
    title: '父节点1',
    key: '0-0',
    icon: 'c-folder-outlined',
    children: [
      {
        title: '父节点1-0',
        key: '0-0-0',
        icon: 'c-folder-outlined',
        children: [
          { title: '叶子节点', key: '0-0-0-0', icon: 'c-file-outlined' },
          { title: '叶子节点', key: '0-0-0-1', icon: 'c-file-outlined' }
        ]
      },
      {
        title: '父节点1-1',
        key: '0-0-1',
        icon: 'c-folder-outlined',
        children: [
          { title: '叶子节点', key: '0-0-1-0', icon: 'c-file-outlined' }
        ]
      }
    ]
  },
  {
    title: '父节点2',
    key: '0-1',
    icon: 'c-folder-outlined',
    children: [
      {
        title: '父节点2-0',
        key: '0-1-0',
        icon: 'c-folder-outlined',
        children: [
          { title: '叶子节点', key: '0-1-0-0', icon: 'c-file-outlined' },
          { title: '叶子节点', key: '0-1-0-1', icon: 'c-file-outlined' }
        ]
      }
    ]
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