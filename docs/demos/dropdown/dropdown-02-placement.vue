<template>
  <div class="dropdown-demo">
    <c-dropdown placement="bottomLeft">
      <c-button>bottomLeft</c-button>
      <template #overlay>
        <c-menu>
          <c-menu-item key="1">菜单项一</c-menu-item>
          <c-menu-item key="2">菜单项二</c-menu-item>
          <c-menu-item key="3">菜单项三</c-menu-item>
        </c-menu>
      </template>
    </c-dropdown>

    <c-dropdown placement="bottomCenter">
      <c-button>bottomCenter</c-button>
      <template #overlay>
        <c-menu>
          <c-menu-item key="1">菜单项一</c-menu-item>
          <c-menu-item key="2">菜单项二</c-menu-item>
          <c-menu-item key="3">菜单项三</c-menu-item>
        </c-menu>
      </template>
    </c-dropdown>

    <c-dropdown placement="bottomRight">
      <c-button>bottomRight</c-button>
      <template #overlay>
        <c-menu>
          <c-menu-item key="1">菜单项一</c-menu-item>
          <c-menu-item key="2">菜单项二</c-menu-item>
          <c-menu-item key="3">菜单项三</c-menu-item>
        </c-menu>
      </template>
    </c-dropdown>

    <br />

    <c-dropdown placement="topLeft">
      <c-button>topLeft</c-button>
      <template #overlay>
        <c-menu>
          <c-menu-item key="1">菜单项一</c-menu-item>
          <c-menu-item key="2">菜单项二</c-menu-item>
          <c-menu-item key="3">菜单项三</c-menu-item>
        </c-menu>
      </template>
    </c-dropdown>

    <c-dropdown placement="topCenter">
      <c-button>topCenter</c-button>
      <template #overlay>
        <c-menu>
          <c-menu-item key="1">菜单项一</c-menu-item>
          <c-menu-item key="2">菜单项二</c-menu-item>
          <c-menu-item key="3">菜单项三</c-menu-item>
        </c-menu>
      </template>
    </c-dropdown>

    <c-dropdown placement="topRight">
      <c-button>topRight</c-button>
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
// 弹出位置示例
</script>

<style scoped>
.dropdown-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.dropdown-demo br {
  width: 100%;
  margin: 8px 0;
}
</style>
