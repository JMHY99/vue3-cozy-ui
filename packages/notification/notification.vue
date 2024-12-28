<template>
  <teleport to="body">
    <transition
      name="cozy-notification-fade"
      @before-leave="onBeforeLeave"
      @after-leave="onAfterLeave"
    >
      <div
        v-show="modelValue"
        :class="[
          'cozy-notification',
          `cozy-notification-${placement}`,
          {
            'cozy-notification-with-icon': showIcon
          }
        ]"
        :style="notificationStyle"
        role="alert"
      >
        <!-- 关闭按钮 -->
        <button
          v-if="closable"
          class="cozy-notification-close"
          @click="close"
          aria-label="关闭通知"
        >
          <c-icon :name="closeIcon || 'close'" />
        </button>

        <!-- 图标 -->
        <div v-if="showIcon" class="cozy-notification-icon">
          <c-icon :name="iconType" :class="iconClass" />
        </div>

        <!-- 内容区域 -->
        <div class="cozy-notification-content">
          <!-- 标题 -->
          <div v-if="title || $slots.title" class="cozy-notification-title">
            <slot name="title">{{ title }}</slot>
          </div>

          <!-- 描述 -->
          <div class="cozy-notification-description">
            <slot>{{ description }}</slot>
          </div>

          <!-- 额外的按钮 -->
          <div v-if="$slots.btn" class="cozy-notification-btn">
            <slot name="btn"></slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, onMounted, onBeforeUnmount, ref } from 'vue'
import CIcon from '../icon/icon.vue'
import { addNotification, removeNotification, getNotificationOffset } from './notification-manager'

/**
 * 通知框位置类型
 * topRight: 右上角
 * topLeft: 左上角
 * bottomRight: 右下角
 * bottomLeft: 左下角
 */
type NotificationPlacement = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft'

/**
 * 通知框类型
 * success: 成功
 * info: 信息
 * warning: 警告
 * error: 错误
 */
type NotificationType = 'success' | 'info' | 'warning' | 'error'

export default defineComponent({
  name: 'CNotification',
  components: {
    CIcon
  },
  props: {
    /**
     * v-model 绑定值，控制通知框的显示和隐藏
     */
    modelValue: {
      type: Boolean,
      required: true
    },
    /**
     * 通知标题
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * 通知内容描述
     */
    description: {
      type: String,
      default: ''
    },
    /**
     * 自定义图标
     * 当设置了 type 时，会显示默认的类型图标
     * 当设置了 icon 时，会覆盖默认的类型图标
     */
    icon: {
      type: String,
      default: ''
    },
    /**
     * 通知类型
     * 会影响通知框的图标和样式
     */
    type: {
      type: String as PropType<NotificationType>,
      default: ''
    },
    /**
     * 自动关闭的延时，单位秒
     * 当设置为0时，不会自动关闭
     */
    duration: {
      type: Number,
      default: 4.5
    },
    /**
     * 自定义关闭图标
     */
    closeIcon: {
      type: String,
      default: ''
    },
    /**
     * 是否显示关闭按钮
     */
    closable: {
      type: Boolean,
      default: true
    },
    /**
     * 通知框弹出位置
     */
    placement: {
      type: String as PropType<NotificationPlacement>,
      default: 'topRight'
    },
    /**
     * 自定义内联样式
     */
    style: {
      type: Object,
      default: () => ({})
    },
    /**
     * 通知的唯一标识
     */
    notificationKey: {
      type: String,
      default: ''
    }
  },
  emits: [
    /**
     * 在通知框显示状态改变时触发
     * @param value 新的显示状态
     */
    'update:modelValue',
    /**
     * 在通知框关闭时触发
     */
    'close'
  ],
  setup(props, { emit }) {
    // 定时器引用
    let timer: number | null = null
    // 通知实例ID
    const instanceId = ref('')

    /**
     * 计算通知框样式
     * 包括自定义样式和位置偏移
     */
    const notificationStyle = computed(() => {
      const offset = getNotificationOffset(props.placement, instanceId.value)
      const placementStyle = props.placement.includes('bottom')
        ? { bottom: `${offset}px` }
        : { top: `${offset}px` }
      return {
        ...props.style,
        ...placementStyle
      }
    })

    /**
     * 计算是否显示图标
     * 当设置了 type 或 icon 时显示图标
     */
    const showIcon = computed(() => {
      return Boolean(props.type) || Boolean(props.icon)
    })

    /**
     * 计算要显示的图标类型
     * 优先使用自定义图标，否则根据类型显示对应的默认图标
     */
    const iconType = computed(() => {
      if (props.icon) return props.icon
      switch (props.type) {
        case 'success':
          return 'check-circle'
        case 'info':
          return 'info-circle'
        case 'warning':
          return 'warning'
        case 'error':
          return 'close-circle'
        default:
          return ''
      }
    })

    /**
     * 计算图标的样式类
     * 根据通知类型添加对应的颜色样式类
     */
    const iconClass = computed(() => {
      return {
        [`cozy-notification-icon-${props.type}`]: props.type
      }
    })

    /**
     * 关闭通知
     * 更新 v-model 绑定值并触发 close 事件
     */
    const close = () => {
      emit('update:modelValue', false)
      emit('close')
    }

    /**
     * 开始自动关闭计时器
     * 当 duration 大于 0 时，在指定时间后自动关闭通知
     */
    const startTimer = () => {
      if (props.duration) {
        timer = window.setTimeout(() => {
          close()
        }, props.duration * 1000)
      }
    }

    /**
     * 清除计时器
     * 在组件销毁或重新开始计时前调用，防止内存泄漏
     */
    const clearTimer = () => {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    }

    /**
     * 离开动画开始前的处理函数
     * 清除自动关闭计时器
     */
    const onBeforeLeave = () => {
      clearTimer()
    }

    /**
     * 离开动画结束后的处理函数
     * 触发 close 事件并从管理器中移除通知实例
     */
    const onAfterLeave = () => {
      emit('close')
      removeNotification(props.placement, instanceId.value)
    }

    // 在组件挂载时，如果通知框显示则开始计时并添加到管理器
    onMounted(() => {
      if (props.modelValue) {
        const { id } = addNotification(props.placement)
        instanceId.value = id
        startTimer()
      }
    })

    // 在组件卸载前清除计时器
    onBeforeUnmount(() => {
      clearTimer()
      if (instanceId.value) {
        removeNotification(props.placement, instanceId.value)
      }
    })

    return {
      showIcon,
      iconType,
      iconClass,
      notificationStyle,
      close,
      onBeforeLeave,
      onAfterLeave
    }
  }
})
</script> 