<template>
  <section :class="layoutClass">
    <slot></slot>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

defineOptions({
  name: "CLayout", //定义组件名
});

// 插槽
const slots = defineSlots();

// 判断是否有sider
const hasSiderChildren = () => {
  let hasSider = false;
  // 检查子节点是否存在Sider组件
  slots["default"]().forEach((slot) => {
    if (slot && slot.type.name === "CSider") {
      hasSider = true;
    }
  });
  return hasSider;
};

// 计算属性
// 返回对象方式
// const layoutClass = computed(() => ({
//   "cozy-layout": true,
//   "cozy-layout-is-vertical": hasSiderChildren(), // 动态添加类名
// }));

// 返回数组方式
const layoutClass = computed(() => [
  "cozy-layout",
  hasSiderChildren() ? "cozy-layout-is-vertical" : "", // 动态添加类名
]);
</script>
