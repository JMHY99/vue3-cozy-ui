<template>
  <div class="demo-progress-circle">
    <c-progress type="circle" :percent="75" />
    <c-progress type="circle" :percent="70" status="exception" />
    <c-progress type="circle" :percent="100" />
  </div>
</template>

<style scoped>
.demo-progress-circle {
  display: flex;
  gap: 16px;
}
</style> 