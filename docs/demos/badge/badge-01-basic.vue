<template>
  <div class="demo-badge">
    <c-badge :count="5">
      <div class="demo-badge-box"></div>
    </c-badge>
    <c-badge :count="0" show-zero>
      <div class="demo-badge-box"></div>
    </c-badge>
    <c-badge>
      <div class="demo-badge-box"></div>
      <template #count>
        <span class="custom-count">Hot</span>
      </template>
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

.custom-count {
  background: #52c41a;
  border-radius: 10px;
  box-shadow: 0 0 0 1px #fff;
  color: #fff;
  font-size: 12px;
  height: 20px;
  line-height: 20px;
  min-width: 20px;
  padding: 0 6px;
  text-align: center;
  white-space: nowrap;
}
</style>
