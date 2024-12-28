<template>
  <c-v-table
    :data="tableData"
    :columns="columns"
    :height="300"
  />
</template>

<script setup lang="ts">
// 生成大量演示数据
const generateData = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `用户 ${index + 1}`,
    age: Math.floor(Math.random() * 50) + 18,
    address: `地址 ${index + 1}`
  }));
};

const columns = [
  {
    key: 'id',
    title: 'ID'
  },
  {
    key: 'name',
    title: '姓名'
  },
  {
    key: 'age',
    title: '年龄'
  },
  {
    key: 'address',
    title: '地址'
  }
];

const tableData = generateData(10000);
</script> 