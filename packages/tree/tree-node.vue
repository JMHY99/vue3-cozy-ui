# 树节点组件
<template>
  <li 
    class="cozy-tree-node"
    :class="{
      'cozy-tree-node-selected': isSelected,
      'cozy-tree-node-disabled': node.disabled
    }"
    :draggable="draggable"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
    @dragover="onDragOver"
    @drop="onDrop"
  >
    <!-- 缩进 -->
    <span 
      v-if="indent > 0"
      class="cozy-tree-node-indent"
      :style="{ paddingLeft: `${indent * 24}px` }"
    />

    <!-- 展开/收起图标 -->
    <span 
      class="cozy-tree-node-switcher"
      :class="{
        'cozy-tree-node-switcher-open': isExpanded && !isLeaf,
        'cozy-tree-node-switcher-close': !isExpanded && !isLeaf,
        'cozy-tree-node-switcher-noop': isLeaf
      }"
      @click="onExpandClick"
    >
      <c-icon v-if="!isLeaf" :name="isExpanded ? 'c-down-outlined' : 'c-right-outlined'" :size="16" />
    </span>
   
    <!-- 复选框 -->
    <span v-if="checkable" class="cozy-tree-node-checkbox">
      <c-checkbox
        :model-value="isChecked"
        :disabled="node.disableCheckbox || node.disabled"
        @update:model-value="onCheckboxChange"
      />
    </span>

    <!-- 节点内容 -->
    <span 
      class="cozy-tree-node-content"
      :class="{
        'cozy-tree-node-content-selectable': selectable && !node.disableSelect
      }"
      @click="onSelect"
    >
      <!-- 自定义图标 -->
      <c-icon v-if="showIcon && node.icon" :name="node.icon" class="cozy-tree-node-icon" :size="16" />
      <!-- 节点标题 -->
      <span class="cozy-tree-node-title">{{ node[fieldNames.title] }}</span>
    </span>

    <!-- 子节点 -->
    <ul v-if="hasChildren && isExpanded" class="cozy-tree-node-children">
      <tree-node
        v-for="child in node[fieldNames.children]"
        :key="child[fieldNames.key]"
        :node="child"
        :field-names="fieldNames"
        :selected-keys="selectedKeys"
        :expanded-keys="expandedKeys"
        :checked-keys="checkedKeys"
        :checkable="checkable"
        :selectable="selectable"
        :show-line="showLine"
        :show-icon="showIcon"
        :draggable="draggable"
        :indent="indent + 1"
        @select="onChildSelect"
        @check="onChildCheck"
        @expand="onChildExpand"
        @dragstart="onChildDragStart"
        @dragend="onChildDragEnd"
        @drop="onChildDrop"
      />
    </ul>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { TreeNodeData, FieldNames } from './tree.vue'
import CIcon from '../icon/icon.vue'
import CCheckbox from '../checkbox/checkbox.vue'

export default defineComponent({
  name: 'CTreeNode',
  components: {
    CIcon,
    CCheckbox
  },
  props: {
    // 节点数据
    node: {
      type: Object as PropType<TreeNodeData>,
      required: true
    },
    // 字段名称配置
    fieldNames: {
      type: Object as PropType<FieldNames>,
      required: true
    },
    // 选中的节点
    selectedKeys: {
      type: Array as PropType<(string | number)[]>,
      required: true
    },
    // 展开的节点
    expandedKeys: {
      type: Array as PropType<(string | number)[]>,
      required: true
    },
    // 勾选的节点
    checkedKeys: {
      type: Array as PropType<(string | number)[]>,
      required: true
    },
    // 是否显示复选框
    checkable: {
      type: Boolean,
      required: true
    },
    // 是否可选中
    selectable: {
      type: Boolean,
      required: true
    },
    // 是否显示连接线
    showLine: {
      type: Boolean,
      required: true
    },
    // 是否显示图标
    showIcon: {
      type: Boolean,
      required: true
    },
    // 是否可拖拽
    draggable: {
      type: Boolean,
      required: true
    },
    // 缩进层级
    indent: {
      type: Number,
      default: 0
    }
  },
  emits: ['select', 'check', 'expand', 'dragstart', 'dragend', 'drop'],
  setup(props, { emit }) {
    // 是否选中
    const isSelected = computed(() => {
      return props.selectedKeys.includes(props.node[props.fieldNames.key])
    })

    // 是否展开
    const isExpanded = computed(() => {
      return props.expandedKeys.includes(props.node[props.fieldNames.key])
    })

    // 是否勾选
    const isChecked = computed(() => {
      return props.checkedKeys.includes(props.node[props.fieldNames.key])
    })

    // 是否有子节点
    const hasChildren = computed(() => {
      const children = props.node[props.fieldNames.children]
      return Array.isArray(children) && children.length > 0
    })

    // 是否是叶子节点
    const isLeaf = computed(() => {
      const children = props.node[props.fieldNames.children]
      return !Array.isArray(children) || children.length === 0
    })

    // 选中节点
    const onSelect = () => {
      if (props.node.disabled || props.node.disableSelect || !props.selectable) return
      emit('select', props.node[props.fieldNames.key], !isSelected.value)
    }

    // 勾选复选框
    const onCheckboxChange = (checked: boolean) => {
      emit('check', props.node[props.fieldNames.key], checked)
    }

    // 展开/收起节点
    const onExpandClick = () => {
      emit('expand', props.node[props.fieldNames.key], !isExpanded.value)
    }

    // 子节点事件处理
    const onChildSelect = (key: string | number, selected: boolean) => {
      emit('select', key, selected)
    }

    const onChildCheck = (key: string | number, checked: boolean) => {
      emit('check', key, checked)
    }

    const onChildExpand = (key: string | number, expanded: boolean) => {
      emit('expand', key, expanded)
    }

    // 拖拽事件处理
    const onDragStart = (e: DragEvent) => {
      if (!props.draggable || props.node.disabled) {
        e.preventDefault()
        return
      }
      emit('dragstart', e, props.node)
    }

    const onDragEnd = (e: DragEvent) => {
      if (!props.draggable || props.node.disabled) return
      emit('dragend', e, props.node)
    }

    const onDragOver = (e: DragEvent) => {
      if (!props.draggable || props.node.disabled) return
      e.preventDefault()
    }

    const onDrop = (e: DragEvent) => {
      if (!props.draggable || props.node.disabled) return
      emit('drop', e, props.node)
    }

    const onChildDragStart = (e: DragEvent, node: TreeNodeData) => {
      emit('dragstart', e, node)
    }

    const onChildDragEnd = (e: DragEvent, node: TreeNodeData) => {
      emit('dragend', e, node)
    }

    const onChildDrop = (e: DragEvent, node: TreeNodeData) => {
      emit('drop', e, node)
    }

    return {
      isSelected,
      isExpanded,
      isChecked,
      hasChildren,
      isLeaf,
      onSelect,
      onCheckboxChange,
      onExpandClick,
      onChildSelect,
      onChildCheck,
      onChildExpand,
      onDragStart,
      onDragEnd,
      onDragOver,
      onDrop,
      onChildDragStart,
      onChildDragEnd,
      onChildDrop
    }
  }
})
</script> 