<template>
  <c-pagination
    v-model:current="current"
    v-model:pageSize="pageSize"
    :total="500"
    :showSizeChanger="true"
    :showQuickJumper="true"
    :showTotal="total => `共 ${total} 条`"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const current = ref(1);
const pageSize = ref(10);
</script> 