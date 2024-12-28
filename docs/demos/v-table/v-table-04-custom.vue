<template>
  <c-v-table
    :data="tableData"
    :columns="columns"
    :height="300"
  >
    <template #status="{ row }">
      <span
        class="status-tag"
        :class="getStatusClass(row.status)"
      >
        {{ row.status }}
      </span>
    </template>
    <template #action="{ row }">
      <div class="action-buttons">
        <c-button type="primary" size="small" @click="handleView(row)">查看</c-button>
        <c-button type="danger" size="small" @click="handleDelete(row)">删除</c-button>
      </div>
    </template>
  </c-v-table>
</template>

<script setup lang="ts">

// 生成大量演示数据
const generateData = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `用户 ${index + 1}`,
    status: ['在线', '离线', '忙碌'][Math.floor(Math.random() * 3)]
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
    key: 'status',
    title: '状态',
    width: 100,
    align: 'center'
  },
  {
    key: 'action',
    title: '操作',
    width: 200,
    align: 'center'
  }
];

const tableData = generateData(10000);

const getStatusClass = (status: string) => {
  const map: Record<string, string> = {
    '在线': 'status-online',
    '离线': 'status-offline',
    '忙碌': 'status-busy'
  };
  return map[status];
};

const handleView = (row: any) => {
  alert(`查看用户：${row.name}`);
};

const handleDelete = (row: any) => {
  alert(`删除用户：${row.name}`);
};
</script>

<style scoped>
.status-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
}

.status-online {
  background-color: #e6f7ff;
  color: #1890ff;
}

.status-offline {
  background-color: #f5f5f5;
  color: #666;
}

.status-busy {
  background-color: #fff1f0;
  color: #ff4d4f;
}

.action-buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
}
</style> 