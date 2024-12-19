<template>
  <div class="cozy-descriptions-item">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
/**
 * DescriptionsItem 描述列表项组件
 * @description 描述列表的子项
 */

// Props 定义
const props = withDefaults(defineProps<{
  /** 内容的描述 */
  label?: string
  /** 包含列的数量 */
  span?: number
}>(), {
  span: 1
})

defineOptions({
  name: 'CDescriptionsItem'
})
</script> 