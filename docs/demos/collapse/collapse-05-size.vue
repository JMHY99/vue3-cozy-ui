<template>
  <c-space direction="vertical" size="large" style="width: 100%">
    <c-collapse v-model="activeNames1" size="large">
      <c-collapse-panel name="1" header="大尺寸面板">
        <p>这是大尺寸折叠面板的内容</p>
      </c-collapse-panel>
    </c-collapse>

    <c-collapse v-model="activeNames2">
      <c-collapse-panel name="1" header="默认尺寸面板">
        <p>这是默认尺寸折叠面板的内容</p>
      </c-collapse-panel>
    </c-collapse>

    <c-collapse v-model="activeNames3" size="small">
      <c-collapse-panel name="1" header="小尺寸面板">
        <p>这是小尺寸折叠面板的内容</p>
      </c-collapse-panel>
    </c-collapse>
  </c-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeNames1 = ref(['1'])
const activeNames2 = ref(['1'])
const activeNames3 = ref(['1'])
</script> 