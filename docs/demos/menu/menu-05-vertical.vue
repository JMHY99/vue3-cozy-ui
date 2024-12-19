<template>
  <div class="demo-menu">
    <div style="width: 256px">
      <c-menu
        mode="vertical"
        :selectedKeys="['1']"
        :openKeys="['sub1']"
      >
        <c-menu-item itemKey="1" icon="c-folder">
          <span>页面1</span>
        </c-menu-item>
        <c-menu-item itemKey="2" icon="c-folder">
          <span>页面2</span>
        </c-menu-item>
        <c-sub-menu itemKey="sub1" title="菜单一" icon="c-folder">
          <c-menu-item itemKey="3">页面3</c-menu-item>
          <c-menu-item itemKey="4">页面4</c-menu-item>
          <c-menu-item itemKey="5">页面5</c-menu-item>
          <c-menu-item itemKey="6">页面6</c-menu-item>
        </c-sub-menu>
        <c-sub-menu itemKey="sub2" title="菜单二" icon="c-folder">
          <c-menu-item itemKey="7">页面7</c-menu-item>
          <c-menu-item itemKey="8">页面8</c-menu-item>
          <c-menu-item itemKey="9">页面9</c-menu-item>
          <c-menu-item itemKey="10">页面10</c-menu-item>
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
