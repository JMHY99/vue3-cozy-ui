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
        <c-menu-item itemKey="1" icon="pie-chart">
          Option 1
        </c-menu-item>
        <c-menu-item itemKey="2" icon="desktop">
          Option 2
        </c-menu-item>
        <c-menu-item itemKey="3" icon="inbox">
          Option 3
        </c-menu-item>
        <c-sub-menu itemKey="sub1" title="Navigation One" icon="mail">
          <c-menu-item itemKey="5">Option 5</c-menu-item>
          <c-menu-item itemKey="6">Option 6</c-menu-item>
          <c-menu-item itemKey="7">Option 7</c-menu-item>
          <c-menu-item itemKey="8">Option 8</c-menu-item>
        </c-sub-menu>
        <c-sub-menu itemKey="sub2" title="Navigation Two" icon="appstore">
          <c-menu-item itemKey="9">Option 9</c-menu-item>
          <c-menu-item itemKey="10">Option 10</c-menu-item>
          <c-sub-menu itemKey="sub3" title="Submenu">
            <c-menu-item itemKey="11">Option 11</c-menu-item>
            <c-menu-item itemKey="12">Option 12</c-menu-item>
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
