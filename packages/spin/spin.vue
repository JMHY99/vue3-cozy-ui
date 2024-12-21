<template>
  <div 
    class="cozy-spin-nested-loading"
    :class="{
      'cozy-spin-nested-loading-small': size === 'small',
      'cozy-spin-nested-loading-large': size === 'large'
    }"
  >
    <!-- 容器内容 -->
    <div class="cozy-spin-container" :class="{ 'cozy-spin-blur': shouldBeSpinning }">
      <slot></slot>
    </div>

    <!-- 加载动画 -->
    <div v-if="shouldBeSpinning" class="cozy-spin">
      <!-- 圆环加载 -->
      <span 
        v-if="type === 'circle'"
        class="cozy-spin-circle"
        :class="{
          'cozy-spin-circle-small': size === 'small',
          'cozy-spin-circle-large': size === 'large'
        }"
      >
        <svg viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="20"></circle>
        </svg>
      </span>

      <!-- 波浪加载 -->
      <span 
        v-else-if="type === 'wave'"
        class="cozy-spin-wave"
        :class="{
          'cozy-spin-wave-small': size === 'small',
          'cozy-spin-wave-large': size === 'large'
        }"
      >
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </span>

      <!-- 弹跳加载 -->
      <span 
        v-else-if="type === 'bounce'"
        class="cozy-spin-bounce"
        :class="{
          'cozy-spin-bounce-small': size === 'small',
          'cozy-spin-bounce-large': size === 'large'
        }"
      >
        <i></i>
        <i></i>
        <i></i>
      </span>

      <!-- 脉冲加载 -->
      <span 
        v-else-if="type === 'pulse'"
        class="cozy-spin-pulse"
        :class="{
          'cozy-spin-pulse-small': size === 'small',
          'cozy-spin-pulse-large': size === 'large'
        }"
      >
        <i></i>
      </span>

      <!-- 方块加载 -->
      <span 
        v-else-if="type === 'square'"
        class="cozy-spin-square"
        :class="{
          'cozy-spin-square-small': size === 'small',
          'cozy-spin-square-large': size === 'large'
        }"
      >
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </span>

      <!-- 加载提示文本 -->
      <div v-if="tip" class="cozy-spin-text">{{ tip }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

// 定义组件名称
defineOptions({
  name: 'CSpin',
});

// 定义组件属性
const props = withDefaults(defineProps<{
  /** 是否为加载中状态 */
  spinning?: boolean;
  /** 加载指示符的大小 */
  size?: 'small' | 'default' | 'large';
  /** 当作为包裹元素时，可以自定义延迟显示加载状态 */
  delay?: number;
  /** 自定义描述文案 */
  tip?: string;
  /** 加载动画类型 */
  type?: 'circle' | 'wave' | 'bounce' | 'pulse' | 'square';
}>(), {
  spinning: true,
  size: 'default',
  delay: 0,
  type: 'circle'
});

// 实际的加载状态
const shouldBeSpinning = ref(props.spinning);

// 定时器
let delayTimer: NodeJS.Timeout | null = null;

// 监听 spinning 属性变化
watch(() => props.spinning, (value) => {
  if (delayTimer) {
    clearTimeout(delayTimer);
  }
  
  if (props.delay) {
    delayTimer = setTimeout(() => {
      shouldBeSpinning.value = value;
    }, props.delay);
  } else {
    shouldBeSpinning.value = value;
  }
}, { immediate: true });
</script> 