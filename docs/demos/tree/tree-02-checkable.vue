<template>
  <div>
    <c-tree
      :tree-data="treeData"
      checkable
      :default-expanded-keys="['tasks']"
      :default-checked-keys="['task1-1', 'task2-2']"
      @check="onCheck"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TreeNodeData } from '../../../packages/tree/tree.vue'

const treeData: TreeNodeData[] = [
  {
    title: '任务列表',
    key: 'tasks',
    children: [
      {
        title: '项目A',
        key: 'task1',
        children: [
          { title: '需求分析', key: 'task1-1' },
          { title: '概要设计', key: 'task1-2' },
          { title: '详细设计', key: 'task1-3' },
          { title: '编码实现', key: 'task1-4' },
          { title: '单元测试', key: 'task1-5' }
        ]
      },
      {
        title: '项目B',
        key: 'task2',
        children: [
          { title: '需求评审', key: 'task2-1' },
          { title: '接口设计', key: 'task2-2' },
          { title: '数据库设计', key: 'task2-3' },
          { title: '功能开发', key: 'task2-4' }
        ]
      },
      {
        title: '日常工作',
        key: 'task3',
        children: [
          { title: '代码审查', key: 'task3-1' },
          { title: '文档编写', key: 'task3-2' },
          { title: '例会', key: 'task3-3' }
        ]
      }
    ]
  }
]

const onCheck = (checkedKeys: (string | number)[], info: { checked: boolean; checkedNodes: TreeNodeData[] }) => {
  console.log('勾选：', checkedKeys)
  console.log('勾选节点：', info.checkedNodes)
}
</script>