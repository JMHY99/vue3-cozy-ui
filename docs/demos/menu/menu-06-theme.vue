<template>
  <div class="demo-menu">
    <c-switch
      v-model="checked"
      @change="changeTheme"
      checked-children="Dark"
      un-checked-children="Light"
      style="margin-bottom: 16px"
    />
    <div style="width: 256px">
      <c-menu
        mode="inline"
        :theme="theme"
        :selectedKeys="['1']"
        :openKeys="['sub1']"
        style="width: 256px"
      >
        <c-sub-menu itemKey="sub1" title="菜单一" icon="c-folder">
          <c-menu-item itemKey="1">页面1</c-menu-item>
          <c-menu-item itemKey="2">页面2</c-menu-item>
          <c-menu-item itemKey="3">页面3</c-menu-item>
          <c-menu-item itemKey="4">页面4</c-menu-item>
        </c-sub-menu>
        <c-sub-menu itemKey="sub2" title="菜单二" icon="c-folder">
          <c-menu-item itemKey="5">页面5</c-menu-item>
          <c-menu-item itemKey="6">页面6</c-menu-item>
          <c-sub-menu itemKey="sub3" title="多级菜单">
            <c-menu-item itemKey="7">页面7</c-menu-item>
            <c-menu-item itemKey="8">页面8</c-menu-item>
          </c-sub-menu>
        </c-sub-menu>
        <c-sub-menu itemKey="sub4" title="菜单三" icon="c-folder">
          <c-menu-item itemKey="9">页面9</c-menu-item>
          <c-menu-item itemKey="10">页面10</c-menu-item>
          <c-menu-item itemKey="11">页面11</c-menu-item>
          <c-menu-item itemKey="12">页面12</c-menu-item>
        </c-sub-menu>
      </c-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const theme = ref<'light' | 'dark'>('light')
const checked = ref(false)

const changeTheme = (checked: boolean) => {
  theme.value = checked ? 'dark' : 'light'
}
</script>

<style lang="scss" scoped>
.demo-menu {
  border: 1px solid #f0f0f0;
  padding: 24px;
}
</style>
