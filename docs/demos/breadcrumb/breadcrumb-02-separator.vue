<template>
  <c-breadcrumb separator=">">
    <c-breadcrumb-item :to="{ path: '/' }" @click="handleClick">首页</c-breadcrumb-item>
    <c-breadcrumb-item :to="{ path: '/components' }" @click="handleClick">组件</c-breadcrumb-item>
    <c-breadcrumb-item>面包屑</c-breadcrumb-item>
  </c-breadcrumb>

  <c-breadcrumb separator-icon="c-right-outlined">
    <c-breadcrumb-item :to="{ path: '/' }" @click="handleClick">首页</c-breadcrumb-item>
    <c-breadcrumb-item :to="{ path: '/components' }" @click="handleClick">组件</c-breadcrumb-item>
    <c-breadcrumb-item>面包屑</c-breadcrumb-item>
  </c-breadcrumb>
</template>

<script setup lang="ts">
const handleClick = (to: string | Record<string, any>) => {
  console.log('路由跳转到:', to)
  // 这里可以使用你的路由实例进行跳转
  // router.push(to)
}
</script>

<style scoped>
.cozy-breadcrumb {
  margin-bottom: 20px;
}
</style>
