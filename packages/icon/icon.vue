<template>
  <i
    :class="[`cozy-icon ${props.name}`, { 'cozy-icon-spin': props.spin }]"
    :style="{ 'font-size': props.size + 'px' }"
  >
  </i>
</template>

<script setup lang="ts">
defineOptions({
  name: "CIcon", //定义组件名
});

interface Props {
  name: string;
  size: number | string;
  spin: boolean;
}

// 定义组件属性
const props: Props = defineProps({
  name: {
    type: String,
    default: "",
  },
  size: {
    type: [Number, String],
    default: 24,
  },
  spin: {
    type: Boolean,
    default: false,
  },
});
</script>
