<template>
  <div class="demo">
    <c-popover title="标题" content="这是一段内容" trigger="hover">
      <button>悬停</button>
    </c-popover>
    <c-popover title="标题" content="这是一段内容" trigger="focus">
      <button>聚焦</button>
    </c-popover>
    <c-popover title="标题" content="这是一段内容" trigger="click">
      <button>点击</button>
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
