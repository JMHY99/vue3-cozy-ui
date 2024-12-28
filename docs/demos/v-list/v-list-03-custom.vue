<template>
  <c-v-list :data="listData" :item-height="60">
    <template #default="{ item, index }">
      <div class="custom-item">
        <div class="custom-item-index">{{ index + 1 }}</div>
        <div class="custom-item-content">
          <div class="custom-item-title">{{ item.title }}</div>
          <div class="custom-item-desc">{{ item.description }}</div>
        </div>
      </div>
    </template>
  </c-v-list>
</template>

<script setup lang="ts">
// 生成演示数据
const listData = Array.from({ length: 10000 }, (_, index) => ({
  title: `标题 ${index + 1}`,
  description: `这是第 ${index + 1} 项的详细描述信息`
}));
</script>

<style scoped>
.custom-item {
  display: flex;
  align-items: center;
  padding: 8px;
}

.custom-item-index {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  border-radius: 4px;
  margin-right: 12px;
  font-weight: bold;
}

.custom-item-content {
  flex: 1;
}

.custom-item-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
}

.custom-item-desc {
  font-size: 14px;
  color: #666;
}
</style> 