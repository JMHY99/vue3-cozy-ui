<template>
  <div>
    <c-tooltip title="提示文字">
      <a>鼠标移入查看提示</a>
    </c-tooltip>
    <br />
    <br />
    <c-tooltip>
      <template #title>
        <span>提示文字</span>
      </template>
      <a>使用插槽的提示</a>
    </c-tooltip>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
a {
  color: #1677ff;
  text-decoration: none;
  cursor: pointer;
  margin-right: 16px;
}
</style> 