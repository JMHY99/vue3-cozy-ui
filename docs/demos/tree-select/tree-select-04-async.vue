<template>
  <div>
    <c-tree-select
      v-model="value"
      :tree-data="treeData"
      :load-data="onLoadData"
      placeholder="请选择"
      style="width: 300px"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TreeNodeData } from '../../../packages/tree/tree.vue'

const value = ref<string>()
const treeData = ref<TreeNodeData[]>([
  {
    title: '展开加载一级节点',
    key: '0',
    isLeaf: false
  }
])

const updateTreeData = (list: TreeNodeData[], key: string | number, children: TreeNodeData[]): TreeNodeData[] => {
  return list.map(node => {
    if (node.key === key) {
      return {
        ...node,
        children
      }
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children)
      }
    }
    return node
  })
}

const onLoadData = (node: TreeNodeData) => {
  return new Promise<void>(resolve => {
    if (node.children) {
      resolve()
      return
    }
    setTimeout(() => {
      const key = node.key as string
      const level = key.split('-').length
      const children: TreeNodeData[] = []
      
      for (let i = 0; i < 3; i++) {
        const childKey = `${key}-${i}`
        children.push({
          title: `动态加载${level + 1}-${i + 1}`,
          key: childKey,
          isLeaf: level >= 2
        })
      }
      
      treeData.value = updateTreeData(treeData.value, key, children)
      resolve()
    }, 1000)
  })
}
</script> 