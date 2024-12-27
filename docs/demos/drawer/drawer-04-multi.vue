<template>
  <div>
    <c-button type="primary" @click="visible1 = true">打开第一层抽屉</c-button>

    <c-drawer
      v-model="visible1"
      title="第一层抽屉"
      :z-index="1001"
    >
      <p>这是第一层抽屉的内容</p>
      <c-button type="primary" @click="visible2 = true">打开第二层抽屉</c-button>

      <c-drawer
        v-model="visible2"
        title="第二层抽屉"
        :z-index="1002"
      >
        <p>这是第二层抽屉的内容</p>
        <c-button type="primary" @click="visible3 = true">打开第三层抽屉</c-button>

        <c-drawer
          v-model="visible3"
          title="第三层抽屉"
          :z-index="1003"
        >
          <p>这是第三层抽屉的内容</p>
        </c-drawer>
      </c-drawer>
    </c-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
</script> 