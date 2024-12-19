<template>
  <div :class="collapseClasses">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, provide, ref, watch } from 'vue';
import { collapseContextKey, type CollapseContext } from './types';

defineOptions({
  name: "CCollapse",
});

const props = withDefaults(defineProps<{
  modelValue?: string | number | Array<string | number>;
  accordion?: boolean;
  bordered?: boolean;
  expandIcon?: string;
  expandIconPosition?: 'start' | 'end';
  ghost?: boolean;
  size?: 'large' | 'default' | 'small';
}>(), {
  accordion: false,
  bordered: true,
  expandIconPosition: 'start',
  ghost: false,
  size: 'default'
});

const emit = defineEmits(['update:modelValue', 'change']);

// 内部状态
const activeKeys = ref<Array<string | number>>(
  Array.isArray(props.modelValue) 
    ? props.modelValue 
    : props.modelValue != null
      ? [props.modelValue] 
      : []
);

// 计算样式类名
const collapseClasses = computed(() => [
  'cozy-collapse',
  {
    'cozy-collapse-borderless': !props.bordered,
    'cozy-collapse-ghost': props.ghost,
    [`cozy-collapse-${props.size}`]: props.size !== 'default',
    [`cozy-collapse-icon-position-${props.expandIconPosition}`]: true
  }
]);

// 切换面板展开状态
const togglePanel = (panelKey: string | number) => {
  let newActiveKeys: Array<string | number>;
  
  if (props.accordion) {
    newActiveKeys = activeKeys.value[0] === panelKey ? [] : [panelKey];
  } else {
    newActiveKeys = [...activeKeys.value];
    const index = newActiveKeys.indexOf(panelKey);
    if (index > -1) {
      newActiveKeys.splice(index, 1);
    } else {
      newActiveKeys.push(panelKey);
    }
  }
  
  activeKeys.value = newActiveKeys;
  emit('update:modelValue', props.accordion ? newActiveKeys[0] : newActiveKeys);
  emit('change', props.accordion ? newActiveKeys[0] : newActiveKeys);
};

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (val) => {
    activeKeys.value = Array.isArray(val) ? val : val != null ? [val] : [];
  },
  { immediate: true }
);

// 提供上下文给子组件
provide(collapseContextKey, {
  activeKeys,
  togglePanel,
  accordion: props.accordion,
  expandIcon: props.expandIcon,
  expandIconPosition: props.expandIconPosition,
  size: props.size
});
</script> 