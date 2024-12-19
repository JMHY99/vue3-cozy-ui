<template>
  <c-collapse v-model="activeNames">
    <c-collapse-panel name="1">
      <template #header>
        <c-icon name="notification" /> 这是面板标题 1
      </template>
      <p>这是折叠面板 1 的内容</p>
    </c-collapse-panel>
    <c-collapse-panel name="2">
      <template #header>
        <c-icon name="settings" /> 这是面板标题 2
      </template>
      <p>这是折叠面板 2 的内容</p>
    </c-collapse-panel>
  </c-collapse>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeNames = ref(['1'])
</script> 