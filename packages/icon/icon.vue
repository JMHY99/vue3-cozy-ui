<template>
  <i
    :class="[`cozy-icon ${name}`, { 'cozy-icon-spin': spin }]"
    :style="{ 'font-size': size + 'px' }"
  ></i>
</template>

<script>
export default {
  name: "CIcon",
  props: {
    // 图标名称
    name: {
      type: String,
      default: null,
    },
    //  图标大小
    size: {
      type: [Number, String],
      default: 24,
    },
    // 是否有旋转动画
    spin: Boolean,
  },
};
</script>
