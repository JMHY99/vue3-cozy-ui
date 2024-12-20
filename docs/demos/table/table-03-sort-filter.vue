<template>
  <c-table :columns="columns" :data="data" />
</template>

<script lang="ts" setup>
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    filters: [
      { text: '张', value: '张' },
      { text: '李', value: '李' },
      { text: '王', value: '王' },
    ],
    onFilter: (value, record) => record.name.indexOf(value) === 0,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: '地址',
    dataIndex: 'address',
    filters: [
      { text: '上海', value: '上海' },
      { text: '北京', value: '北京' },
      { text: '广州', value: '广州' },
    ],
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
];

const data = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '上海市浦东新区',
  },
  {
    key: '2',
    name: '李四',
    age: 42,
    address: '北京市朝阳区',
  },
  {
    key: '3',
    name: '王五',
    age: 28,
    address: '广州市天河区',
  },
];
</script>
