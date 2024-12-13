<template>
  <div style="height: 300px;">
    <c-slider v-model="value" vertical />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(30)
</script>
