<template>
  <div>
    <c-tree-select
      v-model="value"
      :tree-data="treeData"
      :tree-node-label-prop="'label'"
      placeholder="请选择"
      style="width: 300px"
      allow-clear
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<string>()

const treeData = [
  {
    label: '📱 电子产品',
    key: 'electronics',
    children: [
      {
        label: '💻 电脑',
        key: 'computer',
        children: [
          { label: '🔵 笔记本电脑', key: 'laptop' },
          { label: '🖥️ 台式电脑', key: 'desktop' }
        ]
      },
      {
        label: '📱 手机',
        key: 'phone',
        children: [
          { label: '🍎 iPhone', key: 'iphone' },
          { label: '🤖 Android', key: 'android' }
        ]
      }
    ]
  },
  {
    label: '👕 服装',
    key: 'clothing',
    children: [
      {
        label: '👔 正装',
        key: 'formal',
        children: [
          { label: '👔 西装', key: 'suit' },
          { label: '👗 连衣裙', key: 'dress' }
        ]
      },
      {
        label: '👕 休闲',
        key: 'casual',
        children: [
          { label: '👕 T恤', key: 't-shirt' },
          { label: '👖 牛仔裤', key: 'jeans' }
        ]
      }
    ]
  }
]
</script>

<style scoped>
.custom-label {
  display: flex;
  align-items: center;
  gap: 4px;
}
.custom-icon {
  font-size: 16px;
}
</style> 