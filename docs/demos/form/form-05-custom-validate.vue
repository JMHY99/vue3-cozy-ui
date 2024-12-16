<template>
  <c-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <c-form-item label="密码" prop="pass">
      <c-input v-model="ruleForm.pass" type="password" autocomplete="off" />
    </c-form-item>
    <c-form-item label="确认密码" prop="checkPass">
      <c-input
        v-model="ruleForm.checkPass"
        type="password"
        autocomplete="off"
      />
    </c-form-item>
    <c-form-item label="年龄" prop="age">
      <c-input-number v-model="ruleForm.age" :min="0" :max="200" />
    </c-form-item>
    <c-form-item>
      <c-button type="primary" @click="submitForm">提交</c-button>
      <c-button @click="resetForm">重置</c-button>
    </c-form-item>
  </c-form>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";

const ruleFormRef = ref();

const ruleForm = reactive({
  pass: "",
  checkPass: "",
  age: 0,
});

// 自定义校验规则
const validatePass = (rule: any, value: string, callback: Function) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (ruleForm.checkPass !== "") {
      ruleFormRef.value?.validateField("checkPass");
    }
    callback();
  }
};

const validatePass2 = (rule: any, value: string, callback: Function) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== ruleForm.pass) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};

const validateAge = (rule: any, value: number, callback: Function) => {
  if (value === undefined || value === null) {
    callback(new Error("请输入年龄"));
  } else if (!Number.isInteger(value)) {
    callback(new Error("请输入数字值"));
  } else {
    callback();
  }
};

const rules = reactive({
  pass: [{ validator: validatePass, trigger: "blur" }],
  checkPass: [{ validator: validatePass2, trigger: "blur" }],
  age: [{ validator: validateAge, trigger: "blur" }],
});

const submitForm = async () => {
  if (!ruleFormRef.value) return;
  await ruleFormRef.value.validate((valid: boolean) => {
    if (valid) {
      console.log("submit!", ruleForm);
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = () => {
  if (!ruleFormRef.value) return;
  ruleFormRef.value.resetFields();
};
</script>
