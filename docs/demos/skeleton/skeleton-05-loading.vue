<template>
  <c-space direction="vertical" size="large">
    <div>
      <c-button @click="loading = !loading" style="margin-bottom: 16px">
        切换加载状态
      </c-button>
      <c-skeleton :loading="loading" active avatar>
        <div class="article">
          <h4>Vue3 Cozy UI</h4>
          <p>
            Vue3 Cozy UI 是一个基于 Vue 3 的组件库，提供了一系列美观、易用的组件，帮助开发者快速构建现代化的用户界面。
          </p>
        </div>
      </c-skeleton>
    </div>
  </c-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const loading = ref(true);
</script>

<style scoped>
.article {
  padding: 16px;
}

.article h4 {
  margin: 0;
  font-size: 16px;
  line-height: 24px;
}

.article p {
  margin: 12px 0 0;
  font-size: 14px;
  line-height: 22px;
}
</style> 