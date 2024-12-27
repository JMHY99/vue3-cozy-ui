# Modal 对话框组件
<template>
  <teleport to="body">
    <!-- 遮罩层 -->
    <transition name="fade">
      <div
        v-if="modelValue && mask"
        class="cozy-modal-mask"
        :style="maskStyle"
        @click="handleMaskClick"
      ></div>
    </transition>

    <!-- 对话框容器 -->
    <transition name="zoom">
      <div
        v-show="modelValue"
        class="cozy-modal-wrap"
        :style="wrapStyle"
        @click="handleWrapClick"
      >
        <!-- 对话框 -->
        <div
          class="cozy-modal"
          :class="{
            'cozy-modal-centered': centered,
            [`cozy-modal-${size}`]: size
          }"
          :style="modalStyle"
          role="dialog"
          aria-modal="true"
          @click.stop
        >
          <!-- 关闭按钮 -->
          <button
            v-if="closable"
            class="cozy-modal-close"
            @click="handleClose"
            aria-label="Close"
          >
            <c-icon name="close" />
          </button>

          <!-- 头部 -->
          <div v-if="title || $slots.title" class="cozy-modal-header">
            <div class="cozy-modal-title">
              <slot name="title">{{ title }}</slot>
            </div>
          </div>

          <!-- 内容 -->
          <div class="cozy-modal-body">
            <slot></slot>
          </div>

          <!-- 底部 -->
          <div v-if="$slots.footer || showFooter" class="cozy-modal-footer">
            <slot name="footer">
              <c-button @click="handleCancel">{{ cancelText }}</c-button>
              <c-button type="primary" @click="handleOk">{{ okText }}</c-button>
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, watch } from 'vue'
import CIcon from '../icon/icon.vue'
import CButton from '../button/button.vue'

// 对话框尺寸类型
type ModalSize = 'default' | 'small' | 'large'

export default defineComponent({
  name: 'CModal',
  components: {
    CIcon,
    CButton
  },
  props: {
    /**
     * 对话框是否可见
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
     * 是否垂直居中展示
     */
    centered: {
      type: Boolean,
      default: false
    },
    /**
     * 对话框宽度
     */
    width: {
      type: [String, Number],
      default: 520
    },
    /**
     * 对话框尺寸
     */
    size: {
      type: String as PropType<ModalSize>,
      default: 'default'
    },
    /**
     * 设置 Modal 的 z-index
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
     * 是否显示底部
     */
    showFooter: {
      type: Boolean,
      default: true
    },
    /**
     * 确认按钮文字
     */
    okText: {
      type: String,
      default: '确定'
    },
    /**
     * 取消按钮文字
     */
    cancelText: {
      type: String,
      default: '取消'
    },
    /**
     * 确认按钮 loading
     */
    confirmLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'ok', 'cancel'],
  setup(props, { emit }) {
    // 计算遮罩层样式
    const maskStyle = computed(() => {
      return {
        zIndex: props.zIndex
      }
    })

    // 计算包裹层样式
    const wrapStyle = computed(() => {
      return {
        zIndex: props.zIndex
      }
    })

    // 计算对话框样式
    const modalStyle = computed(() => {
      const style: Record<string, string> = {}
      if (props.width) {
        style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
      }
      return style
    })

    // 处理遮罩层点击
    const handleMaskClick = () => {
      if (props.maskClosable && !props.confirmLoading) {
        handleCancel()
      }
    }

    // 处理包裹层点击
    const handleWrapClick = (e: MouseEvent) => {
      if (e.target === e.currentTarget && props.maskClosable && !props.confirmLoading) {
        handleCancel()
      }
    }

    // 处理确认
    const handleOk = () => {
      if (!props.confirmLoading) {
        emit('ok')
      }
    }

    // 处理取消
    const handleCancel = () => {
      if (!props.confirmLoading) {
        emit('update:modelValue', false)
        emit('cancel')
      }
    }

    // 处理关闭
    const handleClose = () => {
      if (!props.confirmLoading) {
        handleCancel()
      }
    }

    // 监听显示状态变化
    watch(() => props.modelValue, (val) => {
      if (val) {
        // 显示时禁止body滚动
        document.body.style.overflow = 'hidden'
        // 添加键盘事件
        if (props.keyboard) {
          document.addEventListener('keydown', handleKeyDown)
        }
      } else {
        // 隐藏时恢复body滚动
        document.body.style.overflow = ''
        // 移除键盘事件
        if (props.keyboard) {
          document.removeEventListener('keydown', handleKeyDown)
        }
      }
    })

    // 处理键盘事件
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !props.confirmLoading) {
        handleCancel()
      }
    }

    return {
      maskStyle,
      wrapStyle,
      modalStyle,
      handleMaskClick,
      handleWrapClick,
      handleOk,
      handleCancel,
      handleClose
    }
  }
})
</script> 