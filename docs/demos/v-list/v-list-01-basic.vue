<template>
  <c-v-list :data="listData" />
</template>

<script setup lang="ts">
// 生成演示数据
const listData = Array.from({ length: 10000 }, (_, index) => `列表项 ${index + 1}`);
</script> 