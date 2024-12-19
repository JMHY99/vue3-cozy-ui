<template>
  <c-space direction="vertical" size="large" style="width: 100%">
    <c-collapse v-model="activeNames1" :bordered="false">
      <c-collapse-panel name="1" header="无边框面板">
        <p>这是无边框折叠面板的内容</p>
      </c-collapse-panel>
      <c-collapse-panel name="2" header="无边框面板">
        <p>这是无边框折叠面板的内容</p>
      </c-collapse-panel>
    </c-collapse>

    <c-collapse v-model="activeNames2" ghost>
      <c-collapse-panel name="1" header="透明背景面板">
        <p>这是透明背景折叠面板的内容</p>
      </c-collapse-panel>
      <c-collapse-panel name="2" header="透明背景面板">
        <p>这是透明背景折叠面板的内容</p>
      </c-collapse-panel>
    </c-collapse>
  </c-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeNames1 = ref(['1'])
const activeNames2 = ref(['1'])
</script> 