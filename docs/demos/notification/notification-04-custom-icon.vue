<template>
  <div>
    <c-button type="primary" @click="showNotification">自定义图标</c-button>
    <c-notification
      v-model="visible"
      title="自定义图标"
      description="这是一条使用自定义图标的通知提醒"
      icon="smile"
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