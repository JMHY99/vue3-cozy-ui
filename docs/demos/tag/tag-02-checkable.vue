<template>
  <div class="demo">
    <c-tag checkable v-model:checked="checked1">Tag1</c-tag>
    <c-tag checkable v-model:checked="checked2">Tag2</c-tag>
    <c-tag checkable v-model:checked="checked3">Tag3</c-tag>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checked1 = ref(true);
const checked2 = ref(false);
const checked3 = ref(false);
</script>

<style scoped>
.demo {
  padding: 24px;
  background: #fff;
}
</style>
