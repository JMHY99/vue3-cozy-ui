<template>
  <div>
    <c-tree
      :tree-data="treeData"
      :virtual="true"
      :height="400"
      default-expand-all
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TreeNodeData } from '../../../packages/tree/tree.vue'

// 生成大量数据
const generateData = (level = 1, parentKey = ''): TreeNodeData[] => {
  const list: TreeNodeData[] = []
  for (let i = 0; i < 10; i++) {
    const key = parentKey ? `${parentKey}-${i}` : `${i}`
    const children = level < 3 ? generateData(level + 1, key) : undefined
    const node: TreeNodeData = {
      title: `节点 ${key}`,
      key,
      children: children || (level < 3 ? [] : undefined)
    }
    list.push(node)
  }
  return list
}

const treeData = generateData()
</script>

<style scoped>
.virtual-scroll-demo {
  border: 1px solid #f0f0f0;
  border-radius: 2px;
}
</style> 