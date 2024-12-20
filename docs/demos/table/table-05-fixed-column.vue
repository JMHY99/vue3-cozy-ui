<template>
  <c-table
    :columns="columns"
    :data="data"
    :scroll="{ x: 1300 }"
  />
</template>

<script lang="ts" setup>
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    fixed: 'left',
    width: 100,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    width: 100,
  },
  {
    title: '列 1',
    dataIndex: 'address1',
    width: 200,
  },
  {
    title: '列 2',
    dataIndex: 'address2',
    width: 200,
  },
  {
    title: '列 3',
    dataIndex: 'address3',
    width: 200,
  },
  {
    title: '列 4',
    dataIndex: 'address4',
    width: 200,
  },
  {
    title: '列 5',
    dataIndex: 'address5',
    width: 200,
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
  },
];

const data = Array(10).fill(null).map((_, index) => ({
  key: index,
  name: `张三 ${index}`,
  age: 32 + index,
  address1: `地址 1-${index}`,
  address2: `地址 2-${index}`,
  address3: `地址 3-${index}`,
  address4: `地址 4-${index}`,
  address5: `地址 5-${index}`,
}));
</script>
