<template>
  <div class="demo-menu">
    <div style="width: 256px">
      <c-menu
        mode="inline"
        :openKeys="openKeys"
        :selectedKeys="selectedKeys"
        @openChange="onOpenChange"
        @select="onSelect"
        style="width: 256px"
      >
        <c-sub-menu itemKey="sub1" title="Navigation One" icon="mail">
          <c-menu-item itemKey="1">Option 1</c-menu-item>
          <c-menu-item itemKey="2">Option 2</c-menu-item>
          <c-menu-item itemKey="3">Option 3</c-menu-item>
          <c-menu-item itemKey="4">Option 4</c-menu-item>
        </c-sub-menu>
        <c-sub-menu itemKey="sub2" title="Navigation Two" icon="appstore">
          <c-menu-item itemKey="5">Option 5</c-menu-item>
          <c-menu-item itemKey="6">Option 6</c-menu-item>
          <c-sub-menu itemKey="sub3" title="Submenu">
            <c-menu-item itemKey="7">Option 7</c-menu-item>
            <c-menu-item itemKey="8">Option 8</c-menu-item>
          </c-sub-menu>
        </c-sub-menu>
        <c-sub-menu itemKey="sub4" title="Navigation Three" icon="setting">
          <c-menu-item itemKey="9">Option 9</c-menu-item>
          <c-menu-item itemKey="10">Option 10</c-menu-item>
          <c-menu-item itemKey="11">Option 11</c-menu-item>
          <c-menu-item itemKey="12">Option 12</c-menu-item>
        </c-sub-menu>
      </c-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const openKeys = ref<string[]>(['sub1'])
const selectedKeys = ref<string[]>(['1'])

const onOpenChange = (keys: string[]) => {
  const latestOpenKey = keys.find(key => openKeys.value.indexOf(key) === -1)
  openKeys.value = latestOpenKey ? [latestOpenKey] : []
}

const onSelect = (key: string) => {
  selectedKeys.value = [key]
}
</script>

<style lang="scss" scoped>
.demo-menu {
  border: 1px solid #f0f0f0;
  padding: 24px;
}
</style>
