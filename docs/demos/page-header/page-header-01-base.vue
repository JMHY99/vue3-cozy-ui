<template>
  <c-page-header
    title="Title"
    subtitle="This is a subtitle"
    back="返回"
    @back="handleBack"
  />
</template>

<script lang="ts" setup>
const handleBack = () => {
  console.log('返回');
};
</script> 