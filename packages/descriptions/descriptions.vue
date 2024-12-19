<template>
  <div :class="descriptionClasses">
    <!-- 标题 -->
    <div v-if="title || $slots.title" class="cozy-descriptions-header">
      <div class="cozy-descriptions-title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="$slots.extra" class="cozy-descriptions-extra">
        <slot name="extra"></slot>
      </div>
    </div>

    <!-- 内容 -->
    <div class="cozy-descriptions-view">
      <table>
        <tbody>
          <template v-for="(row, index) in rows" :key="index">
            <tr class="cozy-descriptions-row">
              <template v-for="(item, itemIndex) in row" :key="itemIndex">
                <!-- 标签 -->
                <td
                  class="cozy-descriptions-item-label"
                  :class="{ 'cozy-descriptions-item-colon': colon }"
                  :style="{ width: labelWidth }"
                >
                  {{ item.label }}
                </td>
                <!-- 内容 -->
                <td
                  class="cozy-descriptions-item-content"
                  :colspan="item.span"
                >
                  <component :is="item.content" />
                </td>
              </template>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * Descriptions 描述列表组件
 * @description 成组展示多个只读字段
 */
import { computed, provide, useSlots, h } from 'vue'
import type { Component, VNode, Slot } from 'vue'

interface DescriptionItem {
  label: string
  content: () => VNode[] | null
  span: number
}

// Props 定义
const props = withDefaults(defineProps<{
  /** 是否展示边框 */
  bordered?: boolean
  /** 一行的列表项数量 */
  column?: number
  /** 配置 label 和 content 的 colon */
  colon?: boolean
  /** 描述布局 */
  layout?: 'horizontal' | 'vertical'
  /** 设置列表的大小 */
  size?: 'default' | 'middle' | 'small'
  /** 设置标题 */
  title?: string
  /** label 宽度 */
  labelWidth?: string | number
}>(), {
  bordered: false,
  column: 3,
  colon: true,
  layout: 'horizontal',
  size: 'default'
})

// 提供上下文
provide('descriptions-props', props)

// 计算 class
const descriptionClasses = computed(() => [
  'cozy-descriptions',
  {
    'cozy-descriptions-bordered': props.bordered,
    [`cozy-descriptions-${props.size}`]: props.size,
    [`cozy-descriptions-${props.layout}`]: props.layout
  }
])

// 获取所有子项
const slots = useSlots()
const items = slots.default?.() || []

// 计算行数据
const rows = computed(() => {
  const rows: DescriptionItem[][] = []
  let temp: DescriptionItem[] = []
  let count = 0

  for (const item of items) {
    if (item.type && (item.type as Component).name === 'CDescriptionsItem') {
      const itemProps = item.props || {}
      const span = itemProps.span || 1
      
      if (count + span > props.column) {
        rows.push(temp)
        temp = []
        count = 0
      }
      
      temp.push({
        label: itemProps.label || '',
        content: () => {
          if (typeof item.children === 'object' && item.children !== null) {
            const defaultSlot = (item.children as { default?: Slot }).default
            return defaultSlot?.() || null
          }
          return null
        },
        span
      })
      count += span
    }
  }

  if (temp.length) {
    rows.push(temp)
  }

  return rows
})

defineOptions({
  name: 'CDescriptions'
})
</script> 