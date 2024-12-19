<template>
  <div class="cozy-avatar-group">
    <slot></slot>
    <c-avatar
      v-if="maxCount && maxCount < children.length"
      :size="size"
      :style="maxPopoverStyle"
    >
      +{{ children.length - maxCount }}
    </c-avatar>
  </div>
</template>

<script lang="ts" setup>
import { computed, provide, ref, useSlots } from 'vue'
import type { CSSProperties } from 'vue'
import CAvatar from './avatar.vue'

defineOptions({
  name: 'CAvatarGroup'
})

// 定义组件属性
interface Props {
  /** 设置头像的大小 */
  size?: number | 'large' | 'small' | 'default'
  /** 显示的最大头像个数 */
  maxCount?: number
  /** 最大头像数量的 Popover 配置 */
  maxPopoverPlacement?: 'top' | 'bottom'
  /** 设置头像的形状 */
  shape?: 'circle' | 'square'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  maxCount: undefined,
  maxPopoverPlacement: 'top',
  shape: 'circle'
})

// 获取插槽内容
const slots = useSlots()
const children = computed(() => {
  const defaultSlot = slots.default?.() || []
  return props.maxCount ? defaultSlot.slice(0, props.maxCount) : defaultSlot
})

// 计算最大数量显示的样式
const maxPopoverStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.maxPopoverPlacement === 'bottom') {
    style.marginTop = '0'
    style.marginBottom = '-8px'
  }
  return style
})

// 提供给子组件的配置
provide('avatarGroupConfig', {
  size: props.size,
  shape: props.shape
})
</script>
