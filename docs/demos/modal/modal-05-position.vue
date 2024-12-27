<template>
  <div>
    <c-button type="primary" @click="showModal1">距离顶部 20px</c-button>
    <c-button type="primary" @click="showModal2" style="margin-left: 10px">垂直居中</c-button>

    <c-modal
      v-model="visible1"
      title="距离顶部 20px"
      :style="{ top: '20px' }"
    >
      <p>这是一个距离顶部 20px 的对话框</p>
    </c-modal>

    <c-modal
      v-model="visible2"
      title="垂直居中的对话框"
      centered
    >
      <p>这是一个垂直居中的对话框</p>
    </c-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible1 = ref(false)
const visible2 = ref(false)

const showModal1 = () => {
  visible1.value = true
}

const showModal2 = () => {
  visible2.value = true
}
</script> 