<template>
  <c-descriptions title="User Info" bordered>
    <template #title>
      <c-icon name="user" /> User Info
    </template>
    <template #extra>
      <c-button type="primary">Edit</c-button>
    </template>
    <c-descriptions-item label="UserName">Zhou Maomao</c-descriptions-item>
    <c-descriptions-item label="Telephone">1810000000</c-descriptions-item>
    <c-descriptions-item label="Live">Hangzhou, Zhejiang</c-descriptions-item>
    <c-descriptions-item label="Remark">Empty</c-descriptions-item>
    <c-descriptions-item label="Address">
      No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
    </c-descriptions-item>
  </c-descriptions>
</template>

<script lang="ts" setup>
/**
 * @title 自定义标题
 * @description 自定义标题和额外内容。
 */
</script> 