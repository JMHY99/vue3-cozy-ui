<template>
  <div class="dropdown-demo">
    <c-dropdown>
      <c-button type="primary">
        下拉菜单
        <c-icon name="down" />
      </c-button>
      <template #overlay>
        <c-menu>
          <c-menu-item itemKey="1">菜单项一</c-menu-item>
          <c-menu-item itemKey="2">菜单项二</c-menu-item>
          <c-menu-item itemKey="3">菜单项三</c-menu-item>
        </c-menu>
      </template>
    </c-dropdown>
  </div>
</template>

<script lang="ts" setup>
// 基本使用示例
</script>

<style scoped>
.dropdown-demo {
  display: flex;
  gap: 16px;
}
</style>
