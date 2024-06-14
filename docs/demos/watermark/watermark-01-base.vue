<!-- <template>
  <c-watermark
    :width="150"
    :height="150"
    :rotate="45"
    :zIndex="1000"
    content="Cozy UI"
    :font="{
      color: 'rgba(0, 0, 0, 0.1)',
      fontSize: '24px',
      fontFamily: 'Arial',
      fontWeight: 'bold',
    }"
    :gap="[10, 10]"
    :offset="[0, 0]"
  >
    <div class="content"></div>
  </c-watermark>
</template>

<style scoped>
.content {
  height: 400px;
  background-color: red;
  border: 1px solid #ddd;
}
</style> -->
<template>
  <c-watermark content="Cozy Plus Vue">
    <div class="content"></div>
  </c-watermark>
</template>

<style scoped>
.content {
  height: 400px;
  background-color: #fff;
}
</style>
