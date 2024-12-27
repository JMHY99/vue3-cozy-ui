<template>
  <div>
    <c-button type="primary" @click="visible = true">打开抽屉</c-button>

    <c-drawer v-model="visible">
      <template #title>
        <div class="custom-title">
          <c-icon name="c-user" :size="20" />
          <span style="margin-left: 8px">用户信息</span>
        </div>
      </template>

      <div class="custom-content">
        <div class="info-item">
          <span class="label">姓名：</span>
          <span class="value">张三</span>
        </div>
        <div class="info-item">
          <span class="label">年龄：</span>
          <span class="value">28</span>
        </div>
        <div class="info-item">
          <span class="label">职业：</span>
          <span class="value">前端开发工程师</span>
        </div>
        <div class="info-item">
          <span class="label">地址：</span>
          <span class="value">北京市朝阳区</span>
        </div>
      </div>

      <template #footer>
        <c-space>
          <c-button @click="visible = false">取消</c-button>
          <c-button type="primary" @click="handleConfirm">确认</c-button>
        </c-space>
      </template>
    </c-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)

const handleConfirm = () => {
  console.log('确认')
  visible.value = false
}
</script>

<style scoped>
.custom-title {
  display: flex;
  align-items: center;
  color: #1890ff;
}

.custom-content {
  padding: 20px 0;
}

.info-item {
  margin-bottom: 16px;
}

.label {
  display: inline-block;
  width: 80px;
  color: rgba(0, 0, 0, 0.45);
}

.value {
  color: rgba(0, 0, 0, 0.85);
}
</style> 