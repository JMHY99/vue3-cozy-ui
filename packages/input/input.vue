<template>
  <div class="cozy-input" :class="inputClass">
    <!-- 前缀图标 -->
    <span v-if="prefixIcon && !isTextarea" class="cozy-input-prefix">
      <i :class="`cozy-icon ${prefixIcon}`"></i>
    </span>

    <!-- 文本域 -->
    <textarea
      v-if="type === 'textarea'"
      ref="textareaRef"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :rows="rows"
      :maxlength="maxlength"
      :autofocus="autofocus"
      :resize="resize"
      class="cozy-input-textarea"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    ></textarea>

    <!-- 输入框 -->
    <input
      v-else
      ref="inputRef"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :autofocus="autofocus"
      class="cozy-input-inner"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    />

    <!-- 后缀图标 -->
    <span
      v-if="(suffixIcon || clearable) && !isTextarea"
      class="cozy-input-suffix"
    >
      <i
        v-if="clearable && modelValue"
        class="cozy-icon c-close-circle-outlined cozy-input-clear"
        @click="handleClear"
      ></i>
      <i v-else-if="suffixIcon" :class="`cozy-icon ${suffixIcon}`"></i>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

// 定义组件名称
defineOptions({
  name: "CInput",
});

// 定义组件属性
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "请输入",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  prefixIcon: {
    type: String,
    default: "",
  },
  suffixIcon: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "default",
  },
  // 文本域特有属性
  rows: {
    type: Number,
    default: 3,
  },
  maxlength: {
    type: Number,
    default: undefined,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  resize: {
    type: String,
    values: ["none", "both", "horizontal", "vertical"],
    default: "vertical",
  },
});

// 定义事件
const emit = defineEmits([
  "update:modelValue",
  "input",
  "change",
  "focus",
  "blur",
  "clear",
]);

// input ref
const inputRef = ref<HTMLInputElement>();

// 新增计算属性
const isTextarea = computed(() => props.type === "textarea");

// 新增 textarea ref
const textareaRef = ref<HTMLTextAreaElement>();

// 计算 class
const inputClass = computed(() => ({
  "cozy-input-disabled": props.disabled,
  [`cozy-input-${props.size}`]: props.size,
  "cozy-input-with-prefix": props.prefixIcon,
  "cozy-input-with-suffix": props.suffixIcon || props.clearable,
}));

// 处理输入
const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit("update:modelValue", value);
  emit("input", event);
};

// 处理聚焦
const handleFocus = (event: FocusEvent) => {
  emit("focus", event);
};

// 处理失焦
const handleBlur = (event: FocusEvent) => {
  emit("blur", event);
};

// 处理变化
const handleChange = (event: Event) => {
  emit("change", event);
};

// 处理清空
const handleClear = () => {
  emit("update:modelValue", "");
  emit("clear");
};

// 暴露方法
defineExpose({
  focus: () => {
    if (isTextarea.value) {
      textareaRef.value?.focus();
    } else {
      inputRef.value?.focus();
    }
  },
  blur: () => {
    if (isTextarea.value) {
      textareaRef.value?.blur();
    } else {
      inputRef.value?.blur();
    }
  },
  select: () => {
    if (isTextarea.value) {
      textareaRef.value?.select();
    } else {
      inputRef.value?.select();
    }
  },
});
</script>
