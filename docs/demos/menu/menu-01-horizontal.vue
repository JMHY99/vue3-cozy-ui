<template>
  <div class="demo-menu">
    <c-menu mode="horizontal" :selectedKeys="['mail']">
      <c-menu-item itemKey="mail" icon="c-mail-outlined">Navigation One</c-menu-item>
      <c-menu-item itemKey="app" disabled>Navigation Two</c-menu-item>
      <c-sub-menu itemKey="sub1" title="Navigation Three - Submenu">
        <c-menu-item-group title="Item 1">
          <c-menu-item itemKey="setting:1">Option 1</c-menu-item>
          <c-menu-item itemKey="setting:2">Option 2</c-menu-item>
        </c-menu-item-group>
        <c-menu-item-group title="Item 2">
          <c-menu-item itemKey="setting:3">Option 3</c-menu-item>
          <c-menu-item itemKey="setting:4">Option 4</c-menu-item>
        </c-menu-item-group>
      </c-sub-menu>
      <c-menu-item itemKey="alipay">
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      </c-menu-item>
    </c-menu>
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
