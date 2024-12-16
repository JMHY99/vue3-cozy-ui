<template>
  <c-calendar v-model="value" :fullscreen="false" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(new Date())
</script>
