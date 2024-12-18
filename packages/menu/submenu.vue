<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue';

// 定义组件名称
defineOptions({
  name: "CSubMenu",
});

// SubMenu 组件的属性接口
interface SubMenuProps {
  // 唯一标志
  itemKey?: string;
  // 是否禁用
  disabled?: boolean;
  // 菜单图标
  icon?: string;
  // 子菜单标题
  title?: string;
  // 是否展开，可由父组件控制
  open?: boolean;
}

// Props 默认值
const props = withDefaults(defineProps<SubMenuProps>(), {
  disabled: false,
  open: false
});

// 注入父级 Menu 组件的上下文
const menuContext = inject('menuContext') as any;

// 是否展开的状态
const isOpen = ref(props.open);

// 计算样式类名
const subMenuClasses = computed(() => [
  'cozy-submenu',
  {
    'cozy-submenu-open': isOpen.value,
    'cozy-submenu-disabled': props.disabled,
    'cozy-submenu-inline': menuContext.mode.value === 'inline',
    'cozy-submenu-selected': menuContext.selectedKeys.value.some((key: string) =>
      getAllKeys(props.itemKey as string).includes(key)
    )
  }
]);

// 获取所有子菜单项的 key
const getAllKeys = (key: string): string[] => {
  const keys: string[] = [key];
  const node = document.querySelector(`[data-menu-id="${key}"]`);
  if (node) {
    const items = node.querySelectorAll('.cozy-menu-item');
    items.forEach((item) => {
      const itemKey = item.getAttribute('data-menu-id');
      if (itemKey) {
        keys.push(itemKey);
      }
    });
  }
  return keys;
};

// 点击标题处理
const handleTitleClick = () => {
  if (props.disabled) return;

  if (menuContext.mode.value === 'inline') {
    isOpen.value = !isOpen.value;
    menuContext.onOpenChange(props.itemKey);
  }
};

// 鼠标移入处理（用于水平和垂直模式）
const handleMouseEnter = () => {
  if (props.disabled || menuContext.mode.value === 'inline') return;
  isOpen.value = true;
};

// 鼠标移出处理（用于水平和垂直模式）
const handleMouseLeave = () => {
  if (props.disabled || menuContext.mode.value === 'inline') return;
  isOpen.value = false;
};
</script>

<template>
  <li
    :class="subMenuClasses"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    :data-menu-id="itemKey"
  >
    <div
      class="cozy-submenu-title"
      :style="inlineStyle"
      @click="handleTitleClick"
    >
      <span v-if="icon" class="cozy-submenu-title-icon">
        <i :class="`cozy-icon ${icon}`"></i>
      </span>
      <span class="cozy-submenu-title-content">
        {{ title }}
      </span>
      <i
        v-if="menuContext.mode !== 'horizontal'"
        class="cozy-submenu-arrow"
        :class="menuContext.expandIcon || 'cozy-icon c-down-outlined'"
      ></i>
    </div>
    <!-- 内联模式使用普通过渡 -->
    <transition
      v-if="menuContext.mode === 'inline'"
      name="cozy-submenu-inline"
    >
      <ul
        v-show="isOpen"
        class="cozy-submenu-content"
      >
        <slot></slot>
      </ul>
    </transition>
    <!-- 水平/垂直模式使用弹出层 -->
    <transition
      v-else
      name="cozy-zoom-in-top"
    >
      <div
        v-show="isOpen"
        class="cozy-submenu-popup"
      >
        <ul class="cozy-submenu-content">
          <slot></slot>
        </ul>
      </div>
    </transition>
  </li>
</template>
