<template>
  <c-input v-model="value" placeholder="请输入内容" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
</script>
