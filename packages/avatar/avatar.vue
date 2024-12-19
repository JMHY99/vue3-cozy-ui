<template>
  <span
    :class="classes"
    :style="styles"
    @mouseenter="handleMouseHover(true)"
    @mouseleave="handleMouseHover(false)"
  >
    <!-- 图片头像 -->
    <img
      v-if="hasImage"
      :src="src"
      :srcset="srcset"
      :alt="alt"
      @error="handleError"
      @load="handleImgLoaded"
      :style="imageStyles"
    >

    <!-- 图标头像 -->
    <span v-else-if="icon" class="cozy-avatar-icon">
      <slot name="icon">
        <component
          :is="typeof icon === 'object' ? icon : 'i'"
          :class="typeof icon === 'string' ? `cozy-icon ${icon}` : ''"
        />
      </slot>
    </span>

    <!-- 文字头像 -->
    <span
      v-else
      ref="textRef"
      class="cozy-avatar-string"
      :style="textStyles"
    >
      <slot>{{ displayText }}</slot>
    </span>
  </span>
</template>

<script lang="ts" setup>
import { computed, ref, watch, onMounted, nextTick, useSlots } from 'vue'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'CAvatar'
})

// 定义组件属性
interface Props {
  /** 替代文本 */
  alt?: string
  /** 图片缩放类型 */
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  /** 图标或图标组件 */
  icon?: string | object
  /** 设置头像的形状 */
  shape?: 'circle' | 'square'
  /** 图片地址 */
  src?: string
  /** 图片 srcset 属性 */
  srcset?: string
  /** 设置头像的大小 */
  size?: number | 'large' | 'small' | 'default'
  /** 图片加载失败的事件 */
  onError?: () => boolean
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  fit: 'cover',
  icon: undefined,
  shape: 'circle',
  src: '',
  srcset: '',
  size: 'default',
  onError: undefined
})

// 定义事件
const emit = defineEmits<{
  error: [event: Event]
}>()

// 组件状态
const isImgExist = ref(true)
const scale = ref(1)
const textRef = ref<HTMLElement | null>(null)
const mounted = ref(false)
const isHovered = ref(false)

// 获取插槽
const slots = useSlots()

// 计算图片是否存在
const hasImage = computed(() => props.src && isImgExist.value)

// 计算显示的文本
const displayText = computed(() => {
  const text = textRef.value?.textContent || ''
  return text.trim().charAt(0)
})

// 计算组件类名
const classes = computed(() => {
  const size = typeof props.size === 'string' ? props.size : ''
  return [
    'cozy-avatar',
    {
      [`cozy-avatar-${props.shape}`]: props.shape,
      [`cozy-avatar-${size}`]: size,
      [`cozy-avatar-icon`]: props.icon,
      'cozy-avatar-image': hasImage.value
    }
  ]
})

// 计算组件样式
const styles = computed(() => {
  const style: CSSProperties = {}
  if (typeof props.size === 'number') {
    style.width = style.height = style.lineHeight = `${props.size}px`
    style.fontSize = `${props.size / 2}px`
  }
  return style
})

// 计算图片样式
const imageStyles = computed(() => ({
  objectFit: props.fit
}))

// 计算文字样式
const textStyles = computed(() => ({
  transform: `scale(${scale.value}) translateX(-50%)`
}))

// 处理图片加载错误
const handleError = (e: Event) => {
  const errorFlag = props.onError ? props.onError() : undefined
  if (errorFlag !== false) {
    isImgExist.value = false
  }
  emit('error', e)
}

// 处理图片加载完成
const handleImgLoaded = () => {
  isImgExist.value = true
}

// 处理鼠标悬停
const handleMouseHover = (isHover: boolean) => {
  isHovered.value = isHover
}

// 设置文字缩放
const setScale = async () => {
  if (!textRef.value || hasImage.value) return

  await nextTick()
  const textWidth = textRef.value.offsetWidth
  const containerWidth = textRef.value.parentElement?.offsetWidth || 0
  const gap = 4

  if (containerWidth - gap < textWidth) {
    scale.value = (containerWidth - gap) / textWidth
  } else {
    scale.value = 1
  }
}

// 监听内容变化
watch(
  [
    () => props.src,
    () => slots.default?.(),
    () => textRef.value?.textContent
  ],
  () => {
    nextTick(() => {
      setScale()
    })
  },
  { deep: true }
)

// 组件挂载后设置缩放
onMounted(() => {
  mounted.value = true
  setScale()
})
</script>

<script lang="ts">
export interface AvatarProps {
  alt?: string
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  icon?: string | object
  shape?: 'circle' | 'square'
  src?: string
  srcset?: string
  size?: number | 'large' | 'small' | 'default'
  onError?: () => boolean
}
</script>

<style lang="scss" scoped>
.cozy-avatar {
  box-sizing: border-box;
  display: inline-block;
  margin: 0;
  padding: 0;
  width: 32px;
  height: 32px;
  overflow: hidden;
  white-space: nowrap;
  line-height: 32px;
  border-radius: 50%;
  text-align: center;
  vertical-align: middle;
  background: #ccc;
  color: #fff;
}

.cozy-avatar-square {
  border-radius: 8px;
}

.cozy-avatar-img {
  background: #fff;
  border: 1px solid #f8f8f8;
}
</style>
