<template>
  <c-v-list
    :data="listData"
    :item-height="80"
    :height="300"
  />
</template>

<script setup lang="ts">
// 生成演示数据
const listData = Array.from({ length: 10000 }, (_, index) => `自定义高度的列表项 ${index + 1}`);
</script> 