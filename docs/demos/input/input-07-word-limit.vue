<template>
  <div class="demo-input-word-limit">
    <p>文本框：</p>
    <c-input
      v-model="text"
      :maxlength="30"
      show-word-limit
      placeholder="请输入内容"
      style="width: 100%"
    />
    
    <p style="margin-top: 15px">密码框：</p>
    <c-input
      v-model="password"
      type="password"
      :maxlength="16"
      show-word-limit
      show-password
      placeholder="请输入密码"
      style="width: 100%"
    />
    
    <p style="margin-top: 15px">文本域：</p>
    <c-input
      v-model="textarea"
      type="textarea"
      :maxlength="100"
      show-word-limit
      placeholder="请输入内容"
      style="width: 100%"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')
const password = ref('')
const textarea = ref('')
</script>

<style scoped>
.demo-input-word-limit p {
  margin: 5px 0;
  font-size: 14px;
  color: #666;
}
</style> 