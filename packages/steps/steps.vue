<template>
  <div 
    class="cozy-steps"
    :class="[
      `cozy-steps-${direction}`,
      `cozy-steps-${size}`,
      {
        'cozy-steps-with-progress': progressDot,
        'cozy-steps-label-vertical': labelPlacement === 'vertical' && direction === 'horizontal'
      }
    ]"
  >
    <!-- 步骤条主体内容 -->
    <div class="cozy-steps-items">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { provide, ref, computed } from 'vue';
import type { InjectionKey } from 'vue';

/**
 * Steps 步骤条组件
 * 用于引导用户按照流程完成任务的导航条
 */

// 定义组件名称
defineOptions({
  name: 'CSteps'
});

// 定义组件属性
const props = withDefaults(defineProps<{
  // 当前步骤
  current?: number;
  // 步骤条方向 - horizontal:水平 vertical:垂直
  direction?: 'horizontal' | 'vertical';
  // 指定步骤条的尺寸 - default:默认大小 small:小尺寸
  size?: 'default' | 'small';
  // 指定标签放置位置，默认水平放图标右侧，可选 vertical 放图标下方
  labelPlacement?: 'horizontal' | 'vertical';
  // 指定当前步骤的状态 - wait:等待 process:进行中 finish:完成 error:错误
  status?: 'wait' | 'process' | 'finish' | 'error';
  // 点状步骤条，可以设置为一个 function,customDot
  progressDot?: boolean | ((iconDot: any, { index, status, title, description }: any) => any);
  // 起始序号，从 0 开始记数
  initial?: number;
  // 指定标签文字方向
  labelDirection?: 'horizontal' | 'vertical';
  // 点击步骤时的回调
  onChange?: (current: number) => void;
}>(), {
  current: 0,
  direction: 'horizontal',
  size: 'default',
  labelPlacement: 'horizontal',
  status: 'process',
  progressDot: false,
  initial: 0,
  labelDirection: 'horizontal'
});

// 步骤条状态
const stepsStatus = computed(() => {
  if (props.status === 'error' && props.current === steps.value.length - 1) {
    return 'error';
  }
  return 'process';
});

// 存储所有步骤
const steps = ref<any[]>([]);

// 注册步骤
const registerStep = (step: any) => {
  steps.value.push(step);
};

// 移除步骤
const unregisterStep = (step: any) => {
  const index = steps.value.indexOf(step);
  if (index !== -1) {
    steps.value.splice(index, 1);
  }
};

// 获取步骤状态
const getStepStatus = (stepNumber: number) => {
  const { current, status } = props;
  
  if (stepNumber < current) {
    return 'finish';
  } else if (stepNumber === current) {
    return status;
  }
  return 'wait';
};

// 提供给子组件的上下文
provide('stepsContext', {
  current: computed(() => props.current),
  direction: computed(() => props.direction),
  size: computed(() => props.size),
  status: stepsStatus,
  progressDot: computed(() => props.progressDot),
  initial: computed(() => props.initial),
  steps,
  registerStep,
  unregisterStep,
  getStepStatus,
  onChange: props.onChange
});

// 暴露方法
defineExpose({
  steps
});
</script> 