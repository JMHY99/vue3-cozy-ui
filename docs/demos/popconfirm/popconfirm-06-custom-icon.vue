<template>
  <div>
    <c-popconfirm
      title="确定要删除这条记录吗？"
      icon="question-circle"
      @confirm="confirm"
    >
      <c-button>使用问号图标</c-button>
    </c-popconfirm>
    <c-popconfirm
      title="确定要删除这条记录吗？"
      icon="info-circle"
      @confirm="confirm"
    >
      <c-button>使用信息图标</c-button>
    </c-popconfirm>
  </div>
</template>

<script lang="ts" setup>
const confirm = () => {
  console.log('点击了确定')
}
</script>

<style scoped>
.cozy-button + .cozy-button {
  margin-left: 8px;
}
</style> 