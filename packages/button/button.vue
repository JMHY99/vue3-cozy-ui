<template>
  <button @click="handleClick" :class="className">
    <span
      v-if="loading"
      class="cozy-button-loading-icon"
      :class="ghost && loading ? 'cozy-button-loading-icon-' + type : ''"
    >
    </span>
    <span><slot></slot></span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

// 3.3+ 中可以通过 defineOptions
defineOptions({
  name: "CButton", //定义组件名
});

// props的类型接口
interface ButtonProps {
  type?: string;
  size?: string;
  loading?: boolean;
  disabled?: boolean;
  ghost?: boolean;
  circle?: boolean;
}

// Props 解构默认值
const props = withDefaults(defineProps<ButtonProps>(), {
  type: "default",
  size: "middle",
  // loading: false,
  // disabled: false,
  // ghost: false,
  // circle: false,
});

// 3.3+: 可选的、更简洁的语法
const emit = defineEmits<{
  click: [evt: MouseEvent];
}>();

// 点击事件
const handleClick = (evt: MouseEvent) => {
  if (!props.loading) {
    emit("click", evt);
  }
};

const className = computed(() => [
  "cozy-button",
  props.type ? `cozy-button-${props.type}` : "",
  props.disabled ? "cozy-button-disabled" : "",
  props.circle ? "cozy-button-circle" : "",
  props.ghost ? "cozy-button-ghost" : "",
  props.size ? `cozy-button-${props.size}` : "",
  props.loading ? "cozy-button-loading" : "",
]);
</script>
