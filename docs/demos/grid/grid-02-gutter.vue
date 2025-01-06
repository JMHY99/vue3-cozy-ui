<template>
  <div class="grid-demo">
    <c-row :gutter="16">
      <c-col :span="6">
        <div class="grid-content">col-6</div>
      </c-col>
      <c-col :span="6">
        <div class="grid-content">col-6</div>
      </c-col>
      <c-col :span="6">
        <div class="grid-content">col-6</div>
      </c-col>
      <c-col :span="6">
        <div class="grid-content">col-6</div>
      </c-col>
    </c-row>
    <c-row :gutter="[16, 24]">
      <c-col :span="6">
        <div class="grid-content">col-6</div>
      </c-col>
      <c-col :span="6">
        <div class="grid-content">col-6</div>
      </c-col>
      <c-col :span="6">
        <div class="grid-content">col-6</div>
      </c-col>
      <c-col :span="6">
        <div class="grid-content">col-6</div>
      </c-col>
      <c-col :span="6">
        <div class="grid-content">col-6</div>
      </c-col>
      <c-col :span="6">
        <div class="grid-content">col-6</div>
      </c-col>
      <c-col :span="6">
        <div class="grid-content">col-6</div>
      </c-col>
      <c-col :span="6">
        <div class="grid-content">col-6</div>
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
    background-color: #45a5ff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
}
</style>
