<template>
  <div>
    <c-tree
      :tree-data="treeData"
      show-icon
      :default-expanded-keys="['0-0']"
      @select="onSelect"
      @expand="onExpand"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TreeNodeData } from '../../../packages/tree/tree.vue'

const treeData: TreeNodeData[] = [
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
          { title: '叶子节点', key: '0-0-0-0', icon: 'c-file-outlined', children: [] },
          { title: '叶子节点', key: '0-0-0-1', icon: 'c-file-outlined', children: [] }
        ]
      },
      {
        title: '父节点1-1',
        key: '0-0-1',
        icon: 'c-folder-outlined',
        children: [
          { title: '叶子节点', key: '0-0-1-0', icon: 'c-file-outlined', children: [] }
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
          { title: '叶子节点', key: '0-1-0-0', icon: 'c-file-outlined', children: [] },
          { title: '叶子节点', key: '0-1-0-1', icon: 'c-file-outlined', children: [] }
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