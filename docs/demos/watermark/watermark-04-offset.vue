<template>
  <c-watermark :rotate="-22" :zIndex="1000" content="Cozy Plus" :font="{
    color: 'rgba(0, 0, 0, 0.1)',
    fontSize: '20px',
    fontFamily: 'Arial',
    fontWeight: 'bold',
  }" :gap="[50, 50]" :offset="[0, 0]">
    <div class="content">
      <h3>灵活性和可定制性</h3>
      <p>提供多样化组件，并支持用户自定义与扩展，以满足各种项目需求，使其具备灵活性和可扩展性</p>
      <h3>响应式设计</h3>
      <p>所有组件均经过响应式设计，能够适应不同设备及屏幕尺寸，确保用户在任何环境下都能够获得良好的视觉和交互体验。</p>
      <h3>简洁易用的</h3>
      <p>组件库设计了简洁明了的API，使得组件的使用变得更加容易和直观，开发人员能够更加高效地构建出所需的用户界面。</p>
    </div>
  </c-watermark>
</template>

<style scoped>
.content {
  background-color: #fff;
  border: 1px solid #ccc;
}
</style>
