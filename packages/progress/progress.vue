# Progress 进度条组件
<template>
  <div 
    class="cozy-progress" 
    :class="{
      [`cozy-progress-${type}`]: true,
      'cozy-progress-show-info': showInfo,
      'cozy-progress-status-success': status === 'success',
      'cozy-progress-status-exception': status === 'exception'
    }"
  >
    <!-- 进度条主体 -->
    <div class="cozy-progress-outer">
      <div class="cozy-progress-inner">
        <div 
          class="cozy-progress-bg"
          :style="{ 
            width: `${percent}%`,
            backgroundColor: strokeColor
          }"
        />
        <!-- 条纹效果 -->
        <div 
          v-if="strokeLinecap === 'round' && type === 'line'"
          class="cozy-progress-success-bg"
          :style="{ width: `${successPercent}%` }"
        />
      </div>
    </div>

    <!-- 进度信息 -->
    <span v-if="showInfo" class="cozy-progress-text">
      <template v-if="status === 'success'">
        <c-icon name="c-check" />
      </template>
      <template v-else-if="status === 'exception'">
        <c-icon name="c-close" />
      </template>
      <template v-else>
        <span>{{ percent }}%</span>
      </template>
    </span>

    <!-- 圆形进度条 -->
    <template v-if="type === 'circle' || type === 'dashboard'">
      <svg 
        class="cozy-progress-circle" 
        viewBox="0 0 100 100"
        :style="{
          width: `${size}px`,
          height: `${size}px`
        }"
      >
        <!-- 背景圆环 -->
        <path
          class="cozy-progress-circle-trail"
          :d="trackPath"
          :stroke="trailColor"
          :stroke-width="strokeWidth"
          fill="none"
        />
        <!-- 进度圆环 -->
        <path
          class="cozy-progress-circle-path"
          :d="trackPath"
          :stroke="strokeColor"
          :stroke-width="strokeWidth"
          :stroke-linecap="strokeLinecap"
          fill="none"
          :style="{
            strokeDasharray: `${percent * circumference / 100}px ${circumference}px`
          }"
        />
      </svg>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import CIcon from '../icon/icon.vue'

// 进度条类型
type ProgressType = 'line' | 'circle' | 'dashboard'
// 进度条状态
type ProgressStatus = 'success' | 'exception' | 'normal' | 'active'
// 进度条端点类型
type StrokeLinecapType = 'round' | 'square'

export default defineComponent({
  name: 'CProgress',
  components: {
    CIcon
  },
  props: {
    /**
     * 进度条类型
     * @values 'line' | 'circle' | 'dashboard'
     * @default 'line'
     */
    type: {
      type: String as PropType<ProgressType>,
      default: 'line'
    },
    /**
     * 百分比
     * @min 0
     * @max 100
     * @default 0
     */
    percent: {
      type: Number,
      default: 0,
      validator: (value: number) => value >= 0 && value <= 100
    },
    /**
     * 成功进度条的百分比
     * @min 0
     * @max 100
     */
    successPercent: {
      type: Number,
      default: 0,
      validator: (value: number) => value >= 0 && value <= 100
    },
    /**
     * 是否显示进度数值或状态图标
     * @default true
     */
    showInfo: {
      type: Boolean,
      default: true
    },
    /**
     * 进度条状态
     * @values 'success' | 'exception' | 'normal' | 'active'
     * @default 'normal'
     */
    status: {
      type: String as PropType<ProgressStatus>,
      default: 'normal'
    },
    /**
     * 进度条颜色
     */
    strokeColor: {
      type: String,
      default: ''
    },
    /**
     * 进度条背景色
     */
    trailColor: {
      type: String,
      default: ''
    },
    /**
     * 进度条线的宽度
     * @default 6
     */
    strokeWidth: {
      type: Number,
      default: 6
    },
    /**
     * 进度条端点的形状
     * @values 'round' | 'square'
     * @default 'round'
     */
    strokeLinecap: {
      type: String as PropType<StrokeLinecapType>,
      default: 'round'
    },
    /**
     * 圆形进度条画布宽度
     * @default 120
     */
    size: {
      type: Number,
      default: 120
    }
  },
  setup(props) {
    // 计算圆形进度条路径
    const radius = computed(() => 50 - props.strokeWidth / 2)
    const circumference = computed(() => 2 * Math.PI * radius.value)
    const trackPath = computed(() => {
      const r = radius.value
      if (props.type === 'dashboard') {
        return `M 50,50 m 0,${r}
          a ${r},${r} 0 1 1 0,-${2 * r}
          a ${r},${r} 0 1 1 0,${2 * r}`
      }
      return `M 50,50 m -${r},0
        a ${r},${r} 0 1 1 ${r * 2},0
        a ${r},${r} 0 1 1 -${r * 2},0`
    })

    return {
      radius,
      circumference,
      trackPath
    }
  }
})
</script> 