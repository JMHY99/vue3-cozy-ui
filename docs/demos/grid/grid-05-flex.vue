<template>
  <div class="grid-demo">
    <p>Justify</p>
    <c-row justify="start">
      <c-col :span="4"><div class="grid-content">col-4</div></c-col>
      <c-col :span="4"><div class="grid-content">col-4</div></c-col>
      <c-col :span="4"><div class="grid-content">col-4</div></c-col>
      <c-col :span="4"><div class="grid-content">col-4</div></c-col>
    </c-row>
    <c-row justify="center">
      <c-col :span="4"><div class="grid-content">col-4</div></c-col>
      <c-col :span="4"><div class="grid-content">col-4</div></c-col>
      <c-col :span="4"><div class="grid-content">col-4</div></c-col>
      <c-col :span="4"><div class="grid-content">col-4</div></c-col>
    </c-row>
    <c-row justify="end">
      <c-col :span="4"><div class="grid-content">col-4</div></c-col>
      <c-col :span="4"><div class="grid-content">col-4</div></c-col>
      <c-col :span="4"><div class="grid-content">col-4</div></c-col>
      <c-col :span="4"><div class="grid-content">col-4</div></c-col>
    </c-row>
    <c-row justify="space-between">
      <c-col :span="4"><div class="grid-content">col-4</div></c-col>
      <c-col :span="4"><div class="grid-content">col-4</div></c-col>
      <c-col :span="4"><div class="grid-content">col-4</div></c-col>
      <c-col :span="4"><div class="grid-content">col-4</div></c-col>
    </c-row>
    <c-row justify="space-around">
      <c-col :span="4"><div class="grid-content">col-4</div></c-col>
      <c-col :span="4"><div class="grid-content">col-4</div></c-col>
      <c-col :span="4"><div class="grid-content">col-4</div></c-col>
      <c-col :span="4"><div class="grid-content">col-4</div></c-col>
    </c-row>

    <p>Align</p>
    <c-row justify="space-between" align="top" class="row-bg">
      <c-col :span="6"><div class="grid-content-lg">col-6</div></c-col>
      <c-col :span="6"><div class="grid-content">col-6</div></c-col>
      <c-col :span="6"><div class="grid-content-lg">col-6</div></c-col>
    </c-row>
    <c-row justify="space-between" align="middle" class="row-bg">
      <c-col :span="6"><div class="grid-content-lg">col-6</div></c-col>
      <c-col :span="6"><div class="grid-content">col-6</div></c-col>
      <c-col :span="6"><div class="grid-content-lg">col-6</div></c-col>
    </c-row>
    <c-row justify="space-between" align="bottom" class="row-bg">
      <c-col :span="6"><div class="grid-content-lg">col-6</div></c-col>
      <c-col :span="6"><div class="grid-content">col-6</div></c-col>
      <c-col :span="6"><div class="grid-content-lg">col-6</div></c-col>
    </c-row>
  </div>
</template>

<style scoped>
.grid-demo {
  width: 100%;

  p {
    margin: 20px 0 8px;
  }

  .grid-content {
    width: 100%;
    border-radius: 4px;
    min-height: 36px;
    margin: 4px 0;
    background-color: #45a5ff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }

  .grid-content-lg {
    width: 100%;
    height: 100px;
    border-radius: 4px;
    margin: 4px 0;
    background-color: #45a5ff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }

  .row-bg {
    width: 100%;
    background-color: #f5f7fa;
    padding: 10px 0;
  }
}
</style>
