<template>
  <c-page-header
    title="Title"
    subtitle="This is a subtitle"
    back="返回"
    @back="handleBack"
  >
    <template #extra>
      <c-button>操作</c-button>
      <c-button type="primary">主操作</c-button>
    </template>
    <div class="content">
      <p>
        段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，
        提供跨越设计与开发的体验解决方案。
      </p>
      <div class="content-link">
        <a>
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
            alt="start"
          />
          快速开始
        </a>
        <a>
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
            alt="info"
          />
          产品简介
        </a>
        <a>
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
            alt="doc"
          />
          产品文档
        </a>
      </div>
    </div>
  </c-page-header>
</template>

<script lang="ts" setup>
const handleBack = () => {
  console.log('返回');
};
</script>

<style scoped>
.content {
  padding: 24px 0;
}
.content-link {
  padding-top: 16px;
}
.content-link a {
  display: inline-flex;
  align-items: center;
  max-width: 180px;
  margin-right: 32px;
  color: rgba(0, 0, 0, 0.45);
  text-decoration: none;
}
.content-link a img {
  width: 24px;
  margin-right: 8px;
}
</style> 