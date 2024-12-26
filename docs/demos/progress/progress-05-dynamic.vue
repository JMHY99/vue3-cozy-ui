<template>
  <div>
    <c-progress :percent="percent" />
    <c-button-group>
      <c-button @click="decline">
        <c-icon name="c-minus" />
      </c-button>
      <c-button @click="increase">
        <c-icon name="c-plus" />
      </c-button>
    </c-button-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const percent = ref(0)

const increase = () => {
  percent.value = Math.min(100, percent.value + 10)
}

const decline = () => {
  percent.value = Math.max(0, percent.value - 10)
}
</script>

<style scoped>
.c-button-group {
  margin-top: 16px;
}
</style> 