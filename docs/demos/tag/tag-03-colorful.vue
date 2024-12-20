<template>
  <div class="demo">
    <h4>Presets:</h4>
    <div>
      <c-tag color="pink">pink</c-tag>
      <c-tag color="red">red</c-tag>
      <c-tag color="orange">orange</c-tag>
      <c-tag color="green">green</c-tag>
      <c-tag color="cyan">cyan</c-tag>
      <c-tag color="blue">blue</c-tag>
      <c-tag color="purple">purple</c-tag>
    </div>
    <h4>Custom:</h4>
    <div>
      <c-tag color="#f50">#f50</c-tag>
      <c-tag color="#2db7f5">#2db7f5</c-tag>
      <c-tag color="#87d068">#87d068</c-tag>
      <c-tag color="#108ee9">#108ee9</c-tag>
    </div>
  </div>
</template>

<style scoped>
.demo {
  padding: 24px;
  background: #fff;
}

h4 {
  margin: 16px 0;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.85);
}
</style>
