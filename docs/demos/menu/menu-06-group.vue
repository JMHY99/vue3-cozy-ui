<template>
  <div class="demo-menu">
    <div style="width: 256px">
      <c-menu
        mode="inline"
        :selectedKeys="['1']"
        style="width: 256px"
      >
        <c-menu-item-group title="Group Title">
          <c-menu-item itemKey="1">Option 1</c-menu-item>
          <c-menu-item itemKey="2">Option 2</c-menu-item>
        </c-menu-item-group>
        <c-menu-item-group title="Group 2">
          <c-menu-item itemKey="3">Option 3</c-menu-item>
          <c-menu-item itemKey="4">Option 4</c-menu-item>
        </c-menu-item-group>
        <c-sub-menu itemKey="sub1" title="Navigation One">
          <c-menu-item-group title="Item 1">
            <c-menu-item itemKey="5">Option 5</c-menu-item>
            <c-menu-item itemKey="6">Option 6</c-menu-item>
          </c-menu-item-group>
          <c-menu-item-group title="Item 2">
            <c-menu-item itemKey="7">Option 7</c-menu-item>
            <c-menu-item itemKey="8">Option 8</c-menu-item>
          </c-menu-item-group>
        </c-sub-menu>
        <c-sub-menu itemKey="sub2" title="Navigation Two">
          <c-menu-item-group title="Item 3">
            <c-menu-item itemKey="9">Option 9</c-menu-item>
            <c-menu-item itemKey="10">Option 10</c-menu-item>
          </c-menu-item-group>
          <c-menu-item-group title="Item 4">
            <c-menu-item itemKey="11">Option 11</c-menu-item>
            <c-menu-item itemKey="12">Option 12</c-menu-item>
          </c-menu-item-group>
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
