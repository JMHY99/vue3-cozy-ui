<template>
  <c-v-tree :tree-data="treeData" />
</template>

<script setup lang="ts">
// 生成大量演示数据
const generateTreeData = (level = 0, parentKey = ''): any[] => {
  if (level >= 4) return [];
  const count = 5;
  return Array.from({ length: count }, (_, index) => {
    const key = parentKey ? `${parentKey}-${index + 1}` : `${index + 1}`;
    return {
      key,
      title: `节点 ${key}`,
      children: generateTreeData(level + 1, key)
    };
  });
};

const treeData = generateTreeData();
</script> 