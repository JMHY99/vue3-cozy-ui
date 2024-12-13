<template>
  <div>
    <c-button @click="info" style="margin-right: 8px">Info</c-button>
    <c-button type="primary" @click="success" style="margin-right: 8px">Success</c-button>
    <c-button type="warning" @click="warning" style="margin-right: 8px">Warning</c-button>
    <c-button type="danger" @click="error" style="margin-right: 8px">Error</c-button>
    <c-button @click="loading">Loading</c-button>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()!

const info = () => {
  proxy?.$message.info('这是一条消息提示')
}

const success = () => {
  proxy?.$message.success('这是一条成功消息')
}

const warning = () => {
  proxy?.$message.warning('这是一条警告消息')
}

const error = () => {
  proxy?.$message.error('这是一条错误消息')
}

const loading = () => {
  proxy?.$message.loading('正在加载中...')
}
</script>
