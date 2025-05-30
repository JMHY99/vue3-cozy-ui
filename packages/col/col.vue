<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed, inject } from "vue";
import type { CSSProperties } from "vue";

// 定义组件名称
defineOptions({
  name: "CCol",
});

interface RowContext {
  getGutter: { value: [number, number] };
}

// 定义组件属性
const props = defineProps({
  span: {
    type: Number,
    default: 24,
  },
  offset: {
    type: Number,
    default: 0,
  },
  pull: {
    type: Number,
    default: 0,
  },
  push: {
    type: Number,
    default: 0,
  },
  xs: {
    type: [Number, Object],
    default: undefined,
  },
  sm: {
    type: [Number, Object],
    default: undefined,
  },
  md: {
    type: [Number, Object],
    default: undefined,
  },
  lg: {
    type: [Number, Object],
    default: undefined,
  },
  xl: {
    type: [Number, Object],
    default: undefined,
  },
  xxl: {
    type: [Number, Object],
    default: undefined,
  },
});

// 注入 RowContext
const rowContext = inject<RowContext>("rowContext", {
  getGutter: { value: [0, 0] },
});

// 计算类名
const classes = computed(() => {
  const pos: Record<string, boolean> = {};
  const sizes = ["xs", "sm", "md", "lg", "xl", "xxl"];

  sizes.forEach((size) => {
    const sizeProps = props[size as keyof typeof props];
    if (typeof sizeProps === "number") {
      pos[`cozy-col-${size}-${sizeProps}`] = true;
    } else if (typeof sizeProps === "object") {
      Object.entries(sizeProps).forEach(([key, value]) => {
        pos[`cozy-col-${size}-${key}-${value}`] = true;
      });
    }
  });

  return [
    "cozy-col",
    {
      [`cozy-col-${props.span}`]: props.span !== undefined,
      [`cozy-col-offset-${props.offset}`]: props.offset > 0,
      [`cozy-col-pull-${props.pull}`]: props.pull > 0,
      [`cozy-col-push-${props.push}`]: props.push > 0,
      ...pos,
    },
  ];
});

// 计算样式
const styles = computed(() => {
  const styles: CSSProperties = {};
  const gutters = rowContext.getGutter.value;

  if (gutters[0] > 0) {
    styles.paddingLeft = `${gutters[0] / 2}px`;
    styles.paddingRight = `${gutters[0] / 2}px`;
  }
  if (gutters[1] > 0) {
    styles.paddingTop = `${gutters[1] / 2}px`;
    styles.paddingBottom = `${gutters[1] / 2}px`;
  }

  return styles;
});
</script>
