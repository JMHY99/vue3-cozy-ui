<template>
  <c-space direction="vertical">
    <c-rate v-model="value1" character="A" />
    <c-rate v-model="value2" icon="c-heart-filled" />
    <c-rate v-model="value3">
      <template #character="{ index }">
        {{ index + 1 }}
      </template>
    </c-rate>
  </c-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(3)
const value2 = ref(3)
const value3 = ref(3)
</script>
