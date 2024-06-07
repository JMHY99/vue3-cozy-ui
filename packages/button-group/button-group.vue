<template>
  <div class="cozy-button-group">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
// 3.3+ 中可以通过 defineOptions
defineOptions({
  name: "CButtonGroup", //定义组件名
});
</script>
