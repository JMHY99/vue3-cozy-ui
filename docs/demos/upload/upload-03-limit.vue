<template>
  <c-upload
    action="https://api.example.com/upload"
    :maxSize="2"
    @error="handleError"
  />
</template>

<script lang="ts" setup>
const handleError = (error: Error) => {
  console.log('上传失败：', error)
}
</script> 