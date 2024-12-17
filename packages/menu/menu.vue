<script setup lang="ts">
import { computed, provide, ref } from 'vue';

// 定义组件名称
defineOptions({
  name: "CMenu",
});

// Menu 组件的属性接口
interface MenuProps {
  // 菜单类型，可选 vertical horizontal inline
  mode?: 'vertical' | 'horizontal' | 'inline';
  // 主题颜色
  theme?: 'light' | 'dark';
  // 是否收起状态
  inlineCollapsed?: boolean;
  // 当前选中的菜单项 key 数组
  selectedKeys?: string[];
  // 当前展开的 SubMenu 菜单项 key 数组
  openKeys?: string[];
  // 是否允许选中
  selectable?: boolean;
  // 是否允许多选
  multiple?: boolean;
}

// Props 默认值
const props = withDefaults(defineProps<MenuProps>(), {
  mode: 'vertical',
  theme: 'light',
  inlineCollapsed: false,
  selectable: true,
  multiple: false
});

// 事件
const emit = defineEmits<{
  select: [key: string, item: any];
  openChange: [keys: string[]];
  click: [key: string, item: any];
}>();

// 内部状态
const selectedKeysRef = ref<string[]>(props.selectedKeys || []);
const openKeysRef = ref<string[]>(props.openKeys || []);

// 计算样式类名
const menuClasses = computed(() => [
  'cozy-menu',
  `cozy-menu-${props.mode}`,
  `cozy-menu-${props.theme}`,
  {
    'cozy-menu-inline-collapsed': props.inlineCollapsed && props.mode === 'inline'
  }
]);

// 提供给子组件的上下文
provide('menuContext', {
  mode: computed(() => props.mode),
  theme: computed(() => props.theme),
  inlineCollapsed: computed(() => props.inlineCollapsed),
  selectedKeys: selectedKeysRef,
  openKeys: openKeysRef,
  // 选择菜单项
  onSelect: (key: string, item: any) => {
    if (!props.selectable) return;

    if (props.multiple) {
      const index = selectedKeysRef.value.indexOf(key);
      if (index === -1) {
        selectedKeysRef.value.push(key);
      } else {
        selectedKeysRef.value.splice(index, 1);
      }
    } else {
      selectedKeysRef.value = [key];
    }

    emit('select', key, item);
  },
  // 展开/收起子菜单
  onOpenChange: (key: string) => {
    const index = openKeysRef.value.indexOf(key);
    if (index === -1) {
      openKeysRef.value.push(key);
    } else {
      openKeysRef.value.splice(index, 1);
    }
    emit('openChange', openKeysRef.value);
  }
});
</script>

<template>
  <ul :class="menuClasses">
    <slot></slot>
  </ul>
</template>
