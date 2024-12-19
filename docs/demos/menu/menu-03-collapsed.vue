<template>
  <div class="demo-menu">
    <c-button
      type="primary"
      style="margin-bottom: 16px"
      @click="toggleCollapsed"
    >
      {{ collapsed ? '展开' : '收起' }}
    </c-button>
    <div style="width: 256px">
      <c-menu
        mode="inline"
        :inline-collapsed="collapsed"
        :selectedKeys="['1']"
        style="width: 256px"
      >
        <c-menu-item itemKey="1" icon="c-folder">
          页面1
        </c-menu-item>
        <c-menu-item itemKey="2" icon="c-folder">
          页面2
        </c-menu-item>
        <c-menu-item itemKey="3" icon="c-folder">
          页面3
        </c-menu-item>
        <c-sub-menu itemKey="sub1" title="菜单一" icon="c-folder">
          <c-menu-item itemKey="5">页面5</c-menu-item>
          <c-menu-item itemKey="6">页面6</c-menu-item>
          <c-menu-item itemKey="7">页面7</c-menu-item>
          <c-menu-item itemKey="8">页面8</c-menu-item>
        </c-sub-menu>
        <c-sub-menu itemKey="sub2" title="菜单二" icon="c-folder">
          <c-menu-item itemKey="9">页面9</c-menu-item>
          <c-menu-item itemKey="10">页面10</c-menu-item>
          <c-sub-menu itemKey="sub3" title="多级菜单">
            <c-menu-item itemKey="11">页面11</c-menu-item>
            <c-menu-item itemKey="12">页面12</c-menu-item>
          </c-sub-menu>
        </c-sub-menu>
      </c-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const collapsed = ref(false)

const toggleCollapsed = () => {
  collapsed.value = !collapsed.value
}
</script>

<style lang="scss" scoped>
.demo-menu {
  border: 1px solid #f0f0f0;
  padding: 24px;
}
</style>
