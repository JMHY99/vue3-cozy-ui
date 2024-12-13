<template>
  <c-slider v-model="value" :step="10" show-steps />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(30)
</script>
