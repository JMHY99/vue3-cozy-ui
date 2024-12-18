<script setup lang="ts">
import { computed, inject } from 'vue';

// 定义组件名称
defineOptions({
  name: "CMenuItem",
});

// MenuItem 组件的属性接口
interface MenuItemProps {
  // 唯一标志
  itemKey?: string;
  // 是否禁用
  disabled?: boolean;
  // 菜单图标
  icon?: string;
  // 设置收缩时展示的悬浮标题
  title?: string;
  // 是否显示加载状态
  loading?: boolean;
}

// Props 默认值
const props = withDefaults(defineProps<MenuItemProps>(), {
  disabled: false,
  loading: false
});

// 注入父级 Menu 组件的上下文
const menuContext = inject('menuContext') as any;

// 计算样式类名
const itemClasses = computed(() => [
  'cozy-menu-item',
  {
    'cozy-menu-item-selected': menuContext.selectedKeys.value.includes(props.itemKey),
    'cozy-menu-item-disabled': props.disabled
  }
]);

// 计算内联样式
const inlineStyle = computed(() => {
  // 如果需要添加其他内联样式，可以在这里扩展
  return {};
});

// 点击处理
const handleClick = () => {
  if (props.disabled) return;
  menuContext.onSelect(props.itemKey, {
    itemKey: props.itemKey,
    disabled: props.disabled,
    title: props.title
  });
};
</script>

<template>
  <li
    :class="itemClasses"
    :style="inlineStyle"
    @click="handleClick"
    :title="menuContext.inlineCollapsed && title"
    :data-menu-id="itemKey"
    role="menuitem"
  >
    <span v-if="loading" class="cozy-menu-item-loading-icon">
      <i class="cozy-icon c-loading-outlined"></i>
    </span>
    <span v-else-if="icon" class="cozy-menu-item-icon">
      <i :class="`cozy-icon ${icon}`"></i>
    </span>
    <span class="cozy-menu-item-title">
      <slot></slot>
    </span>
  </li>
</template>
