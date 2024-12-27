<template>
  <div>
    <c-space>
      <c-button type="primary" @click="openDrawer('default')">默认大小</c-button>
      <c-button type="primary" @click="openDrawer('large')">大尺寸</c-button>
      <c-button type="primary" @click="openDrawer('custom')">自定义宽度</c-button>
    </c-space>

    <c-drawer
      v-model="visible"
      :title="`${sizeText}抽屉`"
      :size="size !== 'custom' ? size : undefined"
      :width="size === 'custom' ? 600 : undefined"
    >
      <p>这是一个{{ sizeText }}抽屉</p>
    </c-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const visible = ref(false)
const size = ref<'default' | 'large' | 'custom'>('default')

const sizeText = computed(() => {
  const map = {
    default: '默认大小',
    large: '大尺寸',
    custom: '自定义宽度'
  }
  return map[size.value]
})

const openDrawer = (s: 'default' | 'large' | 'custom') => {
  size.value = s
  visible.value = true
}
</script> 