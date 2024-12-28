<template>
  <div class="dropdown-demo">
    <c-dropdown disabled>
      <c-button>
        禁用状态
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

    <c-dropdown>
      <c-button>
        部分禁用
        <c-icon name="down" />
      </c-button>
      <template #overlay>
        <c-menu>
          <c-menu-item itemKey="1">菜单项一</c-menu-item>
          <c-menu-item itemKey="2" disabled>菜单项二（禁用）</c-menu-item>
          <c-menu-item itemKey="3">菜单项三</c-menu-item>
        </c-menu>
      </template>
    </c-dropdown>
  </div>
</template>

<script lang="ts" setup>
// 禁用状态示例
</script>

<style scoped>
.dropdown-demo {
  display: flex;
  gap: 16px;
}
</style>
