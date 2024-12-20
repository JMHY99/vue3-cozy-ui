<template>
  <div 
    class="cozy-image" 
    :class="[
      { 'cozy-image-error': isError },
      { 'cozy-image-loading': loading }
    ]"
  >
    <!-- 图片预览包装器 -->
    <div 
      class="cozy-image-wrapper"
      @click="handleClick"
    >
      <!-- 主图片 -->
      <img
        v-show="!isError"
        ref="imgRef"
        :src="src"
        :alt="alt"
        :width="width"
        :height="height"
        :class="[
          'cozy-image-img',
          { 'cozy-image-img-placeholder': placeholder }
        ]"
        @load="handleLoad"
        @error="handleError"
      />

      <!-- 占位图 -->
      <div 
        v-if="placeholder && loading" 
        class="cozy-image-placeholder"
      >
        <slot name="placeholder">
          <c-icon name="loading" />
        </slot>
      </div>

      <!-- 错误状态 -->
      <div 
        v-if="isError" 
        class="cozy-image-error-content"
      >
        <slot name="error">
          <div class="cozy-image-error-icon">
            <c-icon name="image" />
          </div>
        </slot>
      </div>

      <!-- 预览遮罩 -->
      <div 
        v-if="preview && !isError" 
        class="cozy-image-mask"
      >
        <div class="cozy-image-mask-info">
          <c-icon name="eye" />
          预览
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { ImageFit } from './types'

defineOptions({
  name: 'CImage'
})

interface ImageProps {
  /** 图片源地址 */
  src?: string
  /** 图片适应容器的方式 */
  fit?: ImageFit
  /** 是否开启预览 */
  preview?: boolean
  /** 图片描述 */
  alt?: string
  /** 图片宽度 */
  width?: string | number
  /** 图片高度 */
  height?: string | number
  /** 是否显示占位符 */
  placeholder?: boolean
  /** 加载失败容错地址 */
  fallback?: string
}

const props = withDefaults(defineProps<ImageProps>(), {
  src: '',
  fit: 'fill',
  preview: true,
  placeholder: true
})

const emit = defineEmits<{
  /** 图片加载完成时触发 */
  (e: 'load', event: Event): void
  /** 图片加载失败时触发 */
  (e: 'error', event: Event): void
  /** 点击图片时触发 */
  (e: 'click', event: Event): void
}>()

const imgRef = ref<HTMLImageElement>()
const loading = ref(true)
const isError = ref(false)

// 处理图片加载完成
const handleLoad = (e: Event) => {
  loading.value = false
  emit('load', e)
}

// 处理图片加载失败
const handleError = (e: Event) => {
  loading.value = false
  isError.value = true
  emit('error', e)
  if (props.fallback) {
    imgRef.value!.src = props.fallback
  }
}

// 处理图片点击
const handleClick = (e: MouseEvent) => {
  if (!isError.value && props.preview) {
    // TODO: 实现预览功能
  }
  emit('click', e)
}
</script> 