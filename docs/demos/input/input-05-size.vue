<template>
  <div class="demo-input-size">
    <c-input v-model="value1" size="large" placeholder="大型输入框" />
    <c-input v-model="value2" placeholder="默认输入框" />
    <c-input v-model="value3" size="small" placeholder="小型输入框" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
</script>

<style>
.demo-input-size {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
