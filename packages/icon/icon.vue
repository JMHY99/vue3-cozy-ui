<template>
  <i
    :class="[`cozy-icon ${props.name}`, { 'cozy-icon-spin': props.spin }]"
    :style="{ 'font-size': props.size + 'px' }"
  >
  </i>
</template>

<script setup lang="ts">
// 3.3+ 中可以通过 defineOptions
defineOptions({
  name: "CIcon", //定义组件名
});

// props的类型接口
interface Props {
  name: string;
  size?: number | string;
  spin?: boolean; //?表示该属性是可选的，可以选择性地赋值。
}

// Props 解构默认值
const props = withDefaults(defineProps<Props>(), {
  name: "",
  size: 24,
  spin: false,
});
</script>
