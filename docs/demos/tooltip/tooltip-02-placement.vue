<template>
  <div class="demo">
    <div style="margin-left: 70px; white-space: nowrap;">
      <c-tooltip placement="topLeft" title="提示文字">
        <button>TL</button>
      </c-tooltip>
      <c-tooltip placement="top" title="提示文字">
        <button>Top</button>
      </c-tooltip>
      <c-tooltip placement="topRight" title="提示文字">
        <button>TR</button>
      </c-tooltip>
    </div>
    <div style="width: 70px; float: left;">
      <c-tooltip placement="leftTop" title="提示文字">
        <button>LT</button>
      </c-tooltip>
      <c-tooltip placement="left" title="提示文字">
        <button>Left</button>
      </c-tooltip>
      <c-tooltip placement="leftBottom" title="提示文字">
        <button>LB</button>
      </c-tooltip>
    </div>
    <div style="width: 70px; margin-left: 304px;">
      <c-tooltip placement="rightTop" title="提示文字">
        <button>RT</button>
      </c-tooltip>
      <c-tooltip placement="right" title="提示文字">
        <button>Right</button>
      </c-tooltip>
      <c-tooltip placement="rightBottom" title="提示文字">
        <button>RB</button>
      </c-tooltip>
    </div>
    <div style="margin-left: 70px; clear: both; white-space: nowrap;">
      <c-tooltip placement="bottomLeft" title="提示文字">
        <button>BL</button>
      </c-tooltip>
      <c-tooltip placement="bottom" title="提示文字">
        <button>Bottom</button>
      </c-tooltip>
      <c-tooltip placement="bottomRight" title="提示文字">
        <button>BR</button>
      </c-tooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

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