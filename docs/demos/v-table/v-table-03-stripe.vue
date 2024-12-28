<template>
  <c-v-table
    :data="tableData"
    :columns="columns"
    :height="300"
    stripe
  />
</template>

<script setup lang="ts">
// 生成大量演示数据
const generateData = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `用户 ${index + 1}`,
    department: ['技术部', '产品部', '设计部', '运营部'][Math.floor(Math.random() * 4)],
    role: ['开发', '测试', '设计', '产品'][Math.floor(Math.random() * 4)]
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
    title: '姓名'
  },
  {
    key: 'department',
    title: '部门'
  },
  {
    key: 'role',
    title: '职位'
  }
];

const tableData = generateData(10000);
</script> 