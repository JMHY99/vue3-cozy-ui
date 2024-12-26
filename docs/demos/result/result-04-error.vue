<template>
  <c-space direction="vertical">
    <c-result
      status="403"
      title="403"
      sub-title="抱歉，您无权访问此页面。"
    >
      <template #extra>
        <c-button type="primary">返回首页</c-button>
      </template>
    </c-result>

    <c-result
      status="404"
      title="404"
      sub-title="抱歉，您访问的页面不存在。"
    >
      <template #extra>
        <c-button type="primary">返回首页</c-button>
      </template>
    </c-result>

    <c-result
      status="500"
      title="500"
      sub-title="抱歉，服务器出错了。"
    >
      <template #extra>
        <c-button type="primary">返回首页</c-button>
      </template>
    </c-result>
  </c-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ResultErrorDemo'
})
</script> 