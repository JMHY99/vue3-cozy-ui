<template>
  <div class="demo-badge">
    <c-badge :count="25" standalone />
    <c-badge :count="4" standalone color="#52c41a" />
    <c-badge :count="109" standalone />
  </div>
</template>

<style scoped>
.demo-badge {
  display: flex;
  gap: 24px;
}
</style>
