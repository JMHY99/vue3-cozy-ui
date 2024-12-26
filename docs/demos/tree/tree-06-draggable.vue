<template>
  <div>
    <c-tree
      :tree-data="treeData"
      draggable
      :allow-drop="allowDrop"
      @dragstart="onDragStart"
      @dragenter="onDragEnter"
      @drop="onDrop"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TreeNodeData } from '../../../packages/tree/tree.vue'

const treeData = ref<TreeNodeData[]>([
  {
    title: '待办事项',
    key: 'todo',
    children: [
      {
        title: '优先级高',
        key: 'high',
        children: [
          { title: '修复关键Bug', key: 'bug-fix', children: [] },
          { title: '完成核心功能', key: 'core-feature', children: [] }
        ]
      },
      {
        title: '优先级中',
        key: 'medium',
        children: [
          { title: '代码重构', key: 'refactor', children: [] },
          { title: '性能优化', key: 'performance', children: [] }
        ]
      },
      {
        title: '优先级低',
        key: 'low',
        children: [
          { title: '更新文档', key: 'docs', children: [] },
          { title: '单元测试', key: 'test', children: [] }
        ]
      }
    ]
  }
])

// 允许放置的规则
const allowDrop = ({ dropNode, dropPosition }: { dropNode: TreeNodeData; dropPosition: number }) => {
  // 不允许拖拽到根节点之前或之后
  if (!dropNode.children && dropPosition !== 0) {
    return false
  }
  return true
}

// 开始拖拽
const onDragStart = ({ event, node }: { event: DragEvent; node: TreeNodeData }) => {
  console.log('开始拖拽：', node)
}

// 拖拽进入节点
const onDragEnter = ({ event, node, expandedKeys }: { event: DragEvent; node: TreeNodeData; expandedKeys: (string | number)[] }) => {
  console.log('进入节点：', node)
}

// 放置节点
const onDrop = ({ event, node, dragNode, dropPosition }: { event: DragEvent; node: TreeNodeData; dragNode: TreeNodeData; dropPosition: number }) => {
  console.log('放置位置：', dropPosition)
  console.log('目标节点：', node)
  console.log('拖拽节点：', dragNode)
}
</script> 