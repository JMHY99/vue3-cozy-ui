::: demo 可拖拽：可以通过拖拽进行节点的移动。

```vue
<template>
  <c-tree
    v-model:selectedKeys="selectedKeys"
    v-model:expandedKeys="expandedKeys"
    :tree-data="treeData"
    draggable
    @select="onSelect"
    @expand="onExpand"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
    @drop="onDrop"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const treeData = ref([
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
])

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

const onDragStart = (e: DragEvent, node: any) => {
  console.log('drag start', node)
}

const onDragEnd = (e: DragEvent, node: any) => {
  console.log('drag end', node)
}

const onDrop = (e: DragEvent, node: any, dragNode: any) => {
  console.log('tree drop', node, dragNode)
  
  // 在这里处理节点的移动逻辑
  const dropKey = node.key
  const dragKey = dragNode.key
  const dropPos = node.pos.split('-')
  const dropPosition = e.currentTarget.getBoundingClientRect().top + window.scrollY

  const loop = (data: any[], key: string, callback: Function) => {
    data.forEach((item, index, arr) => {
      if (item.key === key) {
        callback(item, index, arr)
        return
      }
      if (item.children) {
        loop(item.children, key, callback)
      }
    })
  }

  const data = [...treeData.value]

  // 找到拖拽的节点
  let dragObj: any
  loop(data, dragKey, (item: any, index: number, arr: any[]) => {
    arr.splice(index, 1)
    dragObj = item
  })

  if (!dropKey) {
    // 拖拽到根节点
    data.push(dragObj)
  } else {
    // 拖拽到其他节点
    loop(data, dropKey, (item: any) => {
      if (!item.children) {
        item.children = []
      }
      item.children.push(dragObj)
    })
  }

  treeData.value = data
}
</script>
```

::: 