<template>
  <c-collapse v-model="activeNames">
    <c-collapse-panel name="1" header="这是面板标题 1">
      <p>这是折叠面板 1 的内容</p>
    </c-collapse-panel>
    <c-collapse-panel name="2" header="这是面板标题 2">
      <p>这是折叠面板 2 的内容</p>
    </c-collapse-panel>
    <c-collapse-panel name="3" header="这是面板标题 3">
      <p>这是折叠面板 3 的内容</p>
    </c-collapse-panel>
  </c-collapse>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeNames = ref(['1'])
</script> 