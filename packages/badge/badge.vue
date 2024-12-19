<template>
  <div :class="badgeClasses">
    <!-- 默认内容插槽 -->
    <slot></slot>
    <!-- 徽标内容 -->
    <transition name="cozy-zoom">
      <sup
        v-if="showBadge"
        :class="supClasses"
        :style="badgeStyle"
      >
        <slot name="count">
          {{ displayCount }}
        </slot>
      </sup>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'CBadge'
})

// 定义组件属性
interface Props {
  /** 徽标的数字 */
  count?: number | string
  /** 展示封顶的数字值 */
  overflowCount?: number
  /** 不展示数字，只有一个小红点 */
  dot?: boolean
  /** 展示为状态点 */
  status?: 'success' | 'processing' | 'default' | 'error' | 'warning'
  /** 自定义小圆点的颜色 */
  color?: string
  /** 设置状态点的文本 */
  text?: string
  /** 当数值为 0 时，是否展示徽标 */
  showZero?: boolean
  /** 设置鼠标放在状态点上时显示的文字 */
  title?: string
  /** 设置 Badge 的位置偏移 */
  offset?: [number, number]
  /** 是否独立使用 */
  standalone?: boolean
}

// 设置属性默认值
const props = withDefaults(defineProps<Props>(), {
  count: undefined,
  overflowCount: 99,
  dot: false,
  status: undefined,
  color: undefined,
  text: '',
  showZero: false,
  title: '',
  offset: undefined,
  standalone: false
})

// 计算是否显示徽标
const showBadge = computed(() => {
  const { count, dot, status, color } = props
  // 如果是状态点或自定义颜色，则显示
  if (status || color) return true
  // 如果是小圆点模式，则显示
  if (dot) return true
  // 如果有数字且不为0，则显示
  if (count !== undefined && count !== null) {
    return count !== 0 || props.showZero
  }
  return false
})

// 计算显示的数字
const displayCount = computed(() => {
  const { count, overflowCount } = props
  if (typeof count === 'number' && count > overflowCount) {
    return `${overflowCount}+`
  }
  return count
})

// 计算徽标样式
const badgeStyle = computed(() => {
  const style: CSSProperties = {}

  // 设置自定义颜色
  if (props.color) {
    style.backgroundColor = props.color
  }

  // 设置位置偏移
  if (props.offset) {
    const [x, y] = props.offset
    style.right = `${-x}px`
    style.marginTop = `${y}px`
  }

  return style
})

// 计算徽标类名
const badgeClasses = computed(() => {
  const { status, dot, standalone } = props
  return [
    'cozy-badge',
    {
      [`cozy-badge-status`]: status,
      [`cozy-badge-${status}`]: status,
      'cozy-badge-dot': dot,
      'cozy-badge-standalone': standalone
    }
  ]
})

// 计算徽标数字类名
const supClasses = computed(() => {
  const { status, dot, color } = props
  return [
    'cozy-badge-count',
    {
      'cozy-badge-dot': dot,
      'cozy-badge-status-dot': status || color,
      [`cozy-badge-status-${status}`]: status
    }
  ]
})
</script>

<script lang="ts">
export interface BadgeProps {
  count?: number | string
  overflowCount?: number
  dot?: boolean
  status?: 'success' | 'processing' | 'default' | 'error' | 'warning'
  color?: string
  text?: string
  showZero?: boolean
  title?: string
  offset?: [number, number]
  standalone?: boolean
}
</script>
