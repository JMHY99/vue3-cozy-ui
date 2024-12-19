<template>
  <div class="demo">
    <c-tooltip title="提示文字" color="pink">
      <button>Pink</button>
    </c-tooltip>
    <c-tooltip title="提示文字" color="red">
      <button>Red</button>
    </c-tooltip>
    <c-tooltip title="提示文字" color="yellow">
      <button>Yellow</button>
    </c-tooltip>
    <c-tooltip title="提示文字" color="orange">
      <button>Orange</button>
    </c-tooltip>
    <c-tooltip title="提示文字" color="cyan">
      <button>Cyan</button>
    </c-tooltip>
    <c-tooltip title="提示文字" color="green">
      <button>Green</button>
    </c-tooltip>
    <c-tooltip title="提示文字" color="blue">
      <button>Blue</button>
    </c-tooltip>
    <c-tooltip title="提示文字" color="purple">
      <button>Purple</button>
    </c-tooltip>
    <c-tooltip title="提示文字" color="geekblue">
      <button>Geekblue</button>
    </c-tooltip>
    <c-tooltip title="提示文字" color="magenta">
      <button>Magenta</button>
    </c-tooltip>
    <c-tooltip title="提示文字" color="#f50">
      <button>#f50</button>
    </c-tooltip>
    <c-tooltip title="提示文字" color="#2db7f5">
      <button>#2db7f5</button>
    </c-tooltip>
    <c-tooltip title="提示文字" color="#87d068">
      <button>#87d068</button>
    </c-tooltip>
    <c-tooltip title="提示文字" color="#108ee9">
      <button>#108ee9</button>
    </c-tooltip>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.demo {
  padding: 20px;
}
button {
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