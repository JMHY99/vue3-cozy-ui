<template>
  <div class="demo-radio-size">
    <c-radio-group v-model="radio1" size="large">
      <c-radio-button label="上海">上海</c-radio-button>
      <c-radio-button label="北京">北京</c-radio-button>
      <c-radio-button label="广州">广州</c-radio-button>
    </c-radio-group>

    <c-radio-group v-model="radio2">
      <c-radio-button label="上海">上海</c-radio-button>
      <c-radio-button label="北京">北京</c-radio-button>
      <c-radio-button label="广州">广州</c-radio-button>
    </c-radio-group>

    <c-radio-group v-model="radio3" size="small">
      <c-radio-button label="上海">上海</c-radio-button>
      <c-radio-button label="北京">北京</c-radio-button>
      <c-radio-button label="广州">广州</c-radio-button>
    </c-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radio1 = ref('上海')
const radio2 = ref('上海')
const radio3 = ref('上海')
</script>

<style>
.demo-radio-size {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
