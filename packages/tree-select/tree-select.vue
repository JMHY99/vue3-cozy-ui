# 树选择组件
<template>
  <div 
    ref="selectRef"
    class="cozy-tree-select"
    :class="{
      'cozy-tree-select-disabled': disabled,
      'cozy-tree-select-focused': focused,
      'cozy-tree-select-multiple': multiple,
      'cozy-tree-select-open': visible
    }"
    @mousedown.stop="handleClick"
  >
    <!-- 选择框 -->
    <div 
      class="cozy-tree-select-selector"
      ref="selectorRef"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      <!-- 单选模式 -->
      <template v-if="!multiple">
        <span 
          v-if="selectedValue" 
          class="cozy-tree-select-selection-item"
        >
          {{ getLabel(selectedValue) }}
        </span>
        <span 
          v-else 
          class="cozy-tree-select-selection-placeholder"
        >
          {{ placeholder }}
        </span>
      </template>

      <!-- 多选模式 -->
      <template v-else>
        <template v-if="selectedValues.length">
          <span 
            v-for="value in selectedValues"
            :key="value"
            class="cozy-tree-select-selection-item"
          >
            <span class="cozy-tree-select-selection-item-content">
              {{ getLabel(value) }}
            </span>
            <span 
              class="cozy-tree-select-selection-item-remove"
              @click.stop="removeValue(value)"
            >
              <c-icon name="c-close" :size="12" />
            </span>
          </span>
        </template>
        <span 
          v-else 
          class="cozy-tree-select-selection-placeholder"
        >
          {{ placeholder }}
        </span>
      </template>

      <!-- 清除按钮 -->
      <span
        v-if="allowClear && (selectedValue || selectedValues.length) && hovering"
        class="cozy-tree-select-clear"
        @click.stop="clearSelection"
      >
        <c-icon name="c-close-circle-filled" :size="12" />
      </span>

      <!-- 箭头图标 -->
      <span class="cozy-tree-select-arrow">
        <c-icon :name="visible ? 'c-up-filled' : 'c-down-filled'" :size="12" />
      </span>
    </div>

    <!-- 下拉面板 -->
    <div
      v-show="visible"
      class="cozy-tree-select-dropdown"
      ref="dropdownRef"
      :style="dropdownStyle"
      @mousedown.stop
    >
      <!-- 搜索框 -->
      <div 
        v-if="showSearch"
        class="cozy-tree-select-dropdown-search"
      >
        <c-input
          v-model="searchText"
          placeholder="请输入搜索内容"
          size="small"
          :prefix-icon="'c-search'"
        />
      </div>

      <!-- 树形选择器 -->
      <c-tree
        :tree-data="treeData"
        :field-names="fieldNames"
        :selected-keys="multiple ? undefined : (selectedValue ? [selectedValue] : [])"
        :checked-keys="multiple ? selectedValues : undefined"
        :expanded-keys="expandedKeys"
        :checkable="multiple"
        :selectable="!multiple"
        :filter-tree-node="handleFilterTreeNode"
        @select="handleSelect"
        @check="handleCheck"
        @expand="handleExpand"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { TreeNodeData, FieldNames } from '../tree/tree.vue'
import CIcon from '../icon/icon.vue'
import CInput from '../input/input.vue'
import CTree from '../tree/tree.vue'

export default defineComponent({
  name: 'CTreeSelect',
  components: {
    CIcon,
    CInput,
    CTree
  },
  props: {
    // 数据源
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
    // 选中的值（单选/多选）
    modelValue: {
      type: [String, Number, Array] as PropType<string | number | (string | number)[]>,
      default: undefined
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 占位符
    placeholder: {
      type: String,
      default: '请选择'
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否显示清除按钮
    allowClear: {
      type: Boolean,
      default: false
    },
    // 是否显示搜索框
    showSearch: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'change', 'search'],
  setup(props, { emit }) {
    // DOM引用
    const selectRef = ref<HTMLElement | null>(null)
    const selectorRef = ref<HTMLElement | null>(null)
    const dropdownRef = ref<HTMLElement | null>(null)
    
    // 状态
    const focused = ref(false)
    const hovering = ref(false)
    const visible = ref(false)
    const searchText = ref('')

    // 下拉框样式
    const dropdownStyle = computed(() => {
      if (!selectorRef.value) return {}
      const rect = selectorRef.value.getBoundingClientRect()
      return {
        minWidth: `${rect.width}px`,
        maxHeight: '256px'
      }
    })

    // 选中的值（单选）
    const selectedValue = computed({
      get: () => props.multiple ? undefined : (props.modelValue as string | number | undefined),
      set: (value: string | number | undefined) => {
        emit('update:modelValue', value)
        emit('change', value)
      }
    })

    // 选中的值（多选）
    const selectedValues = computed({
      get: () => props.multiple ? (Array.isArray(props.modelValue) ? props.modelValue : []) : [],
      set: (values: (string | number)[]) => {
        emit('update:modelValue', values)
        emit('change', values)
      }
    })

    // 获取节点标签
    const getLabel = (value: string | number) => {
      const findLabel = (nodes: TreeNodeData[]): string => {
        for (const node of nodes) {
          if (node[props.fieldNames.key] === value) {
            return node[props.fieldNames.title] as string
          }
          if (node[props.fieldNames.children]) {
            const label = findLabel(node[props.fieldNames.children] as TreeNodeData[])
            if (label) return label
          }
        }
        return ''
      }
      return findLabel(props.treeData)
    }

    // 处理点击事件
    const handleClick = (event: MouseEvent) => {
      if (props.disabled) return
      // 如果点击的是移除标签按钮，不触发下拉框的展开/关闭
      if ((event.target as HTMLElement).closest('.cozy-tree-select-selection-item-remove')) {
        return
      }
      event.stopPropagation()
      visible.value = !visible.value
      focused.value = visible.value
    }

    // 处理节点选择（单选）
    const handleSelect = (keys: (string | number)[], { selected }: { selected: boolean }) => {
      if (!selected) return
      selectedValue.value = keys[0]
      visible.value = false
      focused.value = false
    }

    // 处理节点勾选（多选）
    const handleCheck = (keys: (string | number)[]) => {
      selectedValues.value = keys
    }

    // 移除选中值（多选）
    const removeValue = (value: string | number) => {
      if (props.disabled) return
      selectedValues.value = selectedValues.value.filter(v => v !== value)
    }

    // 清空选择
    const clearSelection = () => {
      if (props.multiple) {
        selectedValues.value = []
      } else {
        selectedValue.value = undefined
      }
      visible.value = false
      focused.value = false
    }

    // 处理树节点过滤
    const handleFilterTreeNode = (node: TreeNodeData) => {
      if (!searchText.value) return true
      const title = node[props.fieldNames.title]
      return typeof title === 'string' && 
        title.toLowerCase().includes(searchText.value.toLowerCase())
    }

    // 监听搜索文本变化
    watch(searchText, (value) => {
      emit('search', value)
    })

    // 点击外部关闭下拉面板
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (
        visible.value &&
        !selectRef.value?.contains(target)
      ) {
        visible.value = false
        focused.value = false
      }
    }

    // 监听下拉���板显示状态
    watch(visible, (value) => {
      if (value) {
        window.addEventListener('mousedown', handleClickOutside)
      } else {
        window.removeEventListener('mousedown', handleClickOutside)
      }
    })

    // 组件卸载前
    onBeforeUnmount(() => {
      window.removeEventListener('mousedown', handleClickOutside)
    })

    // 展开的节点
    const expandedKeys = ref<(string | number)[]>([])

    // 处理节点展开/收缩
    const handleExpand = (keys: (string | number)[], { expanded, node }: { expanded: boolean; node: TreeNodeData }) => {
      expandedKeys.value = keys
    }

    return {
      selectRef,
      selectorRef,
      dropdownRef,
      dropdownStyle,
      focused,
      hovering,
      visible,
      searchText,
      selectedValue,
      selectedValues,
      getLabel,
      handleClick,
      handleSelect,
      handleCheck,
      removeValue,
      clearSelection,
      handleFilterTreeNode,
      expandedKeys,
      handleExpand
    }
  }
})
</script> 