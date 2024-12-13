<template>
  <c-upload
    action="https://api.example.com/upload"
    :maxSize="2"
    @change="handleChange"
    @success="handleSuccess"
    @error="handleError"
  />
</template>

<script lang="ts" setup>
const handleChange = (file: any) => {
  console.log('文件变化：', file)
}

const handleSuccess = (file: any) => {
  console.log('上传成功：', file)
}

const handleError = (error: Error) => {
  console.log('上传失败：', error)
}
</script> 