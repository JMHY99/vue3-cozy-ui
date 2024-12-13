<template>
  <c-checkbox v-model="checked">Checkbox</c-checkbox>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked = ref(false)
</script>
