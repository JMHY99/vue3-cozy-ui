<template>
  <div>
    <c-steps :active="activeStep" finish-status="success">
      <c-step title="步骤 1" />
      <c-step title="步骤 2" />
      <c-step title="步骤 3" />
    </c-steps>

    <c-form
      ref="formRef"
      :model="form"
      :rules="rules[activeStep]"
      label-width="120px"
      style="margin-top: 40px"
    >
      <!-- 第一步 -->
      <div v-show="activeStep === 0">
        <c-form-item label="账号" prop="account">
          <c-input v-model="form.account" />
        </c-form-item>
        <c-form-item label="密码" prop="password">
          <c-input v-model="form.password" type="password" />
        </c-form-item>
      </div>

      <!-- 第二步 -->
      <div v-show="activeStep === 1">
        <c-form-item label="姓名" prop="name">
          <c-input v-model="form.name" />
        </c-form-item>
        <c-form-item label="手机号" prop="phone">
          <c-input v-model="form.phone" />
        </c-form-item>
      </div>

      <!-- 第三步 -->
      <div v-show="activeStep === 2">
        <c-form-item label="地址" prop="address">
          <c-input v-model="form.address" />
        </c-form-item>
        <c-form-item label="备注" prop="remark">
          <c-input type="textarea" v-model="form.remark" />
        </c-form-item>
      </div>

      <!-- 按钮组 -->
      <c-form-item>
        <c-button v-if="activeStep > 0" @click="prev">上一步</c-button>
        <c-button v-if="activeStep < 2" type="primary" @click="next">下一步</c-button>
        <c-button v-else type="primary" @click="submit">提交</c-button>
      </c-form-item>
    </c-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

const activeStep = ref(0)
const formRef = ref()

const form = reactive({
  account: '',
  password: '',
  name: '',
  phone: '',
  address: '',
  remark: ''
})

const rules = {
  0: {
    account: [
      { required: true, message: '请输入账号' },
      { min: 3, max: 20, message: '长度在 3 到 20 个字符' }
    ],
    password: [
      { required: true, message: '请输入密码' },
      { min: 6, message: '密码不能少于 6 个字符' }
    ]
  },
  1: {
    name: [
      { required: true, message: '请输入姓名' }
    ],
    phone: [
      { required: true, message: '请输入手机号' },
      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
    ]
  },
  2: {
    address: [
      { required: true, message: '请输入地址' }
    ]
  }
}

const next = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid: boolean) => {
    if (valid) {
      activeStep.value++
    }
  })
}

const prev = () => {
  activeStep.value--
}

const submit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid: boolean) => {
    if (valid) {
      console.log('提交表单:', form)
    }
  })
}
</script>

<style scoped>
.c-button + .c-button {
  margin-left: 10px;
}
</style> 