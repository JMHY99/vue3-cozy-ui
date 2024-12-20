<template>
  <div ref="triggerRef" class="cozy-tooltip-trigger">
    <slot></slot>
  </div>
  <teleport to="body">
    <transition name="fade" @after-leave="doDestroy">
      <div
        ref="tooltipRef"
        v-show="visible"
        :class="['cozy-tooltip', `cozy-tooltip-${placement}`, overlayClassName]"
        :style="[overlayStyle, { zIndex: 1000 }]"
        role="tooltip"
      >
        <div
          ref="arrowRef"
          class="cozy-tooltip-arrow"
          :style="arrowColorStyle"
        >
        </div>
        <div
          class="cozy-tooltip-content"
          :style="contentColorStyle"
        >
          <slot name="title">{{ title }}</slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  nextTick,
  watch,
} from "vue";
import type { CSSProperties } from "vue";
import {
  computePosition,
  flip,
  shift,
  offset,
  arrow,
  inline,
  autoUpdate,
} from "@floating-ui/dom"; // 引入浮动 UI 库

type Placement =
  | "top"
  | "topLeft"
  | "topRight"
  | "bottom"
  | "bottomLeft"
  | "bottomRight"
  | "left"
  | "leftTop"
  | "leftBottom"
  | "right"
  | "rightTop"
  | "rightBottom";

// Props 定义
const props = withDefaults(
  defineProps<{
    /** 提示文字 */
    title?: string;
    /** 气泡框位置 */
    placement?: Placement;
    /** 触发行为 */
    trigger?: "hover" | "focus" | "click";
    /** 鼠标移入后延时多少才显示 Tooltip，单位：毫秒 */
    mouseEnterDelay?: number;
    /** 鼠标移出后延多少才隐藏 Tooltip，单位：毫秒 */
    mouseLeaveDelay?: number;
    /** 卡片类名 */
    overlayClassName?: string;
    /** 卡片样式 */
    overlayStyle?: CSSProperties;
    /** 默认是否显隐 */
    defaultVisible?: boolean;
    /** 用于手动控制浮层显隐 */
    visible?: boolean;
    /** 浮层是否禁用 */
    disabled?: boolean;
    /** 箭头是否指向目标元素中心 */
    arrowPointAtCenter?: boolean;
    /** 浮层的色彩 */
    color?: string;
    /** 浮层预设位置的偏移量 [x, y] */
    offsetX?: number;
    offsetY?: number;
  }>(),
  {
    placement: "top",
    trigger: "hover",
    mouseEnterDelay: 100,
    mouseLeaveDelay: 100,
    defaultVisible: false,
    disabled: false,
    arrowPointAtCenter: false,
    offsetX: 0,
    offsetY: 0,
  }
);

// Emits 定义
const emit = defineEmits<{
  /** 显示/隐藏时触发 */
  (e: "update:visible", visible: boolean): void;
  /** 显示时触发 */
  (e: "show"): void;
  /** 隐藏时触发 */
  (e: "hide"): void;
}>();

// 组件引用
const tooltipRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLElement | null>(null);
const arrowRef = ref<HTMLElement | null>(null);

// 控制显示隐藏
const isVisible = ref(props.defaultVisible);
const visible = computed({
  get: () => {
    return isVisible.value;
  },
  set: (val) => {
    isVisible.value = val;
    emit("update:visible", val);
  },
});

// 清理函数
let cleanup: (() => void) | null = null;

// 更新位置
const updatePosition = async () => {
  if (!triggerRef.value || !tooltipRef.value || !arrowRef.value) return;

  cleanup?.();

  // 将 placement 映射为 floating-ui 支持的格式
  const placementMap: Record<Placement, any> = {
    top: 'top',
    topLeft: 'top-start',
    topRight: 'top-end',
    bottom: 'bottom',
    bottomLeft: 'bottom-start',
    bottomRight: 'bottom-end',
    left: 'left',
    leftTop: 'left-start',
    leftBottom: 'left-end',
    right: 'right',
    rightTop: 'right-start',
    rightBottom: 'right-end'
  };

  cleanup = autoUpdate(triggerRef.value, tooltipRef.value, async () => {
    const { x, y, placement: computedPlacement, middlewareData } = await computePosition(
      triggerRef.value!,
      tooltipRef.value!,
      {
        placement: placementMap[props.placement],
        middleware: [
          offset({ mainAxis: 12, crossAxis: props.offsetX }),
          inline(),
          shift({ padding: 8 }),
          flip(),
          arrow({ element: arrowRef.value! }),
        ],
      }
    );

    Object.assign(tooltipRef.value!.style, {
      left: `${x}px`,
      top: `${y}px`,
    });

    // 箭头位置
    if (middlewareData.arrow) {
      const { x: arrowX, y: arrowY } = middlewareData.arrow;

      const staticSide = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right",
      }[computedPlacement.split("-")[0]];

      const arrowStyle: Record<string, string> = {
        left: arrowX != null ? `${arrowX}px` : "",
        top: arrowY != null ? `${arrowY}px` : "",
        [staticSide!]: "-4px",
      };

      // 处理箭头在边缘的情况
      if (props.placement.includes('Left')) {
        arrowStyle.left = '12px';
      } else if (props.placement.includes('Right')) {
        arrowStyle.right = '12px';
        arrowStyle.left = 'auto';
      } else if (props.placement.includes('Top')) {
        arrowStyle.top = '12px';
      } else if (props.placement.includes('Bottom')) {
        arrowStyle.bottom = '12px';
        arrowStyle.top = 'auto';
      }

      Object.assign(arrowRef.value!.style, arrowStyle);
    }
  });
};

// 显示 tooltip
const showTooltip = () => {
  if (props.disabled) return;
  visible.value = true;
  nextTick(() => {
    updatePosition();
  });
  emit("show");
};

// 隐藏 tooltip
const hideTooltip = () => {
  visible.value = false;
  emit("hide");
};

// 销毁
const doDestroy = () => {
  cleanup?.();
};

// 绑定事件
const bindEvents = () => {
  const trigger = triggerRef.value;
  const tooltip = tooltipRef.value;
  if (!trigger || !tooltip) return;

  let showTimer: number | null = null;
  let hideTimer: number | null = null;

  const clearTimers = () => {
    if (showTimer) {
      clearTimeout(showTimer);
      showTimer = null;
    }
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
  };

  const show = () => {
    clearTimers();
    showTimer = window.setTimeout(() => {
      showTooltip();
      nextTick(() => {
        updatePosition();
      });
    }, props.mouseEnterDelay);
  };

  const hide = () => {
    clearTimers();
    hideTimer = window.setTimeout(() => {
      hideTooltip();
    }, props.mouseLeaveDelay);
  };

  const toggle = (e: Event) => {
    e.stopPropagation();
    if (visible.value) {
      hide();
    } else {
      show();
    }
  };

  const handleDocumentClick = (e: MouseEvent) => {
    const target = e.target as Node;
    if (!trigger.contains(target) && !tooltip.contains(target)) {
      hide();
    }
  };

  // 绑定事件处理
  if (props.trigger === "hover") {
    trigger.addEventListener("mouseenter", show);
    trigger.addEventListener("mouseleave", hide);
    tooltip.addEventListener("mouseenter", show);
    tooltip.addEventListener("mouseleave", hide);
  } else if (props.trigger === "focus") {
    trigger.addEventListener("focus", show);
    trigger.addEventListener("blur", hide);
  } else if (props.trigger === "click") {
    trigger.addEventListener("click", toggle);
    document.addEventListener("click", handleDocumentClick);
  }

  // 返回清理函数
  return () => {
    clearTimers();
    if (!trigger || !tooltip) return;

    if (props.trigger === "hover") {
      trigger.removeEventListener("mouseenter", show);
      trigger.removeEventListener("mouseleave", hide);
      tooltip.removeEventListener("mouseenter", show);
      tooltip.removeEventListener("mouseleave", hide);
    } else if (props.trigger === "focus") {
      trigger.removeEventListener("focus", show);
      trigger.removeEventListener("blur", hide);
    } else if (props.trigger === "click") {
      trigger.removeEventListener("click", toggle);
      document.removeEventListener("click", handleDocumentClick);
    }
  };
};

// 监听 visible prop 的变化
watch(
  () => props.visible,
  (val) => {
    if (val !== undefined) {
      isVisible.value = val;
    }
  }
);

// 监听内部状态的变化
watch(
  () => isVisible.value,
  (val) => {
    if (val) {
      nextTick(() => {
        updatePosition();
      });
    } else {
      cleanup?.();
    }
  }
);

// 组件挂载时
let cleanupEvents: (() => void) | undefined;
onMounted(() => {
  cleanupEvents = bindEvents();
});

// 组件卸载前
onBeforeUnmount(() => {
  cleanupEvents?.();
  cleanup?.();
});

// 添加颜色样式计算
const contentColorStyle = computed(() => {
  if (!props.color) return {};
  return {
    backgroundColor: props.color,
  };
});

const arrowColorStyle = computed(() => {
  if (!props.color) return {};

  const style: Record<string, string> = {};
  const borderColor = props.color;

  if (props.placement.startsWith('top')) {
    style.borderTopColor = borderColor;
    style.borderRightColor = 'transparent';
    style.borderBottomColor = 'transparent';
    style.borderLeftColor = 'transparent';
  } else if (props.placement.startsWith('bottom')) {
    style.borderTopColor = 'transparent';
    style.borderRightColor = 'transparent';
    style.borderBottomColor = borderColor;
    style.borderLeftColor = 'transparent';
  } else if (props.placement.startsWith('left')) {
    style.borderTopColor = 'transparent';
    style.borderRightColor = 'transparent';
    style.borderBottomColor = 'transparent';
    style.borderLeftColor = borderColor;
  } else if (props.placement.startsWith('right')) {
    style.borderTopColor = 'transparent';
    style.borderRightColor = borderColor;
    style.borderBottomColor = 'transparent';
    style.borderLeftColor = 'transparent';
  }

  return style;
});

defineOptions({
  name: "CTooltip",
});
</script>

