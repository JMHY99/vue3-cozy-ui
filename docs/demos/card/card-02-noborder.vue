<template>
  <div class="card-demo-noborder">
    <c-card title="无边框卡片" :bordered="false" style="width: 300px">
      <p>卡片内容</p>
      <p>卡片内容</p>
      <p>卡片内容</p>
    </c-card>
  </div>
</template>

<style scoped>
.card-demo-noborder {
  background-color: #f5f5f5;
  padding: 16px;
}

p {
  margin: 0;
}

p + p {
  margin-top: 8px;
}
</style>
