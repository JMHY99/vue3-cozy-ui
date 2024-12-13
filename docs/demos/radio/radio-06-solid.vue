<template>
  <div class="demo-radio-solid">
    <c-radio-group v-model="radio" button-style="solid">
      <c-radio-button label="上海">上海</c-radio-button>
      <c-radio-button label="北京">北京</c-radio-button>
      <c-radio-button label="广州">广州</c-radio-button>
      <c-radio-button label="深圳">深圳</c-radio-button>
    </c-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radio = ref('上海')
</script>
