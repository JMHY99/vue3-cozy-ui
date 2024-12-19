<template>
  <div>
    <c-descriptions title="User Info" layout="vertical">
      <c-descriptions-item label="UserName">Zhou Maomao</c-descriptions-item>
      <c-descriptions-item label="Telephone">1810000000</c-descriptions-item>
      <c-descriptions-item label="Live">Hangzhou, Zhejiang</c-descriptions-item>
      <c-descriptions-item label="Address" :span="2">
        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
      </c-descriptions-item>
      <c-descriptions-item label="Remark">Empty</c-descriptions-item>
    </c-descriptions>
    <br />
    <c-descriptions title="User Info" layout="vertical" bordered>
      <c-descriptions-item label="UserName">Zhou Maomao</c-descriptions-item>
      <c-descriptions-item label="Telephone">1810000000</c-descriptions-item>
      <c-descriptions-item label="Live">Hangzhou, Zhejiang</c-descriptions-item>
      <c-descriptions-item label="Address">
        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
      </c-descriptions-item>
      <c-descriptions-item label="Remark">Empty</c-descriptions-item>
    </c-descriptions>
  </div>
</template>

<script lang="ts" setup>
/**
 * @title 垂直布局
 * @description 垂直的列表。
 */
</script> 