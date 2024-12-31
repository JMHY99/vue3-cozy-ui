<template>
  <div class="demo-anchor">
    <div class="anchor-container">
      <div class="anchor-content">
        <h2 id="basic">基础锚点</h2>
        <p>这是基础锚点的内容区域</p>
        <h2 id="static">静态锚点</h2>
        <p>这是静态锚点的内容区域</p>
        <h2 id="custom">自定义锚点</h2>
        <p>这是自定义锚点的内容区域</p>
        <h2 id="horizontal">水平锚点</h2>
        <p>这是水平锚点的内容区域</p>
      </div>
      <c-anchor>
        <c-anchor-link href="basic" title="基础锚点" />
        <c-anchor-link href="static" title="静态锚点" />
        <c-anchor-link href="custom" title="自定义锚点" />
        <c-anchor-link href="horizontal" title="水平锚点" />
      </c-anchor>
    </div>
  </div>
</template>

<style scoped>
.demo-anchor {
  position: relative;
  padding: 20px;
}

.anchor-container {
  display: flex;
  gap: 20px;
}

.anchor-content {
  flex: 1;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 4px;
}

h2 {
  margin: 16px 0;
  font-size: 20px;
}

p {
  margin: 16px 0;
  line-height: 1.5;
}
</style>
