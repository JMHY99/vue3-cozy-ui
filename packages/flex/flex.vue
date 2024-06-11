<template>
  <div :class="flexClass" :style="flexStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
// 3.3+ 中可以通过 defineOptions
defineOptions({
  name: "CFlex", //定义组件名
});

interface FlexProps {
  direction?: string;
  wrap?: string;
  justifyContent?: string;
  alignItems?: string;
  gap?: string | number | number[];
}

// 默认值
const props = withDefaults(defineProps<FlexProps>(), {
  direction: "horizontal",
  wrap: "nowrap",
  justifyContent: "flex-start",
  alignItems: "stretch",
  gap: 0,
});

const flexClass = computed(() => [
  "cozy-flex",
  props.direction ? `cozy-flex-${props.direction}` : "",
  props.justifyContent ? `cozy-justify-${props.justifyContent}` : "",
  props.alignItems ? `cozy-align-${props.alignItems}` : "",
  props.wrap ? `cozy-flex-wrap-${props.wrap}` : "",
]);

const flexStyle = computed(() => {
  let gap = "0px";
  if (typeof props.gap === "number") {
    gap = props.gap + "px";
  } else if (Array.isArray(props.gap)) {
    gap = `${props.gap[1]}px ${props.gap[0]}px`;
  } else if (["small", "middle", "large"].includes(props.gap)) {
    const gapMap = {
      small: "8px",
      middle: "16px",
      large: "24px",
    };
    gap = gapMap[props.gap];
  } else {
    gap = props.gap;
  }
  return {
    gap: gap,
  };
});
</script>
