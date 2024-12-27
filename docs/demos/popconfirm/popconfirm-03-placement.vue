<template>
  <div class="demo-placement">
    <div style="margin-left: 80px; white-space: nowrap;">
      <c-popconfirm placement="topLeft" title="确定要删除吗？">
        <c-button>TL</c-button>
      </c-popconfirm>
      <c-popconfirm placement="top" title="确定要删除吗？">
        <c-button>Top</c-button>
      </c-popconfirm>
      <c-popconfirm placement="topRight" title="确定要删除吗？">
        <c-button>TR</c-button>
      </c-popconfirm>
    </div>
    <div style="width: 80px; float: left;">
      <c-popconfirm placement="leftTop" title="确定要删除吗？">
        <c-button>LT</c-button>
      </c-popconfirm>
      <c-popconfirm placement="left" title="确定要删除吗？">
        <c-button>Left</c-button>
      </c-popconfirm>
      <c-popconfirm placement="leftBottom" title="确定要删除吗？">
        <c-button>LB</c-button>
      </c-popconfirm>
    </div>
    <div style="width: 80px; margin-left: 360px;">
      <c-popconfirm placement="rightTop" title="确定要删除吗？">
        <c-button>RT</c-button>
      </c-popconfirm>
      <c-popconfirm placement="right" title="确定要删除吗？">
        <c-button>Right</c-button>
      </c-popconfirm>
      <c-popconfirm placement="rightBottom" title="确定要删除吗？">
        <c-button>RB</c-button>
      </c-popconfirm>
    </div>
    <div style="margin-left: 80px; clear: both; white-space: nowrap;">
      <c-popconfirm placement="bottomLeft" title="确定要删除吗？">
        <c-button>BL</c-button>
      </c-popconfirm>
      <c-popconfirm placement="bottom" title="确定要删除吗？">
        <c-button>Bottom</c-button>
      </c-popconfirm>
      <c-popconfirm placement="bottomRight" title="确定要删除吗？">
        <c-button>BR</c-button>
      </c-popconfirm>
    </div>
  </div>
</template>

<style scoped>
.demo-placement .cozy-button {
  margin: 4px;
  width: 70px;
}
</style> 