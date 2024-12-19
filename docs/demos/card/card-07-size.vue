<template>
  <div class="card-demo">
    <c-card title="默认尺寸" style="width: 300px">
      <p>卡片内容</p>
      <p>卡片内容</p>
      <p>卡片内容</p>
    </c-card>

    <c-card title="小尺寸" size="small" style="width: 300px">
      <p>卡片内容</p>
      <p>卡片内容</p>
      <p>卡片内容</p>
    </c-card>
  </div>
</template>

<style scoped>
.card-demo {
  display: flex;
  gap: 16px;
}

p {
  margin: 0;
}

p + p {
  margin-top: 8px;
}
</style>
