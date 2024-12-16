<template>
  <label
    class="cozy-checkbox"
    :class="{
      'cozy-checkbox-checked': isChecked,
      'cozy-checkbox-disabled': disabled,
      'cozy-checkbox-indeterminate': indeterminate,
    }"
  >
    <span class="cozy-checkbox-input">
      <input
        type="checkbox"
        :checked="isChecked"
        :disabled="disabled"
        :value="label"
        @change="handleChange"
      />
      <span class="cozy-checkbox-inner"></span>
    </span>
    <span class="cozy-checkbox-label" v-if="$slots.default || label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script lang="ts" setup>
import { computed, inject } from "vue";

// 定义组件名称
defineOptions({
  name: "CCheckbox",
});

interface CheckboxGroupContext {
  modelValue: {
    value: (string | number | boolean)[];
  };
  disabled: {
    value: boolean;
  };
  changeEvent: (value: string | number | boolean) => void;
}

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: [String, Number, Boolean],
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  indeterminate: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "change"]);

// 注入checkbox group的上下文
const checkboxGroup = inject<CheckboxGroupContext | null>(
  "checkboxGroup",
  null
);

// 计算是否选中
const isChecked = computed(() => {
  if (checkboxGroup) {
    return checkboxGroup.modelValue.value.includes(props.label);
  }
  return props.modelValue;
});

// 处理变更事件
const handleChange = (event: Event) => {
  if (props.disabled) return;

  const target = event.target as HTMLInputElement;
  const value = target.checked;

  if (checkboxGroup) {
    checkboxGroup.changeEvent(props.label);
  } else {
    emit("update:modelValue", value);
    emit("change", value);
  }
};
</script>
