<template>
  <div>
    <c-input-number v-model="num" disabled />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const num = ref(1)
</script>
