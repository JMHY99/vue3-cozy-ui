<template>
  <div class="cozy-checkbox-group">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { provide, computed } from 'vue'

defineOptions({
  name: 'CCheckboxGroup'
})

const props = defineProps<{
  modelValue: (string | number | boolean)[]
  disabled?: boolean
  min?: number
  max?: number
}>()

const emit = defineEmits(['update:modelValue', 'change'])

// 处理checkbox变更事件
const changeEvent = (value: string | number | boolean) => {
  const newValue = [...props.modelValue]
  const index = newValue.indexOf(value)

  if (index === -1) {
    // 如果设置了max且已达到最大值，则不添加
    if (props.max !== undefined && newValue.length >= props.max) {
      return
    }
    newValue.push(value)
  } else {
    // 如果设置了min且已达到最小值，则不删除
    if (props.min !== undefined && newValue.length <= props.min) {
      return
    }
    newValue.splice(index, 1)
  }

  emit('update:modelValue', newValue)
  emit('change', newValue)
}

// 提供给子组件的上下文
provide('checkboxGroup', {
  modelValue: computed(() => props.modelValue),
  disabled: computed(() => props.disabled ?? false),
  changeEvent
})
</script>
