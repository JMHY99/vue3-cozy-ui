<template>
  <c-v-tree :tree-data="treeData">
    <template #title="{ node }">
      <span class="custom-title">
        <i class="cozy-icon c-folder-outlined" v-if="node.children"></i>
        <i class="cozy-icon c-file-outlined" v-else></i>
        {{ node.title }}
        <span class="custom-count" v-if="node.children">
          ({{ node.children.length }})
        </span>
      </span>
    </template>
  </c-v-tree>
</template>

<script setup lang="ts">
// 生成演示数据
const generateTreeData = (level = 0, parentKey = ''): any[] => {
  if (level >= 3) return [];
  const count = Math.floor(Math.random() * 3) + 2; // 2-4个子节点
  return Array.from({ length: count }, (_, index) => {
    const key = parentKey ? `${parentKey}-${index + 1}` : `${index + 1}`;
    return {
      key,
      title: level === 0 ? `文件夹 ${key}` : `文件 ${key}`,
      children: generateTreeData(level + 1, key)
    };
  });
};

const treeData = generateTreeData();
</script>

<style scoped>
.custom-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.custom-count {
  font-size: 12px;
  color: #999;
  margin-left: 4px;
}

.cozy-icon {
  font-size: 16px;
}

.c-folder-outlined {
  color: #ffd700;
}

.c-file-outlined {
  color: #87ceeb;
}
</style> 