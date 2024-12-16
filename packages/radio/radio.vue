<template>
  <label
    class="cozy-radio"
    :class="{
      'cozy-radio-checked': isChecked,
      'cozy-radio-disabled': isDisabled,
    }"
  >
    <span class="cozy-radio-input">
      <input
        type="radio"
        :value="label"
        :name="name"
        :disabled="isDisabled"
        :checked="isChecked"
        class="cozy-radio-original"
        @change="handleChange"
      />
      <span class="cozy-radio-inner"></span>
    </span>
    <span class="cozy-radio-label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script lang="ts" setup>
import { computed, inject } from "vue";
import { radioGroupKey } from "./types";

// 定义组件名称
defineOptions({
  name: "CRadio",
});

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: "",
  },
  label: {
    type: [String, Number, Boolean],
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "change"]);

// 注入父组件提供的数据
const radioGroup = inject(radioGroupKey, null);

const isChecked = computed(() => {
  return radioGroup
    ? radioGroup.modelValue.value === props.label
    : props.modelValue === props.label;
});

const isDisabled = computed(() => {
  return radioGroup
    ? radioGroup.disabled.value || props.disabled
    : props.disabled;
});

const handleChange = (event: Event) => {
  if (isDisabled.value) return;
  const target = event.target as HTMLInputElement;
  const value = props.label;
  if (radioGroup) {
    radioGroup.modelValue.value = value;
  } else {
    emit("update:modelValue", value);
    emit("change", event);
  }
};
</script>
