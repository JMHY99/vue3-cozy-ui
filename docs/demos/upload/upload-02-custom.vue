<template>
  <c-upload
    action="https://api.example.com/upload"
    @change="handleChange"
  >
    <c-button type="primary">
      <template #icon>
        <i class="cozy-icon-upload"></i>
      </template>
      点击上传文件
    </c-button>
  </c-upload>
</template>

<script lang="ts" setup>
const handleChange = (fileList: any[]) => {
  console.log('文件列表变化：', fileList)
}
</script> 