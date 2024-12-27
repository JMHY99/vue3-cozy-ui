<template>
  <div>
    <c-space>
      <c-button @click="showNotification('success')">成功</c-button>
      <c-button @click="showNotification('info')">信息</c-button>
      <c-button @click="showNotification('warning')">警告</c-button>
      <c-button @click="showNotification('error')">错误</c-button>
    </c-space>

    <c-notification
      v-model="visible"
      :type="type"
      :title="title"
      :description="description"
      @close="onClose"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)
const type = ref('')
const title = ref('')
const description = ref('')

const showNotification = (notificationType: string) => {
  type.value = notificationType
  switch (notificationType) {
    case 'success':
      title.value = '成功提示'
      description.value = '这是一条成功的提示消息'
      break
    case 'info':
      title.value = '信息提示'
      description.value = '这是一条信息提示消息'
      break
    case 'warning':
      title.value = '警告提示'
      description.value = '这是一条警告提示消息'
      break
    case 'error':
      title.value = '错误提示'
      description.value = '这是一条错误提示消息'
      break
  }
  visible.value = true
}

const onClose = () => {
  console.log('通知关闭了')
}
</script> 