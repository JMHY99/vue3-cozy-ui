# 树形控件组件
<template>
  <div class="cozy-tree">
    <!-- 树节点列表 -->
    <ul class="cozy-tree-list" role="tree">
      <template v-for="item in treeData" :key="item[fieldNames.key]">
        <c-tree-node
          :node="item"
          :field-names="fieldNames"
          :selected-keys="selectedKeys"
          :expanded-keys="expandedKeysRef"
          :checked-keys="checkedKeys"
          :checkable="checkable"
          :selectable="selectable"
          :show-line="showLine"
          :show-icon="showIcon"
          :draggable="draggable"
          @select="onSelect"
          @check="onCheck"
          @expand="onExpand"
          @dragstart="onDragStart"
          @dragend="onDragEnd"
          @dragover="onDragOver"
          @drop="onDrop"
        />
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, watch } from 'vue'
import CTreeNode from './tree-node.vue'

// 树节点数据类型
export interface TreeNodeData {
  key: string | number;
  title: string;
  children?: TreeNodeData[];
  disabled?: boolean;
  disableCheckbox?: boolean;
  disableSelect?: boolean;
  icon?: string;
  isLeaf?: boolean;
  selectable?: boolean;
  checkable?: boolean;
  [key: string]: any;
}

// 字段名称配置
export interface FieldNames {
  title: string;
  key: string;
  children: string;
}

export default defineComponent({
  name: 'CTree',
  components: {
    CTreeNode
  },
  props: {
    // 树的数据
    treeData: {
      type: Array as PropType<TreeNodeData[]>,
      default: () => []
    },
    // 字段名称配置
    fieldNames: {
      type: Object as PropType<FieldNames>,
      default: () => ({
        title: 'title',
        key: 'key',
        children: 'children'
      })
    },
    // 选中的节点
    selectedKeys: {
      type: Array as PropType<(string | number)[]>,
      default: () => []
    },
    // 展开的节点
    expandedKeys: {
      type: Array as PropType<(string | number)[]>,
      default: () => []
    },
    // 默认展开的节点
    defaultExpandedKeys: {
      type: Array as PropType<(string | number)[]>,
      default: () => []
    },
    // 默认展开所有节点
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    // 勾选的节点
    checkedKeys: {
      type: Array as PropType<(string | number)[]>,
      default: () => []
    },
    // 是否显示复选框
    checkable: {
      type: Boolean,
      default: false
    },
    // 是否可选中
    selectable: {
      type: Boolean,
      default: true
    },
    // 是否显示连接线
    showLine: {
      type: Boolean,
      default: false
    },
    // 是否显示图标
    showIcon: {
      type: Boolean,
      default: false
    },
    // 是否可拖拽
    draggable: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'update:selectedKeys',
    'update:expandedKeys',
    'update:checkedKeys',
    'select',
    'check',
    'expand',
    'dragstart',
    'dragend',
    'drop'
  ],
  setup(props, { emit }) {
    // 内部状态
    const expandedKeysRef = ref<(string | number)[]>(props.defaultExpandedKeys)

    // 如果设置了defaultExpandAll，则展开所有非叶子节点
    if (props.defaultExpandAll) {
      const expandAllKeys: (string | number)[] = []
      const traverse = (nodes: TreeNodeData[]) => {
        nodes.forEach(node => {
          if (node.children && node.children.length > 0) {
            expandAllKeys.push(node[props.fieldNames.key])
            traverse(node.children)
          }
        })
      }
      traverse(props.treeData)
      expandedKeysRef.value = expandAllKeys
    }

    // 监听外部expandedKeys变化
    watch(() => props.expandedKeys, (newKeys) => {
      expandedKeysRef.value = newKeys
    })

    // 选中节点
    const onSelect = (key: string | number, selected: boolean) => {
      const newSelectedKeys = selected ? 
        [...props.selectedKeys, key] :
        props.selectedKeys.filter(k => k !== key)
      emit('update:selectedKeys', newSelectedKeys)
      emit('select', newSelectedKeys, {
        selected,
        selectedNodes: props.treeData.filter(node => newSelectedKeys.includes(node[props.fieldNames.key]))
      })
    }

    // 勾选节点
    const onCheck = (key: string | number, checked: boolean) => {
      const newCheckedKeys = checked ?
        [...props.checkedKeys, key] :
        props.checkedKeys.filter(k => k !== key)
      emit('update:checkedKeys', newCheckedKeys)
      emit('check', newCheckedKeys, {
        checked,
        checkedNodes: props.treeData.filter(node => newCheckedKeys.includes(node[props.fieldNames.key]))
      })
    }

    // 展开/收起节点
    const onExpand = (key: string | number, expanded: boolean) => {
      const newExpandedKeys = expanded ?
        [...expandedKeysRef.value, key] :
        expandedKeysRef.value.filter(k => k !== key)
      expandedKeysRef.value = newExpandedKeys
      emit('update:expandedKeys', newExpandedKeys)
      emit('expand', newExpandedKeys, {
        expanded,
        node: props.treeData.find(node => node[props.fieldNames.key] === key)
      })
    }

    // 拖拽开始
    const onDragStart = (e: DragEvent, node: TreeNodeData) => {
      emit('dragstart', { event: e, node })
    }

    // 拖拽结束
    const onDragEnd = (e: DragEvent, node: TreeNodeData) => {
      emit('dragend', { event: e, node })
    }

    // 拖拽经过
    const onDragOver = (e: DragEvent) => {
      e.preventDefault()
    }

    // 放置
    const onDrop = (e: DragEvent, dropNode: TreeNodeData) => {
      emit('drop', {
        event: e,
        node: dropNode
      })
    }

    return {
      expandedKeysRef,
      onSelect,
      onCheck,
      onExpand,
      onDragStart,
      onDragEnd,
      onDragOver,
      onDrop
    }
  }
})
</script> 