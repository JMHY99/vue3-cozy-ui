<template>
  <c-rate v-model="value" show-text />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(3)
</script>
