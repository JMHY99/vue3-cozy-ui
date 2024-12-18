<template>
  <div class="demo-menu">
    <c-menu mode="horizontal" :selectedKeys="['mail']">
      <c-menu-item itemKey="mail" icon="c-mail-outlined">导航一</c-menu-item>
      <c-menu-item itemKey="mail1" icon="c-mail-outlined">导航一</c-menu-item>
      <c-menu-item itemKey="mail2" icon="c-mail-outlined">导航一</c-menu-item>
      <c-menu-item itemKey="app" disabled icon="c-scene-outlined">
        导航二
      </c-menu-item>
      <c-sub-menu itemKey="sub1" title="导航三" icon="c-model-outlined">
        <c-menu-item-group title="分组1">
          <c-menu-item itemKey="setting:1">菜单1</c-menu-item>
          <c-menu-item itemKey="setting:2">菜单2</c-menu-item>
        </c-menu-item-group>
        <c-menu-item-group title="分组2">
          <c-menu-item itemKey="setting:3">菜单3</c-menu-item>
          <c-menu-item itemKey="setting:4">菜单4</c-menu-item>
        </c-menu-item-group>
      </c-sub-menu>
      <c-menu-item itemKey="alipay" icon="c-fenxiang">
        <a
          href="https://github.com/JMHY99/vue3-cozy-ui"
          target="_blank"
          rel="noopener noreferrer"
        >
          导航四
        </a>
      </c-menu-item>
      <c-menu-item itemKey="mail5" icon="c-mail-outlined">导航五</c-menu-item>
    </c-menu>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.demo-menu {
  border: 1px solid #f0f0f0;
  padding: 24px;
}
</style>
