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
  <c-watermark content="Cozy UI">
    <div class="content">
      Vue (发音为 /vjuː/，类似 view) 是一款用于构建用户界面的 JavaScript
      框架。它基于标准 HTML、CSS 和 JavaScript
      构建，并提供了一套声明式的、组件化的编程模型，帮助你高效地开发用户界面。无论是简单还是复杂的界面，Vue
      都可以胜任。
    </div>
  </c-watermark>
</template>

<style scoped>
.content {
  height: 400px;
  background-color: #fff;
}
</style>
