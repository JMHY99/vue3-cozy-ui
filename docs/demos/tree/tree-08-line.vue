<template>
  <div>
    <c-tree
      :tree-data="treeData"
      show-line
      v-model:expanded-keys="expandedKeys"
      @expand="onExpand"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TreeNodeData } from '../../../packages/tree/tree.vue'

const treeData: TreeNodeData[] = [
  {
    title: '公司架构',
    key: 'company',
    children: [
      {
        title: '技术部',
        key: 'tech',
        children: [
          {
            title: '研发团队',
            key: 'dev',
            children: [
              { title: '前端组', key: 'frontend', children: [] },
              { title: '后端组', key: 'backend', children: [] },
              { title: '测试组', key: 'test', children: [] }
            ]
          },
          {
            title: '运维团队',
            key: 'ops',
            children: [
              { title: '系统组', key: 'system', children: [] },
              { title: '网络组', key: 'network', children: [] }
            ]
          }
        ]
      },
      {
        title: '产品部',
        key: 'product',
        children: [
          { title: '产品设计组', key: 'design', children: [] },
          { title: '产品运营组', key: 'operation', children: [] }
        ]
      },
      {
        title: '市场部',
        key: 'market',
        children: [
          { title: '市场推广组', key: 'promotion', children: [] },
          { title: '销售组', key: 'sales', children: [] }
        ]
      }
    ]
  }
]

const expandedKeys = ref<(string | number)[]>(['company', 'tech', 'dev', 'ops', 'product', 'market'])

const onExpand = (keys: (string | number)[], info: { expanded: boolean; node: TreeNodeData }) => {
  console.log('展开/收起：', keys, info)
}
</script> 