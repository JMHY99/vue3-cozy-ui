<template>
  <div>
    <c-input-number v-model="num" :step="2" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const num = ref(0)
</script>
