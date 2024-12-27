<template>
  <c-popconfirm
    title="确定要删除这条记录吗？"
    @confirm="confirm"
    @cancel="cancel"
  >
    <c-button>删除</c-button>
  </c-popconfirm>
</template>

<script lang="ts" setup>
const confirm = () => {
  console.log('点击了确定')
}

const cancel = () => {
  console.log('点击了取消')
}
</script> 