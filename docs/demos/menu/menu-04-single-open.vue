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
        <c-sub-menu itemKey="sub1" title="Navigation One" icon="c-folder">
          <c-menu-item itemKey="1">Option 1</c-menu-item>
          <c-menu-item itemKey="2">Option 2</c-menu-item>
          <c-menu-item itemKey="3">Option 3</c-menu-item>
          <c-menu-item itemKey="4">Option 4</c-menu-item>
        </c-sub-menu>
        <c-sub-menu itemKey="sub2" title="Navigation Two" icon="c-folder">
          <c-menu-item itemKey="5">Option 5</c-menu-item>
          <c-menu-item itemKey="6">Option 6</c-menu-item>
          <c-sub-menu itemKey="sub3" title="Submenu">
            <c-menu-item itemKey="7">Option 7</c-menu-item>
            <c-menu-item itemKey="8">Option 8</c-menu-item>
          </c-sub-menu>
        </c-sub-menu>
        <c-sub-menu itemKey="sub4" title="Navigation Three" icon="c-folder">
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

// 当前展开的子菜单 key 数组
const openKeys = ref<string[]>(['sub1'])
// 当前选中的菜单项 key 数组
const selectedKeys = ref<string[]>(['1'])

// 处理子菜单展开/收起
const onOpenChange = (keys: string[]) => {
  // 找到最新被点击的菜单项（即最后一个不在当前 openKeys 中的 key）
  const latestOpenKey = keys.find(key => !openKeys.value.includes(key))

  if (latestOpenKey) {
    // 如果有新展开的菜单项，只展开这一项
    openKeys.value = [latestOpenKey]
  } else {
    // 如果没有新展开的菜单项（说明是收起操作）
    // 找到被收起的项
    const closedKey = openKeys.value.find(key => !keys.includes(key))
    // 如果找到了被收起的项，则清空 openKeys
    if (closedKey) {
      openKeys.value = []
    }
  }
}

// 处理菜单项选择
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
