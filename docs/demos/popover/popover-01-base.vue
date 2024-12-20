<template>
  <div class="demo">
    <c-popover title="标题" content="这是一段内容，这是一段内容，这是一段内容">
      <button>悬停鼠标</button>
    </c-popover>
    <c-popover>
      <template #title>
        <span>标题</span>
      </template>
      <template #content>
        <p>这是一段内容，这是一段内容，这是一段内容。</p>
        <p>这是一段内容，这是一段内容，这是一段内容。</p>
      </template>
      <button>使用插槽</button>
    </c-popover>
  </div>
</template>

<style scoped>
.demo {
  padding: 20px;
}
button {
  margin: 0 16px;
  padding: 4px 8px;
  cursor: pointer;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  background: #fff;
  color: #666;
}
button:hover {
  color: #1677ff;
  border-color: #1677ff;
}
</style>
