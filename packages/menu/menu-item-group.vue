<script setup lang="ts">
import { computed } from 'vue';

// 定义组件名称
defineOptions({
  name: "CMenuItemGroup",
});

// MenuItemGroup 组件的属性接口
interface MenuItemGroupProps {
  // 分组标题
  title?: string;
}

// Props
const props = defineProps<MenuItemGroupProps>();

// 计算样式类名
const groupClasses = computed(() => [
  'cozy-menu-item-group'
]);
</script>

<template>
  <li :class="groupClasses">
    <div class="cozy-menu-item-group-title">{{ title }}</div>
    <ul class="cozy-menu-item-group-list">
      <slot></slot>
    </ul>
  </li>
</template>
