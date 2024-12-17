<template>
  <c-form :model="form" label-width="120px">
    <c-row :gutter="20">
      <c-col :span="12">
        <c-form-item label="活动名称" prop="name">
          <c-input v-model="form.name" />
        </c-form-item>
      </c-col>
      <c-col :span="12">
        <c-form-item label="活动区域" prop="region">
          <c-select v-model="form.region">
            <c-option label="区域一" value="1" />
            <c-option label="区域二" value="2" />
          </c-select>
        </c-form-item>
      </c-col>
    </c-row>
    <c-row :gutter="20">
      <c-col :span="8">
        <c-form-item label="活动时间" prop="date">
          <c-date-picker v-model="form.date" />
        </c-form-item>
      </c-col>
      <c-col :span="8">
        <c-form-item label="即时配送" prop="delivery">
          <c-switch v-model="form.delivery" />
        </c-form-item>
      </c-col>
      <c-col :span="8">
        <c-form-item label="活动类型" prop="type">
          <c-select v-model="form.type">
            <c-option label="线上" value="online" />
            <c-option label="线下" value="offline" />
          </c-select>
        </c-form-item>
      </c-col>
    </c-row>
  </c-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  region: '',
  date: '',
  delivery: false,
  type: ''
})
</script> 