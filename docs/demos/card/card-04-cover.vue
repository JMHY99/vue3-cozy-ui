<template>
  <c-card
    title="带封面的卡片"
    style="width: 300px"
    hoverable
  >
    <template #cover>
      <img
        alt="example"
        src="https://picsum.photos/300/200"
      />
    </template>
    <p>卡片内容</p>
    <p>卡片内容</p>
    <p>卡片内容</p>
  </c-card>
</template>

<style scoped>
p {
  margin: 0;
}

p + p {
  margin-top: 8px;
}
</style>
