# Drawer 抽屉组件
<template>
  <teleport to="body">
    <!-- 遮罩层 -->
    <transition name="fade">
      <div
        v-if="modelValue && mask"
        class="cozy-drawer-mask"
        :style="maskStyle"
        @click="handleMaskClick"
      ></div>
    </transition>

    <!-- 抽屉容器 -->
    <div
      v-show="modelValue"
      class="cozy-drawer"
      :class="{
        'cozy-drawer-open': modelValue,
        [`cozy-drawer-${placement}`]: true,
        'cozy-drawer-with-header': showHeader,
        'cozy-drawer-no-mask': !mask,
        [`cozy-drawer-${size}`]: size && ['left', 'right'].includes(placement)
      }"
      :style="{ zIndex: zIndex }"
      role="dialog"
      aria-modal="true"
    >
      <!-- 抽屉内容 -->
      <div 
        class="cozy-drawer-content-wrapper" 
        :style="contentWrapperStyle"
        @click.stop
      >
        <div class="cozy-drawer-content">
          <!-- 头部 -->
          <div v-if="showHeader" class="cozy-drawer-header">
            <div class="cozy-drawer-header-title">
              <slot name="title">{{ title }}</slot>
            </div>
            <!-- 关闭按钮 -->
            <button
              v-if="closable"
              class="cozy-drawer-close"
              @click="handleClose"
              aria-label="Close"
            >
              <c-icon name="close" />
            </button>
          </div>

          <!-- 主体内容 -->
          <div class="cozy-drawer-body">
            <slot></slot>
          </div>

          <!-- 底部 -->
          <div v-if="$slots.footer" class="cozy-drawer-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, watch, ref } from 'vue'
import CIcon from '../icon/icon.vue'

// 抽屉位置类型
type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left'
// 抽屉尺寸类型
type DrawerSize = 'default' | 'large'

// 使用 ref 来跟踪抽屉层级
const drawerInstances = ref<number[]>([])
let currentId = 0

export default defineComponent({
  name: 'CDrawer',
  components: {
    CIcon
  },
  props: {
    /**
     * 抽屉是否可见
     */
    modelValue: {
      type: Boolean,
      default: false
    },
    /**
     * 标题
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * 是否显示标题栏
     */
    showHeader: {
      type: Boolean,
      default: true
    },
    /**
     * 是否显示遮罩层
     */
    mask: {
      type: Boolean,
      default: true
    },
    /**
     * 点击遮罩层是否允许关闭
     */
    maskClosable: {
      type: Boolean,
      default: true
    },
    /**
     * 是否显示关闭按钮
     */
    closable: {
      type: Boolean,
      default: true
    },
    /**
     * 抽屉的方向
     */
    placement: {
      type: String as PropType<DrawerPlacement>,
      default: 'right',
      validator: (value: string) => {
        return ['top', 'right', 'bottom', 'left'].includes(value)
      }
    },
    /**
     * 抽屉的大小，仅在 placement 为 left/right 时生效
     */
    size: {
      type: String as PropType<DrawerSize>,
      default: 'default'
    },
    /**
     * 宽度，在 placement 为 right/left 时使用
     */
    width: {
      type: [String, Number],
      default: undefined
    },
    /**
     * 高度，在 placement 为 top/bottom 时使用
     */
    height: {
      type: [String, Number],
      default: undefined
    },
    /**
     * 设置 Drawer 的 z-index
     */
    zIndex: {
      type: Number,
      default: 1000
    },
    /**
     * 是否支持键盘 esc 关闭
     */
    keyboard: {
      type: Boolean,
      default: true
    },
    /**
     * 是否开启多层抽屉模式
     */
    push: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue', 'close'],
  setup(props, { emit }) {
    // 当前抽屉的唯一标识
    const id = currentId++
    
    // 计算遮罩层样式
    const maskStyle = computed(() => {
      return {
        zIndex: props.zIndex
      }
    })

    // 计算内容容器样式
    const contentWrapperStyle = computed(() => {
      const style: Record<string, string | number> = {}
      
      // 设置宽度或高度
      if (['left', 'right'].includes(props.placement)) {
        if (props.width) {
          style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
        }
      } else {
        if (props.height) {
          style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
        }
      }

      // 设置位移
      if (props.push) {
        const index = drawerInstances.value.indexOf(id)
        if (index >= 0) {
          const level = drawerInstances.value.length - 1 - index
          if (level > 0) {
            const offset = level * 180
            if (props.placement === 'right') {
              style.transform = `translateX(-${offset}px)`
            } else if (props.placement === 'left') {
              style.transform = `translateX(${offset}px)`
            } else if (props.placement === 'top') {
              style.transform = `translateY(${offset}px)`
            } else if (props.placement === 'bottom') {
              style.transform = `translateY(-${offset}px)`
            }
          }
        }
      }

      return style
    })

    // 处理遮罩层点击
    const handleMaskClick = () => {
      if (props.maskClosable) {
        handleClose()
      }
    }

    // 处理关闭
    const handleClose = () => {
      emit('update:modelValue', false)
      emit('close')
    }

    // 监听显示状态变化
    watch(() => props.modelValue, (val) => {
      if (val) {
        document.body.style.overflow = 'hidden'
        if (props.keyboard) {
          document.addEventListener('keydown', handleKeyDown)
        }
        if (props.push) {
          // 添加到抽屉实例列表
          drawerInstances.value.push(id)
        }
      } else {
        document.body.style.overflow = ''
        if (props.keyboard) {
          document.removeEventListener('keydown', handleKeyDown)
        }
        if (props.push) {
          // 从抽屉实例列表中移除
          const index = drawerInstances.value.indexOf(id)
          if (index >= 0) {
            drawerInstances.value.splice(index, 1)
          }
        }
      }
    })

    // 处理键盘事件
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    return {
      maskStyle,
      contentWrapperStyle,
      handleMaskClick,
      handleClose
    }
  }
})
</script> 