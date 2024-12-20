<template>
  <c-table
    :columns="columns"
    :data="data"
    :expand-row-by-click="true"
  >
    <template #expandedRowRender="{ record }">
      <p style="margin: 0">{{ record.description }}</p>
    </template>
  </c-table>
</template>

<script lang="ts" setup>
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
    description: '这是一段关于张三的详细描述信息。',
  },
  {
    key: '2',
    name: '李四',
    age: 42,
    address: '北京市朝阳区',
    description: '这是一段关于李四的详细描述信息。',
  },
  {
    key: '3',
    name: '王五',
    age: 28,
    address: '广州市天河区',
    description: '这是一段关于王五的详细描述信息。',
  },
];
</script>
