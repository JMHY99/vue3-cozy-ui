<template>
  <div
    class="cozy-dropdown"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    ref="dropdownRef"
  >
    <!-- 触发元素 -->
    <div
      class="cozy-dropdown-trigger"
      :class="{ 'is-disabled': disabled }"
      @click="handleTriggerClick"
    >
      <slot></slot>
    </div>

    <!-- 下拉内容 -->
    <Teleport to="body">
      <div
        v-show="visible"
        class="cozy-dropdown-overlay"
        :class="[
          `cozy-dropdown-placement-${placement}`,
          overlayClassName,
          { 'cozy-dropdown-hidden': !visible }
        ]"
        :style="[overlayStyle, overlayPosition]"
        ref="overlayRef"
        @click="handleOverlayClick"
        @mouseenter="handleOverlayMouseEnter"
        @mouseleave="handleOverlayMouseLeave"
      >
        <div class="cozy-dropdown-content">
          <slot name="overlay"></slot>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'

defineOptions({
  name: 'CDropdown'
})

// 定义组件属性
interface Props {
  /** 触发下拉的行为 */
  trigger?: 'hover' | 'click'
  /** 菜单是否禁用 */
  disabled?: boolean
  /** 下拉根元素的类名 */
  overlayClassName?: string
  /** 下拉根元素的样式 */
  overlayStyle?: Record<string, string>
  /** 菜单弹出位置 */
  placement?: 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight'
  /** 触发后的延时显示，单位毫秒 */
  mouseEnterDelay?: number
  /** 触发后的延时消失，单位毫秒 */
  mouseLeaveDelay?: number
  /** 点击菜单项后是否自动隐藏菜单 */
  autoClose?: boolean
  /** 菜单是否显示，可以通过 v-model 控制 */
  modelValue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  trigger: 'hover',
  disabled: false,
  overlayClassName: '',
  overlayStyle: () => ({}),
  placement: 'bottomLeft',
  mouseEnterDelay: 100,
  mouseLeaveDelay: 100,
  autoClose: true,
  modelValue: undefined
})

// 定义事件
const emit = defineEmits<{
  'visibleChange': [visible: boolean]
  'click': [e: MouseEvent]
  'update:modelValue': [visible: boolean]
}>()

// 组件状态
const visible = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const overlayRef = ref<HTMLElement | null>(null)
const isMouseInOverlay = ref(false)

// 监听 modelValue 变化
watch(() => props.modelValue, (newValue) => {
  if (newValue !== undefined) {
    visible.value = newValue
  }
}, { immediate: true })

// 显示/隐藏定时器
let showTimer: number | null = null
let hideTimer: number | null = null

// 计算下拉菜单位置
const overlayPosition = computed(() => {
  if (!dropdownRef.value) return {}

  const triggerRect = dropdownRef.value.getBoundingClientRect()
  const basePosition = {
    position: 'absolute',
    left: `${triggerRect.left}px`,
    minWidth: `${triggerRect.width}px`,
  }

  // 根据 placement 计算位置
  if (props.placement.startsWith('bottom')) {
    basePosition['top'] = `${triggerRect.bottom + 4}px`
    if (props.placement === 'bottomCenter') {
      basePosition['left'] = `${triggerRect.left + (triggerRect.width / 2)}px`
      basePosition['transform'] = 'translateX(-50%)'
    } else if (props.placement === 'bottomRight') {
      basePosition['left'] = `${triggerRect.right}px`
      basePosition['transform'] = 'translateX(-100%)'
    }
  } else {
    basePosition['bottom'] = `${window.innerHeight - triggerRect.top + 4}px`
    if (props.placement === 'topCenter') {
      basePosition['left'] = `${triggerRect.left + (triggerRect.width / 2)}px`
      basePosition['transform'] = 'translateX(-50%)'
    } else if (props.placement === 'topRight') {
      basePosition['left'] = `${triggerRect.right}px`
      basePosition['transform'] = 'translateX(-100%)'
    }
  }

  return basePosition
})

// 处理鼠标进入事件
const handleMouseEnter = () => {
  if (props.disabled || props.trigger !== 'hover') return

  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }

  showTimer = window.setTimeout(() => {
    setVisible(true)
  }, props.mouseEnterDelay)
}

// 处理鼠标离开事件
const handleMouseLeave = () => {
  if (props.disabled || props.trigger !== 'hover') return

  if (showTimer) {
    clearTimeout(showTimer)
    showTimer = null
  }

  // 只有当鼠标不在下拉内容区域时才隐藏
  if (!isMouseInOverlay.value) {
    hideTimer = window.setTimeout(() => {
      setVisible(false)
    }, props.mouseLeaveDelay)
  }
}

// 处理下拉内容区域的鼠标进入事件
const handleOverlayMouseEnter = () => {
  if (props.disabled || props.trigger !== 'hover') return

  isMouseInOverlay.value = true
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
}

// 处理下拉内容区域的鼠标离开事件
const handleOverlayMouseLeave = () => {
  if (props.disabled || props.trigger !== 'hover') return

  isMouseInOverlay.value = false
  hideTimer = window.setTimeout(() => {
    setVisible(false)
  }, props.mouseLeaveDelay)
}

// 处理点击事件
const handleTriggerClick = (e: MouseEvent) => {
  if (props.disabled) {
    e.preventDefault()
    e.stopPropagation()
    return
  }

  if (props.trigger === 'click') {
    setVisible(!visible.value)
  }

  emit('click', e)
}

// 处理下拉菜单点击事件
const handleOverlayClick = (e: MouseEvent) => {
  if (props.autoClose) {
    setVisible(false)
  }
}

// 设置可见状态
const setVisible = (value: boolean) => {
  if (visible.value === value) return
  visible.value = value
  emit('visibleChange', value)
  emit('update:modelValue', value)
}

// 处理点击外部关闭
const handleClickOutside = (e: MouseEvent) => {
  if (!visible.value) return

  const target = e.target as HTMLElement
  if (
    dropdownRef.value?.contains(target) ||
    overlayRef.value?.contains(target)
  ) {
    return
  }

  setVisible(false)
}

// 监听点击外部
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

// 组件销毁时清理
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  if (showTimer) clearTimeout(showTimer)
  if (hideTimer) clearTimeout(hideTimer)
})
</script>
