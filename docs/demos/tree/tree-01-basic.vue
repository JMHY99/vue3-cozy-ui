<template>
  <div>
    <c-tree
      :tree-data="treeData"
      v-model:expanded-keys="expandedKeys"
      v-model:selected-keys="selectedKeys"
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
    title: '项目文件夹',
    key: 'dir1',
    children: [
      {
        title: 'src',
        key: 'dir1-1',
        children: [
          { title: 'components', key: 'dir1-1-1', children: [] },
          { title: 'views', key: 'dir1-1-2', children: [] },
          { title: 'utils', key: 'dir1-1-3', children: [] },
          { title: 'App.vue', key: 'dir1-1-4', children: [] },
          { title: 'main.ts', key: 'dir1-1-5', children: [] }
        ]
      },
      {
        title: 'public',
        key: 'dir1-2',
        children: [
          { title: 'index.html', key: 'dir1-2-1', children: [] },
          { title: 'favicon.ico', key: 'dir1-2-2', children: [] }
        ]
      },
      { title: 'package.json', key: 'dir1-3', children: [] },
      { title: 'README.md', key: 'dir1-4', children: [] }
    ]
  }
]

const selectedKeys = ref<(string | number)[]>([])
const expandedKeys = ref<(string | number)[]>(['dir1'])

const onSelect = (keys: (string | number)[], info: { selected: boolean }) => {
  console.log('选中：', keys, info)
}

const onExpand = (keys: (string | number)[], info: { expanded: boolean; node: TreeNodeData }) => {
  console.log('展开/收起：', keys, info)
}
</script>
