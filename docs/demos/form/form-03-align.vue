<template>
  <div class="demo-form-align">
    <c-radio-group v-model="labelPosition">
      <c-radio-button label="left">左对齐</c-radio-button>
      <c-radio-button label="right">右对齐</c-radio-button>
      <c-radio-button label="top">顶部对齐</c-radio-button>
    </c-radio-group>
    <div style="margin: 20px"></div>
    <c-form
      :label-position="labelPosition"
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <c-form-item label="名称">
        <c-input v-model="formLabelAlign.name" />
      </c-form-item>
      <c-form-item label="活动区域">
        <c-input v-model="formLabelAlign.region" />
      </c-form-item>
      <c-form-item label="活动形式">
        <c-input v-model="formLabelAlign.type" />
      </c-form-item>
    </c-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";

const labelPosition = ref("right");

const formLabelAlign = reactive({
  name: "",
  region: "",
  type: "",
});
</script>
