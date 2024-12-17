<template>
  <c-form :model="form" label-width="120px">
    <c-form-item
      label="活动名称"
      prop="name"
      tooltip="这是一个提示信息"
    >
      <c-input v-model="form.name" />
    </c-form-item>
  </c-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const form = reactive({
  name: ''
})
</script> 