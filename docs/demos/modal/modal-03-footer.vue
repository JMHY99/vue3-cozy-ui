<template>
  <div>
    <c-button type="primary" @click="showModal">自定义页脚</c-button>
    <c-modal v-model="visible" title="自定义页脚的对话框">
      <p>这是一个带自定义页脚的对话框</p>
      <template #footer>
        <c-button @click="handleCancel">返回</c-button>
        <c-button type="primary" @click="handleOk1">提交</c-button>
        <c-button type="primary" @click="handleOk2">保存草稿</c-button>
      </template>
    </c-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)

const showModal = () => {
  visible.value = true
}

const handleOk1 = () => {
  console.log('点击了提交')
  visible.value = false
}

const handleOk2 = () => {
  console.log('点击了保存草稿')
  visible.value = false
}

const handleCancel = () => {
  console.log('点击了返回')
  visible.value = false
}
</script> 