<template>
  <c-form :model="form" label-width="120px">
    <c-form-item
      label="对齐方式"
      prop="align"
      content-position="right"
    >
      <c-radio-group v-model="form.align">
        <c-radio label="left">左对齐</c-radio>
        <c-radio label="center">居中</c-radio>
        <c-radio label="right">右对齐</c-radio>
      </c-radio-group>
    </c-form-item>
  </c-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const form = reactive({
  align: 'left'
})
</script> 