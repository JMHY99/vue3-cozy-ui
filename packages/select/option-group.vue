<template>
  <div class="cozy-select-option-group">
    <div class="cozy-select-option-group-label">{{ label }}</div>
    <div class="cozy-select-option-group-list">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { provide } from 'vue'

// 定义分组上下文接口
interface OptionGroupContext {
  label: string
}

defineOptions({
  name: 'COptionGroup'
})

const props = withDefaults(defineProps<{
  label: string  // 分组标签
}>(), {
  label: ''
})

// 提供分组上下文给子组件
provide<OptionGroupContext>('optionGroup', {
  label: props.label
})
</script>
