<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed, provide } from "vue";
import type { CSSProperties } from "vue";

// 定义组件名称
defineOptions({
  name: "CRow",
});

// 定义组件属性
const props = defineProps({
  align: {
    type: String,
    default: "top",
    validator: (val: string) => ["top", "middle", "bottom"].includes(val),
  },
  justify: {
    type: String,
    default: "start",
    validator: (val: string) =>
      ["start", "end", "center", "space-around", "space-between"].includes(val),
  },
  gutter: {
    type: [Number, Array],
    default: 0,
  },
  wrap: {
    type: Boolean,
    default: true,
  },
});

// 计算 gutter
const getGutter = computed(() => {
  const results: [number, number] = [0, 0];
  const gutter = props.gutter || 0;

  if (Array.isArray(gutter)) {
    results[0] = (gutter[0] as number) || 0;
    results[1] = (gutter[1] as number) || 0;
  } else {
    results[0] = gutter as number;
  }

  return results;
});

// 计算类名
const classes = computed(() => [
  "cozy-row",
  {
    [`cozy-row-${props.justify}`]: props.justify,
    [`cozy-row-${props.align}`]: props.align,
    "cozy-row-no-wrap": !props.wrap,
  },
]);

// 计算样式
const styles = computed(() => {
  const gutters = getGutter.value;
  const styles: CSSProperties = {};

  if (gutters[0] > 0) {
    styles.marginLeft = `${gutters[0] / -2}px`;
    styles.marginRight = `${gutters[0] / -2}px`;
  }
  if (gutters[1] > 0) {
    styles.marginTop = `${gutters[1] / -2}px`;
    styles.marginBottom = `${gutters[1] / -2}px`;
  }

  return styles;
});

// 提供 gutter 值给 Col 组件
provide("rowContext", {
  getGutter,
});
</script>
