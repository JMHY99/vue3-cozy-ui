<template>
  <div class="demo-avatar">
    <div class="avatar-list">
      <c-avatar-group>
        <c-avatar src="https://foruda.gitee.com/avatar/1713970336200040602/9810895_itxiaoming9_1713970336.png" />
        <c-avatar style="background-color: #f56a00">K</c-avatar>
        <c-avatar style="background-color: #87d068" icon="c-user-outlined" />
        <c-avatar style="background-color: #1677ff">U</c-avatar>
      </c-avatar-group>
    </div>
    <div class="avatar-list">
      <c-avatar-group :max-count="2">
        <c-avatar src="https://foruda.gitee.com/avatar/1713970336200040602/9810895_itxiaoming9_1713970336.png" />
        <c-avatar style="background-color: #f56a00">K</c-avatar>
        <c-avatar style="background-color: #87d068" icon="c-user-outlined" />
        <c-avatar style="background-color: #1677ff">U</c-avatar>
      </c-avatar-group>
    </div>
    <div class="avatar-list">
      <c-avatar-group
        :max-count="3"
        max-popover-placement="bottom"
      >
        <c-avatar src="https://foruda.gitee.com/avatar/1713970336200040602/9810895_itxiaoming9_1713970336.png" />
        <c-avatar style="background-color: #f56a00">K</c-avatar>
        <c-avatar style="background-color: #87d068" icon="c-user-outlined" />
        <c-avatar style="background-color: #1677ff">U</c-avatar>
        <c-avatar style="background-color: #f56a00">K</c-avatar>
        <c-avatar style="background-color: #1677ff">U</c-avatar>
      </c-avatar-group>
    </div>
  </div>
</template>

<style scoped>
.demo-avatar {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.avatar-list {
  display: flex;
  gap: 24px;
  align-items: center;
}
</style>
