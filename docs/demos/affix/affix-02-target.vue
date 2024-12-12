<template>
  <div
    id="components-affix-demo-target"
    ref="container"
    class="scrollable-container"
  >
    <div class="background">
      <c-affix :offset-top="10" :target="() => this.$refs.container">
        <c-button type="primary"> 在容器中固钉 </c-button>
      </c-affix>
    </div>
  </div>
</template>
<style>
  #components-affix-demo-target.scrollable-container {
    height: 300px;
    overflow-y: scroll;
    width: 100%;
  }
  #components-affix-demo-target .background {
    padding-top: 60px;
    height: 600px;
    background-image: url("https://zos.alipayobjects.com/rmsportal/RmjwQiJorKyobvI.jpg");
  }
</style>
