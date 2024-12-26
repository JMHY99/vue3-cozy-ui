<template>
  <div
    ref="formItemRef"
    class="cozy-form-item"
    :class="{
      'is-error': validateState === 'error',
      'is-success': validateState === 'success',
      'is-validating': validateState === 'validating',
      'is-required': isRequired || required,
      'is-top': form?.labelPosition === 'top',
      [`cozy-form-item-${form?.size || props.size}`]: form?.size || props.size,
      'is-disabled': form?.disabled
    }"
  >
    <label
      v-if="label || $slots.label"
      :class="[
        'cozy-form-item-label',
        labelAlign,
      ]"
      :style="labelStyle"
    >
      <slot name="label">{{ props.label }}</slot>
      <span v-if="form?.labelSuffix || props.labelSuffix" class="cozy-form-item-label-suffix">
        {{ form?.labelSuffix || props.labelSuffix }}
      </span>
    </label>
    <div class="cozy-form-item-content">
      <div class="cozy-form-item-control">
        <slot></slot>
      </div>
      <slot
        v-if="validateState === 'error' && props.showMessage"
        name="error"
        :error="validateMessage"
      >
        <div
          v-if="validateState === 'error' && props.showMessage"
          class="cozy-form-item-error"
          :class="{ 'cozy-form-item-error-inline': form?.inlineMessage || props.inlineMessage }"
        >
          {{ validateMessage }}
        </div>
      </slot>
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
  size: "",
  inlineMessage: false,
  labelSuffix: ""
});

/**
 * 表单项组件
 * 负责单个表单字段的布局、校验和状态管理
 */

// 注入父级表单组件的上下文
const form = inject<FormContext>("form");

// 表单项的校验状态：'' | 'error' | 'success' | 'validating'
const validateState = ref("");
// 校验失败时的错误信息
const validateMessage = ref("");
// 是否正在进行校验
const isValidating = ref(false);
// 表单项的DOM引用
const formItemRef = ref<HTMLElement | null>(null);

/**
 * 计算标签样式
 * @returns 根据表单配置返回标签的样式对象
 * - 如果是顶部对齐，返回空对象
 * - 否则返回带有宽度的样式对象
 */
const labelStyle = computed(() => {
  if (form?.labelPosition === "top") return {};
  const labelWidth = props.labelWidth || form?.labelWidth;
  if (labelWidth) return { width: labelWidth };
  return {};
});

/**
 * 计算标签的对齐方式类名
 * @returns 返回对应的CSS类名
 * - top: 空字符串
 * - left/right: 对应的对齐方式类名
 */
const labelAlign = computed(() => {
  return form?.labelPosition === "top" ? "" : `cozy-form-item-label-${form?.labelPosition}`;
});

/**
 * 获取表单项的当前值
 * 通过路径访问嵌套对象的属性值
 */
const fieldValue = computed(() => {
  const model = form?.model;
  if (!model || !props.prop) return;
  return getPropByPath(model, props.prop).v;
});

/**
 * 工具函数：根据路径获取对象的属性值
 * @param obj 目标对象
 * @param path 属性路径，支持点号分隔的嵌套路径
 * @returns 包含目标属性的对象信息
 * - o: 目标属性所在的对象
 * - k: 属性键名
 * - v: 属性值
 */
const getPropByPath = (obj: any, path: string) => {
  let tempObj = obj;
  const keyArr = path.split('.');
  const length = keyArr.length;
  
  for (let i = 0; i < length - 1; i++) {
    if (!tempObj) break;
    tempObj = tempObj[keyArr[i]];
  }
  
  return {
    o: tempObj,
    k: keyArr[length - 1],
    v: tempObj ? tempObj[keyArr[length - 1]] : null
  };
};

/**
 * 获取表单项的校验规则
 * 合并表单级别和字段级别的校验规则
 * @returns 合并后的校验规则数组
 */
const getRules = () => {
  const formRules = form?.rules;
  const selfRules = props.rules;

  const rules = formRules
    ? props.prop
      ? formRules[props.prop]
      : undefined
    : [];

  return [...(selfRules || []), ...(rules || [])];
};

/**
 * 判断字段是否必填
 * 通过检查校验规则中是否包含 required: true 来确定
 */
const isRequired = computed(() => {
  const rules = getRules();
  let required = false;

  if (rules && rules.length) {
    rules.every((rule: any) => {
      if (rule.required) {
        required = true;
        return false;
      }
      return true;
    });
  }
  return required;
});

/**
 * 重置表单项
 * - 清除校验状态和错误信息
 * - 重置字段值为初始值
 */
const resetField = () => {
  validateState.value = '';
  validateMessage.value = '';
  
  const model = form?.model;
  if (!model || !props.prop) return;
  
  const { o, k } = getPropByPath(model, props.prop);
  if (o) {
    if (Array.isArray(o[k])) {
      o[k] = [];
    } else {
      o[k] = '';
    }
  }
};

/**
 * 清除表单项的校验状态
 * 用于手动清除校验结果
 */
const clearValidate = () => {
  validateState.value = '';
  validateMessage.value = '';
};

/**
 * 表单项校验方法
 * @param trigger 触发校验的事件类型（blur/change等）
 * @param callback 校验完成的回调函数
 * @returns Promise对象，resolve为校验成功，reject为校验失败
 */
const validate = async (trigger: string, callback?: Function) => {
  // 如果没有字段名或校验规则，直接返回校验成功
  if (!props.prop) {
    callback?.(true);
    return Promise.resolve(true);
  }

  const rules = getRules();
  // 根据触发方式过滤出需要执行的校验规则
  const filteredRules = rules.filter((rule: any) => {
    if (!rule.trigger || !trigger) return true;
    if (Array.isArray(rule.trigger)) {
      return rule.trigger.includes(trigger);
    }
    return rule.trigger === trigger;
  });

  // 如果没有匹配的规则，直接返回校验成功
  if (!filteredRules || filteredRules.length === 0) {
    callback?.(true);
    return Promise.resolve(true);
  }

  // 设置校验中状态
  validateState.value = 'validating';
  
  // 构建校验描述对象
  const descriptor = {
    [props.prop]: filteredRules
  };

  // 创建校验器实例
  const validator = new Schema(descriptor);
  const model = form?.model || {};

  // 执行校验
  return validator.validate({ [props.prop]: fieldValue.value })
    .then(() => {
      // 校验成功
      validateState.value = 'success';
      validateMessage.value = '';
      callback?.(true);
      return true;
    })
    .catch(({ errors }) => {
      // 校验失败
      validateState.value = 'error';
      validateMessage.value = errors?.[0]?.message || '验证失败';
      callback?.(false, errors);
      return Promise.reject(errors);
    });
};

/**
 * 处理字段失焦事件
 * 触发 blur 类型的校验
 */
const onFieldBlur = () => {
  validate('blur');
};

/**
 * 处理字段值变化事件
 * 当字段处于错误状态时，触发 change 类型的校验
 */
const onFieldChange = () => {
  if (validateState.value === 'error') {
    validate('change');
  }
};

/**
 * 监听字段值变化
 * 当值发生变化且字段处于错误状态时，触发重新校验
 */
watch(
  () => fieldValue.value,
  () => {
    if (validateState.value === 'error') {
      validate('change');
    }
  }
);

/**
 * 获取校验触发方式
 * 优先使用字段级配置，其次使用表单级配置，最后使用默认值
 */
const getValidateTriggers = computed(() => {
  if (props.validateTrigger === undefined && form?.validateTrigger === undefined) {
    return ['blur', 'change'];
  }
  const triggers = props.validateTrigger || form?.validateTrigger;
  return Array.isArray(triggers) ? triggers : [triggers];
});

/**
 * 根据触发方式执行校验
 * @param trigger 触发方式
 */
const onValidateTriggered = (trigger: string) => {
  if (!props.prop) return;
  const triggers = getValidateTriggers.value;
  if (triggers.includes(trigger)) {
    validate(trigger);
  }
};

// 组件挂载时注册到 Form
onMounted(() => {
  if (props.prop) {
    form?.addField({
      prop: props.prop,
      validate,
      resetField,
      clearValidate,
      formItemRef
    });
  }
});

// 组件卸载时从 Form 移除
onBeforeUnmount(() => {
  if (props.prop) {
    form?.removeField({
      prop: props.prop,
      validate,
      resetField,
      clearValidate,
      formItemRef
    });
  }
});

// 提供上下文
provide(
  `form-item-${props.prop}`,
  reactive({
    validate: onFieldBlur,
    clearValidate,
    validateState,
  })
);

defineExpose({
  validate,
  resetField,
  clearValidate,
  validateState,
  formItemRef,
});
</script>
