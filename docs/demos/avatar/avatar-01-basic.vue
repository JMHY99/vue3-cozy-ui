<template>
  <div class="demo-avatar">
    <div class="avatar-list">
      <c-avatar :size="64">64</c-avatar>
      <c-avatar size="large">L</c-avatar>
      <c-avatar>D</c-avatar>
      <c-avatar size="small">S</c-avatar>
    </div>
    <div class="avatar-list">
      <c-avatar shape="square" :size="64">64</c-avatar>
      <c-avatar shape="square" size="large">L</c-avatar>
      <c-avatar shape="square">D</c-avatar>
      <c-avatar shape="square" size="small">S</c-avatar>
    </div>
  </div>
</template>

<style scoped>
.demo-avatar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.avatar-list {
  display: flex;
  gap: 16px;
  align-items: center;
}
</style>
