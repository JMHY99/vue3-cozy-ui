<template>
  <div>
    <c-switch v-model="checked1" style="margin-right: 20px" />
    <c-switch v-model="checked2" size="small" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked1 = ref(true)
const checked2 = ref(true)
</script>
