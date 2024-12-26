<template>
  <c-result>
    <template #icon>
      <c-icon name="c-smile" :size="72" />
    </template>
    <template #title>
      自定义图标
    </template>
    <template #subTitle>
      您可以使用任意图标来自定义结果页的展示效果
    </template>
  </c-result>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ResultCustomIconDemo'
})
</script> 