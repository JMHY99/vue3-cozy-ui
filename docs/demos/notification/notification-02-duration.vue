<template>
  <div>
    <c-space>
      <c-button @click="showNotification(2)">2秒后关闭</c-button>
      <c-button @click="showNotification(0)">不自动关闭</c-button>
    </c-space>

    <c-notification
      v-model="visible"
      :duration="duration"
      title="自定义时长"
      :description="description"
      @close="onClose"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)
const duration = ref(4.5)
const description = ref('')

const showNotification = (time: number) => {
  duration.value = time
  description.value = time === 0 
    ? '这是一条不会自动关闭的通知' 
    : `这条通知将在 ${time} 秒后自动关闭`
  visible.value = true
}

const onClose = () => {
  console.log('通知关闭了')
}
</script> 