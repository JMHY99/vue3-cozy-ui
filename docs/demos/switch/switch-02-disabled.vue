<template>
  <div>
    <c-switch v-model="checked" disabled />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked = ref(false)
</script>
