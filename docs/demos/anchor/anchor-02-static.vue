<template>
  <div class="demo-anchor">
    <div class="anchor-container">
      <div class="anchor-content">
        <h2 id="part1">第一部分</h2>
        <p>这是第一部分的内容区域</p>
        <h2 id="part2">第二部分</h2>
        <p>这是第二部分的内容区域</p>
        <h2 id="part3">第三部分</h2>
        <p>这是第三部分的内容区域</p>
      </div>
      <c-anchor :affix="false">
        <c-anchor-link href="#part1" title="第一部分" />
        <c-anchor-link href="#part2" title="第二部分" />
        <c-anchor-link href="#part3" title="第三部分" />
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
