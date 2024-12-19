<template>
  <div class="card-demo">
    <c-card
      title="加载中的卡片"
      style="width: 300px"
      loading
    >
      <p>卡片内容</p>
      <p>卡片内容</p>
      <p>卡片内容</p>
    </c-card>

    <c-card
      title="可切换加载状态"
      style="width: 300px"
      :loading="loading"
    >
      <template #extra>
        <a href="#" @click.prevent="toggleLoading">
          {{ loading ? '结束加载' : '开始加载' }}
        </a>
      </template>
      <p>卡片内容</p>
      <p>卡片内容</p>
      <p>卡片内容</p>
    </c-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)

const toggleLoading = () => {
  loading.value = !loading.value
}
</script>

<style scoped>
.card-demo {
  display: flex;
  gap: 16px;
}

p {
  margin: 0;
}

p + p {
  margin-top: 8px;
}
</style>
