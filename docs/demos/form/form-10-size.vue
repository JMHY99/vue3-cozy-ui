<template>
  <div>
    <c-radio-group v-model="size" style="margin-bottom: 20px">
      <c-radio-button label="large">大号</c-radio-button>
      <c-radio-button label="default">默认</c-radio-button>
      <c-radio-button label="small">小号</c-radio-button>
    </c-radio-group>

    <c-form
      ref="formRef"
      :model="form"
      :size="size"
      label-width="120px"
    >
      <c-form-item label="活动名称" prop="name">
        <c-input v-model="form.name" />
      </c-form-item>
      <c-form-item label="活动区域" prop="region">
        <c-select v-model="form.region">
          <c-option label="区域一" value="1" />
          <c-option label="区域二" value="2" />
        </c-select>
      </c-form-item>
      <c-form-item label="即时配送" prop="delivery">
        <c-switch v-model="form.delivery" />
      </c-form-item>
    </c-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

const size = ref('default')
const form = reactive({
  name: '',
  region: '',
  delivery: false
})
</script> 