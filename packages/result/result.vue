# Result 结果组件
<template>
  <div 
    class="cozy-result" 
    :class="{
      [`cozy-result-${status}`]: true
    }"
  >
    <!-- 图标 -->
    <div class="cozy-result-icon">
      <template v-if="['403', '404', '500'].includes(status)">
        <div class="cozy-result-error-image" :class="`cozy-result-${status}`"></div>
      </template>
      <template v-else-if="status === 'success'">
        <c-icon name="c-circle-check-filled" :size="72" />
      </template>
      <template v-else-if="status === 'error'">
        <c-icon name="c-circle-close-filled" :size="72" />
      </template>
      <template v-else-if="status === 'info'">
        <c-icon name="c-information" :size="72" />
      </template>
      <template v-else-if="status === 'warning'">
        <c-icon name="c-warning-filled" :size="72" />
      </template>
      <template v-else>
        <slot name="icon"></slot>
      </template>
    </div>

    <!-- 标题 -->
    <div class="cozy-result-title">
      <slot name="title">{{ title }}</slot>
    </div>

    <!-- 副标题 -->
    <div v-if="$slots.subTitle || subTitle" class="cozy-result-subtitle">
      <slot name="subTitle">{{ subTitle }}</slot>
    </div>

    <!-- 额外内容 -->
    <div v-if="$slots.extra" class="cozy-result-extra">
      <slot name="extra"></slot>
    </div>

    <!-- 内容 -->
    <div v-if="$slots.default" class="cozy-result-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import CIcon from '../icon/icon.vue'

// 结果状态类型
type ResultStatus = 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500'

export default defineComponent({
  name: 'CResult',
  components: {
    CIcon
  },
  props: {
    /**
     * 结果的状态，决定图标和颜色
     * @values 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500'
     * @default 'info'
     */
    status: {
      type: String as PropType<ResultStatus>,
      default: 'info'
    },
    /**
     * 标题
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * 副标题
     */
    subTitle: {
      type: String,
      default: ''
    }
  }
})
</script> 