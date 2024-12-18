<template>
  <div 
    class="cozy-step"
    :class="[
      `cozy-step-${stepStatus}`,
      {
        'cozy-step-custom': icon,
        'cozy-step-with-progress': isProgressDot
      }
    ]"
    @click="handleClick"
  >
    <!-- 步骤图标 -->
    <div class="cozy-step-icon">
      <slot name="icon">
        <template v-if="!isProgressDot">
          <span v-if="icon" class="cozy-step-icon-custom">
            <i :class="['cozy-icon', icon]"></i>
          </span>
          <span v-else class="cozy-step-icon-inner">
            <template v-if="stepStatus === 'finish'">
              <i class="cozy-icon c-check-outlined"></i>
            </template>
            <template v-else-if="stepStatus === 'error'">
              <i class="cozy-icon c-close-outlined"></i>
            </template>
            <template v-else>{{ stepNumber }}</template>
          </span>
        </template>
        <template v-else>
          <span class="cozy-step-icon-dot"></span>
        </template>
      </slot>
    </div>

    <!-- 连接线 -->
    <div class="cozy-step-line"></div>

    <!-- 步骤内容 -->
    <div class="cozy-step-content">
      <div class="cozy-step-title">
        {{ title }}
        <div v-if="subTitle" class="cozy-step-subtitle">{{ subTitle }}</div>
      </div>
      <div v-if="description" class="cozy-step-description">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, computed, onMounted, onBeforeUnmount, type PropType } from 'vue';

/**
 * Step 步骤组件
 * Steps 的子组件，单个步骤的内容
 */

// 定义组件名称
defineOptions({
  name: 'CStep'
});

// 定义组件属性
const props = defineProps({
  // 步骤标题
  title: {
    type: String,
    default: ''
  },
  // 步骤副标题
  subTitle: {
    type: String,
    default: ''
  },
  // 步骤描述
  description: {
    type: String,
    default: ''
  },
  // 步骤图标
  icon: {
    type: String,
    default: ''
  },
  // 步骤状态
  status: {
    type: String as PropType<'wait' | 'process' | 'finish' | 'error'>,
    default: ''
  },
  // 是否禁用点击
  disabled: {
    type: Boolean,
    default: false
  }
});

// 注入父组件上下文
const stepsContext = inject('stepsContext') as any;

// 当前步骤序号
const stepNumber = computed(() => {
  if (!stepsContext || !stepsContext.steps) return 1;
  const index = stepsContext.steps.value.indexOf(props);
  return index + 1 + (stepsContext.initial.value || 0);
});

// 是否为点状步骤条
const isProgressDot = computed(() => {
  return !!stepsContext?.progressDot?.value;
});

// 步骤状态
const stepStatus = computed(() => {
  if (props.status) {
    return props.status;
  }
  return stepsContext?.getStepStatus(stepNumber.value - 1) || 'wait';
});

// 处理点击事件
const handleClick = () => {
  if (props.disabled) return;
  const index = stepsContext.steps.value.indexOf(props);
  stepsContext.onChange?.(index);
};

// 组件挂载时注册步骤
onMounted(() => {
  stepsContext.registerStep(props);
});

// 组件卸载前移除步骤
onBeforeUnmount(() => {
  stepsContext.unregisterStep(props);
});
</script> 