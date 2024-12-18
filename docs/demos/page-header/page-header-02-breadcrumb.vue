<template>
  <div>
    <c-breadcrumb style="margin-bottom: 16px">
      <c-breadcrumb-item>首页</c-breadcrumb-item>
      <c-breadcrumb-item>应用列表</c-breadcrumb-item>
      <c-breadcrumb-item>应用详情</c-breadcrumb-item>
    </c-breadcrumb>
    <c-page-header
      title="Title"
      subtitle="This is a subtitle"
      back="返回"
      @back="handleBack"
    />
  </div>
</template>

<script lang="ts" setup>
const handleBack = () => {
  console.log('返回');
};
</script> 