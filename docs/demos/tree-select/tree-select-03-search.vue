::: demo 可搜索：通过搜索框快速查找节点。

```vue
<template>
  <div>
    <c-tree-select
      v-model="value"
      :tree-data="treeData"
      show-search
      :filter-tree-node="filterTreeNode"
      placeholder="请输入搜索内容"
      style="width: 300px"
      allow-clear
      @search="onSearch"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TreeNodeData } from '../../../packages/tree/tree.vue'

const value = ref<string>()

const treeData = [
  {
    title: '中国',
    key: 'china',
    children: [
      {
        title: '浙江',
        key: 'zhejiang',
        children: [
          { title: '杭州', key: 'hangzhou' },
          { title: '宁波', key: 'ningbo' },
          { title: '温州', key: 'wenzhou' }
        ]
      },
      {
        title: '江苏',
        key: 'jiangsu',
        children: [
          { title: '南京', key: 'nanjing' },
          { title: '苏州', key: 'suzhou' },
          { title: '无锡', key: 'wuxi' }
        ]
      }
    ]
  },
  {
    title: '美国',
    key: 'usa',
    children: [
      {
        title: '加利福尼亚',
        key: 'california',
        children: [
          { title: '洛杉矶', key: 'los-angeles' },
          { title: '旧金山', key: 'san-francisco' },
          { title: '圣地亚哥', key: 'san-diego' }
        ]
      },
      {
        title: '纽约州',
        key: 'new-york-state',
        children: [
          { title: '纽约市', key: 'new-york-city' },
          { title: '布法罗', key: 'buffalo' },
          { title: '罗切斯特', key: 'rochester' }
        ]
      }
    ]
  }
]

const filterTreeNode = (searchValue: string, node: TreeNodeData) => {
  return node.title.toLowerCase().includes(searchValue.toLowerCase())
}

const onSearch = (value: string) => {
  console.log('搜索内容：', value)
}
</script>
```

::: 