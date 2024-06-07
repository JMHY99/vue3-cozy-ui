<template>
  <div>
    <c-button size="small" type="primary">主要按钮</c-button>
    <c-button size="small" type="success">成功按钮</c-button>
    <c-button ghost size="small" type="info">信息按钮</c-button>
    <c-button ghost size="small" type="danger">危险按钮</c-button>
    <c-button size="small" type="warning">警告按钮</c-button>
  </div>
  <div>
    <c-button type="primary">主要按钮</c-button>
    <c-button type="success">成功按钮</c-button>
    <c-button ghost type="info">信息按钮</c-button>
    <c-button ghost type="danger">危险按钮</c-button>
    <c-button type="warning">警告按钮</c-button>
  </div>
  <div>
    <c-button size="large" type="primary">主要按钮</c-button>
    <c-button size="large" type="success">成功按钮</c-button>
    <c-button ghost size="large" type="info">信息按钮</c-button>
    <c-button ghost size="large" type="danger">危险按钮</c-button>
    <c-button size="large" type="warning">警告按钮</c-button>
  </div>
</template>
<style lang="scss" scoped>
div{
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

</style>
