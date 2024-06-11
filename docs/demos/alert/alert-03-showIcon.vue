<template>
  <c-alert message="图标显示" type="success" :showIcon="true"></c-alert>
  <c-alert message="图标显示" type="info" :showIcon="true"></c-alert>
  <c-alert message="图标显示" type="warning" :showIcon="true"></c-alert>
  <c-alert message="图标显示" type="error" :showIcon="true"></c-alert>
  <c-alert message="自定义图标显示" type="success" :showIcon="true">
    <template #icon>
      <c-icon size="20" name="c-distributed-outlined"></c-icon>
    </template>
  </c-alert>
  <c-alert message="自定义图标显示" type="info" :showIcon="true">
    <template #icon>
      <c-icon size="20" name="c-lock-outlined"></c-icon>
    </template>
  </c-alert>
  <c-alert message="自定义图标显示" type="warning" :showIcon="true">
    <template #icon>
      <c-icon size="20" name="c-set-outlined"></c-icon>
    </template>
  </c-alert>
  <c-alert message="自定义图标显示" type="error" :showIcon="true">
    <template #icon>
      <c-icon size="20" name="c-mail-outlined"></c-icon>
    </template>
  </c-alert>
</template>
