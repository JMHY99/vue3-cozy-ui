<template>
  <div class="demo-anchor">
    <c-anchor direction="horizontal" :affix="false" class="horizontal-anchor">
      <c-anchor-link href="section1" title="第一节" />
      <c-anchor-link href="section2" title="第二节" />
      <c-anchor-link href="section3" title="第三节" />
      <c-anchor-link href="section4" title="第四节" />
    </c-anchor>

    <div class="content-sections">
      <div id="section1" class="section">
        <h3>第一节</h3>
        <p>这是第一节的内容区域，展示水平锚点的使用方式。</p>
      </div>
      <div id="section2" class="section">
        <h3>第二节</h3>
        <p>这是第二节的内容区域，展示水平锚点的使用方式。</p>
      </div>
      <div id="section3" class="section">
        <h3>第三节</h3>
        <p>这是第三节的内容区域，展示水平锚点的使用方式。</p>
      </div>
      <div id="section4" class="section">
        <h3>第四节</h3>
        <p>这是第四节的内容区域，展示水平锚点的使用方式。</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-anchor {
  padding: 20px;
}

.horizontal-anchor {
  margin-bottom: 20px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
}

.content-sections {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 4px;
}

h3 {
  margin: 0 0 16px;
  font-size: 18px;
}

p {
  margin: 0;
  line-height: 1.5;
}
</style>
