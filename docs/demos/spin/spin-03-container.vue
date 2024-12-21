<template>
  <div class="demo-spin-container">
    <c-button @click="loading = !loading" style="margin-bottom: 16px">
      切换加载状态
    </c-button>
    <c-spin :spinning="loading">
      <div class="content">
        <p>这里是内容区域...</p>
        <p>这里是内容区域...</p>
        <p>这里是内容区域...</p>
      </div>
    </c-spin>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const loading = ref(false);
</script>

<style scoped>
.demo-spin-container {
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