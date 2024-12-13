<template>
  <div>
    <c-switch
      v-model="checked1"
      checked-text="开启"
      un-checked-text="关闭"
      style="margin-right: 20px"
    />
    <c-switch
      v-model="checked2"
      checked-text="1"
      un-checked-text="0"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked1 = ref(true)
const checked2 = ref(false)
</script>
