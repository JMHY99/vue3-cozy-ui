<template>
  <div class="grid-demo">
    <c-row>
      <c-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
        <div class="grid-content">Col</div>
      </c-col>
      <c-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
        <div class="grid-content">Col</div>
      </c-col>
      <c-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
        <div class="grid-content">Col</div>
      </c-col>
      <c-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
        <div class="grid-content">Col</div>
      </c-col>
      <c-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
        <div class="grid-content">Col</div>
      </c-col>
      <c-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
        <div class="grid-content">Col</div>
      </c-col>
    </c-row>
  </div>
</template>

<style scoped>
.grid-demo {
  width: 100%;

  .grid-content {
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
