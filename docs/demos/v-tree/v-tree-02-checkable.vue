<template>
  <c-v-tree
    :tree-data="treeData"
    checkable
    v-model:checked-keys="checkedKeys"
    v-model:expanded-keys="expandedKeys"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 生成大量演示数据
const generateTreeData = (level = 0, parentKey = ''): any[] => {
  if (level >= 3) return [];
  const count = 3;
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
const checkedKeys = ref(['1-1', '2-1', '3-1']);
const expandedKeys = ref(['1', '2', '3']);
</script> 