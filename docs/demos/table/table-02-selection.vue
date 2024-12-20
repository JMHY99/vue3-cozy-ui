<template>
  <c-table
    :columns="columns"
    :data="data"
    :row-selection="rowSelection"
    @selection-change="onSelectionChange"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '地址',
    dataIndex: 'address',
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

const selectedRowKeys = ref([]);

const rowSelection = {
  selectedRowKeys: selectedRowKeys.value,
  onChange: (keys) => {
    selectedRowKeys.value = keys;
  },
};

const onSelectionChange = (selectedRows) => {
  console.log('selectedRows: ', selectedRows);
};
</script>
