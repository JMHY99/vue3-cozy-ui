<template>
  <div>
    <c-button type="primary" @click="showModal">打开对话框</c-button>
    <c-modal
      v-model="visible"
      title="第一个对话框"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>这是一个基础的对话框</p>
      <p>你可以在这里放置任何内容...</p>
    </c-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)

const showModal = () => {
  visible.value = true
}

const handleOk = () => {
  console.log('点击了确定')
  visible.value = false
}

const handleCancel = () => {
  console.log('点击了取消')
  visible.value = false
}
</script> 