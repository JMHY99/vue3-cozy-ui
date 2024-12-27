<template>
  <!-- 
    气泡确认框组件
    基于 Tooltip 组件实现，添加了确认和取消的操作
  -->
  <c-tooltip
    :visible="visible"
    @update:visible="handleVisibleChange"
    :placement="placement"
    :trigger="trigger"
    :mouseEnterDelay="mouseEnterDelay"
    :mouseLeaveDelay="mouseLeaveDelay"
    :overlayClassName="overlayClassName"
    :overlayStyle="overlayStyle"
    :arrowPointAtCenter="arrowPointAtCenter"
    color="#fff"
  >
    <!-- 触发元素插槽 -->
    <slot></slot>

    <!-- 气泡内容插槽 -->
    <template #title>
      <div class="cozy-popconfirm">
        <!-- 图标 -->
        <div class="cozy-popconfirm-icon" :class="iconClass">
          <c-icon :name="icon || 'exclamation-circle'" />
        </div>

        <!-- 标题 -->
        <div class="cozy-popconfirm-title">
          <slot name="title">{{ title }}</slot>
        </div>

        <!-- 按钮组 -->
        <div class="cozy-popconfirm-buttons">
          <c-button
            size="small"
            @click="handleCancel"
            :loading="cancelButtonLoading"
            :disabled="disabled"
          >
            {{ cancelText }}
          </c-button>
          <c-button
            :type="okType"
            size="small"
            @click="handleConfirm"
            :loading="okButtonLoading"
            :disabled="disabled"
          >
            {{ okText }}
          </c-button>
        </div>
      </div>
    </template>
  </c-tooltip>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import CTooltip from '../tooltip/tooltip.vue'
import CButton from '../button/button.vue'
import CIcon from '../icon/icon.vue'

/**
 * 气泡框位置类型
 */
type PopconfirmPlacement = 'top' | 'topLeft' | 'topRight' | 
                          'bottom' | 'bottomLeft' | 'bottomRight' | 
                          'left' | 'leftTop' | 'leftBottom' | 
                          'right' | 'rightTop' | 'rightBottom'

/**
 * 触发方式类型
 */
type TriggerType = 'hover' | 'focus' | 'click'

export default defineComponent({
  name: 'CPopconfirm',
  components: {
    CTooltip,
    CButton,
    CIcon
  },
  props: {
    /**
     * 确认框的标题
     */
    title: {
      type: String,
      default: ''
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
     * 确认按钮类型
     */
    okType: {
      type: String,
      default: 'primary'
    },
    /**
     * 确认按钮 loading
     */
    okButtonLoading: {
      type: Boolean,
      default: false
    },
    /**
     * 取消按钮 loading
     */
    cancelButtonLoading: {
      type: Boolean,
      default: false
    },
    /**
     * 是否禁用
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * 气泡框位置
     */
    placement: {
      type: String as PropType<PopconfirmPlacement>,
      default: 'top'
    },
    /**
     * 触发行为
     */
    trigger: {
      type: String as PropType<TriggerType>,
      default: 'click'
    },
    /**
     * 自定义图标
     */
    icon: {
      type: String,
      default: ''
    },
    /**
     * 鼠标移入后延时多少才显示，单位：秒
     */
    mouseEnterDelay: {
      type: Number,
      default: 0.1
    },
    /**
     * 鼠标移出后延时多少才隐藏，单位：秒
     */
    mouseLeaveDelay: {
      type: Number,
      default: 0.1
    },
    /**
     * 浮层类名
     */
    overlayClassName: {
      type: String,
      default: ''
    },
    /**
     * 浮层样式
     */
    overlayStyle: {
      type: Object,
      default: () => ({})
    },
    /**
     * 箭头是否指向目标元素中心
     */
    arrowPointAtCenter: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    /**
     * 点击确认按钮时触发
     */
    'confirm',
    /**
     * 点击取消按钮时触发
     */
    'cancel',
    /**
     * 显示状态改变时触发
     */
    'visibleChange'
  ],
  setup(props, { emit }) {
    // 控制气泡框显示状态
    const visible = ref(false)

    /**
     * 计算图标样式类
     */
    const iconClass = computed(() => {
      return {
        'cozy-popconfirm-icon-warning': !props.icon
      }
    })

    /**
     * 处理确认按钮点击
     */
    const handleConfirm = () => {
      if (!props.disabled) {
        emit('confirm')
        visible.value = false
      }
    }

    /**
     * 处理取消按钮点击
     */
    const handleCancel = () => {
      if (!props.disabled) {
        emit('cancel')
        visible.value = false
      }
    }

    /**
     * 监听显示状态变化
     */
    const handleVisibleChange = (val: boolean) => {
      if (props.disabled) {
        return
      }
      visible.value = val
      emit('visibleChange', val)
    }

    return {
      visible,
      iconClass,
      handleConfirm,
      handleCancel,
      handleVisibleChange
    }
  }
})
</script> 