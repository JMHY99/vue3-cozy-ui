<template>
  <c-list :data-source="data">
    <template #item="{ item }">
      {{ item }}
    </template>
  </c-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const data = ref([
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
])
</script> 