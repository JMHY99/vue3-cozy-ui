<template>
  <c-table :data="data">
    <c-table-column prop="name" label="姓名" width="180">
      <template #default="{ text }">
        <c-tag>{{ text }}</c-tag>
      </template>
    </c-table-column>
    <c-table-column prop="age" label="年龄">
      <template #header>
        <span style="color: #1890ff">年龄</span>
      </template>
    </c-table-column>
    <c-table-column prop="address" label="地址" />
    <c-table-column label="操作" width="180">
      <template #default="{ record }">
        <c-button type="primary" size="small" @click="handleEdit(record)">编辑</c-button>
        <c-button type="danger" size="small" style="margin-left: 8px" @click="handleDelete(record)">删除</c-button>
      </template>
    </c-table-column>
  </c-table>
</template>

<script lang="ts" setup>
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

const handleEdit = (record: any) => {
  console.log('编辑', record);
};

const handleDelete = (record: any) => {
  console.log('删除', record);
};
</script>
