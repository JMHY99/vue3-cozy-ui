<template>
  <c-alert message="This is a success message" type="success" :closable="true" />
  <c-alert message="This is an info message" type="info" :closable="true" closeText="关闭" />
  <c-alert message="This is a warning message" type="warning" :closable="true" />
  <c-alert message="This is an error message" type="error" :closable="true">
    <template #closeText>
      <c-icon size="20" name="c-close-outlined"></c-icon>
    </template>
  </c-alert>
</template>
