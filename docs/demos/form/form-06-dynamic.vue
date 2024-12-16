<template>
  <c-form
    ref="dynamicFormRef"
    :model="dynamicForm"
    :rules="rules"
    label-width="120px"
    class="demo-dynamic"
  >
    <c-form-item
      v-for="(domain, index) in dynamicForm.domains"
      :key="domain.key"
      :label="'域名' + index"
      :prop="'domains.' + index + '.value'"
      :rules="[
        {
          required: true,
          message: '域名不能为空',
          trigger: 'blur',
        }
      ]"
    >
      <div style="display: flex; align-items: center; gap: 8px">
        <c-input v-model="domain.value" />
        <c-button type="danger" @click="removeDomain(domain)">删除</c-button>
      </div>
    </c-form-item>
    <c-form-item>
      <c-button type="primary" @click="submitForm">提交</c-button>
      <c-button @click="addDomain">新增域名</c-button>
      <c-button @click="resetForm">重置</c-button>
    </c-form-item>
  </c-form>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";

const dynamicFormRef = ref();

const dynamicForm = reactive({
  domains: [
    {
      key: Date.now(),
      value: "",
    },
  ],
});

const rules = {
  domains: [
    {
      type: "array",
      required: true,
      message: "请至少添加一个域名",
      trigger: "change",
    }
  ]
};

const removeDomain = (item: any) => {
  const index = dynamicForm.domains.indexOf(item);
  if (index !== -1) {
    dynamicForm.domains.splice(index, 1);
  }
};

const addDomain = () => {
  dynamicForm.domains.push({
    key: Date.now(),
    value: "",
  });
};

const submitForm = async () => {
  if (!dynamicFormRef.value) return;
  await dynamicFormRef.value.validate((valid: boolean) => {
    if (valid) {
      console.log("submit!", dynamicForm);
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = () => {
  if (!dynamicFormRef.value) return;
  dynamicFormRef.value.resetFields();
};
</script>

<style>
.demo-dynamic .c-button {
  margin-left: 8px;
}
</style>
