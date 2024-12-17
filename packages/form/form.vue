<template>
  <form
    class="cozy-form"
    :class="[
      {
        'cozy-form-inline': props.inline,
        [`cozy-form-${props.labelPosition}`]: true,
        [`cozy-form-${props.size}`]: props.size,
        'cozy-form-hide-required-asterisk': props.hideRequiredAsterisk,
        'is-disabled': props.disabled
      },
    ]"
    @submit.prevent
  >
    <slot></slot>
  </form>
</template>

<script lang="ts" setup>
import { provide, reactive, toRefs, nextTick } from "vue";
import type { Ref } from 'vue';
import type {
  FormProps,
  FormContext,
  FormValidateCallback,
  FormItemContext,
  FormValidateFailure
} from "./types";

/**
 * Form 表单组件
 * 用于数据采集、校验和提交
 * 支持多种布局方式和校验规则
 */

defineOptions({
  name: "CForm",
});

const props = withDefaults(defineProps<FormProps>(), {
  labelPosition: 'right',
  inline: false,
  showMessage: true,
  inlineMessage: false,
  statusIcon: false,
  validateOnRuleChange: true,
  size: 'default',
  disabled: false,
  hideRequiredAsterisk: false,
  scrollToError: false
});
const emit = defineEmits(["validate"]);

// 表单项数组，存储所有注册的表单项组件
const fields: FormItemContext[] = [];

/**
 * 注册表单项
 * 当表单项组件挂载时调用
 * @param field 表单项上下文对象
 */
const addField = (field: FormItemContext) => {
  fields.push(field);
};

/**
 * 移除表单项
 * 当表单项组件卸载时调用
 * @param field 表单项上下文对象
 */
const removeField = (field: FormItemContext) => {
  if (field.prop) {
    const index = fields.indexOf(field);
    if (index !== -1) {
      fields.splice(index, 1);
    }
  }
};

/**
 * 滚动到指定表单项
 * 用于校验失败时定位到错误字段
 * @param prop 表单项的字段名
 */
const scrollToField = async (prop: string) => {
  await nextTick()
  const field = fields.find((field) => field.prop === prop)
  if (!field?.formItemRef?.value) return
  
  field.formItemRef.value.scrollIntoView(props.scrollIntoViewOptions || { behavior: 'smooth' })
}

/**
 * 验证整个表单
 * @param callback 回调函数，接收验证结果
 * @returns Promise对象，resolve为验证成功，reject为验证失败
 */
const validate = async (callback?: FormValidateCallback) => {
  let valid = true
  let invalidFields: FormValidateFailure = {
    errors: [],
    fields: {}
  }

  const fieldsLength = fields.length
  if (fieldsLength === 0) {
    callback?.(true)
    return Promise.resolve(true)
  }

  let count = 0
  let errorsCount = 0

  // 并行验证所有字段
  const promises = fields.map((field) => {
    return new Promise<void>((resolve) => {
      field.validate('', (valid: boolean, errors: any[] = []) => {
        if (!valid) {
          errorsCount++
          // 如果配置了滚动到错误字段，且是第一个错误
          if (props.scrollToError && errorsCount === 1) {
            scrollToField(field.prop)
          }
          if (errors) {
            invalidFields.errors = invalidFields.errors || []
            invalidFields.errors.push(...errors)
            invalidFields.fields[field.prop] = errors
          }
        }
        if (++count === fieldsLength) {
          valid = errorsCount === 0
          callback?.(valid, invalidFields)
        }
        resolve()
      })
    })
  })

  await Promise.all(promises)
  return valid
}

/**
 * 验证部分表单字段
 * @param props 字段名或字段名数组
 * @param callback 回调函数
 */
const validateField = async (props: string | string[], callback?: Function) => {
  const propsArr = Array.isArray(props) ? props : [props];
  const validateFields = fields.filter((field) =>
    propsArr.includes(field.prop)
  );

  for (const field of validateFields) {
    await field.validate("", callback);
  }
};

/**
 * 重置整个表单
 * 清除验证结果，将所有字段值重置为初始值
 */
const resetFields = () => {
  fields.forEach((field) => {
    field.resetField();
  });
};

/**
 * 清除表单验证信息
 * @param props 字段名或字段名数组，不传则清除所有字段
 */
const clearValidate = (props: string | string[] = []) => {
  const propsArr = Array.isArray(props) ? props : [props];
  fields.forEach((field) => {
    if (propsArr.length === 0 || propsArr.includes(field.prop)) {
      field.clearValidate();
    }
  });
};

// 提供表单上下文给子组件
provide(
  "form",
  reactive({
    ...toRefs(props),
    addField,
    removeField,
    resetFields,
    clearValidate,
    validate,
    validateField,
  })
);

// 暴露方法
defineExpose({
  validate,
  validateField,
  resetFields,
  clearValidate,
});
</script>
