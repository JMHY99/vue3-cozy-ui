<template>
  <c-space direction="vertical">
    <c-result
      status="success"
      title="操作成功"
      sub-title="请等待系统审核，审核通过后会以站内信的形式通知您。"
    />
    <c-result
      status="error"
      title="提交失败"
      sub-title="表单信息有误，请检查并修改后重试。"
    />
    <c-result
      status="info"
      title="操作提示"
      sub-title="您的请求已提交，请耐心等待处理结果。"
    />
    <c-result
      status="warning"
      title="警告提示"
      sub-title="您的操作可能存在风险，请确认后继续。"
    />
  </c-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ResultBasicDemo'
})
</script> 