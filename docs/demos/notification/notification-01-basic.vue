<template>
  <div>
    <c-button type="primary" @click="showNotification">打开通知提醒框</c-button>
    <c-notification
      v-model="visible"
      title="通知标题"
      description="这是一条基本的通知提醒，4.5秒后会自动关闭。"
      notification-key="basic-demo"
      @close="onClose"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)

const showNotification = () => {
  visible.value = true
}

const onClose = () => {
  console.log('通知关闭了')
}
</script> 