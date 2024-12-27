<template>
  <div>
    <c-button type="primary" @click="showModal">自定义渲染对话框</c-button>
    <c-modal
      v-model="visible"
      :width="800"
      title="自定义渲染的对话框"
    >
      <div class="custom-modal">
        <div class="custom-modal-info">
          <h3>用户信息</h3>
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
        </div>
        <div class="custom-modal-chart">
          <h3>数据统计</h3>
          <div class="chart-placeholder">
            这里可以放置图表或其他自定义内容
          </div>
        </div>
      </div>
    </c-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)

const showModal = () => {
  visible.value = true
}
</script>

<style scoped>
.custom-modal {
  display: flex;
  gap: 24px;
}

.custom-modal-info,
.custom-modal-chart {
  flex: 1;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 4px;
}

h3 {
  margin: 0 0 16px;
  color: #1890ff;
}

.info-item {
  margin-bottom: 12px;
}

.label {
  display: inline-block;
  width: 80px;
  color: rgba(0, 0, 0, 0.45);
}

.value {
  color: rgba(0, 0, 0, 0.85);
}

.chart-placeholder {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.45);
}
</style> 