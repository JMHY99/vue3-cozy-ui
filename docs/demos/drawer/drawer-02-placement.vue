<template>
  <div>
    <c-space>
      <c-button type="primary" @click="openDrawer('top')">上方</c-button>
      <c-button type="primary" @click="openDrawer('right')">右侧</c-button>
      <c-button type="primary" @click="openDrawer('bottom')">下方</c-button>
      <c-button type="primary" @click="openDrawer('left')">左侧</c-button>
    </c-space>

    <c-drawer
      v-model="visible"
      :placement="placement"
      :title="`${placementText}抽屉`"
    >
      <p>这是一个{{ placementText }}抽屉</p>
    </c-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const visible = ref(false)
const placement = ref<'top' | 'right' | 'bottom' | 'left'>('right')

const placementText = computed(() => {
  const map = {
    top: '上方',
    right: '右侧',
    bottom: '下方',
    left: '左侧'
  }
  return map[placement.value]
})

const openDrawer = (p: 'top' | 'right' | 'bottom' | 'left') => {
  placement.value = p
  visible.value = true
}
</script> 