<template>
  <div ref="triggerRef" class="cozy-tooltip-trigger">
    <slot></slot>
  </div>
  <teleport to="body">
    <transition
      name="fade"
      @after-leave="doDestroy"
    >
      <div 
        ref="tooltipRef"
        v-show="visible"
        :class="[
          'cozy-tooltip',
          `cozy-tooltip-${placement}`,
          overlayClassName
        ]"
        :style="[overlayStyle, { zIndex: 1000 }]"
        role="tooltip"
      >
        <div ref="arrowRef" class="cozy-tooltip-arrow">
          <div class="cozy-tooltip-arrow-content"></div>
        </div>
        <div class="cozy-tooltip-content">
          <slot name="title">{{ title }}</slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import type { CSSProperties } from 'vue'
import {
  computePosition,
  flip,
  shift,
  offset,
  arrow,
  inline,
  autoUpdate,
} from '@floating-ui/dom'

type Placement = 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' | 
                'left' | 'leftTop' | 'leftBottom' | 'right' | 'rightTop' | 'rightBottom'

// Props 定义
const props = withDefaults(defineProps<{
  /** 提示文字 */
  title?: string
  /** 气泡框位置 */
  placement?: Placement
  /** 触发行为 */
  trigger?: 'hover' | 'focus' | 'click'
  /** 鼠标移入后延时多少才显示 Tooltip，单位：毫秒 */
  mouseEnterDelay?: number
  /** 鼠标移出后延多少才隐藏 Tooltip，单位：毫秒 */
  mouseLeaveDelay?: number
  /** 卡片类名 */
  overlayClassName?: string
  /** 卡片样式 */
  overlayStyle?: CSSProperties
  /** 默认是否显隐 */
  defaultVisible?: boolean
  /** 用于手动控制浮层显隐 */
  visible?: boolean
  /** 浮层是否禁用 */
  disabled?: boolean
  /** 箭头是否指向目标元素中心 */
  arrowPointAtCenter?: boolean
  /** 浮层的色彩 */
  color?: string
  /** 浮层预设位置的偏移量 [x, y] */
  offsetX?: number
  offsetY?: number
}>(), {
  placement: 'top',
  trigger: 'hover',
  mouseEnterDelay: 100,
  mouseLeaveDelay: 100,
  defaultVisible: false,
  disabled: false,
  arrowPointAtCenter: false,
  offsetX: 0,
  offsetY: 0
})

// Emits 定义
const emit = defineEmits<{
  /** 显示/隐藏时触发 */
  (e: 'update:visible', visible: boolean): void
  /** 显示时触发 */
  (e: 'show'): void
  /** 隐藏时触发 */
  (e: 'hide'): void
}>()

// 组件引用
const tooltipRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const arrowRef = ref<HTMLElement | null>(null)

// 控制显示隐藏
const isVisible = ref(props.defaultVisible)
const visible = computed({
  get: () => {
    // 如果外部传入了 visible prop，则优先使用
    if (props.visible !== undefined) {
      return props.visible
    }
    // 否则使用内部状态
    return isVisible.value
  },
  set: (val) => {
    isVisible.value = val
    emit('update:visible', val)
  }
})

// 清理函数
let cleanup: (() => void) | null = null

// 更新位置
const updatePosition = async () => {
  if (!triggerRef.value || !tooltipRef.value || !arrowRef.value) return

  cleanup?.()

  cleanup = autoUpdate(
    triggerRef.value,
    tooltipRef.value,
    async () => {
      const { x, y, placement, middlewareData } = await computePosition(
        triggerRef.value!,
        tooltipRef.value!,
        {
          placement: props.placement as any,
          middleware: [
            offset({ mainAxis: 8, crossAxis: props.offsetX }),
            inline(),
            shift({ padding: 8 }),
            flip(),
            arrow({ element: arrowRef.value! }),
          ],
        }
      )

      Object.assign(tooltipRef.value!.style, {
        left: `${x}px`,
        top: `${y}px`,
      })

      // 箭头位置
      if (middlewareData.arrow) {
        const { x: arrowX, y: arrowY } = middlewareData.arrow

        const staticSide = {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right',
        }[placement.split('-')[0]]

        Object.assign(arrowRef.value!.style, {
          left: arrowX != null ? `${arrowX}px` : '',
          top: arrowY != null ? `${arrowY}px` : '',
          [staticSide!]: '-4px',
        })
      }
    }
  )
}

// 显示 tooltip
const showTooltip = () => {
  if (props.disabled) return
  if (props.visible === undefined) {
    visible.value = true
  }
  emit('show')
}

// 隐藏 tooltip
const hideTooltip = () => {
  if (props.visible === undefined) {
    visible.value = false
  }
  emit('hide')
}

// 销毁
const doDestroy = () => {
  cleanup?.()
}

// 绑定事件
const bindEvents = () => {
  const trigger = triggerRef.value
  if (!trigger) return

  let showTimer: number | null = null
  let hideTimer: number | null = null

  const clearTimers = () => {
    if (showTimer) {
      clearTimeout(showTimer)
      showTimer = null
    }
    if (hideTimer) {
      clearTimeout(hideTimer)
      hideTimer = null
    }
  }

  const show = () => {
    clearTimers()
    showTimer = window.setTimeout(() => {
      showTooltip()
    }, props.mouseEnterDelay)
  }

  const hide = () => {
    clearTimers()
    hideTimer = window.setTimeout(() => {
      hideTooltip()
    }, props.mouseLeaveDelay)
  }

  const toggle = () => {
    if (visible.value) {
      hide()
    } else {
      show()
    }
  }

  // 绑定事件处理
  if (props.trigger === 'hover') {
    trigger.addEventListener('mouseenter', show)
    trigger.addEventListener('mouseleave', hide)
    // 添加 tooltip 内容的事件处理
    tooltipRef.value?.addEventListener('mouseenter', show)
    tooltipRef.value?.addEventListener('mouseleave', hide)
  } else if (props.trigger === 'focus') {
    trigger.addEventListener('focus', showTooltip)
    trigger.addEventListener('blur', hideTooltip)
  } else if (props.trigger === 'click') {
    trigger.addEventListener('click', toggle)
    // 点击外部时关闭
    document.addEventListener('click', (e) => {
      const target = e.target as Node
      if (!trigger.contains(target) && !tooltipRef.value?.contains(target)) {
        hideTooltip()
      }
    })
  }

  // 返回清理函数
  return () => {
    clearTimers()
    if (!trigger) return

    if (props.trigger === 'hover') {
      trigger.removeEventListener('mouseenter', show)
      trigger.removeEventListener('mouseleave', hide)
      tooltipRef.value?.removeEventListener('mouseenter', show)
      tooltipRef.value?.removeEventListener('mouseleave', hide)
    } else if (props.trigger === 'focus') {
      trigger.removeEventListener('focus', showTooltip)
      trigger.removeEventListener('blur', hideTooltip)
    } else if (props.trigger === 'click') {
      trigger.removeEventListener('click', toggle)
      document.removeEventListener('click', hideTooltip)
    }
  }
}

// 监听 visible prop 的变化
watch(
  () => props.visible,
  (val) => {
    if (val !== undefined) {
      isVisible.value = val
      if (val) {
        nextTick(() => {
          updatePosition()
        })
      } else {
        cleanup?.()
      }
    }
  },
  { immediate: true }
)

// 监听内部状态的变化
watch(
  () => isVisible.value,
  (val) => {
    if (props.visible === undefined) {
      if (val) {
        nextTick(() => {
          updatePosition()
        })
      } else {
        cleanup?.()
      }
    }
  }
)

// 组件挂载时
let cleanupEvents: (() => void) | undefined
onMounted(() => {
  cleanupEvents = bindEvents()
})

// 组件卸载前
onBeforeUnmount(() => {
  cleanupEvents?.()
  cleanup?.()
})

defineOptions({
  name: 'CTooltip'
})
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>  