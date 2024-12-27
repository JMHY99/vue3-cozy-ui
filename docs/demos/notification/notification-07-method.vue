<template>
  <div>
    <c-space>
      <c-button @click="showBasicNotification">基本通知</c-button>
      <c-button @click="showSuccessNotification">成功通知</c-button>
      <c-button @click="showErrorNotification">错误通知</c-button>
      <c-button @click="showCustomNotification">自定义通知</c-button>
    </c-space>
  </div>
</template>

<script lang="ts" setup>
import { notification } from '../../packages/notification'

// 基本通知
const showBasicNotification = () => {
  notification({
    title: '基本通知',
    description: '这是一条基本的通知提醒'
  })
}

// 成功通知
const showSuccessNotification = () => {
  notification.success({
    title: '成功提示',
    description: '这是一条成功的通知提醒'
  })
}

// 错误通知
const showErrorNotification = () => {
  notification.error({
    title: '错误提示',
    description: '这是一条错误的通知提醒',
    duration: 0
  })
}

// 自定义通知
const showCustomNotification = () => {
  notification({
    title: '自定义通知',
    description: '这是一条自定义的通知提醒',
    icon: 'smile',
    placement: 'bottomRight',
    duration: 3
  })
}
</script> 