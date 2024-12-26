<template>
  <c-result
    status="success"
    title="提交成功"
    sub-title="订单号：2017182818828182881"
  >
    <template #extra>
      <c-space>
        <c-button type="primary">返回列表</c-button>
        <c-button>查看详情</c-button>
      </c-space>
    </template>

    <div class="desc">
      <h3>项目名称</h3>
      <p>这里是项目的详细描述，可以展示更多信息。</p>
      <h3>项目编号</h3>
      <p>2017182818828182881</p>
    </div>
  </c-result>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ResultExtraDemo'
})
</script>

<style scoped>
.desc {
  text-align: left;
  background-color: #fafafa;
  padding: 24px;
  border-radius: 2px;
}
.desc h3 {
  font-size: 16px;
  margin: 0 0 12px 0;
}
.desc p {
  margin: 0 0 16px 0;
  color: rgba(0, 0, 0, 0.65);
}
</style> 