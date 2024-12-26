<template>
  <div>
    <c-tree
      :tree-data="treeData"
      :load-data="onLoadData"
      @load="onLoad"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TreeNodeData } from '../../../packages/tree/tree.vue'

const treeData = ref<TreeNodeData[]>([
  {
    title: '点击加载子节点',
    key: '0',
    isLeaf: false,
    children: []
  }
])

// 更新树节点数据
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

// 模拟异步加载数据
const onLoadData = (node: TreeNodeData) => {
  return new Promise<void>(resolve => {
    if (node.children && node.children.length > 0) {
      resolve()
      return
    }

    setTimeout(() => {
      const key = node.key as string
      const level = key.split('-').length
      const children: TreeNodeData[] = []

      // 生成子节点数据
      for (let i = 0; i < 3; i++) {
        const childKey = `${key}-${i}`
        children.push({
          title: `异步节点 ${childKey}`,
          key: childKey,
          isLeaf: level >= 2,
          children: level >= 2 ? undefined : []
        })
      }

      treeData.value = updateTreeData(treeData.value, key, children)
      resolve()
    }, 1000)
  })
}

// 加载完成回调
const onLoad = (loadedKeys: (string | number)[], { node }: { node: TreeNodeData }) => {
  console.log('加载完成：', loadedKeys)
  console.log('当前节点：', node)
}
</script> 