<template>
  <c-form :inline="true" :model="formInline" class="demo-form-inline">
    <c-form-item label="审批人">
      <c-input v-model="formInline.user" placeholder="审批人" />
    </c-form-item>
    <c-form-item label="活动区域">
      <c-select style="width: 180px" v-model="formInline.region" placeholder="活动区域">
        <c-option label="区域一" value="shanghai" />
        <c-option label="区域二" value="beijing" />
      </c-select>
    </c-form-item>
    <c-form-item>
      <c-button type="primary" @click="onSubmit">查询</c-button>
    </c-form-item>
  </c-form>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

const formInline = reactive({
  user: "",
  region: "",
});

const onSubmit = () => {
  console.log("submit!", formInline);
};
</script>
