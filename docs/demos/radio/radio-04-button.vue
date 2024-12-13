<template>
  <div class="demo-radio-button">
    <c-radio-group v-model="radio1">
      <c-radio-button label="上海">上海</c-radio-button>
      <c-radio-button label="北京">北京</c-radio-button>
      <c-radio-button label="广州">广州</c-radio-button>
      <c-radio-button label="深圳">深圳</c-radio-button>
    </c-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radio1 = ref('上海')
</script>

<style>
.demo-radio-button {
  margin-bottom: 20px;
}
</style>
