<script setup lang="ts">
import { computed, inject, ref, watch } from "vue";

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
  open: false,
});

// 注入父级 Menu 组件的上下文
const menuContext = inject("menuContext") as any;

// 是否展开的状态
const isOpen = ref(props.open);

// 计算样式类名
const subMenuClasses = computed(() => [
  "cozy-submenu",
  {
    "cozy-submenu-open": isOpen.value,
    "cozy-submenu-disabled": props.disabled,
    "cozy-submenu-inline": menuContext.mode.value === "inline",
    "cozy-submenu-vertical": menuContext.mode.value === "vertical",
    "cozy-submenu-selected": menuContext.selectedKeys.value.some(
      (key: string) => getAllKeys(props.itemKey as string).includes(key)
    ),
  },
]);

// 获取所有子菜单项的 key
const getAllKeys = (key: string): string[] => {
  const keys: string[] = [key];
  const node = document.querySelector(`[data-menu-id="${key}"]`);
  if (node) {
    const items = node.querySelectorAll(".cozy-menu-item");
    items.forEach((item) => {
      const itemKey = item.getAttribute("data-menu-id");
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

  // 只在内联模式下切换展开状态
  if (menuContext.mode.value === "inline") {
    isOpen.value = !isOpen.value;
    menuContext.onOpenChange(props.itemKey);
  }
};

// 鼠标移入处理（用于水平和垂直模式）
const handleMouseEnter = () => {
  if (props.disabled) return;
  // 水平和垂直模式下，鼠标移入时展开子菜单
  if (menuContext.mode.value !== "inline") {
    isOpen.value = true;
  }
};

// 鼠标移出处理（用于水平和垂直模式）
const handleMouseLeave = () => {
  if (props.disabled) return;
  // 水平和垂直模式下，鼠标移出时关闭子菜单
  if (menuContext.mode.value !== "inline") {
    isOpen.value = false;
  }
};

// 添加 inlineStyle 计算属性
const inlineStyle = computed(() => {
  const style: Record<string, string> = {};

  // 如果是内联模式且有缩进要求，可以在这里添加缩进样式
  if (menuContext.mode.value === "inline") {
    // 可以根据需要添加样式
    // style.paddingLeft = '24px';
  }

  return style;
});
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
        v-if="menuContext.mode.value !== 'horizontal'"
        class="cozy-submenu-arrow"
        :class="[
          'cozy-icon',
          menuContext.mode.value === 'vertical'
            ? 'c-right-outlined'
            : 'c-down-outlined',
        ]"
      ></i>
    </div>
    <!-- 内联模式使用普通过渡 -->
    <transition v-if="menuContext.mode.value === 'inline'" name="cozy-submenu-inline">
      <ul v-show="isOpen" class="cozy-submenu-content">
        <slot></slot>
      </ul>
    </transition>
    <!-- 水平/垂直模式使用弹���层 -->
    <transition
      v-else
      :name="
        menuContext.mode.value === 'vertical'
          ? 'cozy-zoom-in-right'
          : 'cozy-zoom-in-top'
      "
    >
      <div
        v-show="isOpen"
        class="cozy-submenu-popup"
        :class="{
          'cozy-submenu-popup-vertical': menuContext.mode.value === 'vertical',
        }"
      >
        <ul class="cozy-submenu-content">
          <slot></slot>
        </ul>
      </div>
    </transition>
  </li>
</template>
