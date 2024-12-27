<template>
  <c-popconfirm
    title="确定要删除这条记录吗？"
    :ok-button-loading="loading"
    @confirm="handleConfirm"
  >
    <c-button type="danger">删除</c-button>
  </c-popconfirm>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(false)

const handleConfirm = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    console.log('删除成功')
  }, 2000)
}
</script> 