<template>
  <c-upload
    action="https://api.example.com/upload"
    @change="handleChange"
    @success="handleSuccess"
    @error="handleError"
  />
</template>

<script lang="ts" setup>
const handleChange = (fileList: any[]) => {
  console.log('文件列表变化：', fileList)
}

const handleSuccess = (file: any) => {
  console.log('上传成功：', file)
}

const handleError = (error: Error) => {
  console.log('上传失败：', error)
}
</script> 