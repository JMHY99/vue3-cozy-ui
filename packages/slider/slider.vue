<template>
  <div
    ref="sliderRef"
    :class="[
      'cozy-slider',
      {
        'cozy-slider-disabled': disabled,
        'cozy-slider-vertical': vertical,
        'cozy-slider-with-marks': showMarks
      }
    ]"
    @click.self="handleSliderClick"
  >
    <div class="cozy-slider-rail"></div>
    <div
      class="cozy-slider-track"
      :style="trackStyle"
    ></div>
    <div
      v-if="showMarks"
      class="cozy-slider-marks"
    >
      <span
        v-for="(mark, key) in marks"
        :key="key"
        class="cozy-slider-mark"
        :style="getMarkStyle(key)"
      >
        {{ mark }}
      </span>
    </div>
    <div
      v-if="showSteps"
      class="cozy-slider-steps"
    >
      <span
        v-for="(step, index) in steps"
        :key="index"
        class="cozy-slider-step"
        :class="{ 'cozy-slider-step-active': step <= modelValue }"
        :style="getStepStyle(step)"
      ></span>
    </div>
    <div
      ref="handleRef"
      class="cozy-slider-handle"
      :style="handleStyle"
      @mousedown="handleMouseDown"
      @touchstart="handleTouchStart"
      role="slider"
      :tabindex="disabled ? -1 : 0"
      :aria-valuemin="min"
      :aria-valuemax="max"
      :aria-valuenow="modelValue"
      :aria-disabled="disabled"
    ></div>
    <div
      v-if="showTooltip"
      class="cozy-slider-tooltip"
      :style="tooltipStyle"
    >
      {{ formatTooltip ? formatTooltip(modelValue) : modelValue }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

defineOptions({
  name: 'CSlider'
})

const props = withDefaults(defineProps<{
  modelValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  vertical?: boolean
  showTooltip?: boolean
  formatTooltip?: (val: number) => string | number
  marks?: Record<number, string>
  showSteps?: boolean
}>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  vertical: false,
  showTooltip: true,
  formatTooltip: undefined,
  marks: () => ({}),
  showSteps: false
})

const emit = defineEmits(['update:modelValue', 'change'])

const sliderRef = ref<HTMLElement>()
const handleRef = ref<HTMLElement>()
const isDragging = ref(false)
const startPosition = ref(0)
const startValue = ref(0)

// 计算步骤点
const steps = computed(() => {
  const result: number[] = []
  for (let i = props.min; i <= props.max; i += props.step) {
    result.push(i)
  }
  return result
})

// 是否显示标记点
const showMarks = computed(() => Object.keys(props.marks).length > 0)

// 计算轨道样式
const trackStyle = computed(() => {
  const percentage = ((props.modelValue - props.min) / (props.max - props.min)) * 100
  return props.vertical
    ? { height: `${percentage}%` }
    : { width: `${percentage}%` }
})

// 计算滑块样式
const handleStyle = computed(() => {
  const percentage = ((props.modelValue - props.min) / (props.max - props.min)) * 100
  return props.vertical
    ? { bottom: `${percentage}%` }
    : { left: `${percentage}%` }
})

// 计算提示框样式
const tooltipStyle = computed(() => {
  const percentage = ((props.modelValue - props.min) / (props.max - props.min)) * 100
  return props.vertical
    ? { bottom: `${percentage}%` }
    : { left: `${percentage}%` }
})

// 获取标记点样式
const getMarkStyle = (value: number) => {
  const percentage = ((Number(value) - props.min) / (props.max - props.min)) * 100
  return props.vertical
    ? { bottom: `${percentage}%` }
    : { left: `${percentage}%` }
}

// 获取步骤点样式
const getStepStyle = (value: number) => {
  const percentage = ((value - props.min) / (props.max - props.min)) * 100
  return props.vertical
    ? { bottom: `${percentage}%` }
    : { left: `${percentage}%` }
}

// 处理值的变化
const handleValueChange = (value: number) => {
  const newValue = Math.min(Math.max(value, props.min), props.max)
  const stepValue = Math.round((newValue - props.min) / props.step) * props.step + props.min
  emit('update:modelValue', stepValue)
  emit('change', stepValue)
}

// 根据位置计算值
const getValueFromPosition = (position: number) => {
  if (!sliderRef.value) return 0

  const sliderRect = sliderRef.value.getBoundingClientRect()
  const sliderLength = props.vertical ? sliderRect.height : sliderRect.width
  const percentage = props.vertical
    ? (sliderLength - position) / sliderLength
    : position / sliderLength

  return percentage * (props.max - props.min) + props.min
}

// 处理点击事件
const handleSliderClick = (event: MouseEvent) => {
  if (props.disabled) return

  const position = props.vertical
    ? event.clientY - (sliderRef.value?.getBoundingClientRect().top || 0)
    : event.clientX - (sliderRef.value?.getBoundingClientRect().left || 0)

  handleValueChange(getValueFromPosition(position))
}

// 处理鼠标按下事件
const handleMouseDown = (event: MouseEvent) => {
  if (props.disabled) return

  event.preventDefault()
  isDragging.value = true
  startPosition.value = props.vertical ? event.clientY : event.clientX
  startValue.value = props.modelValue

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

// 处理触摸开始事件
const handleTouchStart = (event: TouchEvent) => {
  if (props.disabled) return

  event.preventDefault()
  isDragging.value = true
  startPosition.value = props.vertical ? event.touches[0].clientY : event.touches[0].clientX
  startValue.value = props.modelValue

  document.addEventListener('touchmove', handleTouchMove)
  document.addEventListener('touchend', handleTouchEnd)
}

// 处理鼠标移动事件
const handleMouseMove = (event: MouseEvent) => {
  if (!isDragging.value) return

  const currentPosition = props.vertical ? event.clientY : event.clientX
  const diff = props.vertical
    ? startPosition.value - currentPosition
    : currentPosition - startPosition.value

  const sliderRect = sliderRef.value?.getBoundingClientRect()
  const sliderLength = props.vertical ? sliderRect?.height : sliderRect?.width
  const diffValue = (diff / (sliderLength || 1)) * (props.max - props.min)

  handleValueChange(startValue.value + diffValue)
}

// 处理触摸移动事件
const handleTouchMove = (event: TouchEvent) => {
  if (!isDragging.value) return

  const currentPosition = props.vertical ? event.touches[0].clientY : event.touches[0].clientX
  const diff = props.vertical
    ? startPosition.value - currentPosition
    : currentPosition - startPosition.value

  const sliderRect = sliderRef.value?.getBoundingClientRect()
  const sliderLength = props.vertical ? sliderRect?.height : sliderRect?.width
  const diffValue = (diff / (sliderLength || 1)) * (props.max - props.min)

  handleValueChange(startValue.value + diffValue)
}

// 处理鼠标松开事件
const handleMouseUp = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}

// 处理触摸结束事件
const handleTouchEnd = () => {
  isDragging.value = false
  document.removeEventListener('touchmove', handleTouchMove)
  document.removeEventListener('touchend', handleTouchEnd)
}

// 组件卸载前清理事件监听
onBeforeUnmount(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
  document.removeEventListener('touchmove', handleTouchMove)
  document.removeEventListener('touchend', handleTouchEnd)
})
</script>
