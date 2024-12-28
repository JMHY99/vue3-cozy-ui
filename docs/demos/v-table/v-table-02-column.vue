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
    price: (Math.random() * 1000).toFixed(2),
    status: ['进行中', '已完成', '已取消'][Math.floor(Math.random() * 3)]
  }));
};

const columns = [
  {
    key: 'id',
    title: 'ID',
    width: 80,
    align: 'center'
  },
  {
    key: 'name',
    title: '姓名',
    width: 200
  },
  {
    key: 'price',
    title: '价格',
    width: 150,
    align: 'right'
  },
  {
    key: 'status',
    title: '状态',
    align: 'center'
  }
];

const tableData = generateData(10000);
</script> 