<template>
  <c-table
    :columns="columns"
    :data="data"
    :scroll="{ y: 240 }"
  />
</template>

<script lang="ts" setup>
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    width: 150,
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
];

const data = Array(10).fill(null).map((_, index) => ({
  key: index,
  name: `张三 ${index}`,
  age: 32 + index,
  address: `上海市浦东新区 ${index} 号`,
}));
</script>
