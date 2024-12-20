<template>
  <div style="display: none">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { inject, onMounted, onUnmounted, useSlots } from 'vue'
import type { TableColumnType } from './interface'

const props = withDefaults(
  defineProps<{
    /** 列标题 */
    label?: string
    /** 列数据在数据项中对应的路径 */
    prop?: string
    /** 列宽度 */
    width?: number | string
    /** 对齐方式 */
    align?: 'left' | 'center' | 'right'
    /** 是否固定列 */
    fixed?: 'left' | 'right'
  }>(),
  {
    align: 'left'
  }
)

const slots = useSlots()

// 注入父组件提供的方法
const registerColumn = inject<(column: TableColumnType) => void>('registerColumn')
const unregisterColumn = inject<(column: TableColumnType) => void>('unregisterColumn')

if (!registerColumn || !unregisterColumn) {
  throw new Error('CTableColumn must be used within CTable')
}

// 列配置
const column: TableColumnType = {
  title: props.label || '',
  dataIndex: props.prop,
  key: props.prop,
  width: props.width,
  align: props.align,
  fixed: props.fixed,
  slots: {
    title: slots.header ? `header-${props.prop}` : undefined,
    customRender: slots.default ? `default-${props.prop}` : undefined
  }
}

// 组件挂载时注册列配置
onMounted(() => {
  registerColumn(column)
})

// 组件卸载时移除列配置
onUnmounted(() => {
  unregisterColumn(column)
})

defineOptions({
  name: 'CTableColumn'
})
</script>
