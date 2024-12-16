<template>
  <div
    class="cozy-form-item"
    :class="{
      'is-error': validateState === 'error',
      'is-success': validateState === 'success',
      'is-validating': validateState === 'validating',
      'is-required': isRequired || required,
      'is-top': form?.labelPosition === 'top'
    }"
  >
    <label
      v-if="label || $slots.label"
      :class="[
        'cozy-form-item-label',
        labelAlign,
        { 'is-left': form?.labelPosition === 'left' }
      ]"
      :style="labelStyle"
    >
      <slot name="label">{{ label }}</slot>
    </label>
    <div class="cozy-form-item-content">
      <slot></slot>
      <div
        v-if="validateState === 'error' && showMessage"
        class="cozy-form-item-error"
      >
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, onMounted, onBeforeUnmount, computed, watch, provide, reactive } from "vue";
import Schema from "async-validator";
import type { FormContext, FormItemContext, FormItemProps } from "./types";

defineOptions({
  name: "CFormItem",
});

const props = withDefaults(defineProps<FormItemProps>(), {
  label: "",
  prop: "",
  required: false,
  rules: () => [],
  showMessage: true,
  labelWidth: "",
});

const form = inject<FormContext>("form");
const validateState = ref("");
const validateMessage = ref("");
const isValidating = ref(false);

// 计算label样式
const labelStyle = computed(() => {
  if (form?.labelPosition === "top") return {};
  const labelWidth = props.labelWidth || form?.labelWidth;
  if (labelWidth) return { width: labelWidth };
  return {};
});

// 计算label对齐方式
const labelAlign = computed(() => {
  return form?.labelPosition === "top" ? "" : `is-${form?.labelPosition}`;
});

// 获取表单项的值
const fieldValue = computed(() => {
  const model = form?.model;
  if (!model || !props.prop) return;
  return getPropByPath(model, props.prop).v;
});

// 验证规则
const getRules = () => {
  const formRules = form?.rules;
  const selfRules = props.rules;

  const rules = formRules
    ? props.prop
      ? formRules[props.prop]
      : undefined
    : [];

  return [].concat(selfRules || rules || []);
};

// 是否必填
const isRequired = computed(() => {
  const rules = getRules();
  let required = false;

  if (rules && rules.length) {
    rules.every((rule) => {
      if (rule.required) {
        required = true;
        return false;
      }
      return true;
    });
  }
  return required;
});

// 验证表单项
const validate = async (trigger: string, callback?: Function) => {
  const rules = getRules();
  if (!rules || rules.length === 0) {
    callback?.(true);
    return true;
  }

  validateState.value = "validating";
  isValidating.value = true;

  const filteredRules = rules.filter((rule) => {
    if (!rule.trigger || !trigger) return true;
    if (Array.isArray(rule.trigger)) {
      return rule.trigger.includes(trigger);
    }
    return rule.trigger === trigger;
  });

  if (filteredRules.length === 0) {
    callback?.(true);
    return true;
  }

  const descriptor = {
    [props.prop]: filteredRules,
  };

  const validator = new Schema(descriptor);
  const model = { [props.prop]: fieldValue.value };

  try {
    await validator.validate(model);
    validateState.value = "success";
    validateMessage.value = "";
    callback?.(true);
    return true;
  } catch (errors) {
    validateState.value = "error";
    validateMessage.value = errors[0]?.message || "验证失败";
    callback?.(false, { [props.prop]: errors[0] });
    return false;
  } finally {
    isValidating.value = false;
  }
};

// 重置表单项
const resetField = () => {
  validateState.value = "";
  validateMessage.value = "";

  const model = form?.model;
  const value = fieldValue.value;
  if (!model || !props.prop) return;

  if (Array.isArray(value)) {
    model[props.prop] = [];
  } else {
    model[props.prop] = "";
  }
};

// 清除验证
const clearValidate = () => {
  validateState.value = "";
  validateMessage.value = "";
  isValidating.value = false;
};

// 注册和移除表单项
onMounted(() => {
  if (props.prop) {
    form?.addField({
      prop: props.prop,
      validate,
      resetField,
      clearValidate,
    });
  }
});

onBeforeUnmount(() => {
  form?.removeField({
    prop: props.prop,
    validate,
    resetField,
    clearValidate,
  });
});

// 工具函数
const getPropByPath = (obj: any, path: string) => {
  let tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, ".$1");
  path = path.replace(/^\./, "");

  const keyArr = path.split(".");
  let i = 0;

  for (let len = keyArr.length; i < len - 1; ++i) {
    const key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      throw new Error("please transfer a valid prop path to form item!");
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj[keyArr[i]],
  };
};

// 添加blur和change事件处理
const onFieldBlur = () => {
  validate('blur')
}

const onFieldChange = () => {
  validate('change')
}

// 监听值变化
watch(
  () => fieldValue.value,
  () => {
    if (validateState.value === 'error') {
      validate('change')
    }
  }
)

// 提供上下文
provide(
  `form-item-${props.prop}`,
  reactive({
    validate: onFieldBlur,
    clearValidate,
    validateState,
  })
)

defineExpose({
  validate,
  resetField,
  clearValidate,
  validateState,
});
</script>
