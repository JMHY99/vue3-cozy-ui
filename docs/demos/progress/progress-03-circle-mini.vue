<template>
  <div class="demo-progress-circle">
    <c-progress type="circle" :percent="30" :size="80" />
    <c-progress type="circle" :percent="70" :size="80" status="exception" />
    <c-progress type="circle" :percent="100" :size="80" />
  </div>
</template>

<style scoped>
.demo-progress-circle {
  display: flex;
  gap: 16px;
}
</style> 