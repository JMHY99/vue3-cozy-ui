<template>
  <c-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <c-form-item label="活动名称" prop="name" required>
      <c-input v-model="ruleForm.name" />
    </c-form-item>
    <c-form-item label="活动区域" prop="region" required>
      <c-select v-model="ruleForm.region" placeholder="请选择活动区域">
        <c-option label="区域一" value="shanghai" />
        <c-option label="区域二" value="beijing" />
      </c-select>
    </c-form-item>
    <c-form-item label="活动时间" required>
      <c-form-item prop="date1">
        <c-date-picker v-model="ruleForm.date1" placeholder="选择日期" />
      </c-form-item>
      <c-form-item prop="date2">
        <c-time-picker v-model="ruleForm.date2" placeholder="选择时间" />
      </c-form-item>
    </c-form-item>
    <c-form-item>
      <c-button type="primary" @click="submitForm">立即创建</c-button>
      <c-button @click="resetForm">重置</c-button>
    </c-form-item>
  </c-form>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";

const ruleFormRef = ref();

const ruleForm = reactive({
  name: "",
  region: "",
  date1: null,
  date2: null,
});

const rules = reactive({
  name: [
    { required: true, message: "请输入活动名称", trigger: "blur" },
    { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
  ],
  region: [{ required: true, message: "请选择活动区域", trigger: "change" }],
  date1: [{ required: true, message: "请选择日期", trigger: "change" }],
  date2: [{ required: true, message: "请选择时间", trigger: "change" }],
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
