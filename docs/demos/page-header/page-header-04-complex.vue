<template>
  <c-page-header title="高级表格" back="返回" @back="handleBack">
    <template #avatar>
      <c-avatar
        src="https://avatars1.githubusercontent.com/u/8186664?s=460&v=4"
      />
    </template>
    <template #tags>
      <c-button type="primary" size="small">运行中</c-button>
    </template>
    <template #extra>
      <c-button key="3">操作</c-button>
      <c-button key="2">操作</c-button>
      <c-button key="1" type="primary">主操作</c-button>
    </template>
    <template #footer>
      <c-tabs>
        <c-tab-pane key="1" tab="详情" />
        <c-tab-pane key="2" tab="规则" />
      </c-tabs>
    </template>
    <div class="content">
      <div class="content-row">
        <div class="content-col">
          <span>状态</span>
          <p>运行中</p>
        </div>
        <div class="content-col">
          <span>订单金额</span>
          <p>¥ 568.08</p>
        </div>
        <div class="content-col">
          <span>商品编号</span>
          <p>1234123421</p>
        </div>
        <div class="content-col">
          <span>创建时间</span>
          <p>2023-01-10</p>
        </div>
      </div>
    </div>
  </c-page-header>
</template>

<script lang="ts" setup>
const handleBack = () => {
  console.log('返回');
};
</script>

<style scoped>
.content {
  padding: 24px 0;
}
.content-row {
  display: flex;
  margin-bottom: 16px;
}
.content-col {
  flex: 1;
}
.content-col span {
  color: rgba(0, 0, 0, 0.45);
}
.content-col p {
  margin: 4px 0 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 24px;
}
</style> 