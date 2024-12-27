<template>
  <div>
    <c-button type="primary" @click="showNotification">自定义按钮</c-button>
    <c-notification
      v-model="visible"
      title="自定义按钮"
      description="这是一条带有自定义按钮的通知提醒"
      :duration="0"
      @close="onClose"
    >
      <template #btn>
        <c-space>
          <c-button size="small" @click="handleCancel">取消</c-button>
          <c-button type="primary" size="small" @click="handleConfirm">确认</c-button>
        </c-space>
      </template>
    </c-notification>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)

const showNotification = () => {
  visible.value = true
}

const handleCancel = () => {
  visible.value = false
  console.log('点击了取消按钮')
}

const handleConfirm = () => {
  visible.value = false
  console.log('点击了确认按钮')
}

const onClose = () => {
  console.log('通知关闭了')
}
</script> 