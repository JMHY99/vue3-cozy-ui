<template>
  <c-input v-model="value" disabled placeholder="禁用状态" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
</script>
