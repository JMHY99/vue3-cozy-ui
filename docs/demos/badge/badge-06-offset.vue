<template>
  <div class="demo-badge">
    <c-badge :count="5" :offset="[10, 10]">
      <div class="demo-badge-box"></div>
    </c-badge>
    <c-badge :count="0" :offset="[-10, 0]" show-zero>
      <div class="demo-badge-box"></div>
    </c-badge>
    <c-badge :count="888" :offset="[15, 15]">
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
