<template>
  <c-image
    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    :width="200"
    :placeholder="true"
  >
    <template #placeholder>
      <div class="loading-placeholder">
        加载中...
      </div>
    </template>
  </c-image>
</template>

<style scoped>
.loading-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  color: #999;
}
</style> 