<template>
  <div class="cozy-select-option-group">
    <div class="cozy-select-option-group-label">{{ label }}</div>
    <div class="cozy-select-option-group-list">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 引入必要的 Vue 组合式 API
import { provide } from 'vue'

// 组件名称
defineOptions({
  name: 'COptionGroup'
})

// 组件属性定义
const props = withDefaults(defineProps<{
  label: string  // 分组标签
}>(), {})

// 提供分组上下文给子组件
provide('optionGroup', {
  label: props.label
})
</script>
