<template>
  <c-pagination
    v-model:current="current"
    v-model:pageSize="pageSize"
    :total="500"
    :showSizeChanger="true"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const current = ref(1);
const pageSize = ref(10);
</script> 