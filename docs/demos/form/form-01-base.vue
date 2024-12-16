<template>
  <c-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <c-form-item label="活动名称" prop="name">
      <c-input v-model="form.name" />
    </c-form-item>
    <c-form-item label="活动区域" prop="region">
      <c-select v-model="form.region" placeholder="请选择活动区域">
        <c-option label="区域一" value="shanghai" />
        <c-option label="区域二" value="beijing" />
      </c-select>
    </c-form-item>
    <c-form-item label="活动时间" required>
      <c-col :span="11">
        <c-form-item prop="date1">
          <c-date-picker
            v-model="form.date1"
            type="date"
            placeholder="选择日期"
            style="width: 100%"
          />
        </c-form-item>
      </c-col>
      <c-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </c-col>
      <c-col :span="11">
        <c-form-item prop="date2">
          <c-time-picker
            v-model="form.date2"
            placeholder="选择时间"
            style="width: 100%"
          />
        </c-form-item>
      </c-col>
    </c-form-item>
    <c-form-item label="即时配送" prop="delivery">
      <c-switch v-model="form.delivery" />
    </c-form-item>
    <c-form-item label="活动性质" prop="type">
      <c-checkbox-group v-model="form.type">
        <c-checkbox label="美食/餐厅线上活动" name="type" />
        <c-checkbox label="地推活动" name="type" />
        <c-checkbox label="线下主题活动" name="type" />
        <c-checkbox label="单纯品牌曝光" name="type" />
      </c-checkbox-group>
    </c-form-item>
    <c-form-item label="特殊资源" prop="resource">
      <c-radio-group v-model="form.resource">
        <c-radio label="线上品牌商赞助" />
        <c-radio label="线下场地免费" />
      </c-radio-group>
    </c-form-item>
    <c-form-item label="活动形式" prop="desc">
      <c-input type="textarea" v-model="form.desc" />
    </c-form-item>
    <c-form-item>
      <c-button type="primary" @click="submitForm">立即创建</c-button>
      <c-button @click="resetForm">重置</c-button>
    </c-form-item>
  </c-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const formRef = ref()

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
})

const rules = reactive({
  name: [
    { required: true, message: '请输入活动名称', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
  ],
  region: [
    { required: true, message: '请选择活动区域', trigger: 'change' }
  ],
  date1: [
    { required: true, message: '请选择日期', trigger: 'change' }
  ],
  date2: [
    { required: true, message: '请选择时间', trigger: 'change' }
  ],
  type: [
    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
  ],
  resource: [
    { required: true, message: '请选择活动资源', trigger: 'change' }
  ],
  desc: [
    { required: true, message: '请填写活动形式', trigger: 'blur' }
  ]
})

const submitForm = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid: boolean) => {
    if (valid) {
      console.log('submit!', form)
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}
</script>

<style>
.demo-ruleForm .c-button {
  margin-right: 12px;
}
</style>
