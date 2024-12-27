<template>
  <div>
    <c-switch v-model="visible" />
    <c-popconfirm
      title="确定要删除这条记录吗？"
      :disabled="!visible"
      @confirm="confirm"
      @cancel="cancel"
    >
      <c-button type="danger" :disabled="!visible">删除</c-button>
    </c-popconfirm>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)

const confirm = () => {
  console.log('点击了确定')
}

const cancel = () => {
  console.log('点击了取消')
}
</script> 