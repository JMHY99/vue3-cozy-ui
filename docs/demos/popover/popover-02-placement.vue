<template>
  <div class="demo">
    <div style="margin-left: 70px; white-space: nowrap;">
      <c-popover placement="topLeft" title="标题" content="这是一段内容">
        <button>TL</button>
      </c-popover>
      <c-popover placement="top" title="标题" content="这是一段内容">
        <button>Top</button>
      </c-popover>
      <c-popover placement="topRight" title="标题" content="这是一段内容">
        <button>TR</button>
      </c-popover>
    </div>
    <div style="width: 70px; float: left;">
      <c-popover placement="leftTop" title="标题" content="这是一段内容">
        <button>LT</button>
      </c-popover>
      <c-popover placement="left" title="标题" content="这是一段内容">
        <button>Left</button>
      </c-popover>
      <c-popover placement="leftBottom" title="标题" content="这是一段内容">
        <button>LB</button>
      </c-popover>
    </div>
    <div style="width: 70px; margin-left: 304px;">
      <c-popover placement="rightTop" title="标题" content="这是一段内容">
        <button>RT</button>
      </c-popover>
      <c-popover placement="right" title="标题" content="这是一段内容">
        <button>Right</button>
      </c-popover>
      <c-popover placement="rightBottom" title="标题" content="这是一段内容">
        <button>RB</button>
      </c-popover>
    </div>
    <div style="margin-left: 70px; clear: both; white-space: nowrap;">
      <c-popover placement="bottomLeft" title="标题" content="这是一段内容">
        <button>BL</button>
      </c-popover>
      <c-popover placement="bottom" title="标题" content="这是一段内容">
        <button>Bottom</button>
      </c-popover>
      <c-popover placement="bottomRight" title="标题" content="这是一段内容">
        <button>BR</button>
      </c-popover>
    </div>
  </div>
</template>

<style scoped>
.demo {
  padding: 40px;
}
button {
  width: 70px;
  margin: 4px;
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
