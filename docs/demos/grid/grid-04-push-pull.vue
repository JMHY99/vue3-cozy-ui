<template>
  <div class="grid-demo">
    <c-row>
      <c-col :span="18" :push="6">
        <div class="grid-content">col-18 push-6</div>
      </c-col>
      <c-col :span="6" :pull="18">
        <div class="grid-content">col-6 pull-18</div>
      </c-col>
    </c-row>
  </div>
</template>

<style scoped>
.grid-demo {
  width: 100%;

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
}
</style>
