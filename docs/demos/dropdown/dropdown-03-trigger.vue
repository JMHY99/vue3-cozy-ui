<template>
  <div class="dropdown-demo">
    <c-dropdown>
      <c-button>
        hover 触发
        <c-icon name="down" />
      </c-button>
      <template #overlay>
        <c-menu>
          <c-menu-item key="1">菜单项一</c-menu-item>
          <c-menu-item key="2">菜单项二</c-menu-item>
          <c-menu-item key="3">菜单项三</c-menu-item>
        </c-menu>
      </template>
    </c-dropdown>

    <c-dropdown trigger="click">
      <c-button>
        click 触发
        <c-icon name="down" />
      </c-button>
      <template #overlay>
        <c-menu>
          <c-menu-item key="1">菜单项一</c-menu-item>
          <c-menu-item key="2">菜单项二</c-menu-item>
          <c-menu-item key="3">菜单项三</c-menu-item>
        </c-menu>
      </template>
    </c-dropdown>
  </div>
</template>

<script lang="ts" setup>
// 触发方式示例
</script>

<style scoped>
.dropdown-demo {
  display: flex;
  gap: 16px;
}
</style>
