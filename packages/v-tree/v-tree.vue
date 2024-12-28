<template>
  <div
    ref="containerRef"
    class="cozy-v-tree"
    @scroll="handleScroll"
  >
    <div
      class="cozy-v-tree-phantom"
      :style="{ height: totalHeight + 'px' }"
    ></div>
    <div
      class="cozy-v-tree-content"
      :style="{ transform: `translate3d(0, ${offset}px, 0)` }"
    >
      <div
        v-for="node in visibleNodes"
        :key="node.key"
        class="cozy-v-tree-node"
        :style="{ 
          height: itemHeight + 'px',
          paddingLeft: node.level * indentSize + 'px'
        }"
      >
        <div class="cozy-v-tree-node-content">
          <span 
            v-if="node.children && node.children.length"
            class="cozy-v-tree-switcher"
            :class="{
              'cozy-v-tree-switcher-open': expandedKeys.includes(node.key)
            }"
            @click="handleExpand(node)"
          >
            <i class="cozy-icon" :class="expandedKeys.includes(node.key) ? 'c-down-outlined' : 'c-right-outlined'" ></i>
          </span>
          <span 
            v-else 
            class="cozy-v-tree-switcher cozy-v-tree-switcher-noop"
          ></span>
          <span 
            class="cozy-v-tree-checkbox" 
            v-if="checkable"
            @click="handleCheck(node)"
          >
            <span class="cozy-v-tree-checkbox-inner" :class="{
              'cozy-v-tree-checkbox-checked': checkedKeys.includes(node.key),
              'cozy-v-tree-checkbox-indeterminate': indeterminateKeys.includes(node.key)
            }"></span>
          </span>
          <span 
            class="cozy-v-tree-node-title"
            :class="{
              'cozy-v-tree-node-selected': selectedKeys.includes(node.key)
            }"
            @click="handleSelect(node)"
          >
            <slot name="title" :node="node">
              {{ node.title }}
            </slot>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';

// 定义组件名称
defineOptions({
  name: 'CVTree'
});

// 定义树节点接口
interface TreeNode {
  key: string | number;
  title: string;
  children?: TreeNode[];
  level?: number;
  parent?: TreeNode;
  isLeaf?: boolean;
}

// 定义Props接口
interface Props {
  // 树形数据
  treeData: TreeNode[];
  // 节点高度
  itemHeight?: number;
  // 容器高度
  height?: number | string;
  // 缓冲区大小
  bufferSize?: number;
  // 缩进大小
  indentSize?: number;
  // 展开的节点keys
  expandedKeys?: (string | number)[];
  // 选中的节点keys
  selectedKeys?: (string | number)[];
  // 是否显示复选框
  checkable?: boolean;
  // 勾选的节点keys
  checkedKeys?: (string | number)[];
  // 默认展开所有节点
  defaultExpandAll?: boolean;
  // 是否支持多选
  multiple?: boolean;
}

// 定义Props默认值
const props = withDefaults(defineProps<Props>(), {
  itemHeight: 28,
  height: 400,
  bufferSize: 20,
  indentSize: 24,
  expandedKeys: () => [],
  selectedKeys: () => [],
  checkable: false,
  checkedKeys: () => [],
  defaultExpandAll: false,
  multiple: false
});

// 定义事件
const emit = defineEmits<{
  'update:expandedKeys': [(string | number)[]];
  'update:selectedKeys': [(string | number)[]];
  'update:checkedKeys': [(string | number)[]];
  expand: [expandedKeys: (string | number)[], node: TreeNode];
  select: [selectedKeys: (string | number)[], node: TreeNode];
  check: [checkedKeys: (string | number)[], node: TreeNode];
}>();

// 容器引用
const containerRef = ref<HTMLElement | null>(null);

// 滚动位置
const scrollTop = ref(0);

// 展开的节点keys
const expandedKeys = ref<(string | number)[]>([...props.expandedKeys]);

// 选中的节点keys
const selectedKeys = ref<(string | number)[]>([...props.selectedKeys]);

// 勾选的节点keys
const checkedKeys = ref<(string | number)[]>([...props.checkedKeys]);

// 半选状态的节点keys
const indeterminateKeys = ref<(string | number)[]>([]);

// 扁平化的节点列表（考虑展开状态）
const flattenNodes = computed(() => {
  const flatten: TreeNode[] = [];
  const walk = (nodes: TreeNode[], level = 0, parent?: TreeNode) => {
    nodes.forEach(node => {
      const newNode = { ...node, level, parent };
      flatten.push(newNode);
      if (node.children && node.children.length && expandedKeys.value.includes(node.key)) {
        walk(node.children, level + 1, newNode);
      }
    });
  };
  walk(props.treeData);
  return flatten;
});

// 计算总高度
const totalHeight = computed(() => flattenNodes.value.length * props.itemHeight);

// 计算可视区域能显示的节点数量
const visibleCount = computed(() => {
  if (!containerRef.value) return 0;
  return Math.ceil(containerRef.value.clientHeight / props.itemHeight);
});

// 计算起始索引
const startIndex = computed(() => {
  const start = Math.floor(scrollTop.value / props.itemHeight);
  return Math.max(0, start - props.bufferSize);
});

// 计算结束索引
const endIndex = computed(() => {
  const end = startIndex.value + visibleCount.value + props.bufferSize * 2;
  return Math.min(flattenNodes.value.length, end);
});

// 计算偏移量
const offset = computed(() => startIndex.value * props.itemHeight);

// 计算可视区域节点
const visibleNodes = computed(() => {
  return flattenNodes.value.slice(startIndex.value, endIndex.value);
});

// 处理滚动事件
const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement;
  scrollTop.value = target.scrollTop;
};

// 处理展开/收起
const handleExpand = (node: TreeNode) => {
  const index = expandedKeys.value.indexOf(node.key);
  if (index > -1) {
    expandedKeys.value.splice(index, 1);
  } else {
    expandedKeys.value.push(node.key);
  }
  emit('update:expandedKeys', expandedKeys.value);
  emit('expand', expandedKeys.value, node);
};

// 处理选择
const handleSelect = (node: TreeNode) => {
  if (props.multiple) {
    const index = selectedKeys.value.indexOf(node.key);
    if (index > -1) {
      selectedKeys.value.splice(index, 1);
    } else {
      selectedKeys.value.push(node.key);
    }
  } else {
    selectedKeys.value = [node.key];
  }
  emit('update:selectedKeys', selectedKeys.value);
  emit('select', selectedKeys.value, node);
};

// 获取节点的所有子节点keys
const getChildKeys = (node: TreeNode): (string | number)[] => {
  const keys: (string | number)[] = [];
  const walk = (nodes?: TreeNode[]) => {
    if (!nodes) return;
    nodes.forEach(n => {
      keys.push(n.key);
      if (n.children) {
        walk(n.children);
      }
    });
  };
  walk(node.children);
  return keys;
};

// 获取节点的所有父节点
const getParentNodes = (node: TreeNode): TreeNode[] => {
  const parents: TreeNode[] = [];
  let current = node.parent;
  while (current) {
    parents.push(current);
    current = current.parent;
  }
  return parents;
};

// 处理勾选
const handleCheck = (node: TreeNode) => {
  const index = checkedKeys.value.indexOf(node.key);
  if (index > -1) {
    // 取消勾选节点及其子节点
    const childKeys = getChildKeys(node);
    checkedKeys.value = checkedKeys.value.filter(
      key => key !== node.key && !childKeys.includes(key)
    );
  } else {
    // 勾选节点及其子节点
    const childKeys = getChildKeys(node);
    checkedKeys.value = [...new Set([...checkedKeys.value, node.key, ...childKeys])];
  }
  
  // 更新父节点的勾选状态
  updateParentCheckState(node);
  
  emit('update:checkedKeys', checkedKeys.value);
  emit('check', checkedKeys.value, node);
};

// 更新父节点的勾选状态
const updateParentCheckState = (node: TreeNode) => {
  const parents = getParentNodes(node);
  parents.forEach(parent => {
    if (!parent.children) return;
    
    const allChecked = parent.children.every(
      child => checkedKeys.value.includes(child.key)
    );
    const someChecked = parent.children.some(
      child => checkedKeys.value.includes(child.key) || indeterminateKeys.value.includes(child.key)
    );
    
    const index = checkedKeys.value.indexOf(parent.key);
    const indeterminateIndex = indeterminateKeys.value.indexOf(parent.key);
    
    if (allChecked) {
      if (index === -1) {
        checkedKeys.value.push(parent.key);
      }
      if (indeterminateIndex > -1) {
        indeterminateKeys.value.splice(indeterminateIndex, 1);
      }
    } else if (someChecked) {
      if (index > -1) {
        checkedKeys.value.splice(index, 1);
      }
      if (indeterminateIndex === -1) {
        indeterminateKeys.value.push(parent.key);
      }
    } else {
      if (index > -1) {
        checkedKeys.value.splice(index, 1);
      }
      if (indeterminateIndex > -1) {
        indeterminateKeys.value.splice(indeterminateIndex, 1);
      }
    }
  });
};

// 监听数据变化
watch(
  () => props.treeData,
  () => {
    scrollTop.value = 0;
    if (containerRef.value) {
      containerRef.value.scrollTop = 0;
    }
  }
);

// 监听展开keys变化
watch(
  () => props.expandedKeys,
  (newKeys) => {
    expandedKeys.value = [...newKeys];
  }
);

// 监听选中keys变化
watch(
  () => props.selectedKeys,
  (newKeys) => {
    selectedKeys.value = [...newKeys];
  }
);

// 监听勾选keys变化
watch(
  () => props.checkedKeys,
  (newKeys) => {
    checkedKeys.value = [...newKeys];
  }
);

// 组件挂载后初始化
onMounted(() => {
  if (containerRef.value) {
    // 设置容器高度
    if (typeof props.height === 'number') {
      containerRef.value.style.height = `${props.height}px`;
    } else {
      containerRef.value.style.height = props.height;
    }
  }
  
  // 如果默认展开所有节点
  if (props.defaultExpandAll) {
    const allKeys: (string | number)[] = [];
    const walk = (nodes: TreeNode[]) => {
      nodes.forEach(node => {
        if (node.children && node.children.length) {
          allKeys.push(node.key);
          walk(node.children);
        }
      });
    };
    walk(props.treeData);
    expandedKeys.value = allKeys;
    emit('update:expandedKeys', allKeys);
  }
});

// 暴露方法
defineExpose({
  // 滚动到指定key的节点
  scrollToKey: (key: string | number) => {
    const index = flattenNodes.value.findIndex(node => node.key === key);
    if (index > -1 && containerRef.value) {
      containerRef.value.scrollTop = index * props.itemHeight;
    }
  },
  // 展开指定节点到根节点的路径
  expandToKey: (key: string | number) => {
    const node = flattenNodes.value.find(node => node.key === key);
    if (node) {
      const parents = getParentNodes(node);
      const parentKeys = parents.map(parent => parent.key);
      expandedKeys.value = [...new Set([...expandedKeys.value, ...parentKeys])];
      emit('update:expandedKeys', expandedKeys.value);
    }
  }
});
</script> 