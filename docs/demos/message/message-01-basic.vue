<template>
  <div>
    <c-button type="primary" @click="showMessage">显示普通提示</c-button>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()!

const showMessage = () => {
  proxy?.$message.info('这是一条消息提示')
}
</script>
