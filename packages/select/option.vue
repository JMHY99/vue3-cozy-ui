<template>
  <div
    class="cozy-select-option"
    :class="{
      'cozy-select-option-disabled': disabled,
      'cozy-select-option-selected': isSelected,
      'cozy-select-option-active': isActive,
    }"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
  >
    <slot>{{ label }}</slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, onUnmounted } from "vue";
import type { ComputedRef } from "vue";

// 定义 Select 上下文接口
interface SelectContext {
  value: ComputedRef<
    string | number | boolean | (string | number | boolean)[] | undefined
  >;
  multiple: ComputedRef<boolean>;
  selectedValues: ComputedRef<(string | number | boolean)[]>;
  activeValue: ComputedRef<string | number | boolean>;
  handleOptionClick: (value: string | number | boolean) => void;
  handleOptionMouseEnter: (value: string | number | boolean) => void;
  registerOption: (option: OptionType) => void;
  unregisterOption: (option: OptionType) => void;
}

// 定义选项类型接口
interface OptionType {
  value: string | number | boolean;
  label: string;
  disabled: boolean;
  group?: string;
}

// 定义组件名称
defineOptions({
  name: "COption",
});

const props = withDefaults(
  defineProps<{
    value: string | number | boolean;
    label?: string;
    disabled?: boolean;
    group?: string;
  }>(),
  {
    disabled: false,
    label: "",
    group: undefined,
  }
);

const select = inject<SelectContext>("select", {
  value: computed(() => ""),
  multiple: computed(() => false),
  selectedValues: computed(() => []),
  activeValue: computed(() => ""),
  handleOptionClick: () => {},
  handleOptionMouseEnter: () => {},
  registerOption: () => {},
  unregisterOption: () => {},
});

const isSelected = computed(() => {
  if (select.multiple.value) {
    return select.selectedValues.value.includes(props.value);
  }
  return select.value.value === props.value;
});

const isActive = computed(() => {
  return select.activeValue.value === props.value;
});

const classes = computed(() => {
  return {
    "cozy-select-option": true,
    "cozy-select-option-selected": isSelected.value,
    "cozy-select-option-active": isActive.value,
    "cozy-select-option-disabled": props.disabled,
  };
});

const handleClick = () => {
  if (props.disabled) return;
  select.handleOptionClick(props.value);
};

const handleMouseEnter = () => {
  if (props.disabled) return;
  select.handleOptionMouseEnter(props.value);
};

onMounted(() => {
  select.registerOption({
    value: props.value,
    label: props.label || String(props.value),
    disabled: props.disabled,
    group: props.group,
  });
});

onUnmounted(() => {
  select.unregisterOption({
    value: props.value,
    label: props.label || String(props.value),
    disabled: props.disabled,
    group: props.group,
  });
});
</script>
