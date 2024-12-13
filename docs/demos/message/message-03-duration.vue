<template>
  <div>
    <c-button type="primary" @click="showMessage">显示10秒后关闭</c-button>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()!

const showMessage = () => {
  proxy?.$message.success('这条消息10秒后会关闭', 10000)
}
</script>
