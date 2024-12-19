<template>
  <div class="demo-avatar">
    <div class="avatar-list">
      <c-avatar icon="c-user-outlined" />
      <c-avatar>U</c-avatar>
      <c-avatar>USER</c-avatar>
      <c-avatar src="https://foruda.gitee.com/avatar/1713970336200040602/9810895_itxiaoming9_1713970336.png" />
      <c-avatar style="color: #f56a00; background-color: #fde3cf">U</c-avatar>
      <c-avatar style="background-color: #87d068" icon="c-user-outlined" />
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
