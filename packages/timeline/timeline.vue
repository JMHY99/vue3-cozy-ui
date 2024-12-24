<template>
  <ul 
    class="cozy-timeline" 
    :class="{
      'cozy-timeline-right': mode === 'right',
      'cozy-timeline-alternate': mode === 'alternate',
      'cozy-timeline-pending': pending,
      'cozy-timeline-reverse': reverse
    }"
  >
    <slot></slot>
    <template v-if="pending">
      <c-timeline-item pending>
        <template v-if="typeof pending === 'string'" #default>{{ pending }}</template>
      </c-timeline-item>
    </template>
  </ul>
</template>

<script lang="ts" setup>
import { provide, useSlots, onMounted } from 'vue';
import CTimelineItem from './timeline-item.vue';

// 定义组件名称
defineOptions({
  name: 'CTimeline',
});

// 定义组件属性
const props = withDefaults(defineProps<{
  /** 指定最后一个幽灵节点是否存在 */
  pending?: boolean | string;
  /** 指定时间轴点的位置 */
  mode?: 'left' | 'alternate' | 'right';
  /** 节点排序方向 */
  reverse?: boolean;
}>(), {
  pending: false,
  mode: 'left',
  reverse: false
});

// 提供 mode 给子组件使用
provide('timelineMode', props.mode);

// 获取插槽
const slots = useSlots();

// 在挂载后为每个子组件提供索引
onMounted(() => {
  const defaultSlot = slots.default?.();
  if (defaultSlot) {
    defaultSlot.forEach((vnode, index) => {
      if (vnode.component) {
        provide(`timelineItemIndex`, index);
      }
    });
  }
});
</script> 