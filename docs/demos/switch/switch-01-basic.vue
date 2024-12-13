<template>
  <div>
    <c-switch v-model="checked" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked = ref(false)
</script>
