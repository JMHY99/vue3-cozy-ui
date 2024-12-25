::: demo 可选择：展示带有复选框的树形控件。

```vue
<template>
  <c-tree
    v-model:checkedKeys="checkedKeys"
    v-model:expandedKeys="expandedKeys"
    :tree-data="treeData"
    checkable
    @check="onCheck"
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

const checkedKeys = ref<string[]>(['0-0-0'])
const expandedKeys = ref<string[]>(['0-0', '0-0-0'])

const onCheck = (keys: string[], { checked, checkedNodes }: any) => {
  console.log('checked:', checked)
  console.log('checkedNodes:', checkedNodes)
}

const onExpand = (keys: string[], { expanded, node }: any) => {
  console.log('expanded:', expanded)
  console.log('node:', node)
}
</script>
```

::: 