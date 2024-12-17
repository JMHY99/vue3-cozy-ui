<template>
  <div>
    <c-input-number v-model="num" :min="1" :max="10" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const num = ref(1)
</script>
