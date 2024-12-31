<template>
  <div class="demo-anchor">
    <div class="anchor-container">
      <div class="anchor-content">
        <h2 id="bounds1">边界示例1</h2>
        <p>这是边界示例1的内容区域，展示自定义锚点区域边界效果。</p>
        <h2 id="bounds2">边界示例2</h2>
        <p>这是边界示例2的内容区域，展示自定义锚点区域边界效果。</p>
        <h2 id="bounds3">边界示例3</h2>
        <p>这是边界示例3的内容区域，展示自定义锚点区域边界效果。</p>
      </div>
      <c-anchor :bounds="100">
        <c-anchor-link href="bounds1" title="边界示例1" />
        <c-anchor-link href="bounds2" title="边界示例2" />
        <c-anchor-link href="bounds3" title="边界示例3" />
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
  min-height: 600px;
}

h2 {
  margin: 16px 0;
  font-size: 20px;
}

p {
  margin: 16px 0;
  line-height: 1.5;
  padding: 80px 0; /* 增加内容间距以便于演示边界效果 */
}
</style>
