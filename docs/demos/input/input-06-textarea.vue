<template>
  <div class="demo-input-textarea">
    <c-input
      v-model="text1"
      type="textarea"
      placeholder="请输入内容"
      :rows="4"
    />

    <c-input
      v-model="text2"
      type="textarea"
      placeholder="禁止缩放的文本域"
      resize="none"
    />

    <c-input
      v-model="text3"
      type="textarea"
      placeholder="最大输入长度为30"
      :maxlength="30"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const text1 = ref('')
const text2 = ref('')
const text3 = ref('')
</script>

<style>
.demo-input-textarea {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
