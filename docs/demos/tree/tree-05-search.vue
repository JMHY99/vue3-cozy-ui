<template>
  <div>
    <c-input
      v-model="searchText"
      placeholder="请输入搜索内容"
      style="width: 300px; margin-bottom: 8px"
      :prefix-icon="'c-search'"
    />
    <c-tree
      :tree-data="treeData"
      :filter-tree-node="filterTreeNode"
      default-expand-all
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TreeNodeData } from '../../../packages/tree/tree.vue'

const searchText = ref('')

const treeData: TreeNodeData[] = [
  {
    title: '编程语言',
    key: 'languages',
    children: [
      {
        title: '前端开发',
        key: 'frontend',
        children: [
          { title: 'HTML', key: 'html' },
          { title: 'CSS', key: 'css' },
          { title: 'JavaScript', key: 'javascript' },
          { title: 'TypeScript', key: 'typescript' },
          { title: 'Vue.js', key: 'vue' },
          { title: 'React', key: 'react' }
        ]
      },
      {
        title: '后端开发',
        key: 'backend',
        children: [
          { title: 'Java', key: 'java' },
          { title: 'Python', key: 'python' },
          { title: 'Node.js', key: 'nodejs' },
          { title: 'PHP', key: 'php' },
          { title: 'Go', key: 'go' },
          { title: 'Ruby', key: 'ruby' }
        ]
      }
    ]
  },
  {
    title: '开发工具',
    key: 'tools',
    children: [
      {
        title: '编辑器',
        key: 'editors',
        children: [
          { title: 'Visual Studio Code', key: 'vscode' },
          { title: 'WebStorm', key: 'webstorm' },
          { title: 'Sublime Text', key: 'sublime' }
        ]
      },
      {
        title: '版本控制',
        key: 'vcs',
        children: [
          { title: 'Git', key: 'git' },
          { title: 'SVN', key: 'svn' }
        ]
      }
    ]
  }
]

const filterTreeNode = (node: TreeNodeData) => {
  if (!searchText.value) return true
  return node.title.toLowerCase().includes(searchText.value.toLowerCase())
}
</script> 