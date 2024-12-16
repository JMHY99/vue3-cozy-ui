<template>
  <div
    :ref="spaceRef"
    :class="[`cozy-space cozy-space-${direction} cozy-space-align-${align}`]"
    :style="spaceStyle"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// 定义组件名称
defineOptions({
  name: "CSpace",
});

interface SpaceProps {
  align?: "stretch" | "start" | "end" | "center" | "baseline";
  direction?: "horizontal" | "vertical";
  size?: "small" | "middle" | "large" | number | [number, number];
  wrap?: boolean;
}

const props = withDefaults(defineProps<SpaceProps>(), {
  align: "stretch",
  direction: "horizontal",
  size: "middle",
  wrap: false,
});

const spaceRef = ref<HTMLElement | null>(null);

const spaceStyle = computed(() => {
  let gap = "0px";
  if (typeof props.size === "number") {
    gap = `${props.size}px`;
  } else if (Array.isArray(props.size)) {
    gap = `${props.size[1]}px ${props.size[0]}px`;
  } else {
    const gapMap = {
      small: "8px",
      middle: "16px",
      large: "24px",
    };
    gap = gapMap[props.size as keyof typeof gapMap];
  }
  return {
    gap,
    "flex-wrap": props.wrap ? "wrap" : "nowrap",
  };
});

// onMounted(() => {
//   if (spaceRef.value) {
//     const childElements = spaceRef.value.children;
//     for (let i = 0; i < childElements.length; i++) {
//       const childElement = childElements[i];
//       const divElement = document.createElement("div");
//       divElement.classList.add("cozy-space-item");
//       childElement.parentNode?.insertBefore(divElement, childElement);
//       divElement.appendChild(childElement);
//     }
//   }
// });
</script>
