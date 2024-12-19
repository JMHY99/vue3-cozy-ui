<template>
  <div class="demo-avatar">
    <div class="avatar-list">
      <c-badge count="1">
        <c-avatar shape="square" icon="c-user-outlined" />
      </c-badge>
      <c-badge dot>
        <c-avatar shape="square" icon="c-user-outlined" />
      </c-badge>
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
