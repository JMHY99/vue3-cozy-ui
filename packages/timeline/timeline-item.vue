<template>
  <li 
    class="cozy-timeline-item" 
    :class="{
      'cozy-timeline-item-pending': pending
    }"
  >
    <!-- 时间轴点 -->
    <div 
      class="cozy-timeline-item-head" 
      :class="[
        `cozy-timeline-item-head-${color}`,
        {
          'cozy-timeline-item-head-custom': $slots.dot
        }
      ]"
    >
      <slot name="dot"></slot>
    </div>

    <!-- 时间轴线 -->
    <div class="cozy-timeline-item-tail"></div>

    <!-- 内容 -->
    <div class="cozy-timeline-item-content">
      <div v-if="label" class="cozy-timeline-item-label">{{ label }}</div>
      <slot></slot>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { inject, computed } from 'vue';

// 定义组件名称
defineOptions({
  name: 'CTimelineItem',
});

// 定义组件属性
const props = withDefaults(defineProps<{
  /** 指定圆圈颜色 */
  color?: 'blue' | 'red' | 'green' | 'gray';
  /** 设置标签 */
  label?: string;
  /** 自定义节点位置 */
  position?: 'left' | 'right';
  /** 当前节点是否为幽灵节点 */
  pending?: boolean;
}>(), {
  color: 'blue',
  pending: false
});

// 注入父组件的 mode
const timelineMode = inject<'left' | 'alternate' | 'right'>('timelineMode', 'left');

// 注入当前节点的索引
const itemIndex = inject<number>('timelineItemIndex', 0);

// 计算节点位置
const position = computed(() => {
  if (props.position) {
    return props.position;
  }
  if (timelineMode === 'alternate') {
    return itemIndex % 2 === 0 ? 'left' : 'right';
  }
  return timelineMode;
});
</script> 