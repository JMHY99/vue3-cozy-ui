<template>
  <div class="demo">
    <c-tag v-for="tag in tags" :key="tag" closable @close="handleClose(tag)">
      {{ tag }}
    </c-tag>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const tags = ref(['Tag 1', 'Tag 2', 'Tag 3']);

const handleClose = (removedTag: string) => {
  tags.value = tags.value.filter(tag => tag !== removedTag);
};
</script>

<style scoped>
.demo {
  padding: 24px;
  background: #fff;
}
</style>
