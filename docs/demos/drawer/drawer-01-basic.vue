<template>
  <div>
    <c-button type="primary" @click="visible = true">打开抽屉</c-button>
    <c-drawer
      v-model="visible"
      title="基础抽屉"
      @close="onClose"
    >
      <p>这是一个基础抽屉</p>
      <p>你可以放置任何内容...</p>
    </c-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)

const onClose = () => {
  console.log('抽屉关闭')
}
</script> 