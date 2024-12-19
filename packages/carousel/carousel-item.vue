<template>
  <div
    class="cozy-carousel-item"
    :class="{
      'is-active': isActive,
      'is-in-stage': isInStage,
      'is-animating': isAnimating,
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, computed } from "vue";

defineOptions({
  name: "CCarouselItem",
});

// 定义 Props
interface Props {
  /** 幻灯片的名字，可用作 setActiveItem 的参数 */
  name?: string;
  /** 该幻灯片所对应指示器的文本 */
  label?: string;
}

const props = defineProps<Props>();

// 注入父组件数据
const carousel = inject("carousel", {
  activeIndex: ref(0),
  type: ref("default"),
  direction: ref("horizontal"),
});

// 计算属性
const isActive = computed(() => {
  const { activeIndex } = carousel;
  return activeIndex.value === Number(props.name);
});

const isInStage = computed(() => {
  if (carousel.type.value === "card") {
    const { activeIndex } = carousel;
    const index = Number(props.name);
    return Math.abs(index - activeIndex.value) <= 1;
  }
  return false;
});

const isAnimating = ref(false);

// 监听动画状态
const handleAnimationStart = () => {
  isAnimating.value = true;
};

const handleAnimationEnd = () => {
  isAnimating.value = false;
};
</script>
