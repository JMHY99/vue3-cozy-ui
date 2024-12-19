<template>
  <c-card
    title="带操作的卡片"
    style="width: 300px"
  >
    <template #extra>
      <a href="#">更多</a>
    </template>
    <p>卡片内容</p>
    <template #actions>
      <div>操作一</div>
      <div>操作二</div>
      <div>操作三</div>
    </template>
  </c-card>
</template>

<style scoped>
p {
  margin: 0;
}
</style>
