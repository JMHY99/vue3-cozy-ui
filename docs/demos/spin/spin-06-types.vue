<template>
  <div class="demo-spin-types">
    <div class="type-item">
      <c-spin type="circle" />
      <span class="type-name">circle</span>
    </div>
    <div class="type-item">
      <c-spin type="wave" />
      <span class="type-name">wave</span>
    </div>
    <div class="type-item">
      <c-spin type="bounce" />
      <span class="type-name">bounce</span>
    </div>
    <div class="type-item">
      <c-spin type="cardio" />
      <span class="type-name">cardio</span>
    </div>
    <div class="type-item">
      <c-spin type="square" />
      <span class="type-name">square</span>
    </div>
    <div class="type-item">
      <c-spin type="jelly" />
      <span class="type-name">jelly</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.demo-spin-types {
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
}

.type-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.type-name {
  color: #666;
  font-size: 14px;
}
</style> 