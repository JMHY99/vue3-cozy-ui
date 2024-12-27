<template>
  <div>
    <c-button type="primary" @click="showModal">打开异步对话框</c-button>
    <c-modal
      v-model="visible"
      title="异步关闭对话框"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
    >
      <p>{{ modalText }}</p>
    </c-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)
const confirmLoading = ref(false)
const modalText = ref('对话框的内容')

const showModal = () => {
  visible.value = true
}

const handleOk = () => {
  modalText.value = '正在提交中...'
  confirmLoading.value = true
  setTimeout(() => {
    visible.value = false
    confirmLoading.value = false
    modalText.value = '对话框的内容'
  }, 2000)
}
</script> 