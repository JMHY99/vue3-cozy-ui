<template>
  <div>
    <c-tree
      :tree-data="treeData"
      show-icon
      :icon="getIcon"
      :default-expanded-keys="['root']"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TreeNodeData } from '../../../packages/tree/tree.vue'

const treeData: TreeNodeData[] = [
  {
    title: '我的文档',
    key: 'root',
    icon: 'c-folder-filled',
    children: [
      {
        title: '图片',
        key: 'images',
        icon: 'c-image',
        children: [
          { title: '风景照.jpg', key: 'img1', icon: 'c-file-image' },
          { title: '头像.png', key: 'img2', icon: 'c-file-image' },
          { title: '截图.png', key: 'img3', icon: 'c-file-image' }
        ]
      },
      {
        title: '文档',
        key: 'docs',
        icon: 'c-file-text',
        children: [
          { title: '简历.pdf', key: 'doc1', icon: 'c-file-pdf' },
          { title: '报告.docx', key: 'doc2', icon: 'c-file-word' },
          { title: '数据.xlsx', key: 'doc3', icon: 'c-file-excel' }
        ]
      },
      {
        title: '视频',
        key: 'videos',
        icon: 'c-video',
        children: [
          { title: '演示视频.mp4', key: 'video1', icon: 'c-file-video' },
          { title: '教程.mp4', key: 'video2', icon: 'c-file-video' }
        ]
      }
    ]
  }
]

const getIcon = (props: { expanded: boolean; selected: boolean; node: TreeNodeData }) => {
  // 如果节点自定义了图标，则使用节点的图标
  if (props.node.icon) {
    return props.node.icon
  }
  // 否则根据展开状态返回默认图标
  return props.expanded ? 'c-folder-open' : 'c-folder'
}
</script> 