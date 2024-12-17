<template>
  <div class="demo-menu">
    <!-- 水平菜单 -->
    <c-menu mode="horizontal" :selectedKeys="['mail']">
      <c-menu-item itemKey="mail" icon="mail">导航一</c-menu-item>
      <c-menu-item itemKey="app" icon="appstore">导航二</c-menu-item>
      <c-sub-menu itemKey="sub1" title="导航三">
        <c-menu-item itemKey="3">选项1</c-menu-item>
        <c-menu-item itemKey="4">选项2</c-menu-item>
        <c-menu-item itemKey="5">选项3</c-menu-item>
      </c-sub-menu>
    </c-menu>

    <div style="width: 256px; margin-top: 20px;">
      <!-- 垂直菜单 -->
      <c-menu mode="vertical" :selectedKeys="['1']">
        <c-menu-item itemKey="1" icon="mail">导航一</c-menu-item>
        <c-menu-item itemKey="2" icon="calendar">导航二</c-menu-item>
        <c-sub-menu itemKey="sub1" title="导航三" icon="appstore">
          <c-menu-item itemKey="3">选项1</c-menu-item>
          <c-menu-item itemKey="4">选项2</c-menu-item>
          <c-menu-item itemKey="5">选项3</c-menu-item>
        </c-sub-menu>
      </c-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.demo-menu {
  border: 1px solid #f0f0f0;
  padding: 24px;
}
</style>
