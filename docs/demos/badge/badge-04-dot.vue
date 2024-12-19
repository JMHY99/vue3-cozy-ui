<template>
  <div class="demo-badge">
    <c-badge dot>
      <div class="demo-badge-box"></div>
    </c-badge>
    <c-badge dot>
      <span class="demo-link">Link Something</span>
    </c-badge>
    <c-badge dot>
      <i class="demo-icon"></i>
    </c-badge>
  </div>
</template>

<style scoped>
.demo-badge {
  display: flex;
  gap: 24px;
  align-items: center;
}

.demo-badge-box {
  width: 42px;
  height: 42px;
  border-radius: 4px;
  background: #eee;
}

.demo-link {
  color: #1677ff;
  cursor: pointer;
}

.demo-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  background: #999;
  border-radius: 4px;
}
</style>
