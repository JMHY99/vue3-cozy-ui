<template>
  <div class="demo-spin-tip">
    <c-spin tip="加载中...">
      <div class="content">
        <p>这里是内容区域...</p>
        <p>这里是内容区域...</p>
        <p>这里是内容区域...</p>
      </div>
    </c-spin>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.demo-spin-tip {
  width: 100%;
}

.content {
  padding: 24px;
  background: #fafafa;
  border-radius: 4px;
}

.content p {
  margin: 0;
  padding: 8px 0;
}
</style> 