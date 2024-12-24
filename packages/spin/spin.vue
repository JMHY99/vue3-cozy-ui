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
        <div class="container">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
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
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
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

      <!-- 脉冲加载改为心电图加载 -->
      <span 
        v-else-if="type === 'cardio'"
        class="cozy-spin-cardio"
        :class="{
          'cozy-spin-cardio-small': size === 'small',
          'cozy-spin-cardio-large': size === 'large'
        }"
      >
        <svg
          class="container" 
          x="0px" 
          y="0px"
          viewBox="0 0 50 31.25"
          height="31.25"
          width="50"
          preserveAspectRatio='xMidYMid meet'
        >
          <path 
            class="track"
            stroke-width="4" 
            fill="none" 
            pathlength="100"
            d="M0.625 21.5 h10.25 l3.75 -5.875 l7.375 15 l9.75 -30 l7.375 20.875 v0 h10.25"
          />
          <path 
            class="car"
            stroke-width="4" 
            fill="none" 
            pathlength="100"
            d="M0.625 21.5 h10.25 l3.75 -5.875 l7.375 15 l9.75 -30 l7.375 20.875 v0 h10.25"
          />
        </svg>
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

      <!-- 果冻加载 -->
      <span
        v-else-if="type === 'jelly'"
        class="cozy-spin-jelly"
        :class="{
          'cozy-spin-jelly-small': size === 'small',
          'cozy-spin-jelly-large': size === 'large'
        }"
      >
        <div class="container"></div>
        <svg width="0" height="0" class="svg">
          <defs>
            <filter id="uib-jelly-ooze">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="5"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="ooze"
              />
              <feBlend in="SourceGraphic" in2="ooze" />
            </filter>
          </defs>
        </svg>
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
  /** 当作包裹元素时，可以自定义延迟显示加载状态 */
  delay?: number;
  /** 自定义描述文案 */
  tip?: string;
  /** 加载动画类型 */
  type?: 'circle' | 'wave' | 'bounce' | 'cardio' | 'square' | 'jelly';
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