<template>
  <c-pagination
    v-model:current="current"
    :total="500"
    :showQuickJumper="true"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const current = ref(1);
</script> 