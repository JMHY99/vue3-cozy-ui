<template>
  <c-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-width="120px"
  >
    <c-form-item label="年龄" prop="age">
      <c-input-number v-model="form.age" :min="0" :max="150" />
    </c-form-item>
    <c-form-item label="分数" prop="score">
      <c-input-number 
        v-model="form.score"
        :min="0"
        :max="100"
        :precision="2"
      />
    </c-form-item>
    <c-form-item>
      <c-button type="primary" @click="submitForm">提交</c-button>
    </c-form-item>
  </c-form>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

const formRef = ref()
const form = reactive({
  age: null,
  score: null
})

const rules = {
  age: [
    { required: true, message: '请输入年龄' },
    { type: 'number', min: 0, max: 150, message: '年龄必须在0-150之间' }
  ],
  score: [
    { required: true, message: '请输入分数' },
    { type: 'number', min: 0, max: 100, message: '分数必须在0-100之间' }
  ]
}

const submitForm = () => {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      console.log('submit:', form)
    }
  })
}
</script> 