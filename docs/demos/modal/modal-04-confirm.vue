<template>
  <div>
    <c-space>
      <c-button type="primary" @click="showConfirm">确认对话框</c-button>
      <c-button type="primary" @click="showDeleteConfirm">删除确认框</c-button>
      <c-button type="primary" @click="showCustomConfirm">自定义图标</c-button>
    </c-space>

    <!-- 基础确认框 -->
    <c-modal
      v-model="visible1"
      title="确认"
      :closable="false"
      :mask-closable="false"
      @ok="handleOk1"
      @cancel="handleCancel1"
    >
      <p>确定要执行此操作吗？</p>
    </c-modal>

    <!-- 删除确认框 -->
    <c-modal
      v-model="visible2"
      title="删除确认"
      :closable="false"
      :mask-closable="false"
      ok-text="删除"
      cancel-text="取消"
      @ok="handleOk2"
      @cancel="handleCancel2"
    >
      <template #title>
        <div class="confirm-title">
          <c-icon name="warning" class="warning-icon" />
          <span>删除确认</span>
        </div>
      </template>
      <p>删除后数据将无法恢复，确定要删除吗？</p>
    </c-modal>

    <!-- 自定义图标确认框 -->
    <c-modal
      v-model="visible3"
      title="操作确认"
      :closable="false"
      :mask-closable="false"
      @ok="handleOk3"
      @cancel="handleCancel3"
    >
      <template #title>
        <div class="confirm-title">
          <c-icon name="info-circle" class="info-icon" />
          <span>操作确认</span>
        </div>
      </template>
      <p>此操作需要一定时间，确定要继续吗？</p>
    </c-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)

const showConfirm = () => {
  visible1.value = true
}

const showDeleteConfirm = () => {
  visible2.value = true
}

const showCustomConfirm = () => {
  visible3.value = true
}

const handleOk1 = () => {
  console.log('确认操作')
  visible1.value = false
}

const handleCancel1 = () => {
  console.log('取消操作')
  visible1.value = false
}

const handleOk2 = () => {
  console.log('确认删除')
  visible2.value = false
}

const handleCancel2 = () => {
  console.log('取消删除')
  visible2.value = false
}

const handleOk3 = () => {
  console.log('确认继续')
  visible3.value = false
}

const handleCancel3 = () => {
  console.log('取消继��')
  visible3.value = false
}
</script>

<style scoped>
.confirm-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.warning-icon {
  color: #faad14;
  font-size: 20px;
}

.info-icon {
  color: #1890ff;
  font-size: 20px;
}
</style> 