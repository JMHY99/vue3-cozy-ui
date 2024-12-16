<template>
  <form
    class="cozy-form"
    :class="[
      {
        'cozy-form-inline': inline,
        [`cozy-form-${labelPosition}`]: true,
      },
    ]"
    @submit.prevent
  >
    <slot></slot>
  </form>
</template>

<script lang="ts" setup>
import { provide, reactive, toRefs } from "vue";
import type {
  FormProps,
  FormContext,
  FormValidateCallback,
  FormItemContext,
} from "./types";

defineOptions({
  name: "CForm",
});

const props = defineProps<FormProps>();
const emit = defineEmits(["validate"]);

// 存储所有表单项的引用
const fields: FormItemContext[] = [];

// 注册表单项
const addField = (field: FormItemContext) => {
  fields.push(field);
};

// 移除表单项
const removeField = (field: FormItemContext) => {
  if (field.prop) {
    const index = fields.indexOf(field);
    if (index !== -1) {
      fields.splice(index, 1);
    }
  }
};

// 验证整个表单
const validate = async (callback?: FormValidateCallback) => {
  let valid = true;
  let invalidFields = {};

  const fieldsLength = fields.length;

  if (fieldsLength === 0) {
    callback?.(true);
    return Promise.resolve(true);
  }

  const promises = fields.map(field => {
    return new Promise((resolve) => {
      field.validate('', (valid: boolean, field: any) => {
        if (!valid) {
          valid = false;
        }
        if (field) {
          invalidFields = { ...invalidFields, ...field };
        }
        resolve(true);
      });
    });
  });

  await Promise.all(promises);
  callback?.(valid, invalidFields);
  return valid;
};

// 验证部分表单字段
const validateField = async (props: string | string[], callback?: Function) => {
  const propsArr = Array.isArray(props) ? props : [props];
  const validateFields = fields.filter((field) =>
    propsArr.includes(field.prop)
  );

  for (const field of validateFields) {
    await field.validate("", callback);
  }
};

// 重置表单
const resetFields = () => {
  fields.forEach((field) => {
    field.resetField();
  });
};

// 清除验证
const clearValidate = (props: string | string[] = []) => {
  const propsArr = Array.isArray(props) ? props : [props];
  fields.forEach((field) => {
    if (propsArr.length === 0 || propsArr.includes(field.prop)) {
      field.clearValidate();
    }
  });
};

// 提供表单上下文
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
