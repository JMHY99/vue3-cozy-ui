# 树选择组件
<template>
  <div 
    ref="selectRef"
    class="cozy-tree-select"
    :class="{
      'cozy-tree-select-disabled': disabled,
      'cozy-tree-select-focused': focused,
      'cozy-tree-select-multiple': multiple,
      'cozy-tree-select-open': visible,
      [`cozy-tree-select-${size}`]: size
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
              <c-icon name="c-close-outlined" :size="12" />
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
          :placeholder="searchPlaceholder"
          size="small"
          :prefix-icon="'c-search'"
          @input="handleSearch"
        />
      </div>

      <!-- 树形选择器 -->
      <c-tree
        ref="treeRef"
        :tree-data="treeData"
        :field-names="fieldNames"
        :selected-keys="multiple ? undefined : (selectedValue ? [selectedValue] : [])"
        :checked-keys="multiple ? selectedValues : undefined"
        :expanded-keys="expandedKeys"
        :checkable="multiple"
        :selectable="!multiple"
        :filter-tree-node="handleFilterTreeNode"
        :default-expanded-keys="defaultExpandedKeys"
        :default-expanded-all="defaultExpandAll"
        :load-data="loadData"
        :disabled="disabled"
        :virtual="virtual"
        :height="treeHeight"
        @select="handleSelect"
        @check="handleCheck"
        @expand="handleExpand"
        @load="handleLoad"
      />

      <!-- 空状态 -->
      <div v-if="showEmpty" class="cozy-tree-select-empty">
        {{ emptyText }}
      </div>
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
    // 搜索框占位符
    searchPlaceholder: {
      type: String,
      default: '请输入搜索内容'
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
    },
    // 空状态文本
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    // 选择框大小
    size: {
      type: String as PropType<'large' | 'small'>,
      default: undefined
    },
    // 默认展开的树节点
    defaultExpandedKeys: {
      type: Array as PropType<(string | number)[]>,
      default: () => []
    },
    // 默认展开所有树节点
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    // 异步加载数据
    loadData: {
      type: Function as PropType<(node: TreeNodeData) => Promise<void>>,
      default: undefined
    },
    // 是否开启虚拟滚动
    virtual: {
      type: Boolean,
      default: false
    },
    // 虚拟滚动高度
    treeHeight: {
      type: Number,
      default: 256
    },
    // 自定义过滤方法
    filterTreeNode: {
      type: [Boolean, Function] as PropType<boolean | ((searchValue: string, node: TreeNodeData) => boolean)>,
      default: true
    },
    // 多选时最多显示多少个 tag
    maxTagCount: {
      type: Number,
      default: undefined
    },
    // 隐藏 tag 时显示的内容
    maxTagPlaceholder: {
      type: Function as PropType<(omittedValues: any[]) => string>,
      default: undefined
    },
    // 自定义显示内容
    treeNodeLabelProp: {
      type: String,
      default: 'title'
    }
  },
  emits: ['update:modelValue', 'change', 'search', 'select', 'treeExpand', 'dropdownVisibleChange', 'load'],
  setup(props, { emit }) {
    // DOM引用
    const selectRef = ref<HTMLElement | null>(null)
    const selectorRef = ref<HTMLElement | null>(null)
    const dropdownRef = ref<HTMLElement | null>(null)
    const treeRef = ref<InstanceType<typeof CTree> | null>(null)
    
    // 状态
    const focused = ref(false)
    const hovering = ref(false)
    const visible = ref(false)
    const searchText = ref('')
    const expandedKeys = ref<(string | number)[]>(props.defaultExpandedKeys)

    // 计算属性
    const showEmpty = computed(() => {
      return props.treeData.length === 0 || 
        (searchText.value && filteredTreeData.value.length === 0)
    })

    const filteredTreeData = computed(() => {
      if (!searchText.value) return props.treeData
      return filterTreeNodes(props.treeData)
    })

    // 过滤树节点
    const filterTreeNodes = (nodes: TreeNodeData[]): TreeNodeData[] => {
      return nodes.filter(node => {
        const matched = handleFilterTreeNode(node)
        if (matched) return true
        if (node[props.fieldNames.children]) {
          const filteredChildren = filterTreeNodes(node[props.fieldNames.children] as TreeNodeData[])
          if (filteredChildren.length) {
            return {
              ...node,
              [props.fieldNames.children]: filteredChildren
            }
          }
        }
        return false
      })
    }

    // 处理搜索
    const handleSearch = () => {
      emit('search', searchText.value)
    }

    // 处理树节点过滤
    const handleFilterTreeNode = (node: TreeNodeData) => {
      if (!searchText.value) return true
      if (typeof props.filterTreeNode === 'function') {
        return props.filterTreeNode(searchText.value, node)
      }
      if (props.filterTreeNode === false) return true
      const title = node[props.fieldNames.title]
      return typeof title === 'string' && 
        title.toLowerCase().includes(searchText.value.toLowerCase())
    }

    // 处理节点展开/收缩
    const handleExpand = (keys: (string | number)[], { expanded, node }: { expanded: boolean; node: TreeNodeData }) => {
      expandedKeys.value = keys
      emit('treeExpand', keys, { expanded, node })
    }

    // 处理异步加载
    const handleLoad = (loadedKeys: (string | number)[], { node }: { node: TreeNodeData }) => {
      emit('load', loadedKeys, { node })
    }

    // 监听下拉面板显示状态
    watch(visible, (value) => {
      emit('dropdownVisibleChange', value)
      if (value) {
        window.addEventListener('mousedown', handleClickOutside)
      } else {
        window.removeEventListener('mousedown', handleClickOutside)
        searchText.value = ''
      }
    })

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

    // 组件卸载前
    onBeforeUnmount(() => {
      window.removeEventListener('mousedown', handleClickOutside)
    })

    return {
      selectRef,
      selectorRef,
      dropdownRef,
      treeRef,
      dropdownStyle,
      focused,
      hovering,
      visible,
      searchText,
      selectedValue,
      selectedValues,
      expandedKeys,
      showEmpty,
      getLabel,
      handleClick,
      handleSelect,
      handleCheck,
      handleExpand,
      handleLoad,
      handleSearch,
      removeValue,
      clearSelection,
      handleFilterTreeNode
    }
  }
})
</script> 