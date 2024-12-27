<template>
  <div>
    <c-space>
      <c-button @click="showNotification('topRight')">右上角</c-button>
      <c-button @click="showNotification('topLeft')">左上角</c-button>
      <c-button @click="showNotification('bottomRight')">右下角</c-button>
      <c-button @click="showNotification('bottomLeft')">左下角</c-button>
    </c-space>

    <c-notification
      v-model="visible"
      :placement="placement"
      :title="title"
      :description="description"
      @close="onClose"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)
const placement = ref('topRight')
const title = ref('')
const description = ref('')

const placementMap = {
  topRight: '右上角',
  topLeft: '左上角',
  bottomRight: '右下角',
  bottomLeft: '左下角'
}

const showNotification = (pos: keyof typeof placementMap) => {
  placement.value = pos
  title.value = `${placementMap[pos]}通知`
  description.value = `这是一条显示在${placementMap[pos]}的通知提醒`
  visible.value = true
}

const onClose = () => {
  console.log('通知关��了')
}
</script> 