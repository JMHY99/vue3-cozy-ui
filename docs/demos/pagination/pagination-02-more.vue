<template>
  <c-pagination v-model:current="current" :total="500" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const current = ref(6);
</script> 