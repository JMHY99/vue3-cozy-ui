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
          overlayClassName
        ]"
        :style="[overlayStyle, overlayPosition]"
        ref="overlayRef"
      >
        <div class="cozy-dropdown-content">
          <slot name="overlay"></slot>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

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
}

const props = withDefaults(defineProps<Props>(), {
  trigger: 'hover',
  disabled: false,
  overlayClassName: '',
  overlayStyle: () => ({}),
  placement: 'bottomLeft',
  mouseEnterDelay: 100,
  mouseLeaveDelay: 100
})

// 定义事件
const emit = defineEmits<{
  'visibleChange': [visible: boolean]
  'click': [e: MouseEvent]
}>()

// 组件状态
const visible = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const overlayRef = ref<HTMLElement | null>(null)

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
    visible.value = true
    emit('visibleChange', true)
  }, props.mouseEnterDelay)
}

// 处理鼠标离开事件
const handleMouseLeave = () => {
  if (props.disabled || props.trigger !== 'hover') return

  if (showTimer) {
    clearTimeout(showTimer)
    showTimer = null
  }

  hideTimer = window.setTimeout(() => {
    visible.value = false
    emit('visibleChange', false)
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
    visible.value = !visible.value
    emit('visibleChange', visible.value)
  }

  emit('click', e)
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

  visible.value = false
  emit('visibleChange', false)
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
