<template>
  <div class="demo-badge">
    <c-badge :count="99">
      <div class="demo-badge-box"></div>
    </c-badge>
    <c-badge :count="100">
      <div class="demo-badge-box"></div>
    </c-badge>
    <c-badge :count="1000" :overflow-count="999">
      <div class="demo-badge-box"></div>
    </c-badge>
  </div>
</template>

<style scoped>
.demo-badge {
  display: flex;
  gap: 24px;
}

.demo-badge-box {
  width: 42px;
  height: 42px;
  border-radius: 4px;
  background: #eee;
}
</style>
