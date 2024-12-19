<template>
  <div
    ref="carouselRef"
    :class="[
      'cozy-carousel',
      {
        'cozy-carousel-card': type === 'card',
      },
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- 轮播容器 -->
    <div class="cozy-carousel-container">
      <!-- 轮播轨道 -->
      <div
        ref="trackRef"
        class="cozy-carousel-track"
        :style="trackStyle"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <slot></slot>
      </div>

      <!-- 箭头 -->
      <div v-if="arrow !== 'never'" v-show="arrow === 'always' || hover">
        <button
          class="cozy-carousel-arrow cozy-carousel-arrow-left"
          :class="{ 'is-outside': arrowPosition === 'outside' }"
          @click="prev"
        >
          <i class="cozy-icon c-left-outlined"></i>
        </button>
        <button
          class="cozy-carousel-arrow cozy-carousel-arrow-right"
          :class="{ 'is-outside': arrowPosition === 'outside' }"
          @click="next"
        >
          <i class="cozy-icon c-right-outlined"></i>
        </button>
      </div>

      <!-- 指示器 -->
      <div
        v-if="indicatorPosition !== 'none'"
        class="cozy-carousel-indicators"
        :class="{
          'is-outside': indicatorPosition === 'outside',
          'is-labels': indicatorType === 'label',
          'is-vertical': direction === 'vertical',
        }"
      >
        <button
          v-for="(item, index) in items"
          :key="index"
          class="cozy-carousel-indicator-button"
          :class="{
            'is-active': index === activeIndex,
            'is-dot': indicatorType === 'dot',
          }"
          @click="setActiveItem(index)"
        >
          <template v-if="indicatorType === 'label'">
            {{ (item as any).props?.label || `${index + 1}` }}
          </template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  provide,
  nextTick,
} from "vue";
import type { Component, VNodeChild } from "vue";

defineOptions({
  name: "CCarousel",
});

// 定义 Props
interface Props {
  /** 初始状态激活的幻灯片的索引，从 0 开始 */
  initialIndex?: number;
  /** 走马灯的高度 */
  height?: string;
  /** 是否自动切换 */
  autoplay?: boolean;
  /** 自动切换的时间间隔，单位为毫秒 */
  interval?: number;
  /** 指示器的位置 */
  indicatorPosition?: "inside" | "outside" | "none";
  /** 指示器的类型 */
  indicatorType?: "dot" | "line" | "label";
  /** 箭头的显示时机 */
  arrow?: "always" | "hover" | "never";
  /** 箭头的位置 */
  arrowPosition?: "inside" | "outside";
  /** 走马灯的类型 */
  type?: "default" | "card";
  /** 走马灯展示的方向 */
  direction?: "horizontal" | "vertical";
  /** 是否循环显示 */
  loop?: boolean;
  /** 是否暂停自动切换 */
  pause?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  initialIndex: 0,
  height: "200px",
  autoplay: true,
  interval: 3000,
  indicatorPosition: "inside",
  indicatorType: "line",
  arrow: "hover",
  arrowPosition: "inside",
  type: "default",
  direction: "horizontal",
  loop: true,
  pause: true,
});

// 组件状态
const activeIndex = ref(props.initialIndex);
const items = ref<Component[]>([]);
const hover = ref(false);
const carouselRef = ref<HTMLElement>();
const trackRef = ref<HTMLElement>();
const timer = ref<number>();
const touchStartX = ref(0);
const touchStartY = ref(0);

// 计算属性
const trackStyle = computed(() => {
  const transform =
    props.direction === "vertical"
      ? `translateY(-${activeIndex.value * 100}%)`
      : `translateX(-${activeIndex.value * 100}%)`;
  return {
    transform,
    height: props.height,
  };
});

// 方法
const updateItems = () => {
  items.value = [];
  const children = carouselRef.value?.children[0].children[0].children;
  if (children) {
    for (const child of children) {
      if (child.className.includes("cozy-carousel-item")) {
        items.value.push(child as unknown as Component);
      }
    }
  }
};

const setActiveItem = (index: number) => {
  if (index < 0) {
    index = props.loop ? items.value.length - 1 : 0;
  } else if (index >= items.value.length) {
    index = props.loop ? 0 : items.value.length - 1;
  }
  activeIndex.value = index;
  resetTimer();
};

const prev = () => {
  setActiveItem(activeIndex.value - 1);
};

const next = () => {
  setActiveItem(activeIndex.value + 1);
};

const resetTimer = () => {
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = undefined;
  }
  if (props.autoplay && !hover.value) {
    timer.value = window.setInterval(() => {
      next();
    }, props.interval);
  }
};

// 事件处理
const handleMouseEnter = () => {
  hover.value = true;
  if (props.pause) resetTimer();
};

const handleMouseLeave = () => {
  hover.value = false;
  resetTimer();
};

const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX;
  touchStartY.value = e.touches[0].clientY;
  if (timer.value) clearInterval(timer.value);
};

const handleTouchMove = (e: TouchEvent) => {
  e.preventDefault();
};

const handleTouchEnd = (e: TouchEvent) => {
  const deltaX = e.changedTouches[0].clientX - touchStartX.value;
  const deltaY = e.changedTouches[0].clientY - touchStartY.value;

  if (props.direction === "horizontal" && Math.abs(deltaX) > Math.abs(deltaY)) {
    deltaX > 0 ? prev() : next();
  } else if (
    props.direction === "vertical" &&
    Math.abs(deltaY) > Math.abs(deltaX)
  ) {
    deltaY > 0 ? prev() : next();
  }

  resetTimer();
};

// 生命周期钩子
onMounted(() => {
  nextTick(() => {
    updateItems();
    resetTimer();
  });
});

onBeforeUnmount(() => {
  if (timer.value) {
    clearInterval(timer.value);
  }
});

// 向子组件提供数据
provide("carousel", {
  activeIndex,
  type: props.type,
  direction: props.direction,
});

// 暴露方法
defineExpose({
  setActiveItem,
  prev,
  next,
});
</script>
