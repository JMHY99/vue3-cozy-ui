<template>
  <div class="demo-anchor">
    <div class="anchor-container">
      <div class="anchor-content">
        <h2 id="offset1">偏移示例1</h2>
        <p>这是偏移示例1的内容区域</p>
        <h2 id="offset2">偏移示例2</h2>
        <p>这是偏移示例2的内容区域</p>
        <h2 id="offset3">偏移示例3</h2>
        <p>这是偏移示例3的内容区域</p>
      </div>
      <c-anchor :target-offset="100">
        <c-anchor-link href="#offset1" title="偏移示例1" />
        <c-anchor-link href="#offset2" title="偏移示例2" />
        <c-anchor-link href="#offset3" title="偏移示例3" />
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
  min-height: 500px; /* 添加最小高度以便于演示滚动效果 */
}

h2 {
  margin: 16px 0;
  font-size: 20px;
}

p {
  margin: 16px 0;
  line-height: 1.5;
  padding: 50px 0; /* 增加内容间距以便于演示效果 */
}
</style>
