<template>
  <div>
    <c-switch v-model="checked1" loading style="margin-right: 20px" />
    <c-switch v-model="checked2" loading size="small" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked1 = ref(true)
const checked2 = ref(false)
</script>
